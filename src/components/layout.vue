<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider ref="side1" id="side1" collapsible :collapsed-width="78" width="220" hide-trigger v-model="isCollapsed" :style="{minHeight: '99vh'}">
        <!--顶部logo start-->
        <div class="clearfix topBar">
          <h1 class="toplogo fl pt15 pl15"><img src="../assets/images/logo.png" height="34" width="108"/></h1>
          <Icon @click.native="collapsedSider" :class="rotateIcon" class="cp fr" type="navicon-round" size="24" color="#e9eaec"></Icon>
        </div>
        <!--顶部logo end-->
        <!--导航列表 start-->
        <div  class="menu-box" v-for="(menu, index) in menuArr" :key="index">
          <div  class="menu-inner pr transi">
            <!--一级-->
            <div class="menu-title clearfix cp transi"  :class="{ activeMenu : index == showNow } ">
              <Icon :type="menu.icon" class="fl titleIcon"></Icon>
              <p class="fl ml10">{{ menu.name }}</p>
              <Icon type="ios-arrow-right" class="fr mr20 arrRight"></Icon>
            </div>
            <ul class="menu-list tc pa none">
              <!--二级-->
              <li  v-for="(item, innerIndex) in menu.menuInfoDtoList" :key="innerIndex" class="cp f_white" @click="selectMenu($event)">
                <router-link :to="{path:item.url}" tag="a" :sign="index">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <!--导航列表 end-->
      </Sider>
      <Layout>
        <Header :style="{background: '#fff'}" class="clearfix">
          <h2 class="f16 fl">无锡科技创新云平台 欢迎您！</h2>

          <ul class="clearfix toptoLink">
            <li class="fl clearfix" ><img src="../assets/images/icon1.png" height="33" width="33" class="fl">
            <a @click="showNum" class="fl" >数据库管理</a></li>
             <li class="fl clearfix"><img src="../assets/images/icon2.png" height="33" width="33" class="fl"><a class="fl" @click="changLogin">科技企业创新监测</a></li>
              <li class="fl clearfix"><img src="../assets/images/icon3.png" height="33" width="33" class="fl"><a class="fl" href="http://123.232.102.19:50001/WX_Html/ShuJuDaPing.html" target="_blank">科技大数据分析</a></li>
          </ul>

          <div class="fr userWindow pr" @mouseover="userSlide=true" @mouseout="userSlide=false">
            <span class="cp userName tr textoverflow"><span class="icon-user"></span>{{userName}}</span>
            <div v-show="userSlide" class="userSlide pa">
              <em class="pa upArr"></em>
              <a href="javascript:;" class="cp block f14" @click="outSystem()">退出</a>
            </div>
          </div>
          <!-- <div class="fr pr overallSearch">
            <input type="text" class="inputBox transi" @focus="serchInner" @blur="serchOut" :class="{ borderStyle : showBorder }"/>
            <Icon type="ios-search" class="pa searchBtn cp"></Icon>
          </div> -->
        </Header>
        <Content :style="{padding: '16px 16px 16px 16px',height:'100%'}">
            <router-view @navSlideToggle="collapsedSider" v-bind:message="isCollapsed"></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { postAjaxQ, getAjaxQ } from "../api/api.js"
  import childDeptManage from './SystemSettings/DepartmentManage/DepartmentManage.vue'
  // import childRoleManage from './SystemSettings/RoleManage/RoleManage.vue'
export default {
  data () {
    return {
      userSlide:false,
      checkIdArr : [],
      isCollapsed: false,
      showNow: 0,
      showBorder: false,
            menuArr: [

      ],
      userName:localStorage.getItem("userName")
    }
  },
  components: {
    childDeptManage
  },
  methods: {
    // checkShowOrHide(id){
    //   if(id && this.checkIdArr){
    //       if(this.checkIdArr.indexOf(id)===-1){
    //           return false
    //       }else{
    //           return true
    //       }
    //   }else{
    //       return false
    //   }
    // },
    makeCheckIdArr(){
      // debugger
        let authJson = localStorage.getItem("auth_json");
        let idArr = JSON.parse(authJson);
        if(idArr && idArr.length > 0){
            idArr.forEach((item, index) =>{
                this.checkIdArr.push(item.menuId)
            })
        }
    },
    selectMenu: function (e) {
      this.showNow = e.target.getAttribute('sign');
    },
    collapsedSider () {//控制左侧导航栏收缩
      this.$refs.side1.toggleCollapse();
    },
    serchInner () {//控制搜索框样式
      this.showBorder = true;
    },
    serchOut () {//控制搜索框样式
      this.showBorder = false;
    },
    //请求菜单数据
    getMenuList() {
      // alert(document.cookie)
      // debugger
      postAjaxQ("/menuInfo/queryList",{
        parentId:0
      }).then(response =>{
        this.menuArr=response.data.obj
        // console.log(this.menuArr)
      }).catch(error =>{})
    },
//退出
      changLogin(){
          this.$Ajax({
          method:'POST',
          url:'/sys/login',
          params:{
            "username":'www111',
            "password":'123456'
          }
        })
          .then(response => {
            // localStorage.setItem(
            //   "userName",
            //   document.getElementById("userName").value
            // );
            if (response.data.code == 200) {
              this.$router.push({ path: "/DataShow" });
              this.getMenuList();
            } else {
              this.$Message.info(response.data.msg);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },

      showNum(){
          this.$Ajax({
          method:'POST',
          url:'/sys/login',
          params:{
            "username":'admin',
            "password":'123456'
          }
        })
          .then(response => {
            // localStorage.setItem(
            //   "userName",
            //   document.getElementById("userName").value
            // );
            if (response.data.code == 200) {
              this.$router.push({ path: "/RoleManage" });
              this.getMenuList();
            } else {
              this.$Message.info(response.data.msg);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },
    outSystem(){
      getAjaxQ('/sys/logout')
      // this.$Ajax({
      //   method:'GET',
      //   url:'/sys/logout'
      // })
      .then((response) => {
      if (response.data.code==200){
        this.$router.push({path:'/login'});
        localStorage.clear();
      }else {
        this.$Message.info(response.data.msg);
      }
    }).catch(error => {
        // console.log(error);
    })
    }
  },

  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
//    menuitemClasses () {
//      return [
//        'menu-item',
//        this.isCollapsed ? 'collapsed-menu' : ''
//      ]
//    }
  },
  created() {
    // debugger
    

  },
  mounted() {
    // this.makeCheckIdArr();
    this.getMenuList();
    // this.MenuList();
    
  }
}
</script>

<style>
  body{
    color: #666;
  }
  .ivu-layout{
    background: #f1f2f3;
  }
  .ivu-layout-header{
    padding: 0 20px;
    height: 60px;
    line-height: normal;
  }
  .ivu-layout-header h2{
    height: 60px;
    line-height: 60px;
  }
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .ivu-layout-sider .topBar img{
    width: 108px;
    transition: width .2s ease;
  }
  .ivu-layout-sider .topBar i{
    transition: width .2s ease;
    padding: 18px 15px;
  }
  .ivu-layout-sider .menu-box .titleIcon{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 20px;
  }
  .ivu-layout-sider .menu-box p{
    display: inline-block;
    overflow: hidden;
    width: 110px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .ivu-layout-sider .menu-box .arrRight{
    transition: all .2s ease;
  }
  .ivu-layout-sider-collapsed .topBar img{
    width: 0px;
  }
  .ivu-layout-sider-collapsed .menu-box .titleIcon{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-layout-sider-collapsed .topBar i{
    transition: all .2s ease;
    margin-right: 14px;
  }
  .ivu-layout-sider-collapsed .menu-box p{
    width: 0px;
    transition: width .2s ease;
  }
  .ivu-layout-sider-collapsed .menu-box .arrRight{
    display: none;
    transition: width .2s ease;
  }
  /*企业列表页样式重置*/
  .enterprisePage .ivu-form-item{ margin-bottom: 15px }
  .businessePage .codeMargin .ivu-form-item{ margin-bottom: 0px }
  .enterprisePage .ivu-form .ivu-form-item-label{ font-size: 13px }
  .enterprisePage .ivu-tabs-nav-scrollable{
    padding: 0 20px;
  }
  .enterprisePage .ivu-tabs-nav-prev{
    left: 5px;
  }
  .enterprisePage .ivu-tabs-nav-prev:hover i{
    color: #2399ee;
  }
  .enterprisePage .ivu-tabs-nav-next{
    right: 5px;
  }
  .enterprisePage .ivu-tabs-nav-next:hover i{
    color: #2399ee;
  }
  .enterprisePage .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    background: #fff;
    border: none;
    color: #2399ee;
  }
  .enterprisePage .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    background: #2399ee;
    color: #fff;
  }
  .enterprisePage .ivu-tabs-bar{
    border-bottom: 2px solid #2399ee;
    margin-bottom: 0;

  }
  .enterprisePage .ivu-tabs-nav-container{
    padding: 0 25px;
  }
  .enterprisePage .ivu-tabs{
    width: 100%;
    height: 100%;
  }
  .enterprisePage .ivu-tabs-bar{
    position: absolute;
    left: 0;
    right: 0;
    height: 33px;
  }
  .enterprisePage .ivu-tabs-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 33px;
    bottom: 0;
  }
  .enterprisePage .ivu-tabs-tabpane{
    width: 100%;
    height: 100%;
  }
  /*左侧菜单栏(展开状态)*/
  .menu-box .menu-title p,.menu-box li{
    color: rgba(255,255,255,.7);
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }
  .menu-box .menu-title p,.menu-box li a{
    display: block;
    color: #fff;
  }
  .menu-box .menu-title i{
    font-size: 20px;
    color: rgba(255,255,255,.7);
    margin-top:12px;
  }
  .menu-title{
    /*width: 220px;*/
    padding: 0 0 0 24px;
  }
  /*.menu-box{*/
    /*margin-bottom: 5px;*/
  /*}*/
  .menu-list{
    width: 180px;
    background: #293247;
    left: 220px;
    top: 0px;
    z-index:10;
  }
  .ivu-layout-sider-collapsed .menu-list{
    left: 78px;
  }
  .menu-list li:hover{
    color: #fff;
    background: #374053;
  }
  .menu-list li a{
    font-size: 14px;
  }
  .menu-inner:hover p{
    color: #fff;
  }
  .menu-title:hover .titleIcon,.menu-inner:hover .titleIcon{
    color: #2399ee;
  }
  .menu-inner:hover{
    background: #293247;
  }
  /*顶部公共条-搜索-状态栏*/
  .overallSearch .inputBox{
    height: 32px;
    border: 1px solid #e0e0e0;
    padding: 0 40px 0 10px;
    border-radius: 20px;
  }
  .overallSearch .searchBtn{
    right: 5px;
    top: 0px;
    font-size: 22px;
    color: #9f9f9f;
    padding: 5px 10px;
  }
  .overallSearch{
    margin-top: 13px;
  }
  .overallSearch .borderStyle{
    border: 1px solid #2399ee;
  }
    /*控制子菜单显示与影藏（展开状态）*/
  .menu-inner:hover .menu-list{
    display: block;
  }
  /*控制子菜单点击事件时的样式*/
  .activeMenu{
    background: #293247;
    font-size: 12px!important;
  }
  .menu-box .activeMenu .titleIcon{
    color: #2399ee;
  }
  .menu-box .activeMenu p{
    color: #fff;
  }
  /*样式覆盖*/
  .ivu-layout-sider{
    background: #333a4c;
  }
  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
    background: #f6f8fc;
  }
  .ivu-table th{
    background: #f3f5f9;
  }
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
  .ivu-table-tip{
    overflow-x: hidden;
  }
  .ivu-table:after{
    background: #fff;
  }
  .ivu-checkbox-wrapper{
    margin-right: 1px;
  }
  .ivu-table-header th{
    font-weight: bold;
  }
/*各个页面顶部工具条*/
  .topbar_CloseBtn{
    width: 60px;
  }
  /*===============退出==============*/
  .userWindow{
    width: 100px;
  }
  .userName{
    display: block;
    height: 34px;
    line-height: 34px;
    margin-top: 13px;
    padding:0 13px 38px 0;
    color: #666666;
    background: url("../assets/images/arr.png") no-repeat right 14px;
    font-size: 14px;
  }
  .icon-user{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url("../assets/images/user.png") no-repeat center bottom;
    margin-right: 5px;
  }
  .userWindow:hover .icon-user{
    background: url("../assets/images/useron.png") no-repeat center bottom;
  }
  .userWindow:hover .userName{
    color: #2299ee;
    background: url("../assets/images/arron.png") no-repeat right 14px;
  }
  .userSlide{
    border-radius: 4px;
    width: 98px;
    background-color: #fff;
    top: 50px;
    z-index: 999999;
    border: 1px solid #e0e0e0;
  }
  .userSlide a{
    display: block;
    padding: 0 20px;
    color: #666666;
    height: 36px;
    line-height: 36px;
  }
  .userSlide a:hover{
    background-color: #2299ee;
    color: #fff;
  }
  .upArr{
    top:-10px;
    left: 75px;
    width: 10px;
    height: 10px;
    background: url("../assets/images/upArr.png") no-repeat right center;
  }
  /*顶部编辑栏*/
  #topToolBar .animated{
    z-index: 1;
  }
    .toptoLink{
      display: inline-block;
      margin-left: 10%
    }
  .toptoLink li a{
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #666;
  }
    .toptoLink li{
      vertical-align: middle;
      line-height:40px;
      margin:15px 30px;
    }
  </style>