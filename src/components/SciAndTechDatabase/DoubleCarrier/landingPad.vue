<template>
  <div style="background-color: #fff; height: 100%; min-width: 1000px" class="pr enterprisePage">
    <!--顶部工具条 start-->
    <div id="topToolBar">
      <!--01-->
      <div class="clearfix pr animated bounceInRight" v-show="beforeSelect">
        <h3 class="fl PageTitle">创新创业基地</h3>
        <span style="z-index: 2" id="PageIcon" class="PageIcon fl" @click.stop="searchShow=true;searchColor='#2599ec'">
          <Icon style="z-index: 1" type="search" :color="searchColor" size="20"></Icon>
        </span>
        <Button v-show="backToListShow" class="fl backToList mt15 ml20" type="ghost" icon="reply">返回列表</Button>
        <!--检索框 start-->
        <transition name="fade">
          <div @click.stop="searchShow = true" id="searchPop" class="searchPop clearfix" v-show="searchShow">
            <!--检索导航 start-->
            <div class="searchMenu fl">
              <a href="javascript:;" class="block menuName transi mt15" :class="{'active': serTitOn}" @click.stop="serShow = true;serTitOn=true">常用检索</a>
              <a href="javascript:;" class="block menuName transi" :class="{'active': !serTitOn}" @click.stop="serShow = false;serTitOn=false">自定义检索</a>
            </div>
            <!--检索导航 end-->
            <!--检索内容选择 start-->
            <div class="searchTerm fl">
              <div v-show="serShow" class="commonSearch pr">
                <i class="serArr block pa"></i>
                <ul class="scrollBar">
                  <li class="textoverflow" @click="getBusinessInformationList(0,10,$event,'49')">国家级</li>
                  <li class="textoverflow" @click="getBusinessInformationList(0,10,$event,'51')">市级</li>
                </ul>
              </div>
              <div v-show="!serShow" class="customSearch pr">
                <i class="serArr block pa"></i>
                <!--表单列表 start-->
                <Form class="scrollBar" ref="serformItem" :model="serformItem" :label-width="100">
                  <Row>
                    <Col span="12">
                    <FormItem label="基地名称" prop="nameInput">
                      <Input v-model="serformItem.nameInput" style="width: 165px" placeholder="基地名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="所属单位" prop="operationName">
                      <Input v-model="serformItem.operationName" style="width: 165px" placeholder="请输入所属单位名称"></Input>
                    </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                    <FormItem label="级别" prop="selectedRank">
                      <Select v-model="serformItem.selectedRank" style="width: 175px">
                        <Option value="全部"></Option>
                        <Option :key="index" v-for="(item,index) in industryTypeData" :value="item.value">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                    </Col>

                  </Row>

                  <FormItem class="pa serBtns" style>
                    <Button type="primary" @click.stop="getBusinessInformationList(0, 10)">查询</Button>
                    <Button @click="handleReset('serformItem')" class="ml10">重置</Button>
                  </FormItem>
                </Form>
                <!--表单列表 end-->
              </div>
            </div>
            <!--检索内容选择 end-->
          </div>
        </transition>
        <!--检索框 end-->
        <Button class="fr sendNotice mt13 mr20" type="primary">发送通知</Button>
        <Button class="fr sendNotice mt13 mr10" type="primary">下载模板</Button>
        <Button class="fr tableExportBtn mt13 mr10" type="primary"><i class="iconfont icon-export mr5"></i>导出</Button>
        <Button class="fr tableImportBtn mt13 mr10" type="primary"><i class="iconfont icon-import mr5"></i>导入</Button>
      </div>
      <!--02-->
      <!--编辑栏 start-->
      <div class="clearfix editBox animated bounceInLeft" v-show="afterSelect">
        <ul class="fl clearfix f14">
          <li class="fl">
            <span>已选中</span>
            <a href="javascript:;" class="f14" id="selectedNum">{{ this.checkList.length }}</a>
            <span>项</span>
          </li>
          <li class="fl ml10 mr10" style="margin-top:-2px;">|</li>
          <li class="fl">
            <a href="javascript:;" class="f_6" @click.stop="Checkdelete"><Icon size="16" type="trash-a" class="mr5"></Icon>删除</a>
          </li>
        </ul>
        <a href="javascript:;" class="fr topbar_CloseBtn tc" @click="leftBack">
          <Icon type="close" size="18"></Icon>
        </a>
      </div>
      <!--编辑栏 end-->
    </div>
    <!--</div>-->
    <!--顶部工具条 end-->
    <!--右侧滑框 start-->
    <transition name="rightSlide" enter-active-class="animated bounceInRight" leave-to-class="animated bounceOutRight">
      <div class="RightSlide pa" v-show="rightEnter" @click.stop>
        <common-detail :tabShowSign="this.tabShowSign"
                       :companyId="this.companyId"
        ></common-detail>
      </div>
    </transition>
    <!--右侧滑框 end-->
    <!--表格列表 start-->
    <div @click.stop>
      <div id="mainTable">
        <table width="100%">
          <thead>
          <tr class="Table_Head">
            <th class="tc"><input v-model="checkAll" @change.stop="checkAllData()" type="checkbox" id="allAndNotAll" name="" /></th>
            <th>序号</th>
            <th>基地名称</th>
            <th>所属单位</th>
            <th>级别</th>
          </tr>
          </thead>
          <tbody>
            <tr v-if="mainData.length>0" class="Table_List" :key="index" v-for="(item,index) in mainData">
              <td width="5%" class="tc"><input v-model="checkList" :value="item.iD" @change="checkOne" type="checkbox" name="childCheck"></td>
              <td width="5%"><div class="textoverflow">{{index+1}}</div></td>
              <td width="30%"><div class="textoverflow detailShow" @click.stop="showEnterpriDetail(item.companyCode)">{{item.companyName?item.companyName:''}}</div></td>
              <td width="30%"><div class="textoverflow">{{item.name?item.name:''}}</div></td>
              <td width="30%"><div class="textoverflow">{{item.levelDto?item.levelDto.name:''}}</div></td>
            </tr>
            <tr v-if="mainData.length === 0">
              <td colspan="10" class="tc">
                <div v-if="isLoading" class="loading" style="padding: 150px 0;">
                  <Spin>
                    <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                  </Spin>
                </div>
                <span v-if="!isLoading">暂无相关数据</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          <div style="float: right;margin-top:20px;">
          <Page :total="totalNum" ref="pages" @on-change="changePage"></Page>
        </div>
    </div>
    <!--表格列表 end-->
  </div>
</template>
<script>
  import '../../../assets/css/animate.css'
  import '../../../../static/IconFont/iconfont.css'
  import CommonDetail from '../CommonModule/CommonDetail.vue'
  import Layout from '../../layout'
      import { postAjax, getAjax} from "../../../api/api.js";
  export default {
    props:["navSign"],
    data () {
      return {
        totalNum: 1,
        pageSize: 10,
        currentPage:'1',
        mainData: [],
        areaData:[],//所属区县
        registerTypeData:[],//注册类型
        companyId:'',//存储公共id
        industryTypeData:'',//级别
        //标志位
        tabShowSign: 'landingSign',
        //表格全选反选等
        checkAll: false,
        checkList: [],// 存放选中元素Id
        // 显示隐藏等效果的控制变量
        beforeSelect: true,// 部门管理头部栏
        afterSelect: false,// 编辑栏
        backToListShow: false,//返回列表按钮显示
        searchShow: false,//搜索框显示隐藏
        searchColor: '#9c9c9c',//搜索框颜色设置
        backToListShow: false,//检索后返回主表格
        serShow: true,//检索主体内容切换
        serTitOn: true,//检索框标题选中
        rightEnter: false,//右侧滑框
        isLoading: true,//loading加载显示与否
        //搜索条件form数据存储
        valSearch:'',
        searchE:'',
        serformItem: {
          nameInput: '',
          operationName: '',
          selectedRank: '',
          // selectedType: ''

        }
      }
    },
    components: {
      CommonDetail
    },
    methods: {
      //控制顶部工具条显示
      leftEnter () {
        this.beforeSelect = false;
        this.afterSelect = true;
      },
      //控制顶部工具条隐藏
      leftBack () {
        this.beforeSelect = true;
        this.afterSelect = false;
      },
      // 监听body并关闭弹出框
      bodyClick (){
        this.searchShow = false;
        this.searchColor = '#9c9c9c';
        this.rightEnter = false;
        console.log("关闭所有弹窗")
      },
      //搜索条件提交按钮功能
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //搜索条件重置按钮功能
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      // 全选反选主表格
      checkAllData(){
        if (this.checkAll == false) {//实现反选
          this.checkList = [];
          // console.log(this.checkList.toString())
          this.leftBack()
        } else {//实现全选
          this.leftEnter();
          this.checkList = [];
          
          this.mainData.forEach((item, index) =>{
            this.checkList.push(item.id);
          })
          console.log(this.checkList.join(','))
        }
      },
      //单选
      checkOne(){
        console.log(this.checkList.join(','))
      },
      Checkdelete(){
        // debugger
          postAjax('/innovationEntrepreneurship/removeBatch?ids='+this.checkList.join(','))
          .then((response) => {
            if(response.data.code === 0){
              this.$Message.success('删除成功！');
              this.getBusinessInformationList(this.currentPage-1, this.pageSize);
              this.beforeSelect=true
              this.rightEnter=false;
              this.afterSelect=false;
              this.checkList = [];
            }else {
              this.$Message.warning("区域数据请求异常")
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //请求区域数据
      getAreaData() {
        postAjax('/areaInfo/queryList', {
          "parentId": 35
        })
          .then((response) => {
            if(response.data.code === 0){
              this.areaData = response.data.obj;
            }else {
              this.$Message.warning("区域数据请求异常")
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //请求类型
      getRegisterTypeData(){
        postAjax('/dictInfo/queryList', {
          "groupCode": "incubator_type"
        })
          .then((response) => {
            if(response.data.code === 0){
              this.registerTypeData = response.data.obj;
            }else {
              this.$Message.warning("注册类型数据请求异常");
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //请求级别
      getIndustryTypeData(){
        postAjax('/dictInfo/queryList', {
          "groupCode": "incubator_level"
        })
          .then((response) => {
            if(response.data.code === 0){
              this.industryTypeData = response.data.obj;
            }else {
              this.$Message.warning("级别数据请求异常");
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //请求主表格数据
      getBusinessInformationList(pageNum, pageSize,e,val) {
        this.$refs['pages'].currentPage = 1;
          this.valSearch='';
        let param = {};
        let ifEnterpName = this.serformItem.nameInput === '' ;//企业名称
        let ifArea = this.serformItem.operationName === '' ;//运营管理机构
        let ifRegisterTypeName = this.serformItem.selectedRank === '' ;//级别
        if(!ifEnterpName){//搜索值不为空—企业名称
          let data = this.serformItem.nameInput;
          param.companyName = data //给json添加子对象
        };
        if(!ifArea){//搜索值不为空—运营管理机构
         let data = this.serformItem.operationName;
          param.name = data //给json添加子对象
        };
        if(!ifRegisterTypeName){//搜索值不为空—级别
          let data = this.serformItem.selectedRank;
          if(data !== '全部'){//搜索值不全部
            param.level=data
          }
        };

        if(val){
          this.valSearch=val;
          this.searchE=e;
          param.level =val
         
        }
        postAjax('/innovationEntrepreneurship/queryListPage/' + pageNum + '/' + pageSize, param)
          .then((response) => {
            if(response.data.code === 0){
              this.isLoading = false;
              this.mainData = response.data.obj.content;
              this.totalNum = response.data.obj.totalElements;
            }else {
              this.$Message.warning("数据请求异常")
            }
          })
          .catch(error => {
            console.log(error);
          })
      },

  //请求主表格数据
      getSearchList(pageNum, pageSize,e,val) {
          this.valSearch='';
        let param = {};
        let ifEnterpName = this.serformItem.nameInput === '' ;//企业名称
        let ifArea = this.serformItem.operationName === '' ;//运营管理机构
        let ifRegisterTypeName = this.serformItem.selectedRank === '' ;//级别
        if(!ifEnterpName){//搜索值不为空—企业名称
          let data = this.serformItem.nameInput;
          param.companyName = data //给json添加子对象
        };
        if(!ifArea){//搜索值不为空—运营管理机构
         let data = this.serformItem.operationName;
          param.name = data //给json添加子对象
        };
        if(!ifRegisterTypeName){//搜索值不为空—级别
          let data = this.serformItem.selectedRank;
          if(data !== '全部'){//搜索值不全部
            param.level=data
          }
        };

        if(val){
          this.valSearch=val;
          this.searchE=e;
          param.level =val
         
        }
        postAjax('/innovationEntrepreneurship/queryListPage/' + pageNum + '/' + pageSize, param)
          .then((response) => {
            if(response.data.code === 0){
              this.isLoading = false;
              this.mainData = response.data.obj.content;
              this.totalNum = response.data.obj.totalElements;
            }else {
              this.$Message.warning("数据请求异常")
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      //点击分页
      changePage(pageNum){
       this.getSearchList(pageNum - 1, this.pageSize,this.searchE,this.valSearch)
         this.currentPage=pageNum;
      },
      // 点击详情页展示
      showEnterpriDetail(companyId){
        this.searchColor='#9c9c9c';
        this.searchShow=false;
        //详情页展示隐藏
        if(this.rightEnter == false){
          this.rightEnter = true;//详情页展开
          if(this.navSign == false){//判断左侧菜单是否收缩
            this.$emit('navSlideToggle');//调用父组件方法控制导航收缩
          }
        };
        //存储当前行id
        this.companyId = companyId;
      },
    },
    watch: {
      'checkList': {//监听列表选中情况控制全选反选
        handler: function(val) {
          if (val.length === this.mainData.length) {
            this.checkAll = true;
            this.leftEnter();
          }else if(val.length === 0){
            this.leftBack();
            this.checkAll = false;
          }else {
            this.checkAll = false;
            this.leftEnter();
          }
        },
        deep: true
      }
    },
    created() {
      document.querySelector('body').addEventListener('click', this.bodyClick);
    },
    mounted() {
      this.getBusinessInformationList(0, this.pageSize);
      this.getAreaData();//请求区域数据
      this.getRegisterTypeData();//请求注册类型数据
       this.getIndustryTypeData();//请求行业分类数据
    },
    destroyed(){
      document.querySelector('body').removeEventListener('click', this.bodyClick);
    }
  }
</script>
<style scoped>
  .mt13{ margin-top: 13px; }
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
  /*修改滚动条的样式*/
  /*滚动条样式*/
  .scrollBar::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
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
    width: 80%;
    height: 100%;
    background-color: #fff;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0px 0px 6px #ddd;
  }
  .RightSlideTit {
    width: 100%;
    height: 140px;
    left: 0;
    right:0;
    top:0;
  }
  .RightSlideTit .iconfont{
    color: #2399ee;
    font-size: 18px;
  }
  .RightSlide .titTable{
    margin-left: 30px;
    width: 95%;
  }
  .RightSlide .titTable td{
    height: 28px;
  }
  .RightSlide .toolTip li{
    padding: 0 5px;
    height: 24px;
    line-height:24px;
    background: #fa9749;
    border-radius: 3px;
    margin-right: 5px;
    color: #fff;
  }
  .RightSlideBody{
    width: 100%;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .RightSlideBody .navPosiTit{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 50px;
    padding: 0 28px;
    box-shadow: 0 1px 2px #f5f5f5;
  }
  .RightSlideBody .navPosiTit li{
    cursor: pointer;
    height: 30px;
    line-height:30px;
    background: #f6f6f6;
    color: #7199b6;
    font-size: 14px;
    text-align: center;
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 4px;
    margin-top: 9px;
  }
  .RightSlideBody .navPosiTit li a{
    display: block;
  }
  .RightSlideBody .navPosiCon{
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    overflow-y: scroll;
    padding: 0px 25px 30px;
  }
  .navPosiCon_title{
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }
  .navPosiCon_title p{
    left: 0;
    top: 0px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding: 0 10px 0 0;
    z-index: 1;
    color: #2399ee;
  }
  .navPosiCon_title i{
    width: 100%;
    border: 1px solid #e0e0e0;
    left:0;
    top: 24px;
    z-index:0;
  }
  .navPosiCon table td{
    border: 1px solid #e7eaec;
    height: 30px;
    padding: 0 10px;
  }
  .navPosiCon table td.tit{
    background: #f3f5f9;
    font-size: 12px;
    font-weight: bold;
  }



  /*检索框样式*/
  #searchPop {
    height: 238px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0px 0px 6px #e0e0e0;
    position: absolute;
    top: 45px;
    left: 98px;
    z-index: 9;
    background-color: #fff;
  }
  #searchPop .searchMenu{
    width: 88px;
    height: 100%;
    background: #293247;
    border-radius: 4px 0 0 4px;
  }
  #searchPop .searchTerm{
    height: 100%;
  }
  #searchPop .menuName{
    color: #ccc;
    height: 30px;
    line-height: 30px;
    padding-left: 13px;
  }
  #searchPop .menuName.active{
    color: #fff;
  }
  #searchPop .menuName:hover{
    color: #fff;
  }
  #searchPop .commonSearch{
    width: 308px;
    height: 100%;
    padding: 15px 10px 15px 20px;
  }
  #searchPop .commonSearch ul{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  #searchPop .commonSearch li{
    font-size: 14px;
    height: 30px;
    line-height:30px;

  }
  #searchPop .commonSearch li:hover{
    color: #2399ee;
    cursor: pointer;
  }
  #searchPop .commonSearch .serArr{
    left: -7px;
    top:25px;
  }
  #searchPop .customSearch{
    width: 580px;
    height: 100%;
    padding: 15px 10px 0px 15px;
  }
  #searchPop .customSearch .scrollBar{
    width: 100%;
    height: 175px;
    overflow-y: scroll;
  }
  #searchPop .customSearch .serArr{
    left: -7px;
    top: 53px;
  }
  .serBtns{
    bottom: -5px;
    right:25px;
  }
  .serBtns button{
    width: 70px;
  }

  #searchPop .serArr{
    width: 7px;
    height: 12px;
    background: url("../../../../static/images/icon_searchArr.png");
    z-index: 10;
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
  .editBox {
    height: 60px;
    line-height: 60px;
    padding: 0 0px 0 20px;
  }
  #topToolBar{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
  }
  .tableExportBtn,.tableImportBtn  {
    padding: 3px 20px 4px;
  }
  .sendNotice{
    padding: 7px 25px 6px;
  }
  /*主表格样式mainTable*/
  #mainTable table{
    color: #666;
    border-bottom: 1px solid #e7eaec;
  }
  #mainTable table th{
    padding: 0 10px;
    height: 40px;
    background: #f3f5f9;
    border-right: 1px solid #e7eaec;
    font-weight: bold;
  }
  #mainTable table td{
    position: relative;
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #e7eaec;
  }
  #mainTable table td div{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  #mainTable table td p{
    height: 40px;
    line-height: 40px;
  }
  #mainTable .Table_List:nth-of-type(even){
    background: #f3f5f9;
  }
  #mainTable .Table_List{
    border-top: 1px solid #e7eaec;
  }
  #mainTable .Table_List .detailShow{
    border: 1px solid rgba(0,0,0,0);
    cursor: pointer;
  }
  #mainTable .Table_List .detailShow:hover{
    border: 1px solid #2399ee;
    color: #2399ee;
  }
</style>
