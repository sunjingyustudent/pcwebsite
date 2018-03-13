<template>
  <div scope>
    <div class="chat" id="chat" v-if="chatShow">
      <div class="top clear">
        <div class="left">
          <div class="img"></div>
          <div class="use">
            <p>VIP陪练客服</p>
          </div>
        </div>
        <div class="right fr" @click="setChat">X</div>
      </div>
      <div class="center" ref="divHeight">
        <!-- 点击加载更多 -->
        <div class="clkMore">
          <p @click="addMore">点击加载更多</p>
        </div>
        <!-- 消息队列 -->
        <ul ref="currentHeight">
          <li class="clear" v-for="items in initMessage">
            <!-- <div class="fl" v-if="items.tag=='1' || items.tag=='2'"> -->
            <div class="fl clear" v-if="items.tag=='1'">
              <span class="headBigImg fl"></span>
              <div class="fl">
                <p class="userName usertitle">VIP陪练客服 &nbsp;{{items.time_created}}</p>
                <p class="userMessage" v-if="items.type!='2'" v-html="items.message"></p>
                <img v-if="items.type=='2'" :src='items.message' />
                <!-- {{items}} -->
              </div>
            </div>
            <div class="fr" v-if="items.tag=='0'">
              <span>{{items.time_created}}</span>
              <p v-html="items.message" v-if="items.type!='2'"></p>
              <img v-if="items.type=='2'" :src='items.message' />
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div v-show="EmojiShow" class="allEmoji">
          <ul class="clear">
            <li v-for="item in EmojiList" class="fl" @click="addEmoji(item)">
              <img :src="item.image_path" :alt="item.emoji">
            </li>
          </ul>
        </div>
        <div class="up">
          <span class="emojiImg" @click="getEmoji"></span>
          <span>
              <label for="labelImg">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <em class="sendPic"></em>
                </el-upload>    
              </label>
          </span>
        </div>
        <div class="down">
          <textarea placeholder="请输入文字和表情" v-model="usertext" @keyup.enter="sendMessage" ref="setfoucs"></textarea>
          <button @click="sendMessage">发送</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  //引入util库
  const util = require("../util/util");
  import classPost from "../service/test.js";
  import Vue from 'vue';
  import Env from '../api/env';
  import { Upload, Message } from 'element-ui';
  Vue.component(Upload.name, Upload);
  Vue.component(Message.name, Message);
  let ws;
  let timer;
  export default {
    data() {
      return {
        // 初始化消息
        initMessage: [],
        // 缓存uiid
        historyMessageUuid: util.getCookie("uuid") || "",
        //用户输入内容
        usertext: "",
        belowHeight: "",
        //点击加载更多
        clkNum: 20,
        currentHeight: 0,
        messageCount: 0,
        count: 0,
        //表情列表显示的 div
        EmojiShow: true,
        // 表情列表
        EmojiList: "",
        //上传图片
        imageUrl: '',
        uploadUrl: Env.api + '/chat-api/upload-image' || '',
        chatShow: true
      }
    },
    methods: {
      //初始化判断用户是否注册
      connectInit() {
        const _this = this;
        //随机生成20位字符串
        let randomStr = util.randomStr();
        let params = { socketId: randomStr };
        //判断不存在用户uuid , 发送请求注册用户
        if (!util.getCookie("uuid")) {
          classPost.userRegister(params)
            .then(res => {
              // 成功后设置缓存
              document.cookie = "uuid=" + res.data.chat_uuid;
              _this.chatInit(util.getCookie("uuid"));
              //websocket开启连接
              _this.openWs();
            })
            .catch(res => {
              Message("网络延迟,请刷新");
            })
        } else {
          //websocket开启连接
          _this.openWs();
          _this.chatInit(util.getCookie("uuid"));
        };
      },
      openWs() {
        const _this = this;
        //websocket连接
        ws = new WebSocket("ws://192.168.40.213:9505");
        ws.onopen = function (evt) {
        };
        //建立连接
        ws.onmessage = function (event) {
          //客服消息
          //event.data就是 onmessage 返回的数据
          let kefuMessage = JSON.parse(event.data);
          //本地的uuid
          let wsUuid = util.getCookie("uuid");
          if (kefuMessage.event == "CONNECT") {
            let conMessage = '{"url":"/chat/con-message","app_type":"2","chat_token":"abc","role":1,"uuid":"' + wsUuid + '"}';
            ws.send(conMessage);
          };
          //后台推送客服消息 收到消息
          if (kefuMessage.event == "SEND_MESSAGE") {
            // 客服表情字符串转换 url
            let kefuMessages = util.emojiReplace(kefuMessage.response.content, _this.EmojiList);
            // console.log(kefuMessage);
            let imgType = "1";
            if (kefuMessage.response.type == "image") {
              imgType = "2";
            }
            //后台推送信息添加到聊天信息
            let newMessage = { tag: "1", message: kefuMessages, type: imgType }
            console.log(newMessage);
            _this.initMessage.push(newMessage);
            //监控新消息之后整体 div 的高度
            _this.$nextTick(function () {
              //点击的时候获取重新获取 ul 的高度
              let currentHeight = _this.$refs.currentHeight.offsetHeight;
              // 点击的时候设置 div 的卷去高度
              _this.$refs.divHeight.scrollTop = currentHeight;
            })
          }
        };
      },
      chatInit(uid) {
        const _this = this;
        //初始化聊天历史消息
        let params = { user_uuid: uid };
        // _this.getEmoji();
        // 表情请求
        classPost.getMessageList(params)
          .then(res => {
            //获取聊天记录
            _this.initMessage = res.data.message.reverse();
            // console.log(_this.initMessage)
            // //监听for循环 div 的高度
            _this.$nextTick(function () {
              //初始化消息的 div 卷去的高度
              _this.currentHeight = _this.$refs.currentHeight.offsetHeight;
              _this.$refs.divHeight.scrollTop = _this.currentHeight;
            })
            // console.log(_this.initMessage);
          })
          .catch(res => {
            alert("网络延迟,请刷新")
          });
      },
      //点击加载更多
      addMore() {
        const _this = this;

        _this.clkNum = parseInt(_this.clkNum);
        _this.clkNum += 20;
        console.log("自加的条数: " + _this.clkNum);
        let uid = util.getCookie("uuid");
        //初始化聊天历史消息
        let params = { user_uuid: uid, limit: _this.clkNum };

        classPost.getMessageList(params)
          .then(res => {
            //获取聊天记录
            _this.initMessage = res.data.message.reverse();
            _this.messageCount = _this.initMessage.length;
            // Message("已经返回的条数: " + _this.messageCount);
            if (_this.messageCount == _this.clkNum) {
              // //监听for循环 div 的高度
              _this.$nextTick(function () {
                //初始化消息的 div 卷去的高度
                console.log(_this.currentHeight)
                _this.$refs.divHeight.scrollTop = _this.currentHeight;
              })
            } else {
              // Message("呵呵");
              _this.$refs.divHeight.scrollTop = 0;
              _this.clkNum = _this.messageCount;
            };
          })
          .catch(res => {
            // Message("网络延迟,请刷新")
          })
      },
      //发送信息
      sendMessage() {
        const _this = this;
        //获取文本内容
        let usertext = _this.usertext.trim();
        let sendUuid = util.getCookie("uuid") || "";
        if (usertext) {
          //用户信息 表情字符串转换 url
          let params = { uuid: sendUuid, text: usertext };
          classPost.sendMessage(params)
            .then(res => {
              //用户信息添加到聊天信息
              usertext = util.emojiReplace(usertext, _this.EmojiList);
              let newUserMessage = { tag: "0", message: usertext };
              _this.initMessage.push(newUserMessage);
              //监控新消息之后整体 div 的高度
              _this.$nextTick(function () {
                //点击的时候获取重新获取 ul 的高度
                let currentHeight = _this.$refs.currentHeight.offsetHeight;
                // 点击的时候设置 div 的卷去高度
                _this.$refs.divHeight.scrollTop = currentHeight;
              })
            })
            .catch(res => {
              console.log("err");
            })
        }
        _this.usertext = "";
      },
      //获取表情列表
      getEmoji() {
        const _this = this;
        classPost.getEmojiList()
          .then(res => {
            // 获取表情列表
            _this.EmojiList = res.data.list;
            //显示表情列表
            _this.EmojiShow = true;
          })
          .catch(res => {
            console.log("表情列表报错");
          })
      },
      //表情添加到 input 框
      addEmoji(item) {
        const _this = this;
        // 拼接输入框内容与表情的 alt
        let emoji = item.image_path
        _this.usertext = _this.usertext + item.emoji;
        //隐藏表情列表
        _this.EmojiShow = false;
        //聚焦input框
        _this.$refs.setfoucs.focus();
        // console.log(_this.usertext);
      },
      //ws-定时器
      line() {
        const _this = this;
        const timer = window.setInterval(_this.keepLink, 10000);
      },
      //ws-保持连接
      keepLink() {
        //console.log('test');
        //是否已断开链接
        if (ws.readyState == 3) {
          Message('该客服连接中断，请关闭窗口重试。');
          //关闭其他操作
        } else {
          ws.send("{'url': '/chat/heart-beat','chat_token': 'abc'}");
          console.log("长连接");
        }
      },
      //上传图片成功
      handleAvatarSuccess(res, file) {
        const _this = this;
        _this.imageUrl = URL.createObjectURL(file.raw);
        let uuid = util.getCookie("uuid");
        let params = { uuid: uuid, path: res.data.path };
        //用户照片信息添加到聊天信息
        let newMessage = { tag: "0", message: '<img class="sendUserImg" src="' + res.data.url + '">' };
        _this.initMessage.push(newMessage);
        // _this.$nextTick(function () {
        //   //点击的时候获取重新获取 ul 的高度
        //   let currentHeight = _this.$refs.currentHeight.offsetHeight;
        //   // 点击的时候设置 div 的卷去高度
        //   _this.$refs.divHeight.scrollTop = currentHeight;
        // })
        // _this.chatInit(uid);
        //发送图片请求  传递后台
        classPost.sendImg(params)
          .then(res => {

          })
          .catch(res => {

          })
      },
      //上传图片之前操作
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      setChat() {
        const _this = this;
        _this.chatShow = false;
      }
    },
    created() {
      const _this = this;
      //初始化聊天窗口
      _this.connectInit();
      // ws连接心跳
      _this.line();
      //获取页面的高度
      // _this.initHeight = document.body.scrollHeight;
      // console.log(_this.initHeight);
    },
    mounted() {

    }
  }

</script>
<style scoped>
  @import '../assets/css/char.css';
</style>