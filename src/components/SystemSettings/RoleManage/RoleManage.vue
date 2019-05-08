<template>
  <div style="background-color: #fff; height: 100%;width: 100%;" class="pr">
    <transition name="rightSlide" enter-active-class="animated bounceInRight" leave-to-class="animated bounceOutRight">
      <!--右侧滑入框 start-->
      <div class="RightSlide pa pb40" v-show="rightEnter" @click.stop="rightEnter=true">
        <h3 class="RightSlideTit clearfix pl25 pr25 pa">
          <span class="fl f18"><Icon class="mr10 f20" color="#2299ee" type="navicon-round"></Icon>{{currentDataBox.roleName}}</span>
          <a @click.stop="delObjData(),rightEnter=false" href="javascript:;" class="f_6 fr f14 none">
            <Icon size="16" type="trash-a"></Icon>
            删除</a>
          <span class="fr ml10 mr10 none">|</span>
          <a href="javascript:;" class="f_6 fr f14 none" @click.stop="showEditPop=true">
            <Icon type="edit"></Icon>
            编辑</a>
        </h3>
       <div class="scrollBar">
         <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
           <span class="fl">基本信息</span>
           <span class="fl bgLine"></span>
         </div>
         <ul class="pl25 pr25 baseList">
           <li class="clearfix">
             <span class="baseTagName f_9 f14 fl">角色ID</span>
             <span class="f14 fl baseCon">{{currentDataBox.roleId}}</span>
           </li>
           <li class="clearfix">
             <span class="baseTagName f_9 f14 fl">角色名称</span>
             <span class="f14 fl baseCon">{{currentDataBox.roleName}}</span>
           </li>
           <li class="clearfix">
             <span class="baseTagName f_9 f14 fl">备注</span>
             <span class="f14 baseCon fl">{{currentDataBox.remark}}</span>
           </li>
           <li class="clearfix">
             <span class="baseTagName f_9 f14 fl">创建时间</span>
             <span class="f14 fl baseCon">{{currentDataBox.createTime}}</span>
           </li>
           <li class="clearfix">
             <span class="baseTagName f_9 f14 fl">功能权限</span>
             <div class="f14 fl treeTop">
               <Tree :data="allTree" show-checkbox></Tree>
             </div>
           </li>
         </ul>
       </div>
      </div>
      <!--右侧滑入框 end-->
    </transition>
    <!--弹出框start-->
    <!--确认删除框-->
    <Modal v-model="modal1" @on-ok="ok" @on-cancel="cancel">
      <p>{{delTips}}</p>
    </Modal>
    <transition name="fade">
      <!--编辑弹出框-->
      <div id="popBg02" class="popBg" v-show="showEditPop">
        <div class="popBox">
          <h4 class="popHead clearfix">
            <span class="fl popHeadName">编辑角色</span>
            <span class="fr popHeadClose rotate90 transi" type="close" @click.stop="showEditPop=false">
              <Icon color="#fff" type="close"></Icon>
            </span>
          </h4>
          <div class="popBody">
            <div class="clearfix inputWrap">
              <span class="tagName fl">角色名称</span>
              <input id="editRoleName" class="popInputStyle fl" type="text" placeholder="角色名称" v-model="editDetailBox.roleName">
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">备注</span>
              <input id="editRemark" class="popInputStyle fl" type="text" placeholder="备注"  v-model="editDetailBox.remark">
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">功能权限</span>
              <div class="checkWrap fl pt10">
                <Tree :data="allTree" show-checkbox ref="editTree"></Tree>
              </div>
            </div>
          </div>
          <div class="popFoot">
            <Button class="fr mr15 mt10" type="primary" @click.stop="changeData()">确定</Button>
            <Button class="fr mr15 mt10" type="default" @click.stop="showEditPop=false">取消</Button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <!--新增弹出框-->
      <div id="popBg01" class="popBg" v-show="show">
        <div class="popBox">
          <h4 class="popHead clearfix">
            <span class="fl popHeadName">新增角色</span>
            <span class="fr popHeadClose rotate90 transi" type="close" @click.stop="closePop()">
              <Icon color="#fff" type="close"></Icon>
            </span>
          </h4>
          <div class="popBody">
            <div class="clearfix inputWrap">
              <span class="tagName fl">角色名称</span>
              <input id="newAddName" class="popInputStyle fl" type="text" placeholder="角色名称">
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">备注</span>
              <input class="popInputStyle fl" id="newAddRemark" type="text" placeholder="备注">
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">功能权限</span>
              <div class="checkWrap fl pt5">
                <Tree :data="emptyTree" show-checkbox ref="tree"></Tree>
              </div>
            </div>
          </div>
          <div class="popFoot clearfix">
            <Button class="fr mr15 mt10" type="primary" @click="addNewRole()">确定</Button>
            <Button class="fr mr15 mt10" type="default" @click="closePop()">取消</Button>
          </div>
        </div>
      </div>
    </transition>
    <!--弹出框end-->
    <transition mode="out-in" enter-active-class="animated bounceInRight">
      <div class="clearfix pr" v-show="beforeSelect">
        <h3 class="fl PageTitle">角色管理</h3>
        <span style="z-index: 2" id="PageIcon" class="PageIcon fl" @click.stop="searchShow=true;searchColor='#2599ec'"> <Icon
          style="z-index: 1" :color="searchColor" type="search"></Icon></span>
        <Button @click="backToOldList()" class="fl backToList mt15 ml20" type="ghost" icon="reply" v-show="backToListShow">返回列表</Button>
        <Button  class="fr addRole" type="primary" @click="addRole()">+新增角色</Button>
        <transition name="fade">
          <!--检索框 start-->
          <div @click.stop="searchShow=true" ref="myPop" id="searchPop" class="searchPop" v-show="searchShow">
            <h5 ref="myPopTit" class="searchPopTit">自定义检索 </h5>
            <div class="clearfix">
              <input ref="myPopInput" class="fl input-search" type="text" placeholder="请输入角色名称" v-model="roleNameSearch">
              <Button class="fr searchPopButton" type="primary" @click.stop="searchData()">
                检索
              </Button>
            </div>
          </div>
          <!--检索框 end-->
        </transition>
      </div>
    </transition>
    <transition mode="out-in" enter-active-class="animated bounceInLeft">
      <!--编辑栏 start-->
      <div class="clearfix editBox" v-show="afterSelect">
        <ul class="fl clearfix">
          <li class="fl">
            已选中 <a href="javascript:;">{{this.checkModel.length}}</a>项&nbsp;&nbsp;|&nbsp;&nbsp;
          </li>
          <li  class="fl">
            <a href="javascript:;" class="f_6" @click="editTips()">
              <Icon type="edit"></Icon>
              编辑
            </a>&nbsp;&nbsp;|&nbsp;&nbsp;
          </li>
          <li  class="fl">
            <a @click.stop="hasUser()" href="javascript:;" class="f_6">
              <Icon size="16" type="trash-a"></Icon>
              删除
            </a>
          </li>
        </ul>
        <a href="javascript:;" class="fr" @click="leftBack()">
          <Icon type="close"></Icon>
        </a>
      </div>
      <!--编辑栏 end-->
    </transition>
    <table id="RoleList" class="baseTable">
      <tr class="bgTit">
        <td class="tc per5">
          <input id="fartherCheck" v-model="checkAll" @change.stop="checkAllData()" type="checkbox">
        </td>
        <td class="per10 pl15 fb">角色ID</td>
        <td class="per30 pl15 fb">角色名称</td>
        <td class="per30 pl15 fb">备注</td>
        <td class="per15 pl15 fb">创建时间</td>
      </tr>
      <tr :class="{'bgTr':index%2 != 0}" :key="index" v-for="(item,index) in roleData" v-if="roleData.length>0">
        <td class="tc per5">
          <input v-model="checkModel" :value="item.roleId" type="checkbox" name="childCheck">
        </td>
        <td class="per10 pl15">{{item.roleId}}</td>
        <td class="per30">
          <a href="javascript:;" class="RoleName transi" @click.stop="getRoleDetail(index)">{{item.roleName}}</a>
        </td>
        <td class="per30 pl15">{{item.remark}}</td>
        <td class="per15 pl15">{{item.createTime}}</td>
      </tr>
      <tr v-if="roleData.length == 0">
        <td colspan="9" class="tc">
          <div class="loading" v-if="isFirstLoading" style="padding: 150px 0;">
            <Spin>
              <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
          <span v-if="!isFirstLoading">暂无相关数据</span>
        </td>
      </tr>


    </table>
    <div style="margin: 20px;overflow: hidden">
      <div style="float: right;">
        <Page ref="pages" :total="totalPage" :page-size="pageSize" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  // import { postAjaxQ, getAjaxQ} from "../../../api/api.js";
  import{postAjaxQ,getAjaxQ} from "../../../api/api.js"
  import Layout from '../../layout.vue'
  import '../../../assets/css/animate.css'

  export default {
    name: 'RoleManage',
    props:["message"],
    components: {
      Layout
    },
    data () {
      return {
        checkButtonArray:[],
        show: false,// 新增角色pop 开关
        searchShow: false,// 搜索框开关
        beforeSelect: true,// 角色管理头部栏
        afterSelect: false,// 编辑栏
        showEditPop: false, //编辑弹出框
        searchColor: '#9c9c9c',
        rightEnter: false,
        checkedNumber: 0,// 选中个数
        isFirstLoading:true,
        checkModel: [],// 存放选中元素Id
        modal1:false,//删除时的弹出框
        delTips:'',//删除提示
        checkAll: false,
        //分页相关变量
        totalPage: 100,
        pageSize: 10,
        roleData: [],//列表存放
        //======================增删改查开始=========================
        currentDataBox:[],//存放当前点击数据
        newAddData:[],//新增数据存放
        emptyTree: [],
        dataShowTree:[],//全部功能权限后台数据
        allTree:[],//转化后的allTree
        currentTree:[],//当前功能权限
        currentAllTree:[],//d对比打勾后的数据权限
        editDetailBox:[],//编辑框获取当前内容
        roleNameSearch:'',
        newRoleData:[],
        backToListShow:false
      }
    },
    methods: {
      //  自定义方法
      checkButtonAuthority(checkPerms){
        if(checkPerms && this.checkButtonArray){
          if(this.checkButtonArray.indexOf(checkPerms)===-1){
            return false
          }else{
            return true
          }
        }else{
          return false
        }
      },
      makeButtonAuthorityArray(){
        let authJson = localStorage.getItem("auth_json");
        let buttonAuthorityArray = JSON.parse(authJson);
        if(buttonAuthorityArray && buttonAuthorityArray.length > 0){
          buttonAuthorityArray.forEach((item, index) =>{
            this.checkButtonArray.push(item.perms)
        })
        }
      },
      checkedAllFalse(){
        if(this.checkModel==[]){
          this.checkAll==false;
        }
      },
      addRole () {
        this.show = true
      },
      closePop () {
        this.show = false
        this.clearAddPop();
      },
      leftEnter () {
        this.beforeSelect = false
        this.afterSelect = true
      },
      leftBack () {
        this.beforeSelect = true
        this.afterSelect = false
      },
      // 全选反选
      checkAllData(){
        if (this.checkAll==false) {//实现反选
          this.checkModel = [];
          this.leftBack()
        } else {//实现全选
          this.leftEnter();
          this.checkModel = [];
          this.roleData.forEach((item) =>{
            this.checkModel.push(item.roleId);
          })
        }
      },
      changePage(pageNum){
        this.getUserInformationList(pageNum - 1, this.pageSize)
      },
      //  监听body，关闭弹出框
      bodyClick (){
        this.searchShow = false
        this.searchColor = '#9c9c9c'
        this.rightEnter = false
      },
      // axios调用角色列表接口
      getUserInformationList(pageNum, pageSize){
        // debugger
        postAjaxQ('/roleInfo/queryListPage/' + pageNum + '/' + pageSize, {})
          .then((response) => {
          if (response.data.code==0){
              this.isFirstLoading=false;
              this.roleData = response.data.obj.content;
              this.totalPage = response.data.obj.totalElements;
          }
      }).catch(error => {
          console.log(error);
      })
      },
      //=========================获取详情start===============================
      // 将详情页功能权限数据转化为iView的数据格式
      getTree(tree=[]) {
        let arr = [];
        if (tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
          obj.menuId=item.menuId;
          obj.title = item.name;
          obj.expand = true;
          obj.selected = false;
          obj.checked = item.checked;
          obj.disabled= true;
          obj.children = this.getTree(item.menuInfoDtoList); // 递归调用
          arr.push(obj);
        })
        }
        return arr;
      },
      // 获取全部的功能权限
      getAllTree() {
        postAjaxQ('/menuInfo/queryList',{
          parentId:0
        })
          .then((response) => {
          this.dataShowTree=response.data.obj;
          this.emptyTree=this.getAddTree(this.dataShowTree);
      }).catch(error => {
          console.log(error);
      })
      },
      //获取当前id的功能权限列表
      getCurrentTree(currentId){
       postAjaxQ('/roleMenu/queryList',{
          roleId:currentId
        })
          .then((response) => {
          this.currentTree=response.data.obj;
          this.currentAllTree=this.contactArry(this.dataShowTree,this.currentTree);
          this.allTree=this.getTree(this.currentAllTree);
      }).catch(error => {
          console.log(error);
      })
      },
      // 比较两个数组
      contactArry(a,b){
        //比较前先让所有的checked为false
        this.noSelect(a);
        //开始比较
        for (let i=0;i<a.length;i++){
          for (let j=0;j<b.length;j++){
            if(a[i].menuInfoDtoList.length==0){
              if (a[i].menuId==b[j].menuId){
                a[i].checked=true
              }
            }else{
              a[i].checked=false;
              this.contactArry(a[i].menuInfoDtoList,b)
            }
          }
        }
        return a;
      },
      // 获取当前点击数据详情信息
      getRoleDetail(index){
        this.currentDataBox=this.roleData[index];
        this.checkModel=[];
        this.checkModel.push(this.roleData[index].roleId);
        this.getCurrentTree(this.roleData[index].roleId);
        if(this.rightEnter == false){
          this.rightEnter = true;//详情页展开
          if(this.message == false){//判断左侧菜单是否收缩
            this.$emit('navSlideToggle');//调用父组件方法控制导航收缩
          }
        }
//        console.log(this.message)
      },

      //比较前先让所有的checked为false
      noSelect(a){
        for (let i=0;i<a.length;i++){
          if(a[i].menuInfoDtoList.length==0){
            a[i].checked=false;
          }else{
            a[i].checked=false;
            this.noSelect(a[i].menuInfoDtoList)
          }
        }
      },
      //=========================获取详情end===============================
      //=========================新增start===============================
      // 将新增和编辑页功能权限数据转化为iView的数据格式
      getAddTree(tree=[]) {
        let arr01 = [];
        if (tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.menuId=item.menuId;
            obj.parentId=item.parentId;
            obj.title = item.name;
            obj.children = this.getAddTree(item.menuInfoDtoList); // 递归调用
            arr01.push(obj);
          })
        }
        return arr01;
      },
      //关闭弹出框后清空弹出框内的数据
      clearAddPop(){
        document.getElementById('newAddName').value='';
        document.getElementById('newAddRemark').value='';
        this.getAllTree();
      },
      // 对比权限
      contactMenu(a,b){
        //开始比较a是全部权限数据，b是当前选中的menuId
        let menuAndParent=[];
        for (let i=0;i<a.length;i++){
          for (let j=0;j<b.length;j++){
            if(a[i].menuInfoDtoList.length==0){
              if (a[i].menuId==b[j].menuId){
                menuAndParent.push(a[i].parentId)
              }
            }else{
              a[i].checked=false;
              this.contactArry(a[i].menuInfoDtoList,b)
            }
          }
        }
        return a;
      },
      addNewRole(){
        let MemuIdArry=this.$refs.tree.getCheckedNodes();//获取当前权限
        console.log(this.dataShowTree);//全部权限列表

        let newAddName=document.getElementById('newAddName');
        let newAddRemark=document.getElementById('newAddRemark');
        if(newAddName.value.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$Message.warning('角色名称不可为空！');
          newAddName.focus();
        }else if(newAddName.value.length>20){
          this.$Message.warning('角色名称长度不可大于20个字符！');
          newAddName.focus();
        }
        else {
          this.$Ajax.post('/roleInfo/save',{
            createTime:'',
            deptId:0,
            menuInfos:MemuIdArry,
            remark:newAddRemark.value,
            roleId:0,
            roleName:newAddName.value
          })
            .then((response) => {
            console.log(response)
          if(response.data.code==0){
            this.$Message.success('操作成功！');
            this.getUserInformationList(0, this.pageSize);
          }
        }).catch(error => {
            console.log(error);
        })
          this.closePop();
          this.getUserInformationList(0, this.pageSize)
          this.$refs['pages'].currentPage = 1;
        }
      },
      //=========================新增end===============================
      // ========================删除start=========================
      delObjData(){
        this.modal1=true;
      },
      //判断是否存在用户
      hasUser(){
        let idModelArr = this.checkModel.join();
        // this.$Ajax({
        //   method:'POST',
        //   url:'/roleInfo/hasUser',
        //   params:{
        //     ids:idModelArr
        //   }
        // })
        postAjaxQ('/roleInfo/hasUser',{ids:idModelArr})
          .then((response) => {
          console.log(response)
          this.delTips=response.data.obj;
          this.delObjData()
      }).catch(error => {
          console.log(error);
      })
      },
      ok () {
        let idModelArr = this.checkModel.join();
        // this.$Ajax({
        //   method:'POST',
        //   url:'/roleInfo/removeBatch',
        //   params:{
        //     ids:idModelArr
        //   }
        // })
          postAjaxQ('/roleInfo/removeBatch?ids='+idModelArr)
          .then((response) => {
          console.log(response)
        this.checkModel=[];
        this. leftBack();
        this.getUserInformationList(0, this.pageSize);
        this.$refs['pages'].currentPage = 1;
        if(response.data.code==0){
          this.$Message.success('操作成功！');
        }
      }).catch(error => {
          console.log(error);
      })
      },
      cancel () {},
      // ========================删除end===========================
      // ======================== 修改start========================
      getEditTree(tree=[]) {
        let arr02 = [];
        if (tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
          obj.menuId=item.menuId;
          obj.parentId=item.parentId;
          obj.title = item.name;
          obj.selected = false;
          obj.checked = item.checked;
          obj.children = this.getEditTree(item.menuInfoDtoList); // 递归调用
          arr02.push(obj);
        })
        }
        return arr02;
      },
      //获取当前id的功能权限列表
      getCurrentEditTree(currentId){
        this.$Ajax.post('/roleMenu/queryList',{
          roleId:currentId
        })
          .then((response) => {
          this.currentTree=response.data.obj;
        this.currentAllTree=this.contactArry(this.dataShowTree,this.currentTree);
        this.allTree=this.getEditTree(this.currentAllTree);
      }).catch(error => {
          console.log(error);
      })
      },
      editTips(){
        if(this.checkModel.length>1){
          this.$Message.info('只能同时编辑一条数据！');
        }else {
          this.getEditDetail();
        }
      },
      getEditDetail(){
       getAjaxQ('/roleInfo/getById',{
          params:{
            id:this.checkModel[0]
          }
        })
          .then((response) => {
            this.editDetailBox=response.data.obj
            this.showEditPop=true;
            this.getCurrentEditTree(this.editDetailBox.roleId)
        }).catch(error => {
          console.log(error);
        })
      },
      changeData(){
        let MemuIdArry=this.$refs.editTree.getCheckedNodes();
       postAjaxQ('/roleInfo/modify',{
          createTime:'',
          deptId:0,
          menuInfos:MemuIdArry,
          remark:this.editDetailBox.remark,
          roleId:this.editDetailBox.roleId,
          roleName:this.editDetailBox.roleName
        })
          .then((response) => {
          console.log(response);
          this.showEditPop=false;
          this.getUserInformationList(this.$refs['pages'].currentPage-1, this.pageSize);
          if(response.data.code==0){
            this.$Message.success('操作成功！');
          }
      }).catch(error => {
          console.log(error);
      })
      },
      // ======================== 修改end==========================
      // ======================== 检索start==========================
      searchData(){
        let myPopInput=this.$refs['myPopInput']
        if(myPopInput.value.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$Message.warning('请输入角色名称！');
          myPopInput.focus();
        }else{
          this.backToListShow=true;
         postAjaxQ('/roleInfo/queryList',{
            roleName:this.roleNameSearch
          })
            .then((response) => {
            console.log(response);
          this.newRoleData = response.data.obj;
          this.getNewRoleInformationList(0, this.pageSize);
          this.searchShow=false;
          this.searchColor='#9c9c9c';
          this.roleNameSearch='';
        }).catch(error => {
            console.log(error);
        })
        }
      },
      //返回部门列表
      backToOldList(){
        this.getUserInformationList(0, this.pageSize);
        this.backToListShow=false;
      },
      // 将获取的数据显示在列表
        getNewRoleInformationList(pageNum, pageSize){
          postAjaxQ('/roleInfo/queryListPage/' + pageNum + '/' + pageSize, {})
            .then((response) => {
            this.roleData = this.newRoleData;
            this.totalPage = this.newRoleData.totalElements;
        }).catch(error => {
            console.log(error);
        })
      },
      // ======================== 检索end==========================
    },
    watch: {
      checkModel: function(){
        if(this.checkModel.length <= 0){
          this.checkAll = false
          this.leftBack()
        }else {
          this.leftEnter()
        }
      }
    },
    created () {
      // 点击网页其他部分关闭搜索框
      document.querySelector('body').addEventListener('click',this.bodyClick);
      console.log("--------------我创建了哈哈哈哈"+localStorage.getItem("jwt_token"));
    },
    mounted(){
      this.getUserInformationList(0, this.pageSize);
      this.getAllTree();
      // this.makeButtonAuthorityArray()
      console.log("--------------我挂载了哈哈哈哈"+localStorage.getItem("jwt_token"));
    },
    destroyed(){
      document.querySelector('body').removeEventListener('click', this.bodyClick)
    }
  }
</script>
<style scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .rotate90:hover {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }
  body {
    height: 100%;
    background-color: #fff;
  }

  .PageTitle {
    font-size: 16px;
    font-weight: bold;
    color: #666;
    height: 60px;
    line-height: 60px;
    padding-left: 25px;
  }

  .PageIcon {
    font-size: 20px;
    line-height: 60px;
    padding-left: 10px;
    cursor: pointer;
  }

  .addRole {
    margin: 15px 20px 0 0;
  }

  /*弹窗样式*/
  .popBg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../../../assets/images/popBg.png") repeat;
    z-index: 10;
  }

  .popBox {
    width: 500px;
    height: 435px;
    background-color: #fff;
    box-shadow: 3px 3px 3px #e0e0e0;
    position: absolute;
    left: 40%;
    top: 10%;
    margin: 0 0 0 -250px;
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 15px;
  }

  /*修改滚动条的样式*/
  /*滚动条样式*/
  .scrollBar{
    width: 970px;
    padding-top: 67px;
    height: 100%;
    overflow-y: scroll;
  }
  .popBody::-webkit-scrollbar{ /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .popBody::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #c7c7c7;
  }

  .popBody::-webkit-scrollbar-track { /*滚动条里面轨道*/
    border-radius: 0;
  }

  .popHead {
    height: 45px;
    background-color: #2299ee;
    padding: 0 20px;
  }

  .popHeadName {
    color: #fff;
    font-size: 14px;
    line-height: 45px;

  }

  .popHeadClose {
    color: #fff;
    font-size: 16px;
    line-height: 45px;
    cursor: pointer;
  }

  .popBody {
    height: 323px;
    padding: 24px 20px 37px 20px;
    overflow-y: scroll;
  }

  .tagName {
    width: 92px;
    height: 36px;
    line-height: 36px;
    color: #333;
    font-size: 14px;
  }

  .popInputStyle {
    width: 324px;
    height: 34px;
    border: 1px solid #e0e0e0;
    padding: 0 10px;
    border-radius: 4px;
  }

  .inputWrap {
    margin-bottom: 14px;
  }

  .checkWrap {
    width: 324px;
  }

  .popFoot {
    padding-top: 15px;
  }

  /*检索框样式*/
  .searchPop {
    width: 308px;
    height: 98px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0px 0px 6px #e0e0e0;
    position: absolute;
    top: 45px;
    left: 98px;
    z-index: 9;
    background-color: #fff;
  }

  .searchPopTit {
    font-size: 14px;
    color: #c0c5c9;
  }

  .input-search {
    width: 198px;
    height: 28px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    text-indent: 7px;
    margin-top: 10px;
    font-size: 14px;
  }

  .searchPopButton {
    line-height: 14px;
    margin-top: 10px;
    font-size: 14px;
  }

  .editBox {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
  }

  .RightSlide {
    width: 970px;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 50px;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0px 0px 6px #ddd;
  }

  .RightSlideTit {
    width: 100%;
    height: 67px;
    line-height: 67px;
    border-bottom: 2px solid #2299ee;
    background: #fff;
    z-index: 999;
  }

  .RightSubTit {
    padding: 20px 25px 5px 25px;
  }

  .RightSubTit .bgLine {
    width: 92%;
    height: 2px;
    background: url("../../../assets/images/bgLine.jpg") repeat-x center;
    padding-top: 20px;
    margin-left: 8px;
  }

  .baseList li {
    min-height: 48px;
  }

  .baseTagName {
    width: 80px;
    height: 48px;
    line-height: 48px;
  }

  .baseCon {
    width: 820px;
    line-height: 48px;
  }

  .baseTable {
    width: 100%;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #666;
  }

  .baseTable td {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 44px;
  }

  .per10 {
    width: 10%;
  }

  .per5 {
    width: 5%;
  }

  .per15 {
    width: 15%;
  }

  .per30 {
    width: 30%;
  }

  .RoleName {
    display: inline-block;
    height: 42.5px;
    line-height: 42.5px;
    width: 56%;
    padding-left: 15px;
    color: #666;
  }

  .RoleName:hover, .RoleName:active {
    border: 1px solid #2299ee;
  }

  .bgTit {
    background-color: #f3f5f9;
  }
  .bgTr {
    background-color: #f6f8fc;
  }
.treeTop{
  padding-top: 13px;
}

</style>
