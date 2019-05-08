<template>
  <div style="background-color: #fff; height: 100%; min-width: 1000px" class="pr">
    <!--右侧滑框 start-->
    <transition name="rightSlide" enter-active-class="animated bounceInRight" leave-to-class="animated bounceOutRight">
      <div class="RightSlide pa" v-show="rightEnter" @click.stop>
        <!--顶部工具栏 start-->
        <div class="RightSlideTit pl25 pr25 pa">
          <div class="clearfix pt25">
            <h3 class="fl"><Icon type="network" color="#2299ee" size="21" class="mr10"></Icon><span class="f18">{{ slidetopdata.name }}</span></h3>
            <ul class="fr">
              <li class="fl" >
                <a href="javascript:;" class="f_6" @click="editeDetailPopShow()"><Icon type="edit" class="mr5"></Icon>编辑</a>
              </li>
              <li  class="fl ml10 mr10" style="margin-top:-1px; color: #ccc;">|</li>
              <li  class="fl">
                <a @click="delDetailInforData()" href="javascript:;" class="f_6"><Icon size="16" type="trash-a" class="mr5"></Icon>删除</a>
              </li>
              <li class="fl ml10 mr10" style="margin-top:-1px; color: #ccc;">|</li>
              <li  class="fl">
                <a @click="addChildDeptPopShow()" href="javascript:;" class="f_6"><Icon size="15" type="plus-round" class="mr5"></Icon>增加子部门</a>
              </li>
            </ul>
          </div>
          <table class="titTable per40 f14 mt5">
            <tr class="f_9">
              <td class="per20">部门ID</td>
              <td class="per60">上级部门</td>
              <td class="per20" style="width: 20%;">排序号</td>
            </tr>
            <tr>
              <td>{{ slidetopdata.deptId }}</td>
              <td>{{ slidetopdata.parentName }}</td>
              <td>{{slidetopdata.orderNum}}</td>
            </tr>
          </table>
        </div>
        <!--顶部工具栏 end-->
        <!--部门人员表格 start-->
        <div class="RightSlideBody pa">
          <div class="StaffTable">
            <div class="StaffTable_Tit pa pr10">
              <table>
                <tr class="bgTr">
                  <td class="tc per5">
                    <input id="fartherCheck" type="checkbox" v-model="checkAll" @change="checkAllData()">
                  </td>
                  <td class="per12 fb">用户名</td>
                  <td class="per10 fb">真实姓名</td>
                  <td class="per10 fb">昵称</td>
                  <td class="per12 fb">角色</td>
                  <td class="per12 fb">手机号</td>
                  <td class="per12 fb">邮箱</td>
                  <td class="per12 fb">所在地区</td>
                  <td class="per12 fb">注册时间</td>
                </tr>
              </table>
            </div>
            <div class="StaffTable_Body pa scrollBar">
              <table>
                <tr v-if="staffData.length > 0" v-for="(data, index) in staffData" :key="index" :class="{'bgTr':index%2 != 0}">
                  <td class="tc per5">
                    <input type="checkbox" name="childCheck" v-model="checkModelStaff" :value="data.userId">
                  </td>
                  <td class="per12">{{ data.username }}</td>
                  <td class="per10">{{ data.realname }}</td>
                  <td class="per10">{{ data.nickname }}</td>
                  <td class="per12">{{ getRoleName(data.roles) }}</td>
                  <td class="per12">{{ data.mobile }}</td>
                  <td class="per12">{{ data.email }}</td>
                  <td class="per12">{{ data.areaInfoArea? data.areaInfoArea.regionName : '' }}</td>
                  <td class="per12">{{ data.createTime }}</td>
                </tr>
                <tr v-if="staffData.length == 0">
                  <td colspan="9" class="tc">暂无相关数据</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--部门人员表格 end-->
      </div>
    </transition>
    <!--右侧滑框 end-->
    <!--其他弹出框 start-->
    <Modal v-model="delDepetModal" @on-ok="okDelDept">
      <p>确定要删除部门信息吗？</p>
    </Modal>
    <Modal v-model="delDetailModal" @on-ok="okDelDetail">
      <p>确定要删除部门信息吗？</p>
    </Modal>
    <transition name="fade">
      <!--新增弹出框 start-->
      <div id="popBg01" class="popBg" v-show="addDeptShow" @click.stop>
        <div class="popBox">
          <h4 class="popHead clearfix">
            <span class="fl popHeadName">{{this.deptWords}}</span>
            <span class="fr popHeadClose rotate90 transi" type="close" @click.stop="closeDeptPop()">
              <Icon color="#fff" type="close"></Icon>
            </span>
          </h4>
          <div class="popBody scrollBar">
            <div class="clearfix inputWrap">
              <span class="tagName fl">部门名称</span>
              <input id="newAddName" class="popInputStyle fl" type="text" placeholder="部门名称" maxlength="20">
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">上级部门</span>
              <div id="newAddParent" @click.stop="addTreePopShow()" class="popInputStyle fl higherDept" type="text" readonly >{{this.selectedDpet}}</div>
            </div>
            <div class="clearfix inputWrap">
              <span class="tagName fl">排序号</span>
              <input id="newAddNum" class="popInputStyle fl" type="number" placeholder="排序号">
            </div>
            <!--<div class="clearfix">-->
            <!--<div class="fl tagName">角色</div>-->
            <!--<div class="fl checkbox-group">-->
            <!--<CheckboxGroup v-model="currentRoleNameList">-->
            <!--<Checkbox v-for="(data, index) in roleNameDataList" :key="index" :label="data.roleName">{{ data.roleName }}</Checkbox>-->
            <!--</CheckboxGroup>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <div class="popFoot clearfix">
            <Button class="fr mr15 mt10" type="primary" @click="addNewDept()">确定</Button>
            <Button class="fr mr15 mt10" type="default" @click="closeDeptPop()">取消</Button>
          </div>
        </div>
        <!--部门树结构弹出框 start-->
        <div  id="popBg02" class="popBox" v-show="addDeptTreeShow" @click.stop>
          <h4 class="popHead clearfix">
            <span class="fl popHeadName">选择部门</span>
            <span class="fr popHeadClose rotate90 transi" type="close" @click.stop="closeTreePop()">
              <Icon color="#fff" type="close"></Icon>
            </span>
          </h4>
          <!--<p class="ParentNameNow f_blue fb">当前上级部门：<span>{{this.selectedDpet}}</span></p>-->
          <div class="popBody scrollBar">
            <Tree :data="deptTreeData" @on-select-change="getSelDeptData()" ref="selTree"></Tree>
          </div>
          <div class="popFoot clearfix">
            <Button class="fr mr15" type="primary" @click="addSelTreeData()">确定</Button>
            <Button class="fr mr15" type="default" @click="closeTreePop()">取消</Button>
          </div>
        </div>
        <!--部门树结构弹出框 end-->
      </div>
      <!--新增弹出框 end-->
    </transition>
    <!--其他弹出框 end-->
    <!--顶部工具条 start-->
    <div id="topToolBar">
      <transition mode="out-in" enter-active-class="animated bounceInRight">
        <div class="clearfix pr" v-show="beforeSelect">
          <h3 class="fl PageTitle">部门管理</h3>
          <span style="z-index: 2" id="PageIcon" class="PageIcon fl" @click.stop="searchShow=true;searchColor='#2599ec'">
            <Icon style="z-index: 1" type="search" color="#9c9c9c" :color="searchColor" size="20"></Icon>
          </span>
          <Button @click="backToDeptList()" class="fl backToList mt15 ml20" type="ghost" icon="reply" v-show="backToListShow">返回列表</Button>
          <Button class="fr addRole" type="primary" @click.stop="addDeptPopShow()">+ 新建部门</Button>
          <transition name="fade">
            <!--检索框 start-->
            <div @click.stop="searchShow=true" id="searchPop" class="searchPop" v-show="searchShow">
              <h5 class="searchPopTit">自定义检索 </h5>
              <div class="clearfix">
                <input ref="searchInput" class="fl input-search" type="text" placeholder="请输入部门名称" v-model="deptNameSearch">
                <Button @click.stop="searchData()" class="fr searchPopButton" type="primary">检索</Button>
              </div>
            </div>
            <!--检索框 end-->
          </transition>
        </div>
      </transition>
      <transition mode="out-in" enter-active-class="animated bounceInLeft">
        <!--编辑栏 start-->
        <div class="clearfix editBox" v-show="afterSelect">
          <ul class="fl clearfix f14">
            <li class="fl">
              <span>已选中</span>
              <a href="javascript:;" class="f14" id="selectedNum">{{this.selectedNum}}</a>
              <span>项</span>
            </li>
            <li  class="fl ml10 mr10" style="margin-top:-2px;">|</li>
            <li class="fl">
              <a href="javascript:;" class="f_6"  @click.stop="editeDeptPopShow()"><Icon type="edit" class="mr5"></Icon>编辑</a>
            </li>
            <li  class="fl ml10 mr10" style="margin-top:-2px;">|</li>
            <li class="fl">
              <a href="javascript:;" class="f_6" @click.stop="delDeptInforData(),rightEnter=false"><Icon size="16" type="trash-a" class="mr5"></Icon>删除</a>
            </li>
          </ul>
          <a href="javascript:;" class="fr topbar_CloseBtn tc" @click="leftBack">
            <Icon type="close" size="18"></Icon>
          </a>
        </div>
        <!--编辑栏 end-->
      </transition>
    </div>
    <!--顶部工具条 end-->
    <!--表格列表 start-->
    <div id="treegridTable" @click.stop>
      <tree-grid
        :items='data'
        :columns='columns'
        @on-row-click='rowClick'
        @on-selection-change='selectionClick'
      ></tree-grid>
      <p class="noDeptDataTip tc" v-if="data.length===0">暂无相关数据</p>
      <div style="margin: 20px;overflow: hidden">
        <div style="float: right;">
          <Page ref="pages" :total="totalPage" :page-size="pageSize" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!--表格列表 end-->
  </div>
</template>
<script>
  import TreeGrid from '../../treeGrid2.0'
  import Layout from '../../layout'
  import '../../../assets/css/animate.css'
  import { postAjaxQ, getAjaxQ} from "../../../api/api.js"
  export default {
    name: 'DepartmentManage',
    props:["message"],
    data () {
      return {
        checkButtonArray:[],//根据权限控制页面按钮的显示与隐藏
        pageSize: 10, //一页条数
        totalPage: 0,//总页码
        beforeSelect: true,// 部门管理头部栏
        searchShow: false,//搜索框显示隐藏
        searchColor: '#9c9c9c',//搜索框颜色设置
        deptNameSearch:'',//存储要搜索的部门名称
        searchDeptData:[],//存储搜索到的部门列表数据
        backToListShow: false,
        noDeptDataTip:false,//主表搜索显示暂无数据
        afterSelect: false,// 编辑栏
        rightEnter: false,//右侧滑框
        selectedNum: [],
        checkAll: false,
        checkModelStaff: [],//成员列表复选框
        columns: [
          {
            type: 'selection',
            align: 'center'
          },
          {
            title: '部门ID',
            key: 'deptId'
          },
          {
            title: '部门名称',
            key: 'name',
            width: '200'
          },
          {
            title: '上级部门',
            key: 'parentName',
            width: '200'
          },
          {
            title: '排序号',
            key: 'orderNum'
          }
        ],
        data: [],
        staffData: [],
        slidetopdata: [],
        delDepetModal:false,//删除部门信息弹出确认弹窗
        delDetailModal:false,//删除部门详情信息弹出确认弹窗
        addDeptShow: false,
        addDeptTreeShow: false,
        //新建部门弹窗相关变量
        deptTreeData:[],
        dataVal:[],//选中树结构数据存储
        deptIdData:[],//选中树结构部门id存储
        selTreeData:[],//选中树结构部门名称存储
        selectedDpet:"请选择上级部门",//在弹窗中传入已选中的部门名称
        selCheckBoxArr:[],
        //编辑部门弹窗相关变量
        newOrEditTip:0,//判断新增还是修改的标志
        deptWords:"新建部门",
        selEditDeptId:[],//存储当前编辑的部门id供上传数据寻找标志位
        //判断是否是详情页增加子部门，禁止选择上级部门标志
        isParentId: true,
      }
    },
    components: {
      TreeGrid,
      Layout
    },
    methods: {
      //根据用户权限控制按钮的显示与隐藏
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
      //控制顶部工具条显示
      leftEnter () {
        this.beforeSelect = false
        this.afterSelect = true
      },
      //控制顶部工具条隐藏
      leftBack () {
        this.beforeSelect = true
        this.afterSelect = false
      },
      // 监听body并关闭弹出框
      bodyClick (){
        this.searchShow = false;
        this.searchColor = '#9c9c9c';
        this.rightEnter = false;
        console.log("关闭所有弹窗")
      },
      //请求主表格数据
      getDeptInformationList(pageNum, pageSize) {
        postAjaxQ('/deptInfo/queryListPage/' + pageNum + '/' + pageSize, {
          parentId:0
        })
        .then((response) => {
          this.data = response.data.obj.content;
          this.totalPage = response.data.obj.totalElements;
        })
        .catch(error => {
          console.log(error);
        })
        this.backToListShow = false;
      },
      //控制主表格分页显示
      changePage(pageNum) {
        this.getDeptInformationList(pageNum - 1, this.pageSize)
      },
      //点击主表格某一行
      rowClick(data, event, index, text) {//当前行数据，点击事件，点击行号
        console.log(data)
        //获取部门Id
        let deptid = data.deptId;
        this.slidetopdata = data;
        //点击主表获取详情成员列表数据
        postAjaxQ("/userInfo/queryList",{
          deptId:deptid
        }).then(response =>{
          this.staffData = response.data.obj;
          console.log(this.staffData);
        }).catch(error =>{});
        console.log(this.message)
        //控制左侧导航展开与否
        if(this.rightEnter == false){
          this.rightEnter = true;//详情页展开
          if(this.message == false){//判断左侧菜单是否收缩
            this.$emit('navSlideToggle');//调用父组件方法控制导航收缩
          }
        }
        console.log(this.message)
      },
      //解析角色名称内部数组
      getRoleName(roleData) {
        if(!roleData){
          roleData = [
            {
              roleName: ""
            }
          ]
        }
        let roleName = ""
        for (let i = 0; i < roleData.length; i++) {
          roleName = roleName + " " + roleData[i].roleName
        }
        return roleName
      },
      //解析选中复选框id数组
      getSelDeptId(selCheckArr) {
        if(!selCheckArr){
          selCheckArr = [
            {
              selDeptId: ""
            }
          ]
        }
        let selDeptId = ""
        for (let i = 0; i < selCheckArr.length; i++) {
          if(selDeptId=="")
          selDeptId = selCheckArr[i]
          else
            selDeptId = selDeptId + "," + selCheckArr[i]
        }
        return selDeptId
      },
      //选中复选框方法
      selectionClick(arr) {
        //console.log('选中数据id数组:' + arr)
        //console.log(arr.length);
        let arrlength = arr.length;//获取选中条数
        this.selectedNum = arrlength;//赋值选中条数
        if (arrlength > 0) {//判断是否有选中，控制顶部条的显示与隐藏
          this.leftEnter();
        }else{
          this.leftBack();
        }
        this.selCheckBoxArr = this.getSelDeptId(arr);
        console.log(this.selCheckBoxArr)
      },
      //全选反选-点击详情子表复选框
      checkAllData(){
        if (this.checkAll==false) {//实现反选
          this.checkModelStaff = [];
        } else {//实现全选
          this.checkModelStaff = [];
          this.staffData.forEach((item) =>{
            this.checkModelStaff.push(item.userId);
          })
        }
      },
      //新增部门弹窗相关操作
      addTreePopShow () {
        if(this.isParentId == false){
          this.$Message.warning('不可选择上级部门！');
        }else{
          this.addDeptTreeShow = true;
        }
      },
      closeTreePop () {
        this.addDeptTreeShow = false;
      },
      addDeptPopShow () {//主表新增部门
        this.deptWords = "新建部门";
        this.addDeptShow = true;
        //this.emptyDeptPopData();
      },
      addChildDeptPopShow () {//详情新增子部门
        this.deptWords = "增加子部门";
        this.addDeptShow = true;
        this.isParentId = false;
        //this.emptyDeptPopData();
        this.deptIdData = this.slidetopdata.deptId;//当前详情页部门ID
        this.selectedDpet = this.slidetopdata.name;//当前详情页部门名称
      },
      closeDeptPop () {
        this.addDeptShow = false
        this.emptyDeptPopData();
        this.newOrEditTip = 0;
        this.closeTreePop();
        this.isParentId = true;//上级部门可选择
      },
      //主表编辑部门 弹窗显示 相关操作
      editeDeptPopShow() {
        this.newOrEditTip = 1;//标志编辑状态
        alert(this.newOrEditTip);
        console.log(this.selectedNum);
        let newAddName = document.getElementById('newAddName');
        let newAddNum = document.getElementById('newAddNum');
        this.deptWords = "编辑部门";//更换弹窗名称
        if(this.selectedNum !== 1) {//判断是否只是选中一条
          this.$Message.warning('只能编辑一条部门信息！');
        }else{
          this.addDeptShow = true;//弹框显示
          //上传选中的部门信息到弹窗
          postAjaxQ("/deptInfo/queryList",{
            deptId: this.selCheckBoxArr
          }).then(response =>{
            newAddName.value = response.data.obj[0].name
            this.selectedDpet = response.data.obj[0].parentName
            newAddNum.value = response.data.obj[0].orderNum
            this.selEditDeptId = response.data.obj[0].deptId//存储当前编辑的部门id供上传数据寻找标志位
//            this.deptIdData = response.data.obj[0].parentId
            console.log(response.data.obj)
          }).catch(error =>{})
        }
      },
      //详情编辑部门 弹窗显示 相关操作
      editeDetailPopShow() {
        this.newOrEditTip = 1;//标志编辑状态
        alert(this.newOrEditTip)
        let newAddName = document.getElementById('newAddName');
        let newAddNum = document.getElementById('newAddNum');

        this.deptWords = "编辑部门";//更换弹窗名称
        this.addDeptShow = true;//弹框显示
        //上传选中的部门信息到弹窗
        newAddName.value = this.slidetopdata.name
        this.selectedDpet = this.slidetopdata.parentName
        newAddNum.value = this.slidetopdata.orderNum
        this.selEditDeptId = this.slidetopdata.deptId//存储当前编辑的部门id供上传数据寻找标志位
        this.deptIdData = this.slidetopdata.parentId;//将详情页的parentId赋值到变量初始值
        console.log(this.deptIdData)
      },
      //清空新增弹窗数据
      emptyDeptPopData() {
        let newAddName = document.getElementById('newAddName');
        let newAddParent = document.getElementById('newAddParent');
        let newAddNum = document.getElementById('newAddNum');
        newAddName.value = "";
        newAddNum.value = "";
        this.selectedDpet = "请选择上级部门";
      },
      //主表新增 + 主表编辑 + 详情编辑(取值在editeDetailPopShow) + 详情页新增子部门 数据上传
      addNewDept(){
        let newAddName = document.getElementById('newAddName');
        let newAddParent = document.getElementById('newAddParent');
        let newAddNum = document.getElementById('newAddNum');
        if(newAddName.value == ""){
          this.$Message.warning('部门名称不可为空！');
          newAddName.focus();
        }else if(newAddName.value.length > 20){
          this.$Message.warning("部门名称长度不能超过20个字符！");
          newAddName.focus();
        }else if (this.selectedDpet == "请选择上级部门") {
          this.$Message.warning('上级部门不能为空！');
        }else if (newAddNum.value == "") {
          this.$Message.warning('排序号不能为空！');
          newAddNum.focus();
        }else if (!((/^(0|\+?[1-9][0-9]*)$/).test(newAddNum.value))) {
          this.$Message.warning('排序号必须为正整数！');
          newAddNum.focus();
        }else {
          if(this.newOrEditTip == 0) {//主表部门新增 + 详情新增子部门 功能
            alert("新增信息")
            // debugger
            postAjaxQ('/deptInfo/save',{
              name: newAddName.value,
              orderNum: newAddNum.value,
              parentId: this.deptIdData,//存储树中选的部门id
              parentName: this.selectedDpet
            }).then((response) => {
              if(response.data.code === 0){
                this.$Message.success('操作成功');
                console.log(response);
                this.getDeptTree();
                this.getDeptInformationList(0, this.pageSize);//刷新页面
                this.$refs['pages'].currentPage = 1;//分页
                this.rightEnter = false;//详情隐藏
              }else{
                this.$Message.warning('操作请求失败')
              }
            }).catch(error => {
              console.log(error);
            })
          }else if(this.newOrEditTip == 1) {//主表+详情 编辑功能
            alert("主表修改信息")
            console.log(this.deptIdData)
            //console.log(newAddName.value + newAddNum.value );
            // debugger
            postAjaxQ('/deptInfo/modify',{
              name: newAddName.value,
              orderNum: newAddNum.value,
              parentId: this.deptIdData,//存储树中选的部门id
              parentName: this.selectedDpet,
              deptId: this.selEditDeptId
            }).then((response) => {
              console.log(response)
              if(response.data.code === 0){
                this.$Message.success('操作成功');
                console.log(response)
                this.getDeptInformationList(0, this.pageSize);//刷新页面
                this.$refs['pages'].currentPage = 1;//分页
                this.getDeptTree();
                this.rightEnter = false;//右侧滑框
              }else{
                this.$Message.warning('操作请求失败')
              }
            }).catch(error => {
              console.log(error);
            })
          };
          this.closeDeptPop();
          this.isParentId = true;//上级部门可选择
        };
      },
      // 修改tree的插件名称显示格式
      getEditTree(tree=[]) {
        let arr = [];
        if (tree && tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.selected = false;
            obj.title = item.name;
            obj.children = this.getEditTree(item.children); // 递归调用
            obj.deptId = item.deptId;
            obj.expand = false;
            obj.checked = item.checked;
            arr.push(obj);
          })
        };
        return arr;
      },
      //获取部门树形菜单列表
      getDeptTree() {
        postAjaxQ('/deptInfo/queryList',{
          parentId: 0
        })
        .then((response) => {
          //console.log(response.data.obj)
          this.deptTreeData = this.getEditTree(response.data.obj)
        }).catch(error => {
          console.log(error);
        })
      },
      //解析选中树形菜单数据
      getDeptNameData(treeData) {//解析title
        if(!treeData){
          treeData = [
            {
              title: ""
            }
          ]
        }
        let title = ""
        for (let i = 0; i < treeData.length; i++) {
          title = title + " " + treeData[i].title
        }
        return title
      },
      getDeptIdData(treeData) {//解析deptId
        if(!treeData){
          treeData = [
            {
              deptId: ""
            }
          ]
        }
        let deptId = ""
        for (let i = 0; i < treeData.length; i++) {
          deptId = deptId + " " + treeData[i].deptId
        }
        return deptId
      },
      //存储选中的树节点
      getSelDeptData() {
        this.dataVal =  this.$refs.selTree.getSelectedNodes();//Tree方法：点击选中的部门获取当前部门数据
        this.selTreeData = this.getDeptNameData(this.dataVal);//存储转换格式后的部门名称
        this.deptIdData = this.getDeptIdData(this.dataVal);//存储转换格式后的部门id
        console.log(this.dataVal);
        //console.log(this.deptIdData);
        //return this.deptIdData;
      },
      //添加选中的树节点
      addSelTreeData() {
        if(this.selTreeData == ""){
          this.$Message.warning('请选择上级部门！');
        }else{
          this.selectedDpet = this.selTreeData;//将选择的部门名称赋值到弹窗
          this.closeTreePop();
        }
      },
      //================= 删除功能start ==================
      //点击主表删除按钮
      delDeptInforData(){
        this.delDepetModal = true;//弹框显示
      },
      okDelDept () {//确定删除
        console.log(this.selCheckBoxArr)
        postAjaxQ('/deptInfo/removeBatch',{ids:this.selCheckBoxArr})
        // this.$Ajax({
        //   method:'POST',
        //   url:'/deptInfo/removeBatch',
        //   params:{
        //     ids:this.selCheckBoxArr
        //   }
        // })
        .then((response) => {
          if(response.data.code === 0){
            this.$Message.success('操作成功');
            console.log(response);
            let backVal = response.data.obj;
            if(backVal){
              this.$Message.warning(backVal);
            }else{
              this.getDeptInformationList(0, this.pageSize);
              this.$refs['pages'].currentPage = 1;
              this.getDeptTree();
            }
          }else{
            this.$Message.warning('操作请求失败')
          }
        }).catch(error => {
          //console.log(error);
        })
      },
      //点击详情页删除按钮
      delDetailInforData(){
        this.delDetailModal = true;//弹框显示
      },
      okDelDetail () {//确定删除
        // this.$Ajax({
        //   method:'POST',
        //   url:'/deptInfo/removeBatch',
        //   params:{
        //     ids:this.slidetopdata.deptId
        //   }
        // })
          postAjaxQ('/deptInfo/removeBatch',{ids:this.slidetopdata.deptId})
        .then((response) => {
          if(response.data.code === 0){
            this.$Message.success('操作成功');
            console.log(response);
            this.getDeptInformationList(0, this.pageSize);
            this.$refs['pages'].currentPage = 1;
            this.getDeptTree();
          }else{
            this.$Message.warning('操作请求失败')
          }
        }).catch(error => {
          console.log(error);
        })
      },
      //================= 删除功能end ==================
      //================ 检索start=====================
      searchData(){
        let inputVal = this.$refs['searchInput'].value.length;
        if(inputVal === 0){
          this.$Message.warning('请输入要检索的部门名称！');
        }else{
         postAjaxQ('\n' + '/deptInfo/queryList',{
            name:this.deptNameSearch
          }).then((response) => {
            console.log(response);
            this.searchDeptData = response.data.obj;
            this.getSearchDeptInformationList(0, this.pageSize);
            this.searchShow=false;
            this.searchColor='#9c9c9c';
            this.deptNameSearch='';
            this.backToListShow = true;
          }).catch(error => {
            console.log(error);
          })
        }
      },
      // 将获取的数据显示在列表
      getSearchDeptInformationList(pageNum, pageSize){
        postAjaxQ('\n' + '/deptInfo/queryListPage/' + pageNum + '/' + pageSize, {})
        .then((response) => {
          //console.log(response);
          this.data = this.searchDeptData;
          this.totalPage = this.searchDeptData.totalElements;
        }).catch(error => {
          console.log(error);
        })
      },
      //返回部门列表
      backToDeptList(){
        this.getDeptInformationList(0, this.pageSize);
      }
      //================ 检索end=====================

    },
    created() {
      document.querySelector('body').addEventListener('click', this.bodyClick);
    },
    mounted() {
      this.getDeptInformationList(0, this.pageSize);
      this.getDeptTree();
      // this.makeButtonAuthorityArray();

    },
    destroyed(){
      document.querySelector('body').removeEventListener('click', this.bodyClick);
    }
  }
</script>
<style scoped>
  body {
    height: 100%;
    background-color: #fff;
  }
  .rotate90:hover {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }
  /*对ingput框加减符号做修改*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  /*顶部标题栏及编辑栏样式*/
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

  .editBox {
    height: 60px;
    line-height: 60px;
    padding: 0 0px 0 20px;
  }
  #topToolBar{
    width: 100%;
    height: 60px;
  }
/*表格样式*/
  .noDeptDataTip{
    width: 100%;
    height: 40px;
    line-height:40px;
    border: 1px solid #e7e7e7;
    border-top: none;
  }

  .staffTable {
    width: 100%;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #666;
  }

  .staffTable td {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 44px;
  }

  .per5 {
    width: 5%;
  }

  .per10 {
    width: 10%;
  }

  .per12 {
    width: 12%;
  }

  .per15 {
    width: 15%;
  }

  .per20 {
    width: 20%;
  }

  .per35 {
    width: 35%;
  }

  .per40 {
    width: 40%;
  }

  .per60 {
    width: 60%;
  }

  .RoleName {
    display: inline-block;
    height: 42.5px;
    line-height: 42.5px;
    width: 30%;
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
    left: 25%;
    top: 90px;
    margin: 0 0 0 -250px;
    border-radius: 4px;
    overflow: hidden;
  }

  .popHead {
    height: 45px;
    background-color: #2299ee;
    padding: 0 20px;
  }

  .popHeadName {
    color: #fff;
    font-size: 16px;
    line-height: 45px;

  }

  .popHeadClose {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }

  .popBody {
    height: 323px;
    padding: 24px 20px 15px 20px;
    overflow-y: scroll;
  }

  #popBg02.popBox{
    height: 400px;
    width: 350px;
    margin-left: 300px;
  }

  #popBg02 .popBody{
    height: 300px;
    padding: 15px 20px 10px;
    margin-bottom: 5px;
  }

  .ParentNameNow{
    height: 40px;
    line-height:40px;
    padding: 0 20px;
    border-bottom: 1px solid #efefef;
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

  /*.checkbox-group{*/
    /*width: 324px;*/
  /*}*/
  /**/
  /*.checkbox-group label{*/
    /*margin-right: 14px;*/
    /*margin-bottom: 5px;*/
  /*}*/

  .higherDept{
    background: #ededed;
    cursor: pointer;
    line-height: 34px;
  }

  /*修改滚动条的样式*/
  /*滚动条样式*/
  .scrollBar::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .scrollBar::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #c7c7c7;
  }

  .scrollBar::-webkit-scrollbar-track { /*滚动条里面轨道*/
    border-radius: 0;
  }

/*右侧滑出框样式*/
  .RightSlide {
    width: 73%;
    height: 100%;
    background-color: #fff;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0px 0px 6px #ddd;
  }

  .RightSlideTit {
    width: 100%;
    height: 125px;
    left: 0;
    right:0;
    top:0;
  }

  .RightSlide .titTable{
    margin-left: 27px;
  }

  .RightSlide .titTable td{
    height: 28px;
  }

  .RightSlideBody{
    width: 100%;
    top: 125px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .StaffTable_Tit{
    width: 100%;
    height: 40px;
    top:2px;
    left:0;
    right:0;
  }
  .StaffTable_Body{
    width: 100%;
    left:0;
    right: 0;
    top: 42px;
    bottom:0;
    overflow-y: scroll;
  }
  a:hover{
    color: #57a3f3;
  }
  /*右侧滑出框表格样式*/
  .StaffTable{
    border-top: 2px solid #2399ee;
  }
  .StaffTable tr{
    border-bottom: 1px solid #e7eaec;
  }
  .StaffTable tr td{
    height: 40px;
    border-right: 1px solid #e7eaec;
    padding: 0 5px;
}
</style>
