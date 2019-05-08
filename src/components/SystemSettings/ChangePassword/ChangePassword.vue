<template>

    <div class="loginBox bg_white">
      <p class="loginTit">密码修改</p>
      <div class="inputWrap">
        <div class="clearfix">
          <span class="inputTag fl tr">原密码</span>
          <input id="oldPassword"  v-model="oldPassword" type="password" class="inputStyle passwIcon fl">
        </div>
        <p class="tips"> 密码由6-18位字符或数字组成</p>
        <div class="clearfix">
          <span class="inputTag fl tr">新密码</span>
          <input id="newPassword"  v-model="newPassword" type="password" class="inputStyle passwIcon fl">
        </div>
        <p class="tips"> 密码由6-18位字符或数字组成</p>
        <div class="clearfix">
          <span class="inputTag fl tr">确认密码</span>
          <input id="confirmPassword" v-model="confirmPassword" type="password" class="inputStyle passwIcon fl">
        </div>
        <p class="tips"> 密码由6-18位字符或数字组成</p>
        <div class="clearfix">
          <a href="javascript:;" @click="cancel()" class="f14 grayButton fl tc">取消</a>
          <a href="javascript:;" @click="savePassword()" class="blueButton tc f14 fl ml10">保存</a>
        </div>
      </div>
    </div>
</template>
<script>
import { postAjaxQ, getAjaxQ} from "../../../api/api.js";
  export default {
    name: 'changePassword',
    data(){
      return{
        userId:27,
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      }
    },
    methods:{
      //表单验证
      savePassword(){
        var reg = new RegExp(/^[A-Za-z0-9]+$/);//字母或数字
        let oldPassword=document.getElementById('oldPassword');
        let newPassword=document.getElementById('newPassword');
        let confirmPassword=document.getElementById('confirmPassword');
        if(oldPassword.value.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$Message.info('原密码不可为空！');
          oldPassword.focus();
        }else if (oldPassword.value.length<6||oldPassword.value.length>18){
          this.$Message.info('原密码长度在6-18位之间！');
          oldPassword.focus();
        }
        else if(!(reg.test(oldPassword.value))) {
          this.$Message.info('原密码为字母或数字的组合！');
          oldPassword.focus();
        }
        else if(newPassword.value.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$Message.info('新密码不可为空！');
          newPassword.focus();
        }
        else if (newPassword.value.length<6||newPassword.value.length>18){
          this.$Message.info('新密码长度在6-18位之间！');
          newPassword.focus();
        }
        else if(!(reg.test(newPassword.value))) {
          this.$Message.info('新密码为字母或数字的组合！');
          newPassword.focus();
        }
        else if(confirmPassword.value.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$Message.info('请填写确认密码！');
          newPassword.focus();
        }
        else if(confirmPassword.value!=newPassword.value) {
          this.$Message.info('密码输入不一致，请重新输入!');
          confirmPassword.focus();
        }else {
          // this.$Ajax({
          //   method:'POST',
          //   url:'/sys/changepassword',
           
          // })
           let params={
              userid:this.userId,
              oldpsd:this.oldPassword,
              newpsd:this.newPassword
            }
          postAjaxQ('/sys/changepassword',{params})
            .then((response) => {
            console.log(response)
          this.$Message.success('操作成功！');
        }).catch(error => {
            console.log(error);
        })
        }
      },
      cancel(){
        this.oldPassword='';
        this.newPassword='';
        this.confirmPassword='';
      }
    }
  }
</script>
<style scoped>
  .loginBox{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .loginTit{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    text-indent: 25px;
  }
  .tips{
    height: 36px;
    line-height: 36px;
    text-indent: 85px;
    font-size: 14px;
    color: #999;
  }
  .inputWrap{
    width: 392px;
    margin: 77px auto 0;
  }
  .inputTag{
    width: 72px;
    height: 34px;
    line-height: 34px;
    padding-right: 15px;
    font-size: 14px;
    color: #333;
  }
  .inputStyle{
    display: block;
    width: 298px;
    height:34px;
    line-height: 34px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    padding: 0 10px;
  }
  .inputStyle:focus{
    border: 1px solid #ff7200;
  }
  .blueButton{
    width: 70px;
    height: 36px;
    line-height: 36px;
    background: #2299ee;
    color: #fff;
    border-radius: 4px;
  }
  .grayButton{
    width: 70px;
    height: 36px;
    line-height: 36px;
    background: #c7c7c7;
    border-radius: 4px;
    color: #fff;
    margin-left: 72px;
  }
</style>
