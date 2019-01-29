<template>
  <div class="login" :style="img">
  	<div id="canvasName" style="position: absolute;z-index: 5;height:945px;top:300px;left:0;overflow: hidden;"></div>
    <div class="Title">
      <img :src="imgsrc" alt="">
    </div>
    <div class="starry-sky">
      <canvas  id="canvas"></canvas>
    </div>
    <div class="login_box_box">
	    <div class="login_box">
	      <div class="input-o">
	      	<i></i>
	        <input type="text" @keyup.enter="loginBtn" placeholder="请输入手机号" class="user" v-model="phonenumber" onpaste="return false">
	      </div>
	      <div class="input-t">
	      	<i></i>
	        <input type="password" @keyup.enter="loginBtn"  autocomplete="on" placeholder="密码（6-20位，区分大小写）" class="password" v-model="password" onpaste="return true">
	      </div>
	
	      <input type="button" name="登录" value="登录" class="login_btn" id="goin" :class="btndefault?'sure':'sureblue'" v-on:keyup.enter="loginBtn" @click="loginBtn">
	      <!--<p class="passwordRite">忘记密码</p>-->
	    </div>
	    <!--<div>登录超时或链接异常，请您再次尝试或反馈至反馈至sinan@jieyuechina.com<br>我们将，我们将尽快解决</div>-->
    </div>
    
    <div class="bgDetail">捷越司南 后台管理系统 v1.3.0   　如有疑问，请联系邮箱：sinan@jieyuechina.com <span style="text-indent: 30px;margin-left:30px;">官网地址：bi.jieyuechina.com</span></div>
  </div>
</template>
<!--@click="loginBtn1"-->
<script>
import Toast from "../toast/toast.js";
import loginBg from "../common/loginBg.js";
import md5 from "js-md5";
import { mapState, Router } from "vuex";
import api from "../api";
//import Axios from '@/utils/diyaxios'
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      phonenumber: "",
      password: "",
      //pid:'',
      //phoneVersion:'',
      phoneMaxLength: 11,
      showdele: false,
      pwdDefault: true,
      pwdType: "password",
      btnback: true,
      btndefault: true,
      imgsrc: require("../assets/images/Group463.png"),
      flag: "",
      img: {
        background:
          "url(" +
          require("../assets/images/loginBg.jpg") +
          ")  no-repeat fixed 0 0/100% 100%"
      },
      animateTimer: null
    };
  },
  computed: {
    /* ...mapState(['deviceinfo']),*/
  },
  created: function() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userid");
    sessionStorage.removeItem("taskHandListType");

    if (sessionStorage.getItem("userPhone")) {
      var numbers = sessionStorage.getItem("userPhone");
      var pre = numbers.substring(0, 3);
      var last = numbers.substring(3, 7);
      var lasts = numbers.substring(7, 11);
      numbers = pre + " " + last + " " + lasts;
      this.phonenumber = numbers;
    }
    /*    	if(sessionStorage.getItem("userPassword")){
    		this.password=sessionStorage.getItem("userPassword");
    	}*/
    let phone = this.phonenumber.replace(/\s/gi, "");

    if (
      /^1[345678]\d{9}$/.test(phone) &&
      this.password.length >= 6 &&
      this.password.length <= 20 &&
      this.phonenumber.length == 13
    ) {
      this.btndefault = false;
    } else {
      this.btndefault = true;
    }
  },
  mounted() {
    var box = document.getElementById("canvasName");
    loginBg.bg(box);
    let phone = this.phonenumber.replace(/\s/gi, "");

    if (
      /^1[345678]\d{9}$/.test(phone) &&
      this.password.length >= 6 &&
      this.password.length <= 20 &&
      this.phonenumber.length == 13
    ) {
      this.btndefault = false;
    } else {
      this.btndefault = true;
    }
  },
  destroyed() {
    clearInterval(this.animateTimer);
  },
  methods: {
    ...mapActions(["stateRouter"]),
    loginBtn() {
      var vm = this;
      let phonenumber = this.phonenumber;
      let pwd = this.password;

      if (!phonenumber) {
        Toast({
          message: "请输入手机号",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (!pwd) {
        Toast({
          message: "请输入密码",
          position: "middle",
          duration: 2000
        });
        return;
      }
      var phone = this.phonenumber.replace(/\s/gi, "");
      if (!this.btndefault) {
        //TODO 调登录接口
        axios
          .post(api.login(), {
            phone: phone,
            pwd: md5(vm.password),
            flag: vm.flag,
            type: 1
          })
          .then(res => {
            if (res.data.code == 200) {
              Toast({ message: "登录成功", duration: 1000 });
              let token = res.data.data.token;
              localStorage.removeItem("userid");
              localStorage.setItem("userName", res.data.data.userName);
              //vm.$store.dispatch('saveUserid', token);
              sessionStorage.removeItem("state");
              sessionStorage.setItem("state", "2-1");
              this.stateRouter("2-1");
              localStorage.setItem("userid", token);

              sessionStorage.setItem("userPhone", phone);
              /*sessionStorage.setItem("userPassword",this.password);*/

              var storage = localStorage;
              var Authorization = storage.getItem("userid");
              axios.defaults.headers.common["Authorization"] = Authorization;

              this.$router.push({ path: "/saas" });
            } else if (res.data.code == 407) {
              //被踢出登录，返回登录页
              this.$router.push("/Login");
              if (window.webkit) {
                window.webkit.messageHandlers.deleteUserId.postMessage({
                  type: "2",
                  userId: ""
                });
              }
            } else if(res.data.code == 500){
            	this.$message({
                message: '登录超时或链接异常，请您再次尝试或反馈至反馈至sinan@jieyuechina.com，我们将尽快解决',
                duration: "0",
                type: "warning"
              });
            }else {
              this.$message({
                message: res.data.msg,
                duration: "1500",
                type: "warning"
              });
            }
          })
          .catch(function(err) {
            // 请求失败
            console.log("请求失败");
          });
      }
    }
  },

  watch: {
    password: function(val, oldval) {
      let phone = this.phonenumber.replace(/\s/gi, "");
      if (/[ ]/.test(val)) {
        this.btndefault = true;
        Toast("密码不能为空格");
        this.password = "";

        return false;
      }
      if (/^1[345678]\d{9}$/.test(phone) && this.phonenumber.length == 13) {
      } else if (this.phonenumber == "" && this.password == "") {
      } else {
        Toast({ message: "请输入正确手机号" });
        this.password = "";
      }
      if (
        /^1[345678]\d{9}$/.test(phone) &&
        val.length >= 6 &&
        val.length <= 20 &&
        this.phonenumber.length == 13
      ) {
        this.btndefault = false;
        return false;
      } else {
        this.btndefault = true;
      }
    },
    phonenumber: function(val, oldval) {
      let phone = this.phonenumber.replace(/\s/gi, "");
      if (val) {
        this.showdele = true;
      } else {
        this.showdele = false;
      }
      if (this.phonenumber == "") {
        this.password = "";
      }

      if (/^1[345678]\d{9}$/.test(val) && this.password.length >= 6) {
        // alert("手机号码密码正确了请登录");
        this.btndefault = false;
        return false;
      } else {
        this.btndefault = true;
      }
      if (
        this.password.length >= 6 &&
        val.length == 13 &&
        /^1[345678]\d{9}$/.test(phone)
      ) {
        this.btndefault = false;
        return false;
      } else {
        this.btndefault = true;
      }
      if (val > oldval) {
        if (val.length === 4 || val.length === 9) {
          var pre = val.substring(0, val.length - 1);
          var last = val.substr(val.length - 1, 1);
          this.phonenumber = pre + " " + last;
        } else {
          this.phonenumber = val;
        }
      } else {
        if (val.length === 9 || val.length === 4) {
          this.phonenumber = this.phonenumber.trim();
        } else {
          this.phonenumber = val;
        }
      }
      if (val.length > 13) {
        this.phonenumber = oldval;
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.login {
  width: 100vw;
  height: 100vh;
  min-width: 420px;
  overflow: hidden;
  position: relative;
  background-size: cover !important;
}
.starry-sky {
  width: 100%;
  height: 100%;
}
#canvas {
  display: block;
  margin: 0 auto;
}
.Title img {
  position: absolute;
  left: 50%;
  top: 29%;
  margin-left: -190px;
}
.login_box_box {
  width: 510px;
  height: 380px;
  position: absolute;
  left: 50%;
  top: 35%;
  z-index: 10;
  margin-left: -255px;
}
.login_box {
  width: 510px;
  height: 350px;
  background: -webkit-radial-gradient(#073984, #0b3d88, #11408d);
  border-radius: 4px;
  text-align: center;
  border: 1px solid #0057b3;
  box-shadow: 2px 6px 12px 2px rgba(0, 0, 0, 0.1);
}
.input-o {
  width: 80%;
  height: 50px;
  margin-top: 60px;
  margin-left: 48px;
  position: relative;
}
.input-o i {
  display: block;
  background: url(../assets/images/icon/userName.png) no-repeat center center;
  background-size: 20px 20px;
  position: absolute;
  left: 20px;
  top: 0;
  height: 50px;
  width: 50px;
}
.input-t {
  width: 80%;
  height: 50px;
  margin-top: 30px;
  margin-left: 48px;
  position: relative;
}
.input-t i {
  display: block;
  background: url(../assets/images/icon/password.png) no-repeat center center;
  background-size: 20px 20px;
  position: absolute;
  left: 20px;
  top: 0;
  height: 50px;
  width: 50px;
}
.user {
  width: 80%;
  height: 50px;
  font-size: 16px;
  border: none;
  padding-left: 50px;
  border: 1px solid #62a5ff;
  background-color: transparent !important;
  outline: none;
  border-radius: 30px;
  color: #fff;
}
.password {
  width: 80%;
  height: 50px;
  border: none;
  padding-left: 50px;
  font-size: 16px;
  border: 1px solid #62a5ff;
  background-color: transparent !important;
  outline: none;
  color: white;
  border-radius: 30px;
}
.password:focus,
.user:focus {
  outline: none !important;
  border: 1px solid #def1ff;
  color: #fff;
}
.password::-webkit-input-placeholder,
.user::-webkit-input-placeholder {
  color: #4a6fa6;
}
.password:-webkit-autofill,
.user:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
.login_btn {
  width: 75%;
  height: 15%;
  margin-top: 50px;
  border: none;
  color: #b0d1fc;
  background: #174990;
  border-radius: 30px;
  margin-left: 3px;
  border: 1px solid #336fc0;
  letter-spacing: 6px;
  outline: none;
}
.goBack {
  width: 56px;
  height: 1px;
  position: absolute;
  right: 355px;
  top: 34px;
  color: #ffffff;
  font-size: 14px;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
.bgDetail {
  text-align: center;
  color: #6894d4;
  font-size: 14px;
  height: 35px;
  width: 100%;
  position: absolute;
  z-index: 99;
  line-height: 35px;
  background-color: rgba(17, 24, 94, 0.1);
  bottom: 0;
}
.sureblue {
  background: #2c94d6;
  cursor: pointer;
}
</style>


