<template>
  <div id="app" class="clear">
    <!-- 聊天系统 -->
    <!-- <chat-vue></chat-vue> -->
    <!-- 聊天系统结束 -->
    <!-- 导航开始 -->
    <div class="firstScreen" ref="firstScreen">
      <!-- 固定定位 -->
      <nav class="clear">
        <div class="fl">
          <img src="../assets/images/logo.png" alt="VIP陪练">
        </div>
        <div class="fr">
          <div>400-6060-854</div>
        </div>
        <div class="center">
          <ul class="clear">
            <li @click="setShow(1)">
              <a :class="{'showA':showNum1}" href="#">首页</a>
              <span :class="{'show':showNum1}"></span>
            </li>
            <li @click="setShow(2)">
              <a :class="{'showA':showNum2}" href="#instruct">教学模式</a>
              <span :class="{'show':showNum2}"></span>
            </li>
            <li @click="setShow(3)">
              <a :class="{'showA':showNum3}" href="#teacherForce">师资力量</a>
              <span :class="{'show':showNum3}"></span>
            </li>
            <li @click="setShow(4)">
              <a :class="{'showA':showNum4}" href="#intimateService">贴心服务</a>
              <span :class="{'show':showNum4}"></span>
            </li>
            <li @click="setShow(5)">
              <a :class="{'showA':showNum5}" href="#collabArtist">合作艺术家</a>
              <span :class="{'show':showNum5}"></span>
            </li>
            <li @click="setShow(6)">
              <a :class="{'showA':showNum6}" href="#investor">投资人推荐</a>
              <span :class="{'show':showNum6}"></span>
            </li>
          </ul>
        </div>
      </nav>
      <!-- banner区域 -->
      <div class="banner clearfix">
        <el-carousel :interval="5000" arrow="always">
          <!-- 第一张 -->
          <el-carousel-item>
            <!-- <h3>{{ item }}</h3> -->
            <div class="pic fl">
              <div class="lecture"></div>
              <div class="bookList"></div>
              <!-- <div class="circleWhite"></div> -->
            </div>
          </el-carousel-item>
          <!-- 第二张 -->
          <el-carousel-item>
            <div class="pic fl">
              <div class="lecture"></div>
              <div class="bookList"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="topbg"></div>
      </div>
      <!-- banner结束 -->
      <!-- 表单验证开始 -->
      <div class="form fr" v-show="closeForm" ref="form">
        <div class="closeForm fr" v-show="closeBtn" @click="closeFormBar"></div>
        <div>免费领取<span>50分钟1对1</span>体验课程</div>
        <div>
          <input type="text" name="childName" @keyup="childName" placeholder="请输入您孩子的名字" v-model="userName">
        </div>
        <div>
          <!-- <span @click="CountryShow" class="form-span">
            <span>^</span> +86</span> -->
          <input type="text" v-model="mobilePhone" name="phoneNum" @keyup="userPhoneName" placeholder="请输入您的手机号码">
        </div>
        <!-- <ul v-show="CountShow" @click="CountryShow" id="countryId">
          <li @click="countryArea('+86')">+86 <span>中国</span></li>
          <li @click="countryArea('+1')">+1 <span>加拿大</span></li>
          <li @click="countryArea('+1')">+1 <span>美国</span></li>
          <li @click="countryArea('+7')">+7 <span>俄罗斯</span></li>
          <li @click="countryArea('+33')">+33 <span>法国</span></li>
          <li @click="countryArea('+44')">+44 <span>英国</span></li>
          <li @click="countryArea('+49')">+49 <span>德国</span></li>
          <li @click="countryArea('+61')">+61 <span>澳大利亚</span></li>
          <li @click="countryArea('+64')">+64 <span>新西兰</span></li>
          <li @click="countryArea('+65')">+65 <span>新加坡</span></li>
          <li @click="countryArea('+81')">+81 <span>日本</span></li>
          <li @click="countryArea('+82')">+82 <span>韩国</span></li>
          <li @click="countryArea('+852')">+852 <span>香港 (中华人民共和国)</span></li>
          <li @click="countryArea('+853')">+853 <span>澳门 (中华人民共和国)</span></li>
          <li @click="countryArea('+886')">+886 <span>台湾</span></li>
          <li @click="countryArea('+966')">+966 <span>沙特阿拉伯</span></li>
          <li @click="countryArea('+971')">+971 <span>阿拉伯联合酋长国</span></li>
        </ul> -->
        <div>
          <input type="text" @keyup="verificationCode" name="msgNum" placeholder="请输入短信验证码" v-model="SMSCodes"><button class="form-span"
            :class="{'gray':disable}" @click="SMScode" :disabled="disable">{{waitVal}}</button>
        </div>
        <div>
          <button @click="userRegister" :class="{'gray':successBg}" :disabled="regDisabled">立即领取</button>
        </div>
        <div>
          <span>{{promptInformation}}</span>
        </div>
      </div>
      <!-- 表单验证结束 -->
    </div>
    <!-- 中间部分开始 -->
    <section class="content-bg">
      <section class="content">
        <!-- 教学模式 -->
        <div id="instruct"></div>
        <div class="vipIntroduce clear">
          <div class="box-left fl">
            <img class="header-img" src="../assets/images/instruction.jpg" alt="">
            <img class="time-img" src="../assets/images/twentyFive.png" alt="">
            <img class="time-img" src="../assets/images/fifty.png" alt="">
          </div>
          <div class="box-right fr">
            <!-- 视频播放器 -->
            <div class="video-show">
              <div class="autoPlay" v-show="autoPlayShow" @click="autoPlays"></div>
              <div class="videoBg" v-show="videoBgShow">
                <!-- <img src="../assets/images/videoBgs.png" /> -->
              </div>
              <div class="video">
                <video controls src="http://o7ex1jsur.bkt.clouddn.com/web.mp4" ref="videoPlay"></video>
              </div>
              <!-- 视频介绍 -->
              <div class="video-intro clear">
                <img class="fl" src="../assets/images/yourSystem.png" />
                <img class="fr" src="../assets/images/senceTime.png" />
              </div>
              <!-- 视频背景 -->
              <div class="video-bg"></div>
            </div>
          </div>
        </div>
        <!-- VIP陪练? -->
        <div class="training_partner clearfix">
          <div class="training_title"><img src="../assets/images/whyPei.jpg" /></div>
          <ul>
            <li><img @mouseover="overImg(1)" @mouseleave="leaveImg(1)" :src="img1" /></li>
            <li><img @mouseover="overImg(2)" @mouseleave="leaveImg(2)" :src="img2" /></li>
            <li><img @mouseover="overImg(3)" @mouseleave="leaveImg(3)" :src="img3" /></li>
            <li><img @mouseover="overImg(4)" @mouseleave="leaveImg(4)" :src="img4" /></li>
            <li><img @mouseover="overImg(5)" @mouseleave="leaveImg(5)" :src="img5" /></li>
            <li><img @mouseover="overImg(6)" @mouseleave="leaveImg(6)" :src="img6" /></li>
            <!-- <li><img src="../assets/images/picList2.jpg" /></li>
            <li><img src="../assets/images/picList3.jpg" /></li>
            <li><img src="../assets/images/picList4.jpg" /></li>
            <li><img src="../assets/images/picList5.jpg" /></li>
            <li><img src="../assets/images/picList6.jpg" /></li> -->
          </ul>
        </div>
        <!-- 师资力量 -->
        <div class="teacher_resources">
          <div id="teacherForce"></div>
          <div class="teacher_title fl"><img src="../assets/images/teacherTittle.jpg" /></div>
          <div class="teacher_force clear">
            <img src="../assets/images/teacherForce.jpg" />
          </div>
        </div>
        <!-- 贴心服务 -->
        <div class="service_force">
          <div id="intimateService"></div>
          <div class="server_title"><img src="../assets/images/severTittle.jpg" /></div>
          <div class="adviser"><img src="../assets/images/adviser.png" /></div>
          <div class="promise"><img src="../assets/images/VIPPromise.png" /></div>
        </div>
        <!-- 合作艺术家 -->
        <div class="cooperate">
          <div id="collabArtist"></div>
          <div class="collab_ttitle"><img src="../assets/images/collabTittle.jpg" /></div>
        </div>
        <div class="collab_content">
          <div class="licong"> <img src="../assets/images/lichong.jpg" /></div>
          <div class="full"><img src="../assets/images/jiaran.jpg" /></div>
          <div class="full"><img src="../assets/images/songsiheng.jpg" /></div>
          <div class="full"><img src="../assets/images/sunyindi.jpg" /></div>
          <div class="full"><img src="../assets/images/chenjie.jpg" /></div>
          <div class="full"><img src="../assets/images/tangjin.jpg" /></div>
          <div class="full"><img src="../assets/images/xueyinjia.jpg" /></div>
        </div>
        <!-- 投资人推荐 -->
        <div class="investor">
          <div id="investor"></div>
          <div class="investor_tittle"><img src="../assets/images/investorTitile.jpg" alt=""></div>
          <div class="investor_content">
            <img src="../assets/images/luobing.jpg" />
            <img src="../assets/images/wujiajie.jpg" />
            <img src="../assets/images/wanggongbing.jpg" />
          </div>
        </div>
      </section>
    </section>
    <footer>
      <div class="top clear">
        <div class="left fl"></div>
        <div class="right fr">
          <div class="top">
            <p>VIP陪练</p>
            <p>成立于2014年，公司成立以来，我们一直专注于解决5-16岁青少年的练琴问题，以“孩子练琴错音少，陪练效果好”为目标而努力。3年来，VIP陪练的服务质量获得大量家长认可，同时也获得了顶级风头机构的青睐，业务正在迅猛成长中。</p>
          </div>
          <div class="center">
            <p>学生端APP下载</p>
            <div class="phoneImg clear">
              <div class="iphone fl"><a target="_blank" href="https://itunes.apple.com/cn/app/vip陪练-学生端/id1174747377?mt=8"></a></div>
              <div class="android fl"><a target="_blank" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pnlyy.pnlclass.pnlclass_student"></a></div>
            </div>
          </div>
          <div class="bottom clear">
            <div class="left fl">
              <p>扫描右侧二维码可关注VIP陪练公众号</p>
              <p>客服电话 &nbsp;&nbsp;&nbsp;&nbsp;400-6060-854</p>
              <p>公司地址 &nbsp;&nbsp;&nbsp;&nbsp;上海市杨浦区凤城巷5号201室</p>
              <p>联系邮箱 &nbsp;&nbsp;&nbsp;&nbsp;hr@pnlyy.com</p>
            </div>
            <div class="right fr"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div></div>
        <p><a target="_blank" href="http://www.miitbeian.gov.cn/">沪ICP备15001014号-1版权所有©2017 上海妙克信息科技有限公司</a>
        </p>
      </div>
    </footer>
    <!-- 侧边显示的电话及注册框 -->
    <div class="sideBar" v-if="sideMes">
      <div class="consultation">
        <div class="sidePhone">400-6060-854</div>
      </div>
      <div class="freeClass" @click="openRegister"></div>
    </div>
  </div>
</template>

<script>
  const util = require("../util/util.js");
  import Vue from 'vue';
  import classPost from "../service/test.js";
  import { Carousel, CarouselItem } from 'element-ui';
  Vue.component(Carousel.name, Carousel);
  Vue.component(CarouselItem.name, CarouselItem);
  const rem = require("../util/rem");
  let randomStr = "";
  export default {
    data() {
      return {
        // 显示国家列表
        CountShow: false,
        areaCount: '+86',
        mobilePhone: "",
        //验证码
        SMSCodes: "",
        userName: "",
        promptInformation: "请输入用户信息",
        // 视频播放按钮
        autoPlayShow: true,
        // 倒计时时间
        waitVal: "获取验证码",
        //禁用按钮
        disable: false,
        // 成功之后的回调
        successBg: false,
        //视频背景显示隐藏
        videoBgShow: true,
        //关闭注册框
        closeForm: true,
        //关闭按钮
        closeBtn: false,
        //侧边
        sideMes: false,
        //注册按钮禁用
        regDisabled:false,
        // 导航下划线显示隐藏
        showNum1: true,
        showNum2: false,
        showNum3: false,
        showNum4: false,
        showNum5: false,
        showNum6: false,
        //VIP陪练
        img1: "../../static/images/picList1.jpg",
        img2: "../../static/images/picList2.jpg",
        img3: "../../static/images/picList3.jpg",
        img4: "../../static/images/picList4.jpg",
        img5: "../../static/images/picList5.jpg",
        img6: "../../static/images/picList6.jpg",
      }
    },
    name: 'app',
    methods: {
      //页面返回到顶部
      backIndex() {
        document.body.scrollTop = 0;
      },
      //检测屏幕高度,设置第一屏的高度
      firstHeight() {
        const _this = this;
        let height = document.documentElement.clientHeight;
        _this.$refs.firstScreen.style.height = height + "px";
      },
      //侧边打开注册框
      openRegister() {
        const _this = this;
        _this.$refs.form.style.zIndex = 1003;
        _this.$refs.form.style.marginRight = '80px';
        _this.closeBtn = true;
        if (_this.closeForm == true) {
          _this.closeForm = false;
        } else {
          _this.closeForm = true;
        }
      },
      //判断导航栏的显示隐藏
      setShow(show) {
        const _this = this;
        switch (show) {
          case 1:
            _this.showNum1 = true;
            _this.showNum2 = false;
            _this.showNum3 = false;
            _this.showNum4 = false;
            _this.showNum5 = false;
            _this.showNum6 = false;
            break;
          case 2:
            _this.showNum1 = false;
            _this.showNum2 = true;
            _this.showNum3 = false;
            _this.showNum4 = false;
            _this.showNum5 = false;
            _this.showNum6 = false;
            break;
          case 3:
            _this.showNum1 = false;
            _this.showNum2 = false;
            _this.showNum3 = true;
            _this.showNum4 = false;
            _this.showNum5 = false;
            _this.showNum6 = false;
            break;
          case 4:
            _this.showNum1 = false;
            _this.showNum2 = false;
            _this.showNum3 = false;
            _this.showNum4 = true;
            _this.showNum5 = false;
            _this.showNum6 = false;
            break;
          case 5:
            _this.showNum1 = false;
            _this.showNum2 = false;
            _this.showNum3 = false;
            _this.showNum4 = false;
            _this.showNum5 = true;
            _this.showNum6 = false;
            break;
          case 6:
            _this.showNum1 = false;
            _this.showNum2 = false;
            _this.showNum3 = false;
            _this.showNum4 = false;
            _this.showNum5 = false;
            _this.showNum6 = true;
            break;
        }
      },
      //经过替换图片
      overImg(num) {
        const _this = this;
        switch (num) {
          case 1:
            _this.img1 = "../../static/images/picList11.jpg";
            break;
          case 2:
            _this.img2 = "../../static/images/picList22.jpg";
            break;
          case 3:
            _this.img3 = "../../static/images/picList33.jpg";
            break;
          case 4:
            _this.img4 = "../../static/images/picList44.jpg";
            break;
          case 5:
            _this.img5 = "../../static/images/picList55.jpg";
            break;
          case 6:
            _this.img6 = "../../static/images/picList66.jpg";
            break;
        }
      },
      //离开替换图片
      leaveImg(num) {
        const _this = this;
        switch (num) {
          case 1:
            _this.img1 = "../../static/images/picList1.jpg";
            break;
          case 2:
            _this.img2 = "../../static/images/picList2.jpg";
            break;
          case 3:
            _this.img3 = "../../static/images/picList3.jpg";
            break;
          case 4:
            _this.img4 = "../../static/images/picList4.jpg";
            break;
          case 5:
            _this.img5 = "../../static/images/picList5.jpg";
            break;
          case 6:
            _this.img6 = "../../static/images/picList6.jpg";
            break;
        }
      },
      //关闭注册框
      closeFormBar() {
        const _this = this;
        _this.closeForm = false;
      },
      //播放按钮隐藏 播放视频
      autoPlays() {
        const _this = this;
        console.log(_this.$refs.videoPlay);
        _this.$refs.videoPlay.play();
        _this.autoPlayShow = false;
        _this.videoBgShow = false;
      },
      //获取cookie中的randomStor值
      setRandomStr() {
        const _this = this;
        //检测有没有20位唯一字符串
        if (!util.getCookie("randomStr")) {
          randomStr = util.randomStr();
          document.cookie = "randomStr=" + randomStr;
        } else {
          randomStr = util.getCookie("randomStr");
        }
      },
      CountryShow() {
        const _this = this;
        _this.CountShow == true ? _this.CountShow = false : _this.CountShow = true;
      },
      //区号
      countryArea(areaCount) {
        const _this = this;
        _this.areaCount = areaCount;
        // console.log(_this.areaCount);
      },
      // 短信验证码
      SMScode() {
        const _this = this;
        if (_this.userName.trim() == "") {
          _this.promptInformation = "请填写用户名称";
          return false;
        } else {
          _this.promptInformation = "";
        }
        //正则验证法手机号
        if (!/^[0-9]\d{10}$/.test(_this.mobilePhone.trim())) {
          _this.promptInformation = "请填写正确的手机号";
          return false;
        } else {
          _this.promptInformation = "";
        }

        //定时器禁用按钮 
        _this.setTime();
        let params = { mobile: _this.mobilePhone, area: _this.areaCount };
        classPost.getSMScode(params)
          .then(res => {
            // if (res.data.code != 200) {
            //   console.log("用户已经注册");
            //   //  console.log(res.data);
            // }
          })
          .catch(res => {
            _this.promptInformation = res.data.message;
            _this.successBg=true;
            _this.regDisabled=true;
          })
      },
      //验证用户名
      childName() {
        const _this = this;
        if (_this.userName.trim() == "") {
          _this.promptInformation = "请填写用户名称";
        } else {
          _this.promptInformation = "";
        }
      },
      //倒计时功能
      setTime() {
        const _this = this;
        let wait = 60;
        const times = (() => {
          if (wait == 0) {
            _this.disable = false;
            wait = 60;
            _this.waitVal = "获取验证码"
          } else {
            _this.disable = true;
            _this.waitVal = wait + "s后再试";
            wait--;
            setTimeout(function () {
              times();
            }, 1000)
          }
        })
        times()
      },
      //验证手机号码
      userPhoneName() {
        const _this = this;
        //正则验证法手机号
        if (!/^[0-9]\d{10}$/.test(_this.mobilePhone.trim())) {
          _this.promptInformation = "请填写正确的手机号";
        } else {
          _this.promptInformation = "";
        }
      },
      //验证码验证
      verificationCode() {
        const _this = this;
        if (_this.SMSCodes.trim() == "") {
          _this.promptInformation = "请填写验证码";
        } else {
          _this.promptInformation = "";
        }
      },
      // 注册功能
      userRegister() {

        const _this = this;
        //判断用户名称
        if (_this.userName.trim() == "") {
          _this.promptInformation = "请填写用户名称";
          return false;
        } else {
          _this.promptInformation = "";
        }
        //正则验证法手机号
        if (!/^[0-9]\d{10}$/.test(_this.mobilePhone.trim())) {
          _this.promptInformation = "请填写正确的手机号";
          return false;
        } else {
          _this.promptInformation = "";
        }
        //判断验证码
        if (_this.SMSCodes.trim() == "") {
          _this.promptInformation = "请填写验证码";
        } else {
          _this.promptInformation = "";
        }

        let params = { name: _this.userName.trim(), area: _this.areaCount, code: _this.SMSCodes.trim(), phone: _this.mobilePhone.trim(), cookie: util.getCookie("randomStr") };
        console.log(params);
        classPost.userRegisters(params)
          .then(res => {
            _this.promptInformation = "注册成功";
            _this.userName = "";
            _this.mobilePhone = "";
            _this.SMSCodes = "";
            _this.formShow = false;
            _this.successPage = true;
            _this.successBg = true;
            //请求成功返回首页
            location.href = "/success";
          })
          .catch(res => {
            // if (res.data.code == 1003) {
            //   _this.promptInformation = res.data.message;
            // }
            // else if (res.data.code == 403)
            //   _this.promptInformation = "当前手机号已被注册";
            if(res.data.code!=200){
              _this.promptInformation = res.data.message;
              _this.regDisabled=true;
              // _successBg=true;
            }
          })
      },
      //监听页面卷去的高度
      scrollListen() {
        const _this = this;
        window.onscroll = function () {
          if (document.documentElement.scrollTop >= document.documentElement.clientHeight) {
            _this.sideMes = true;
            _this.$refs.form.style.marginRight = '0';
            _this.closeForm = false;
          } else {
            _this.sideMes = false;
            _this.closeForm = true;
            _this.$refs.form.style.zIndex = 99;
            _this.closeBtn = false;
          }
        }
      }
    },
    created() {
      const _this = this;
      // 检测20位字符串 不存在则生成存入cookie
      _this.setRandomStr();
    },
    components: {
      // ChatVue
    },
    mounted() {
      const _this = this;
      // 设置第一屏的高度
      _this.firstHeight();
      //返回顶部
      _this.backIndex();
      //监听页面卷去的高度
      _this.scrollListen();
    }
  }

</script>
<style scoped>
  @import '../assets/css/index.css';
</style>
