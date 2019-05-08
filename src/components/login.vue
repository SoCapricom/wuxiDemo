<template>
  <div>
    <div class="loginBg">
      <div class="loginBox">
        <div class="logoBox"><img src="../assets/images/login-logo.png" alt=""></div>
        <p class="tc loginTit">登录</p>
        <div class="inputWrap">
          <input type="text" id="userName" v-model="userName" class="inputStyle userIcon" placeholder="请输入您的账号">
          <input type="password" id="password" v-model="passWord" class="inputStyle passwIcon" placeholder="请输入您的密码">
          <div class="clearfix">
            <router-link to=""></router-link>
            <a href="javascript:;" class="fl blueButton tc f14" @click="login()">登录</a>
            <a href="javascript:;" class="fr f14 grayButton tc" @click="cancel()">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import { postAjaxQ, getAjaxQ } from "../api/api.js";
export default {
  name: "login",
  data() {
    return {
      userName: "",
      passWord: "",
      token: "",
      AuthJson: ""
    };
  },
  methods: {
    cancel() {
      (this.userName = ""), (this.passWord = "");
    },
    //表单验证
    login() {
      var reg = new RegExp(/^[A-Za-z0-9]+$/); //字母或数字
      let userName = document.getElementById("userName");
      let password = document.getElementById("password");
      if (userName.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$Message.info("账号不可为空！");
        userName.focus();
      } else if (userName.value.length < 5 || userName.value.length > 18) {
        this.$Message.info("账号长度在5-18位之间！");
      } else if (!reg.test(userName.value)) {
        this.$Message.info("账号为字母或数字的组合！");
      } else if (password.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$Message.info("密码不可为空！");
        password.focus();
      } else if (password.value.length < 6 || userName.value.length > 18) {
        this.$Message.info("密码长度在6-18位之间！");
      } else if (!reg.test(password.value)) {
        this.$Message.info("密码为字母或数字的组合！");
      } else {
        this.$Ajax({
          method:'POST',
          url:'/sys/login',
          params:{
            "username":this.userName,
            "password":this.passWord
          }
        })
        // let params = {
        //   username: this.userName,
        //   password: this.passWord
        // };
        // postAjaxQ("/sys/login", { params })
          .then(response => {
            // debugger;
            // alert( response.data.jwt_token)
            // localStorage.setItem("jwt_token", response.data.jwt_token);
            // localStorage.setItem("auth_json", response.data.auth_json);
            // console.log(response.data.auth_json)
            localStorage.setItem(
              "userName",
              document.getElementById("userName").value
            );
            if (response.data.code == 200) {
              // alert('0000')
              this.$router.push({ path: "/BusinessData" });
            } else {
              this.$Message.info(response.data.msg);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
.loginBg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/loginBg.jpg");
  background-size: 100% 100%;
}
.loginBox {
  width: 605px;
  height: 498px;
  border-radius: 4px;
  background: url("../assets/images/loginBoxBg.png") no-repeat center;
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -249px 0 0 -312px;
}
.logoBox {
  width: 108px;
  height: 30px;
  margin: 45px 0 0 45px;
}
.loginTit {
  font-size: 26px;
  padding: 55px 0 30px 0;
  color: #333;
}
.inputWrap {
  width: 340px;
  margin: 0 auto;
}
.inputStyle {
  display: block;
  width: 330px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px 0 53px;
  margin: 0 auto 20px;
  border-radius: 25px;
  box-shadow: 1px 2px 6px #cbcbcb inset;
  border: none;
  font-size: 14px;
}
.userIcon {
  background: #f9f9f9 url("../assets/images/userIcon.png") no-repeat 13px center;
}
.passwIcon {
  background: #f9f9f9 url("../assets/images/passw.png") no-repeat 15px center;
}
.blueButton {
  width: 160px;
  height: 40px;
  line-height: 40px;
  background: #2299ee;
  color: #fff;
  border-radius: 20px;
}
.grayButton {
  width: 160px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #999999;
  margin-right: 5px;
  border-radius: 20px;
}
</style>
