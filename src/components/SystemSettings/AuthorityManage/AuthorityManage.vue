<template>
    <div class="bg_white pr" style="height: 100%; overflow-x: hidden">
        <div class="authority-manage-box" style="height: 100%;">
            <!--确认删除框-->
            <Modal v-model="effectSwitch.isShowModal" @on-ok="makedeleteAuthorityData()">
                <p>{{modalTip}}</p>
            </Modal>
            <div @click.stop="returnFalse()" v-show="effectSwitch.editAuthorityAlertSwitch" class="pf" id="shadow">
            </div>
            <div class="pa" id="menu-tree-alert-box" @click.stop="returnFalse()" v-show="effectSwitch.menuTreeAlertSwitch">
                <div class="alert-box-top clearfix">
                    <span class="fl ml20 alert-title f_white">选择菜单</span>
                    <span class="fr mr20 cp transi rotate90 close-alert-btn"
                          @click="effectSwitch.menuTreeAlertSwitch=false"><Icon color="#fff" type="close-round"></Icon></span>
                </div>
                <div class="menu-tree-box scrollBar">
                    <div class="pt20 pl40">
                        <Tree ref="menuTree" :data="menuTreeData"></Tree>
                    </div>
                </div>
                <div class="pr" style="height: 50px;">
                    <div class="pa" style="bottom:10px; right: 0;">
                        <div class="fr mr25">
                            <Button type="primary" @click="selectMenu()">确定</Button>
                        </div>
                        <div class="fr mr10">
                            <Button @click="effectSwitch.menuTreeAlertSwitch=false">取消</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div @click.stop="returnFalse()" v-show="effectSwitch.editAuthorityAlertSwitch" id="edit-authority-alert-box"
                 class="pa">
                <div class="alert-box-top clearfix">
                    <span class="fl ml20 alert-title f_white">编辑</span>
                    <span class="fr mr20 cp transi rotate90 close-alert-btn"
                          @click="effectSwitch.editAuthorityAlertSwitch=false,effectSwitch.menuTreeAlertSwitch=false"><Icon color="#fff" type="close-round"></Icon></span>
                </div>
                <div class="authority-alert-content clearfix">
                    <div class="clearfix mt15">
                        <div class="form-tag fl">类型</div>
                        <div class="fl" style="line-height: 34px;">
                            <RadioGroup @on-change="radioChange()" v-model="editAuthorityDataModel.authorityDataModel.type">
                                <span class="inlineblock mr10"><Radio label="0">目录</Radio></span>
                                <span class="inlineblock mr10"><Radio label="1">菜单</Radio></span>
                                <span class="inlineblock mr10"><Radio label="2">按钮</Radio></span>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="clearfix mt10">
                        <div class="form-tag fl">菜单名称</div>
                        <div class="fl">
                            <input ref="menuname" v-model="editAuthorityDataModel.authorityDataModel.name" class="block" type="text">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl">上级菜单</div>
                        <div class="fl">
                            <input ref="parentName" v-model="editAuthorityDataModel.authorityDataModel.parentName" class="block bg_f8 cp" readonly="readonly" type="text" @click="getMenuTreeData()">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl">菜单URL</div>
                        <div class="fl">
                            <input ref="url" v-model="editAuthorityDataModel.authorityDataModel.url" class="block" type="text">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl">授权标识</div>
                        <div class="fl">
                            <input ref="prems" v-model="editAuthorityDataModel.authorityDataModel.perms" class="block" type="text">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl">排序号</div>
                        <div class="fl">
                            <input ref="orderNum" v-model="editAuthorityDataModel.authorityDataModel.orderNum" class="block" type="text">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl">图标</div>
                        <div class="fl">
                            <input ref="icon" v-model="editAuthorityDataModel.authorityDataModel.icon" class="block" type="text">
                        </div>
                    </div>
                    <div class="clearfix mt15">
                        <div class="form-tag fl"></div>
                        <div class="fl">
                            <p class="f_red">获取图标：http://fontawesome.io/icons/</p>
                        </div>
                    </div>
                </div>
                <div class="pr" style="height:50px;">
                    <div class="pa" style="bottom:10px; right: 0;">
                        <div class="fr mr25">
                            <Button type="primary" @click="saveMenuData()">确定</Button>
                        </div>
                        <div class="fr mr10">
                            <Button @click="effectSwitch.editAuthorityAlertSwitch=false,effectSwitch.menuTreeAlertSwitch=false">取消</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top-tool-box">
                <transition mode="out-in" enter-active-class="animated bounceInLeft">
                    <div id="tool-one" class="tool-group-one clearfix" v-show="!(effectSwitch.editToolSwitch)">
                        <div class="fl pr">
                            <span class="f16 f_6 block fl content-title fb ml25">权限管理</span>
                        </div>
                        <div class="fr">
                            <span  class="add-authority-btn block f_white f14 cp"
                                  @click="openEditMenuPopUp()">+新增菜单</span>
                        </div>
                    </div>
                </transition>
                <transition mode="out-in" enter-active-class="animated bounceInLeft">
                    <!--编辑栏 start-->
                    <div class="clearfix editBox" v-show="effectSwitch.editToolSwitch">
                        <ul class="fl clearfix">
                            <li class="fl">
                                已选中 <a href="javascript:;">{{ checkModel.length }}</a> 项
                            </li>
                            <li  class="fl">
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a  href="javascript:;" class="f_6" @click.stop="modifyMenuData()">
                                    <Icon type="edit"></Icon>
                                    编辑</a>
                            </li>
                            <li  class="fl">
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a @click="deleteAuthorityData()" href="javascript:;" class="f_6">
                                    <Icon size="16" type="trash-a"></Icon>
                                    删除</a>
                            </li>
                            <li  class="fl">
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a @click="openEditMenuPopUp()" href="javascript:;" class="f_6">
                                    <Icon size="16" type="plus-round"></Icon>
                                    新建菜单</a>
                            </li>
                        </ul>
                        <a href="javascript:;" class="fr" @click="effectSwitch.editToolSwitch=false">
                            <Icon type="close"></Icon>
                        </a>
                    </div>
                    <!--编辑栏 end-->
                </transition>
            </div>
            <div class="table-box width100">
                <div class="width100">
                    <table class="table table-bordered" id='hl-tree-table'>
                        <thead>
                            <tr>
                                <th style="width: 5%;"><input type="checkbox" v-model="checkAll" @change="checkAllData()"></th>
                                <th style="width: 5%;"><label>菜单ID</label></th>
                                <th style="width: 13.75%;"><label>菜单名称</label></th>
                                <th style="width: 13.75%;"><label>上级菜单</label></th>
                                <th style="width: 5%;"><label>类型</label></th>
                                <th style="width: 5%;"><label>排序号</label></th>
                                <th style="width: 23.75%;"><label>菜单URL</label></th>
                                <th style="width: 26.75%;"><label>授权标识</label></th>
                            </tr>
                        </thead>
                        <tbody class="triggerStyle">
                        <tr v-for="(item,index) in initItems" :key="item.id" v-show="show(item)" :class="{'child-tr':item.parent}">
                            <td v-for="(column,snum) in trColumns" :key="column.key" :style=tdStyle(trColumns) class="pr">
                                <div class="width100 tc block" v-if="column.type === 'selection'">
                                    <input type="checkbox" :value="item.menuId" v-model="checkModel">
                                </div>
                                <div @click.stop="toggle(index,item)" v-if="!column.type" class="pa triggerStyle_label textoverflow" :title="renderBody(item,column)">
                            <span v-if='snum==iconRow()'>
                                <span v-html='item.spaceHtml'></span>
                                <i v-if="item.menuInfoDtoList&&item.menuInfoDtoList.length>0" class="ivu-icon" :class="{'ivu-icon-chevron-right':!item.expanded,'ivu-icon-chevron-down':item.expanded }"></i>
                                <i v-else class="ms-tree-space"></i>
                            </span> {{renderBody(item,column) }}
                                </div>
                            </td>
                        </tr>
                        <tr v-if="dataSource.length === 0">
                            <td colspan="9" class="tc">
                                <div class="loading" v-if="isFirstLoading" style="padding: 100px 0;">
                                    <Spin>
                                        <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                </div>
                                <span v-if="!isFirstLoading">暂无相关数据</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style="margin: 20px;overflow: hidden">
                    <div style="float: right;">
                        <Page ref="pages" :total="totalPage" :page-size="pageSize" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
            <transition name="rightSlide" enter-active-class="animated bounceInRight"
                        leave-to-class="animated bounceOutRight">
                <div @click.stop="returnFalse()" v-show="effectSwitch.authorityDetailShowSwitch" class="authority-detail-wrapper pa">
                    <!--右侧滑入框 start-->
                    <div class="RightSlide pa pb40">
                        <h3 class="RightSlideTit clearfix pl25 pr25">
                            <span class="fl f18"><Icon class="mr10 f20" color="#2299ee" type="navicon-round"></Icon>{{ currentAuthorityDetailSource.name || '' }}</span>
                        </h3>
                        <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
                            <span class="fl">基本信息</span>
                            <span class="fl bgLine"></span>
                        </div>
                        <ul class="pl25 pr25 baseList">
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">菜单ID</span>
                                <span class="f14 fl baseCon">{{ currentAuthorityDetailSource.menuId || '' }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">菜单名称</span>
                                <span class="f14 fl baseCon">{{ currentAuthorityDetailSource.name || '' }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">上级菜单</span>
                                <span class="f14 baseCon fl">{{ currentAuthorityDetailSource.parentName || '无' }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">菜单URL</span>
                                <span class="f14 fl baseCon">{{ currentAuthorityDetailSource.url || '' }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">授权标识</span>
                                <span class="f14 fl baseCon">{{ currentAuthorityDetailSource.perms || '' }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">类型</span>
                                <span class="f14 fl baseCon">{{ getMenuType(currentAuthorityDetailSource.type) }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">排序号</span>
                                <span class="f14 fl baseCon">{{ currentAuthorityDetailSource.orderNum || "" }}</span>
                            </li>
                            <li class="clearfix">
                                <span class="baseTagName f_9 f14 fl">图标</span>
                                <span class="f14 fl baseCon">{{currentAuthorityDetailSource.icon || ""}}</span>
                            </li>
                        </ul>
                    </div>
                    <!--右侧滑入框 end-->
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import '../../../assets/css/animate.css'
    import Layout from '../../layout'
    import { postAjaxQ, getAjaxQ} from "../../../api/api.js";
    export default {
        props:["message"],
        components:{
            Layout
        },
        data() {
            return {
                checkButtonArray:[],
                modalTip:"",
                isFirstLoading:true,
                initItems:[],
                trColumns: [{
                    type: 'selection',
                    width: '20',
                },
                {
                    title: '菜单ID',
                    key: 'menuId',
                    sortable: true,
                    width: '100',
                },
                {
                    title: '菜单名称',
                    key: 'name',
                    width: '150',
                },
                {
                    title: '上级菜单',
                    key: 'parentName',
                    width: '150',
                },
                {
                    title: '类型',
                    key: 'type',
                    width: '100',
                },
                {
                    title: '排序号',
                    key: 'orderNum',
                    width: '100',
                },
                {
                    title: '菜单URL',
                    key: 'url',
                    width: '260',
                },
                {
                    title: '授权标识',
                    key: 'perms',
                    width: '260',
                }
                ],
                checkAll: false,
                isHasChildrenList:false,
                checkModel: [],
                // 显示隐藏等效果的控制变量
                effectSwitch: {
                    editToolSwitch: false,
                    editAuthorityAlertSwitch: false,
                    menuTreeAlertSwitch: false,
                    authorityDetailShowSwitch: false,
                    isShowModal:false
                },
                //权限信息编辑模型
                editAuthorityDataModel:{
                    isModifyFlag:false,
                    authorityDataModel:{
                        "icon": "",
                        "menuId": 0,
                        "menuInfoDtoList":[],
                        // "menuLevel": 0,
                        "name": "",
                        "orderNum": "",
                        "parentId": 0,
                        "parentName": "",
                        "perms": "",
                        "type": "",
                        "url": ""
                    }
                },
                menuTreeData:[],
                // 样式变化的控制变量
                totalPage: 100,
                pageSize:10,
                pageNum:1,
                dataSource: [],
                currentAuthorityDetailSource: {}
            }
        },
        created() {
            this.$Message.config({
                top: 50,
                duration: 2
            })
            document.querySelector('body').addEventListener('click', this.bodyClickFunction)
        },
        methods: {
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
            radioChange(){
                if(this.editAuthorityDataModel.authorityDataModel.type == "0"){
                    this.effectSwitch.menuTreeAlertSwitch = false
                    this.editAuthorityDataModel.authorityDataModel.parentName = "一级菜单"
                    this.editAuthorityDataModel.authorityDataModel.parentId = 0
                }else{
                    this.editAuthorityDataModel.authorityDataModel.parentName = ""
                }
            },
            // 设置td宽度,td的align
            tdStyle(column) {
                var style = {}
                if (column.align) {
                    style["text-align"] = column.align;
                }
                if (column.width) {
                    style["min-width"] = column.width + 'px';
                }
                return style;
            },
            //  隐藏显示
            show(item) {
                return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
            },
            iconRow() {
                for (var i = 0, len = this.trColumns.length; i < len; i++) {
                    if (this.trColumns[i].type == 'selection') {
                        return 2
                    }
                }
                return 0
            },
            renderBody(row, column, index) {
                if(column.key == "type"){
                    if(row[column.key]=== "0"){
                        return "目录"
                    }else if(row[column.key]=== "1"){
                        return "菜单"
                    }else if(row[column.key]=== "2"){
                        return "按钮"
                    }
                }else {
                    return row[column.key]
                }
            },
            renderHeader(column, $index) {
                if ('renderHeader' in this.trColumns[$index]) {
                    return this.trColumns[$index].renderHeader(column, $index);
                } else {
                    return column.title || '#';
                }
            },
            // 深度拷贝函数
            deepCopy(data) {
                var t = this.type(data),
                    o, i, ni;
                if (t === 'array') {
                    o = [];
                } else if (t === 'object') {
                    o = {};
                } else {
                    return data;
                }
                if (t === 'array') {
                    for (i = 0, ni = data.length; i < ni; i++) {
                        o.push(this.deepCopy(data[i]));
                    }
                    return o;
                } else if (t === 'object') {
                    for (i in data) {
                        o[i] = this.deepCopy(data[i]);
                    }
                    return o;
                }

            },
            type(obj) {
                var toString = Object.prototype.toString;
                var map = {
                    '[object Boolean]': 'boolean',
                    '[object Number]': 'number',
                    '[object String]': 'string',
                    '[object Function]': 'function',
                    '[object Array]': 'array',
                    '[object Date]': 'date',
                    '[object RegExp]': 'regExp',
                    '[object Undefined]': 'undefined',
                    '[object Null]': 'null',
                    '[object Object]': 'object'
                };
                return map[toString.call(obj)];
            },
            initTreeData(items, level, parent) {
                this.initItems = []
                let spaceHtml = "";
                for (var i = 1; i < level; i++) {
                    spaceHtml += "<i class='ms-tree-space'></i>"
                }
                items.forEach((item, index) => {
                    item = Object.assign({}, item, {
                        "parent": parent,
                        "level": level,
                        "spaceHtml": spaceHtml
                    });
                    if ((typeof item.expanded) == "undefined") {
                        item = Object.assign({}, item, {
                            "expanded": false
                        });
                    }
                    if ((typeof item.show) == "undefined") {
                        item = Object.assign({}, item, {
                            "isShow": false
                        });
                    }
                    item = Object.assign({}, item, {
                        "load": (item.expanded ? true : false)
                    });
                    this.initItems.push(item);
                    if (item.menuInfoDtoList && item.expanded) {
                        this.initTreeData(item.menuInfoDtoList, level + 1, item);
                    }
                })
            },
            toggle(index, item) {
                let level = item.level + 1;
                let spaceHtml = "";
                for (var i = 1; i < level; i++) {
                    spaceHtml += "<i class='ms-tree-space'></i>"
                }
                if (item.menuInfoDtoList) {
                    if (item.expanded) {
                        item.expanded = !item.expanded;
                        this.close(index, item);
                    } else {
                        item.expanded = !item.expanded;
                        if (item.load) {
                            this.open(index, item);
                        } else {
                            item.load = true;
                            item.menuInfoDtoList.forEach((child, childIndex) => {
                                this.initItems.splice((index + childIndex + 1), 0, child);
                                //设置监听属性
                                this.$set(this.initItems[index + childIndex + 1], 'parent', item);
                                this.$set(this.initItems[index + childIndex + 1], 'level', level);
                                this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml);
                                this.$set(this.initItems[index + childIndex + 1], 'isShow', true);
                                this.$set(this.initItems[index + childIndex + 1], 'expanded', false);
                            })
                        }
                    }
                }
                this.showAuthorityDetail(item.menuId)
            },
            open(index, item) {
                if (item.menuInfoDtoList) {
                    item.menuInfoDtoList.forEach((child, childIndex) => {
                        child.isShow = true;
                        if (child.menuInfoDtoList && child.expanded) {
                            this.open(index + childIndex + 1, child);
                        }
                    })
                }
            },
            close(index, item) {
                if (item.menuInfoDtoList) {
                    item.menuInfoDtoList.forEach((child, childIndex) => {
                        child.isShow = false;
                        child.expanded = false;
                        if (child.menuInfoDtoList) {
                            this.close(index + childIndex + 1, child);
                        }
                    })
                }
            },
            changePage(pageNum) {
                this.getAuthorityInformationList(pageNum - 1,this.pageSize)
                this.checkModel = []
            },
            checkAllData() {
                this.checkModel = [];
                if (this.checkAll == true) {
                    let checkELeArr = document.getElementsByTagName('tbody')[0].getElementsByTagName('input');
                    for (let i=0; i<checkELeArr.length; i++){
                        this.checkModel.push(checkELeArr[i].value);
                    }
                }
            },
            bodyClickFunction() {
                this.effectSwitch.searchAlertSwitch = false
                this.effectSwitch.authorityDetailShowSwitch = false
            },
            showAuthorityDetail(id) {
                this.checkAll = false
                this.editAuthorityDataModel.isModifyFlag = true
                this.effectSwitch.editToolSwitch = true
                this.effectSwitch.authorityDetailShowSwitch = true
                this.checkModel = []
                this.checkModel.push(id)
                this.getAuthorityInfoDetailData(id)
                if(this.message == false){//判断左侧菜单是否收缩
                    this.$emit('navSlideToggle');//调用父组件方法控制导航收缩
                }
            },
            doCheckHasChildrenList(dataModel,index){
                for(let j=0;j<dataModel.length; j++){
                    console.log(dataModel[j].menuId)
                    if(dataModel[j].menuId==this.checkModel[index]){
                        if(dataModel[j].menuInfoDtoList.length > 0){
                            this.isHasChildrenList = true
                        }
                    }else{
                        this.doCheckHasChildrenList(dataModel[j].menuInfoDtoList,index)
                    }
                }
            },
            checkHasChildrenList(){
                if(this.checkModel){
                    for (let i=0;i<this.checkModel.length; i++){
                        this.doCheckHasChildrenList(this.dataSource,i)
                    }
                    return this.isHasChildrenList
                }else{
                    return
                }
            },
            initMenuTreeData(dataModel){
                if(dataModel.length > 0){
                    for (let i=0; i<dataModel.length; i++){
                        dataModel[i].expand = true
                        // if(dataModel[i].menuId == this.editAuthorityDataModel.authorityDataModel.parentId){
                        //     dataModel[i].selected = true
                        // }
                        if(dataModel[i].name){
                            dataModel[i].title = dataModel[i].name
                            delete dataModel[i].name
                            if(dataModel[i].menuInfoDtoList){
                                dataModel[i].menuInfoDtoList=dataModel[i].menuInfoDtoList.filter(function(item){
                                    return item!==null
                                })
                                dataModel[i].children = dataModel[i].menuInfoDtoList
                                delete dataModel[i].menuInfoDtoList
                                this.initMenuTreeData(dataModel[i].children)
                            }
                        }
                    }
                }
                return dataModel
            },
            getMenuType(type){
                if(type===null || type ===undefined || type==="0"){
                    return "目录"
                }else if(type ==="1"){
                    return "菜单"
                }else if(type ==="2"){
                    return "按钮"
                }
            },
            selectMenu(){
                let selectedMenuTreeData = this.$refs.menuTree.getSelectedNodes()[0]
                if(selectedMenuTreeData){
                    this.editAuthorityDataModel.authorityDataModel.parentName = selectedMenuTreeData.title
                    this.editAuthorityDataModel.authorityDataModel.parentId = selectedMenuTreeData.menuId
                    // this.editAuthorityDataModel.authorityDataModel.menuLevel = selectedMenuTreeData.menuLevel+1
                    this.effectSwitch.menuTreeAlertSwitch = false
                }else{
                    this.effectSwitch.menuTreeAlertSwitch = false
                }
            },
            getMenuTreeData(){
                if(this.editAuthorityDataModel.authorityDataModel.type ==="0"){
                    return
                }else{
                    this.$Ajax.post(
                        '/menuInfo/queryList',
                        {
                            "type":this.editAuthorityDataModel.authorityDataModel.type
                        })
                        .then(response =>{
                            this.effectSwitch.menuTreeAlertSwitch=true
                            this.menuTreeData = this.initMenuTreeData(this.deepCopy(response.data.obj))
                        }).catch(error =>{

                    })
                }
            },
            modifyMenuData(){
                if(this.checkModel.length > 1){
                    alert('请勾选一条要编辑的项')
                }else{
                    this.effectSwitch.editAuthorityAlertSwitch=true;
                    this.effectSwitch.authorityDetailShowSwitch = false
                    $.extend(true,this.editAuthorityDataModel.authorityDataModel,this.currentAuthorityDetailSource)
                }
            },
            openEditMenuPopUp(){
                this.effectSwitch.editAuthorityAlertSwitch=true
                this.editAuthorityDataModel.isModifyFlag=false
                this.editAuthorityDataModel.authorityDataModel={
                    "icon": "",
                    "menuId": 0,
                    "menuInfoDtoList":[],
                    // "menuLevel": 0,
                    "name": "",
                    "orderNum": "",
                    "parentId": 0,
                    "parentName": "",
                    "perms": "",
                    "type": "",
                    "url": ""
                }
            },
            saveMenuData(){
                if(this.menuDataVertify() === false){
                    return
                }
                if(this.editAuthorityDataModel.isModifyFlag == true){
                    this.saveModifyMenuData(this.editAuthorityDataModel.authorityDataModel)
                }else{
                    this.addMenuData(this.editAuthorityDataModel.authorityDataModel)
                }
            },
            menuDataVertify(){
                if(this.editAuthorityDataModel.authorityDataModel.type === ""){
                    this.$Message.warning("请选择类型")
                    return false
                }else if($.trim(this.$refs.menuname.value) == ""){
                    this.$Message.warning("菜单名称不能为空")
                    return false
                }else if($.trim(this.$refs.parentName.value) == ""){
                    this.$Message.warning("上级菜单不能为空")
                    return false
                }else if($.trim(this.$refs.url.value) == ""){
                    this.$Message.warning("菜单URL不能为空")
                    return false
                }else if($.trim(this.$refs.prems.value) == ""){
                    this.$Message.warning("授权标识不能为空")
                    return false
                }else if($.trim(this.$refs.orderNum.value) == ""){
                    this.$Message.warning("排序号不能为空")
                    return false
                }else if(!((/^[0-9]+$/).test(this.$refs.orderNum.value))){
                    this.$Message.warning("排序号必须为数字")
                    return false
                }else if($.trim(this.$refs.icon.value) == ""){
                    this.$Message.warning("图标不能为空")
                    return false
                }
            },
            saveModifyMenuData(model){
                let postData = {}
                $.extend(true,postData,model)
                this.$Ajax.post('/menuInfo/modify', postData)
                    .then(response => {
                        console.log(response)
                        if(response.data.code === 0){
                            this.effectSwitch.editAuthorityAlertSwitch=false
                            this.getAuthorityInformationList(0,this.pageSize)
                            this.$refs['pages'].currentPage = 1
                            this.checkModel = []
                            this.$Message.success("操作成功")
                        }else{
                            this.checkModel = []
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                    })
            },
            addMenuData(model){
                let postData = {}
                $.extend(true,postData,model)
               postAjaxQ('/menuInfo/save', postData)
                    .then(response => {
                        if(response.data.code === 0){
                            this.effectSwitch.editAuthorityAlertSwitch=false
                            this.getAuthorityInformationList(0,this.pageSize)
                            this.$refs['pages'].currentPage = 1
                            this.checkModel = []
                            this.$Message.success("操作成功")
                            location.reload() 
                            //  this.$router.push({ path: "/layout" });
                        }else{
                            this.checkModel = []
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                    })
            },
            deleteAuthorityData(){
                this.isHasChildrenList = false
                if(this.checkModel.length > 0){
                    if(this.checkHasChildrenList()){
                        this.$Message.warning("请勾选子菜单进行删除")
                        return
                    }
                    this.effectSwitch.isShowModal = true
                    this.modalTip = "确定要删除吗？"
                }else{
                    this.$Message.warning('请勾选您要删除的项')
                }
            },
            makedeleteAuthorityData(){
                let idModelStr = this.checkModel.join()
                // this.$Ajax({
                //     method: 'post',
                //     url: '/menuInfo/removeBatch',
                //     params: {
                //         ids: idModelStr
                //     }
                // })
                postAjaxQ('/menuInfo/removeBatch?ids='+idModelStr)
                    .then((response) => {
                        if(response.data.code === 0){
                            this.$Message.success("操作成功")
                            location.reload()   
                            this.getAuthorityInformationList(0, this.pageSize)
                            this.$refs['pages'].currentPage = 1
                        }else{
                            this.checkModel = []
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getAuthorityInfoDetailData(id){
                // this.$Ajax.get('/menuInfo/getById', {
                //     params: {
                //         id: id
                //     }
                // })
                getAjaxQ('/menuInfo/getById', {id: id})
                    .then(response => {
                        if(response.data.code === 0){
                            this.currentAuthorityDetailSource = response.data.obj
                        }else{
                            this.$Message.warning('操作请求失败')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            returnFalse() {
                return false;
            },
            isInArray(checkItem, arr){
                if(arr!=null && arr!=undefined && arr.length > 0){
                    return arr.join().indexOf(checkItem)!=-1
                }else{
                    return false;
                }
            },
            getAuthorityInformationList(pageNum,pageSize) {
                postAjaxQ('/menuInfo/queryListPage/' + pageNum + '/' + pageSize, {parentId:0})
                    .then((response) => {
                        if(response.data.code === 0){
                            this.isFirstLoading = false
                            this.dataSource = response.data.obj.content;
                            this.totalPage = response.data.obj.totalElements;
                            this.initTreeData(this.deepCopy(this.dataSource), 1, null);
                        }else{
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        watch: {
            checkModel: function(val,oldVal){
                this.effectSwitch.editToolSwitch = val.length > 0? true :false
                if(this.checkModel.length <= 0){
                    this.checkAll = false
                }
            }
        },
        mounted() {
            this.getAuthorityInformationList(0,this.pageSize)
            // this.makeButtonAuthorityArray()
        },
        destroyed() {
            document.querySelector('body').removeEventListener('click', this.bodyClickFunction)
        }

    }
</script>

<style scoped>
    @keyframes rightSlide {
        from {
            transform: translate(-3000px, 0);
            -webkit-transform: translate(-3000px, 0);
            -moz-transform: translate(-3000px, 0);
            -ms-transform: translate(-3000px, 0);
            -o-transform: translate(-3000px, 0);
        }
        to {
            transform: translate(3000px);
            -webkit-transform: translate(3000px);
            -moz-transform: translate(3000px);
            -ms-transform: translate(3000px);
            -o-transform: translate(3000px);
        }
    }

    .authority-manage-box {
        font-size: 14px;
    }
    .top-tool-box {
        height: 60px;
    }

    .content-title {
        height: 60px;
        line-height: 60px;
    }
    .add-authority-btn {
        width: 90px;
        height: 34px;
        line-height: 34px;
        margin: 14px 25px 0 0;
        text-align: center;
        border-radius: 3px;
        background: #2299ee;
    }
    #edit-authority-alert-box {
        z-index: 1500;
        width: 500px;
        height: 500px;
        left: 50%;
        margin-left: -550px;
        margin-top: 60px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
    }

    .alert-box-top {
        height: 44px;
        border-radius: 5px 5px 0 0;
        background: #2299ee;
    }

    .alert-title {
        line-height: 44px;
    }
    .authority-alert-content{
        height: 365px;
    }
    .authority-alert-content input[type='text']{
        width: 346px;
        height: 34px;
        line-height: 34px;
        padding-left: 10px;
        border-radius: 3px;
        border: 1px solid #ddd;
    }
    .authority-alert-content .form-tag{
        width:92px;
        padding-left: 20px;
        line-height: 36px;
        height: 36px;
    }
    .menu-tree-box{
        height: 296px;
        overflow: auto;
    }
    .close-alert-btn {
        margin-top: 12px;
    }

    .rotate90:hover {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
    }

    .alert-box-content input[type='text'] {
        height: 34px;
        line-height: 34px;
        text-indent: 10px;
        border-radius: 3px;
        color: #999;
        border: 1px solid #ddd;
    }
    .checkbox-group label {
        margin-bottom: 10px;
        margin-right: 20px;
    }

    #shadow {
        z-index: 1000;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .1);
    }
    .authority-detail-wrapper {
        top: 0px;
        right: 0px;
        z-index: 10;
        height: 100%;
        width: 970px;
        background: #fff;
    }
    .editBox {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
    }
    .alert-box-content select {
        width: 98px;
        height: 34px;
        line-height: 34px;
        padding-left: 12px;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
    }

    .alert-box-content textarea {
        width: 305px;
        height: 58px;
        line-height: 34px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
        resize: none;
    }
    #menu-tree-alert-box{
        width: 350px;
        height: 400px;
        z-index: 1500;
        left: 50%;
        margin-top: 100px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
    }
    .RightSlide {
        width: 970px;
        height: 100%;
        background-color: #fff;
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
    .autoTbale {
        overflow: auto;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
    }

    .table-bordered {
        border: 1px solid #EBEBEB;
    }

    .table>tbody>tr>td,
    .table>tbody>tr>th,
    .table>thead>tr>td,
    .table>thead>tr>th {
        border-top: 1px solid #e7eaec;
        line-height: 1.42857;
        padding: 8px;
        vertical-align: middle;
    }

    .table-bordered>tbody>tr>td,
    .table-bordered>tbody>tr>th,
    .table-bordered>tfoot>tr>td,
    .table-bordered>tfoot>tr>th,
    .table-bordered>thead>tr>td,
    .table-bordered>thead>tr>th {
        border: 1px solid #e7e7e7;
    }

    .table>thead>tr>th {
        height: 44px;
        border-bottom: 1px solid #DDD;
    }

    .table-bordered>thead>tr>td,
    .table-bordered>thead>tr>th {
        background-color: #f6f8fc;
    }
    .table-bordered>thead>tr>th:nth-of-type(1){
        text-align: center;
    }
    #hl-tree-table>tbody>tr {
        height: 44px;

    }
    #hl-tree-table>tbody>tr:nth-child(even){
        background-color: #f6f8fc;
    }
    #hl-tree-table>tbody>.child-tr {
        background-color: #fff;
    }

    label {
        margin: 0 0px;
    }
    span >>> i.ms-tree-space{
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 7px;
        height: 14px;
    }
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 7px;
        height: 14px;
    }
    i .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 14px;
        height: 14px;
    }
    .ms-tree-space::before {
        content: ""
    }

    #hl-tree-table th>label {
        margin: 0;
        color: #666;
        font-size: 14px;
        font-weight: bold;
    }
    .triggerStyle td .triggerStyle_label{
        top: 0px;
        left:0px;
        width: 100%;
        height: 44px;
        line-height:44px;
        padding-left:15px;
        border: 1px solid rgba(0,0,0,0);
    }
    .triggerStyle td:nth-of-type(3) .triggerStyle_label:hover{
        display: inline-block;
        color: #308bd8;
        border: 1px solid #308bd8;
        cursor: pointer;
    }
</style>
