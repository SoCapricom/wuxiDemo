<template>
    <div class="bg_white pr" style="height: 100%; overflow-x: hidden">
        <div class="user-manage-box" style="height: 100%;">
            <!--确认删除框-->
            <Modal v-model="effectSwitch.isShowModal" @on-ok="makeDeleteUserInfoData(checkModel)">
                <p>{{modalTip}}</p>
            </Modal>
            <div @click.stop="returnFalse()" v-show="effectSwitch.editUserAlertSwitch" class="pf" id="shadow">
            </div>
            <div class="pa" id="department-tree-alert-box" style="z-index: 2000;" @click.stop="returnFalse()" v-show="effectSwitch.departmentTreeAlertSwitch">
                <div class="alert-box-top clearfix">
                    <span class="fl ml20 alert-title f_white">选择部门</span>
                    <span class="fr mr20 cp transi rotate90 close-alert-btn"
                          @click="effectSwitch.departmentTreeAlertSwitch=false"><Icon color="#fff" type="close-round"></Icon></span>
                </div>
                <div class="department-tree-box scrollBar">
                    <div class="pt20 pl40">
                        <Tree :data="departmentTreeData" ref="departmentTree" ></Tree>
                    </div>
                </div>
                <div class="pr" style="height: 50px;">
                    <div class="pa" style="bottom:10px; right: 0;">
                        <div class="fr mr25">
                            <Button type="primary" @click="selectDepartment()">确定</Button>
                        </div>
                        <div class="fr mr10">
                            <Button @click="effectSwitch.departmentTreeAlertSwitch=false">取消</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pa" id="password-alert-box" style="z-index: 2000;" @click.stop="returnFalse()" v-show="effectSwitch.modifyPasswordAlertSwitch">
                <div class="alert-box-top clearfix">
                    <span class="fl ml20 alert-title f_white">密码初始化</span>
                    <span class="fr mr20 cp transi rotate90 close-alert-btn"
                          @click="effectSwitch.modifyPasswordAlertSwitch=false"><Icon color="#fff" type="close-round"></Icon></span>
                </div>
                <div class="password-tree-box">
                    <div class="clearfix" style="padding-top: 60px;">
                        <div class="fl tr" style="width: 92px;line-height: 36px;">新密码</div>
                        <div class="fl ml15">
                            <input ref="password" class="block" type="password" autocomplete="off" placeholder="请输入密码，6~18位的字母或数字">
                        </div>
                    </div>
                    <div class="clearfix mt20">
                        <div class="fl tr" style="width: 92px;line-height: 36px;">确认密码</div>
                        <div class="fl ml15">
                            <input ref="passwordTwo" class="block" type="password" autocomplete="off" placeholder="请再次输入密码">
                        </div>
                    </div>
                </div>
                <div class="pr" style="height: 50px;">
                    <div class="pa" style="bottom:10px; right: 0;">
                        <div class="fr mr25">
                            <Button type="primary" @click="modifyUserPassword()">确定</Button>
                        </div>
                        <div class="fr mr10">
                            <Button @click="effectSwitch.modifyPasswordAlertSwitch=false">取消</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div @click.stop="returnFalse()" v-show="effectSwitch.editUserAlertSwitch" id="edit-user-alert-box"
                 class="pa">
                <div class="alert-box-top clearfix">
                    <span class="fl ml20 alert-title f_white">{{ editUserInfoModel.isModifyFlag? "编辑用户" : "添加用户" }}</span>
                    <span class="fr mr20 cp transi rotate90 close-alert-btn"
                          @click="effectSwitch.editUserAlertSwitch=false"><Icon color="#fff" type="close-round"></Icon></span>
                </div>
                <div class="alert-box-content scrollBar">
                    <div class="alert-conAuto pl25 pr25">
                        <div class="f_9 title clearfix">
                            <span class="f_9 f16 fl">基本信息</span>
                            <span class="line fr"></span>
                        </div>
                        <div class="clearfix">
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">用户名</div>
                                <div class="fl">
                                    <input ref="username" name="username" v-model="editUserInfoModel.userInfoModel.username" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix ml40 mb15">
                                <div class="fl alert-form-tag">真实姓名</div>
                                <div class="fl">
                                    <input ref="realname" name="realname" v-model="editUserInfoModel.userInfoModel.realname" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">昵称</div>
                                <div class="fl">
                                    <input ref="nickname" name="nickname" v-model="editUserInfoModel.userInfoModel.nickname" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix ml40 mb15">
                                <div class="fl alert-form-tag">性别</div>
                                <div class="fl" style="line-height: 34px;">
                                    <RadioGroup v-model="editUserInfoModel.userInfoModel.sex">
                                        <Radio label="男"></Radio>
                                        <Radio label="女"></Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">邮箱</div>
                                <div class="fl">
                                    <input ref="email" name="email" v-model="editUserInfoModel.userInfoModel.email" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15 ml40">
                                <div class="fl alert-form-tag">出生日期</div>
                                <div class="fl datePickerBox">
                                    <input ref="birthday" name="birthday" id="birthdayEle" class="Wdate dateInput block" readonly="readonly" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                                           type="text" placeholder="请选择时间">
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">籍贯</div>
                                <div class="fl clearfix">
                                    <div class="fl mr5">
                                        <select name="province" v-model="currentProvince" id="province-select" @change="getCityGroup($event)">
                                            <option>请选择省</option>
                                            <option v-for="(province, index) in provinceGroup" :value="province.regionName"  v-bind="{provinceId:province.id}" :key="index">{{ province.regionName }}</option>
                                        </select>
                                    </div>
                                    <div class="fl mr5">
                                        <select name="city" id="city-select" v-model="currentCity" @change="getAreaGroup($event)">
                                            <option value="请选择市">请选择市</option>
                                            <option v-for="(city, index) in cityGroup" v-bind="{cityId:city.id}" :value="city.regionName" :key="index">{{ city.regionName }}</option>
                                        </select>
                                    </div>
                                    <div class="fl">
                                        <select name="area" id="area-select" v-model="currentArea" @change="getAreaId($event)">
                                            <option value="请选择区">请选择区</option>
                                            <option v-for="(area, index) in areaGroup"  v-bind="{areaId:area.id}" :value="area.regionName" :key="index">{{ area.regionName }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="fl clearfix mb15 ml40">
                                <div class="fl alert-form-tag">详细地址</div>
                                <div class="fl">
                                    <input ref="address" name="address" v-model="editUserInfoModel.userInfoModel.address" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">电话</div>
                                <div class="fl">
                                    <input ref="mobile" name="mobile" v-model="editUserInfoModel.userInfoModel.mobile" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15 ml40">
                                <div class="fl alert-form-tag">手机号</div>
                                <div class="fl">
                                    <input ref="telephone" name="telephone" v-model="editUserInfoModel.userInfoModel.telephone" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">网址</div>
                                <div class="fl">
                                    <input ref="website" name="website" v-model="editUserInfoModel.userInfoModel.website" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15 ml40">
                                <div class="fl alert-form-tag">邮编</div>
                                <div class="fl">
                                    <input ref="postCode" name="postCode" v-model="editUserInfoModel.userInfoModel.postcode" class="block f_9 text-input" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15">
                                <div class="fl alert-form-tag">部门名称</div>
                                <div class="fl">
                                    <input ref="department" @click="effectSwitch.departmentTreeAlertSwitch=true,getDepartmentTreeData()" name="department" v-model="departmentName" placeholder="点击选择部门" readonly="readonly" class="block f_9 text-input cp bg_f8" type="text"/>
                                </div>
                            </div>
                            <div class="fl clearfix mb15 ml40">
                                <div class="fl alert-form-tag">简介</div>
                                <div class="fl">
                                    <input ref="brief" name="brief" v-model="editUserInfoModel.userInfoModel.brief" type="text" class="block f_9 text-input" />
                                </div>
                            </div>
                        </div>
                        <div class="f_9 title clearfix">
                            <span class="f_9 f16 fl">角色信息</span>
                            <span class="line fr"></span>
                        </div>
                        <div class="clearfix">
                            <div class="fl form-tag pl20">角色</div>
                            <div class="fl checkbox-group">
                                <CheckboxGroup v-model="currentRoleNameList"  @on-change="checkBoxChange">
                                    <Checkbox v-for="(data, index) in roleNameDataList" :key="index" :label="data.roleName">{{ data.roleName }}</Checkbox>
                                </CheckboxGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pr" style="height: 50px;">
                    <div class="pa" style="bottom:10px; right: 0;">
                        <div class="fr mr25">
                            <Button type="primary" @click="saveUserInfo(editUserInfoModel.userInfoModel)">确定</Button>
                        </div>
                        <div class="fr mr10">
                            <Button @click="effectSwitch.editUserAlertSwitch=false">取消</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top-tool-box">
                <transition mode="out-in" enter-active-class="animated bounceInLeft">
                    <div id="tool-one" class="tool-group-one clearfix" v-show="!(effectSwitch.editToolSwitch)">
                        <div class="fl pr">
                            <span class="f16 f_6 block fl content-title fb ml25">用户管理</span>
                            <span
                                class="search-btn block fl cp"
                                @click.stop="effectSwitch.searchAlertSwitch=true;viewStyle.searchColor='#2599ec'"
                            >
                                <Icon size="22" :color="viewStyle.searchColor" type="search"></Icon>
                            </span>
                            <Button v-if="showGoBackListButton" class="fl backToList mt15 ml20" @click="initDataList()" type="ghost" icon="reply">返回列表</Button>
                            <transition name="fade">
                                <div @click.stop="returnFalse()" v-show="effectSwitch.searchAlertSwitch"
                                     class="user-search-box pa">
                                    <div class="search-box clearfix">
                                        <div class="search-group clearfix">
                                            <input v-model="queryParams" class="keyword-input fl block" type="text" placeholder="请输入用户名称"/>
                                            <span id="jiansuo-btn" @click="queryUserInfoDataList(queryParams)" class="block fl tc f_white f14">检索</span>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="fr">
                            <span  class="add-user-btn block f_white f14 cp"
                                  @click="openEditUserInfoPopUp()">+新增用户</span>
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
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;" class="f_6" @click="modifyUserInformation(checkModel[0])">
                                    <Icon type="edit"></Icon>
                                    编辑</a>
                            </li>
                            <li class="fl">
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a @click="deleteUserInfoData(checkModel)" href="javascript:;" class="f_6">
                                    <Icon size="16" type="trash-a"></Icon>
                                    删除</a>
                            </li>
                            <li  class="fl">
                                &nbsp;&nbsp;|&nbsp;&nbsp;<a  @click="showModifyUserPasswordAlertBox()" href="javascript:;" class="f_6">
                                    <Icon size="16" type="compose"></Icon>
                                    重置密码</a>
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
                <table class="baseTable">
                    <tr class="bgTit">
                        <td class="tc per5">
                            <input id="fartherCheck" type="checkbox" v-model="checkAll" @change="checkAllData()">
                        </td>
                        <td class="per12 pl15 fb">用户名</td>
                        <td class="per10 pl15 fb">真实姓名</td>
                        <td class="per10 pl15 fb">昵称</td>
                        <td class="per12 pl15 fb">角色</td>
                        <td class="per12 pl15 fb">手机号</td>
                        <td class="per12 pl15 fb">邮箱</td>
                        <td class="per12 pl15 fb">所在地区</td>
                        <td class="per12 pl15 fb">注册时间</td>
                    </tr>
                    <tr v-if="dataSource.length > 0" v-for="(data, index) in dataSource" :key="index" :class="{'bgTr':index%2 != 0}">
                        <td class="tc per5">
                            <input type="checkbox" name="" v-model="checkModel" :value="data.userId">
                        </td>
                        <td class="per12 pl15">{{ data.username }}</td>
                        <td class="per10">
                            <a href="javascript:;" class="UserName transi" @click.stop="showUserDetail(data.userId)">{{ data.realname }}</a>
                        </td>
                        <td class="per10 pl15">{{ data.nickname }}</td>
                        <td class="per12 pl15">{{ getRoleName(data.roles) }}</td>
                        <td class="per12 pl15">{{ data.mobile }}</td>
                        <td class="per12 pl15">{{ data.email }}</td>
                        <td class="per12 pl15">{{ data.areaInfoArea? data.areaInfoArea.regionName : '' }}</td>
                        <td class="per12 pl15">{{ data.createTime }}</td>
                    </tr>
                    <tr v-if="dataSource.length === 0">
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
                        <Page ref="pages" :total="totalPage" :page-size="pageSize" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
            <transition name="rightSlide" enter-active-class="animated bounceInRight"
                        leave-to-class="animated bounceOutRight">
                <div @click.stop="returnFalse()" v-show="effectSwitch.userDetailShowSwitch"
                     class="user-detail-wrapper pa">
                    <!--右侧滑入框 start-->
                    <div class="RightSlide pa pb40">
                        <h3 class="RightSlideTit clearfix pl25 pr25">
                            <span class="fl f18"><Icon class="mr10 f20" color="#2299ee"
                                                       type="person"></Icon><span>{{ currentUserDetailSource.realname || "" }}</span></span>
                            <a  href="javascript:;" class="f_6 fr f14" @click="effectSwitch.userDetailShowSwitch=false,deleteUserInfoData(checkModel)">
                                <Icon size="16" type="trash-a"></Icon>
                                删除</a>
                            <span class="fr ml10 mr10">|</span>
                            <a  href="javascript:;" class="f_6 fr f14" @click="modifyUserInformation(checkModel[0])">
                                <Icon type="edit"></Icon>
                                编辑</a>
                        </h3>
                        <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
                            <span class="fl">基本信息</span>
                            <span class="fl bgLine"></span>
                        </div>
                        <ul class="pl25 pr25 baseList clearfix">
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">用户ID</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.userId || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">真实姓名</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.realname || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">昵称</span>
                                <span class="f14 baseCon">{{ currentUserDetailSource.nickname || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">性别</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.sex || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">邮箱</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.email || ''}}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">出生日期</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.birthday || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">籍贯</span>
                                <span class="f14 fl baseCon">
                                  <span>{{ currentUserDetailSource.areaInfoProvice? currentUserDetailSource.areaInfoProvice.regionName :"" }}</span>
                                  <span>{{ currentUserDetailSource.areaInfoCity? currentUserDetailSource.areaInfoCity.regionName :"" }}</span>
                                  <span>{{ currentUserDetailSource.areaInfoArea? currentUserDetailSource.areaInfoArea.regionName :"" }}</span>
                                </span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">详细地址</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.address || ''}}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">电话</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.telephone || "" }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">手机号</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.mobile || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">网址</span>
                                <span class="f14 baseCon">{{ currentUserDetailSource.website || '' }}</span>
                            </li>
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">邮编</span>
                                <span class="f14 fl baseCon">{{ currentUserDetailSource.postcode || '' }}</span>
                            </li>
                            <li class="clearfix fl" style="width:800px">
                                <span class="baseTagName f_9 f14 fl">简介</span>
                                <span class="f14 fl baseCon textoverflow" :title="currentUserDetailSource.brief || ''"
                                      style="width: 720px;">{{ currentUserDetailSource.brief || '' }}</span>
                            </li>
                        </ul>
                        <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
                            <span class="fl">角色信息</span>
                            <span class="fl bgLine"></span>
                        </div>
                        <ul class="pl25 pr25 baseList">
                            <li class="clearfix fl">
                                <span class="baseTagName f_9 f14 fl">角色</span>
                                <span class="f14 fl baseCon">{{ getRoleName(currentUserDetailSource.roles) }}</span>
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
                departmentName:null,
                showGoBackListButton:false,
                isFirstLoading:true,
                checkAll: false,
                queryParams:"",
                checkModel: [],
                currentProvince: '请选择省',
                currentCity: '请选择市',
                currentArea: '请选择区',
                provinceGroup: [],
                cityGroup: [],
                areaGroup: [],
                provinceid:"",
                cityid:"",
                areaid:"",
                // 显示隐藏等效果的控制变量
                effectSwitch: {
                    editToolSwitch: false,
                    editUserAlertSwitch: false,
                    searchAlertSwitch: false,
                    userDetailShowSwitch: false,
                    departmentTreeAlertSwitch:false,
                    modifyPasswordAlertSwitch:false,
                    isShowModal:false
                },
                departmentTreeData:[],  //部门树结构
                //角色名称
                roleNameDataList: [],
                currentRoleNameList: [],
                //用户信息编辑模型
                editUserInfoModel:{
                    isModifyFlag:false,
                    userInfoModel:{
                        "sex":"",
                        "userId":"",
                        "realname":"",
                        "nickname":"",
                        "email":"",
                        "birthday":"",
                        "address":"",
                        "areaInfoArea":{},
                        "areaInfoCity":{},
                        "areaInfoProvice":{},
                        "brief":"",
                        "createTime":"",
                        "deptId":0,
                        "mobile":"",
                        "roles":[],
                        "status":"1",
                        "username":"",
                        "createTime":""
                    }
                },
                // 样式变化的控制变量
                viewStyle: {
                    searchColor: '#9c9c9c'
                },
                totalPage: 100,
                pageSize: 8,
                pageNum:1,
                dataSource: [],
                currentUserDetailSource: {}
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
            getDeptName(deptModel){
                if(deptModel){
                    this.departmentName = deptModel.title
                }else{
                    this.departmentName = null
                }
            },
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
            checkAllData() {
                this.checkModel = [];
                if (this.checkAll == true) {
                    this.effectSwitch.editToolSwitch = true
                    this.dataSource.forEach((value, index) => this.checkModel.push(value.userId))
                }
            },
            bodyClickFunction() {
                this.effectSwitch.searchAlertSwitch = false
                this.viewStyle.searchColor = '#9c9c9c'
                this.effectSwitch.userDetailShowSwitch = false
            },
            showUserDetail(id) {
                this.checkAll = false
                this.editUserInfoModel.isModifyFlag = true
                this.effectSwitch.editToolSwitch = true
                this.effectSwitch.userDetailShowSwitch = true;
                this.checkModel = []
                this.checkModel.push(id)
                this.getUserInfoDetailData(id)
                if(this.message == false){//判断左侧菜单是否收缩
                    this.$emit('navSlideToggle');//调用父组件方法控制导航收缩
                }
            },
            getUserInfoDetailData(id){
                getAjaxQ('/userInfo/getById', {
                    params: {
                        id: id
                    }
                })
                .then(response => {
                    console.log(response)
                    this.currentUserDetailSource = response.data.obj
                })
                .catch(error => {
                    console.log(error);
                });
            },
            initDataList(){
                this.showGoBackListButton = false
                this.getUserInformationList(0,this.pageSize)
                this.$refs['pages'].currentPage = 1
            },
            returnFalse() {
                return false
            },
            changePage(pageNum) {
                this.getUserInformationList(pageNum - 1, this.pageSize, {})
            },
            isInArray(checkItem, arr){
                if(arr!=null && arr!=undefined && arr.length > 0){
                    return arr.join().indexOf(checkItem)!=-1
                }else{
                    return false;
                }
            },
            checkBoxChange(model){
                let filterArr = []
                let _this=this
                if(model.length > 0){
                    filterArr=this.roleNameDataList.filter(function (item) {
                        return _this.isInArray(item.roleName, model)
                    })
                }
                this.editUserInfoModel.userInfoModel.roles = filterArr
            },
            getAreaId(event){
                let id = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('areaId')
                this.areaid = id
            },
            getUserInformationList(pageNum, pageSize) {
                postAjaxQ('/userInfo/queryListPage/' + pageNum + '/' + pageSize, {})
                    .then((response) => {
                        console.log("++++++")
                        console.log(response)
                       if(response.data.code === 0){
                           this.isFirstLoading = false
                           this.dataSource = response.data.obj.content;
                           this.totalPage = response.data.obj.totalElements;
                       }else{
                           this.$Message.warning("数据请求异常")
                       }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            initDepartmentTreeData(dataModel){
                if(dataModel.length > 0){
                    for (let i=0; i<dataModel.length; i++){
                        // if(dataModel[i].deptId == this.editUserInfoModel.userInfoModel.deptId){
                        //     dataModel[i].selected = true
                        // }
                        if(dataModel[i].name){
                            dataModel[i].title = dataModel[i].name
                            delete dataModel[i].name
                            if(dataModel[i].children){
                                this.initDepartmentTreeData(dataModel[i].children)
                            }
                        }
                    }
                }
                return dataModel
            },
            selectDepartment(){
                let selectedDepartmentTreeData = this.$refs.departmentTree.getSelectedNodes()[0]
                if(selectedDepartmentTreeData){
                    this.getDeptName(selectedDepartmentTreeData)
                    this.editUserInfoModel.userInfoModel.deptId = selectedDepartmentTreeData.deptId
                    this.effectSwitch.departmentTreeAlertSwitch = false
                }else{
                    this.effectSwitch.departmentTreeAlertSwitch = false
                }
            },
            getDepartmentTreeData(){
               postAjaxQ('/deptInfo/queryList',{

                }).then(response =>{
                    this.departmentTreeData = this.initDepartmentTreeData(response.data.obj)
                }).catch(error =>{

                })
            },
            getProvinceGroup(id) {
                getAjaxQ('/areaInfo/queryListByParentid',  {
                        parentid: id
                    }
                )
                .then(response => {
                    this.provinceGroup = response.data.obj
                })
                .catch(error => {
                    console.log(error);
                });
            },
            getCityGroupData(id){
                getAjaxQ('/areaInfo/queryListByParentid', {
                   
                        parentid:id
                    
                })
                .then(response => {
                    this.cityGroup = response.data.obj
                })
                .catch(error => {
                    console.log(error);
                });
            },
            getCityGroup(event) {
                this.currentCity = "请选择市"
                this.currentArea = "请选择区"
                this.areaGroup = []
                if( this.currentProvince === "请选择省"){
                    this.cityGroup = []
                }else{
                    let id = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('provinceId')
                    this.provinceid = id
                    this.getCityGroupData(id)
                }
            },
            getAreaGroupData(id){
                getAjaxQ('/areaInfo/queryListByParentid', {
                   
                        parentid:id
                    
                })
                .then(response => {
                    this.areaGroup = response.data.obj
                })
                .catch(error => {
                    console.log(error);
                });
            },
            getAreaGroup(event) {
                this.currentArea = "请选择区"
                if(this.currentProvince === "请选择省"){
                    this.areaGroup = []
                }else{
                    let id = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('cityId')
                    this.cityid = id
                    this.getAreaGroupData(id)
                }
            },
            getRoleDataList(){
                postAjaxQ("/roleInfo/queryList",{
                }).then(response =>{
                this.roleNameDataList = response.data.obj
                }).catch(error =>{

                })
            },
            queryUserInfoDataList(queryParams){
                if(queryParams === ""){
                    this.$Message.warning("搜索条件不能为空！")
                    return
                }
                this.showGoBackListButton = true
                this.effectSwitch.searchAlertSwitch = false
                postAjaxQ('/userInfo/queryListPage/0' + '/' + this.pageSize, {
                    username:queryParams
                })
                    .then((response) => {
                        if(response.data.code === 0){
                            this.dataSource = response.data.obj.content;
                            this.totalPage = response.data.obj.totalElements;
                        }else{
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteUserInfoData(idModel){
                if(idModel.length > 0){
                    this.effectSwitch.isShowModal = true
                    this.modalTip = "确定要删除吗？"
                }else{
                    return false
                }
            },
            makeDeleteUserInfoData(idModel){
                let idModelStr = idModel.join()
                // this.$Ajax({
                //     method: 'post',
                //     url: '/userInfo/removeBatch',
                //     params: {
                //         ids: idModelStr
                //     }
                // })
                postAjaxQ('/userInfo/removeBatch?ids='+idModelStr)
                .then((response) => {
                    if(response.data.code ===0){
                        this.$Message.success("操作成功")
                        this.getUserInformationList(0, this.pageSize)
                        this.$refs['pages'].currentPage = 1
                    }else{
                        this.$Message.warning("操作请求失败")
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            showModifyUserPasswordAlertBox(){
                if(this.checkModel.length > 1){
                    alert("请选择一位用户进行相关操作")
                    return
                }else{
                    this.effectSwitch.modifyPasswordAlertSwitch = true
                }
            },
            modifyUserInformation(id){
                let afterFilterArr = [];
                if(this.checkModel.length > 1){
                    this.$Message.warning('请勾选一条要编辑的项')
                }else{
                    this.effectSwitch.editUserAlertSwitch=true;
                    afterFilterArr=this.dataSource.filter(function (item) {
                        return id == item.userId
                    })
                    this.currentRoleNameList = []
                    this.editUserInfoModel.userInfoModel = {}
                    $.extend(true,this.editUserInfoModel.userInfoModel,afterFilterArr[0])
                    this.getProvinceGroup(1)
                    this.getCityGroupData(this.editUserInfoModel.userInfoModel.areaInfoProvice.id)
                    this.getAreaGroupData(this.editUserInfoModel.userInfoModel.areaInfoCity.id)
                    this.provinceid = this.editUserInfoModel.userInfoModel.areaInfoProvice.id
                    this.cityid = this.editUserInfoModel.userInfoModel.areaInfoCity.id
                    this.areaid = this.editUserInfoModel.userInfoModel.areaInfoArea.id
                    this.currentProvince = this.editUserInfoModel.userInfoModel.areaInfoProvice.regionName
                    this.currentCity = this.editUserInfoModel.userInfoModel.areaInfoCity.regionName
                    this.currentArea = this.editUserInfoModel.userInfoModel.areaInfoArea.regionName
                    this.editUserInfoModel.userInfoModel.roles.forEach((item, index) =>{
                        this.currentRoleNameList.push(item.roleName)
                    })
                    document.getElementById("birthdayEle").value = this.editUserInfoModel.userInfoModel.birthday
                    this.departmentName = this.editUserInfoModel.userInfoModel.deptInfoDto.name
                }
            },
            saveUserInfo(){
                if(this.editUserInfoVerify() == false){
                  return
                }
                if(this.editUserInfoModel.isModifyFlag == true){
                    this.saveModifyUserInfo(this.editUserInfoModel.userInfoModel)
                }else{
                    this.addUserInfo(this.editUserInfoModel.userInfoModel)
                }
            },
            saveModifyUserInfo(model){
                console.log(model)
                model.birthday = document.getElementById("birthdayEle").value
                let postData = {}
                $.extend(true,postData,model)
                postData.areaInfoProvice.id = Number(this.provinceid)
                postData.areaInfoCity.id = Number(this.cityid)
                postData.areaInfoArea.id = Number(this.areaid)
                postData.createTime="2018-08-08"
                postAjaxQ('/userInfo/modify', postData)
                    .then(response => {
                        if(response.data.code === 0){
                            this.effectSwitch.editUserAlertSwitch=false
                            this.effectSwitch.userDetailShowSwitch = false
                            this.getUserInformationList(this.$refs['pages'].currentPage-1, this.pageSize)
                            this.checkModel = []
                            this.$Message.success("操作成功")
                        }else{
                            this.effectSwitch.editUserAlertSwitch=false
                            this.effectSwitch.userDetailShowSwitch = false
                            this.checkModel = []
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                         console.log(error)
                    })
            },
            addUserInfo(model){
                model.birthday = document.getElementById("birthdayEle").value
                let postData = {}
                $.extend(true,postData,model)
                postData.areaInfoProvice.id = Number(this.provinceid)
                postData.areaInfoCity.id = Number(this.cityid)
                postData.areaInfoArea.id = Number(this.areaid)
                postData.userId = model.userId? model.userId:0
                postData.createTime="2018-08-08"
                postAjaxQ('/userInfo/save', postData)
                    .then(response => {
                        if(response.data.code === 0){
                            this.effectSwitch.editUserAlertSwitch=false
                            this.effectSwitch.userDetailShowSwitch = false
                            this.getUserInformationList(0, this.pageSize)
                            this.$refs['pages'].currentPage = 1
                            this.checkModel = []
                            this.$Message.success("操作成功")
                        }else{
                            this.effectSwitch.editUserAlertSwitch=false
                            this.effectSwitch.userDetailShowSwitch = false
                            this.checkModel = []
                            this.$Message.warning("操作请求失败")
                        }
                    })
                    .catch(error => {
                    })
            },
            modifyUserPassword(){
                if(this.modifyUserPasswordVerify() === false){
                    return
                }else{
                    let postData = {
                        userid:this.checkModel[0],
                        newpsd:this.$refs.password.value
                    }
                    // this.$Ajax({
                    //     method: 'post',
                    //     url: '/sys/resetpassword',
                    //     params: postData
                    // })
                    postAjaxQ('/sys/resetpassword',{postData})
                    .then(response =>{
                        if(response.data.code === 0){
                            this.effectSwitch.modifyPasswordAlertSwitch = false
                            this.$Message.success('操作成功')
                        }else{
                            this.effectSwitch.modifyPasswordAlertSwitch = false
                            this.$Message.warning('操作请求失败')
                        }
                    }).catch(error =>{
                        console.log(error)
                    })
                }
            },
            modifyUserPasswordVerify(){
                if($.trim(this.$refs.password.value) == ""){
                    this.$Message.warning('新密码不能为空')
                    return false
                }else if(this.$refs.password.value.length >18 || this.$refs.password.value.length <6){
                    this.$Message.warning('密码长度必须在6~18位之间')
                    return false
                }else if(!((/^[a-zA-Z0-9]+$/).test(this.$refs.password.value))){
                    this.$Message.warning("密码格式必须为英文字母或数字")
                    return false
                }else if(this.$refs.password.value !== this.$refs.passwordTwo.value){
                    this.$Message.warning('两次输入的密码不一致，请重新输入')
                    return false
                }
            },
            editUserInfoVerify(){
                if($.trim(this.$refs.username.value) == ""){
                    this.$Message.warning('用户名不能为空')
                    return false
                }else if(this.$refs.username.value.length > 18 || this.$refs.username.value.length < 5){
                    this.$Message.warning('用户名长度为5~18位')
                    return false
                }else if(!((/^[a-zA-Z0-9]+$/).test(this.$refs.username.value))){
                    this.$Message.warning("用户名必须为英文字母或者数字")
                    return false
                }else if($.trim(this.$refs.realname.value) == ""){
                    this.$Message.warning("真实姓名不能为空")
                    return false
                }else if(this.$refs.realname.value.length > 20){
                    this.$Message.warning("真实姓名长度不能超过20个字符")
                    return false
                }else if(!((/^[\u4e00-\u9fa5]+$/).test(this.$refs.realname.value))){
                    this.$Message.warning("真实姓名必须为中文")
                    return false
                }else if($.trim(this.$refs.nickname.value) == ""){
                    this.$Message.warning("昵称不能为空")
                    return false
                }else if(this.$refs.nickname.value.length > 20){
                    this.$Message.warning("昵称长度不能超过20个字符")
                    return false
                }else if(this.editUserInfoModel.userInfoModel.sex == ""){
                    this.$Message.warning("请选择性别")
                    return false
                }else if($.trim(this.$refs.email.value) == ""){
                    this.$Message.warning("邮箱不能为空")
                    return false
                }else if(!((/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/).test(this.$refs.email.value))){
                    this.$Message.warning("邮箱格式错误")
                    return false
                }else if(this.$refs.birthday.value == ""){
                    this.$Message.warning("出生日期不能为空")
                    return false
                }else if(this.provinceid == "" || this.cityid == "" || this.areaid == ""){
                    this.$Message.warning("请选择籍贯")
                    return false
                }else if($.trim(this.$refs.address.value) == ""){
                    this.$Message.warning("地址不能为空")
                    return false
                }else if(this.$refs.address.value.length > 50){
                    this.$Message.warning("地址长度不能为空")
                    return false
                }else if($.trim(this.$refs.mobile.value) == ""){
                    this.$Message.warning("电话不能为空")
                    return false
                }else if(!((/^0\d{2,3}-?\d{7,8}$/).test(this.$refs.mobile.value))){
                    this.$Message.warning("电话格式错误")
                    return false
                }else if($.trim(this.$refs.telephone.value) == ""){
                    this.$Message.warning("手机号不能为空")
                    return false
                }else if(!((/^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/).test(this.$refs.telephone.value))){
                    this.$Message.warning("手机号格式错误")
                    return false
                }else if($.trim(this.$refs.website.value) == ""){
                    this.$Message.warning("网址不能为空")
                    return false
                }
                // else if(!((/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/).test(this.$refs.website.value))){
                //     this.$Message.warning("网址格式错误,正确格式例如：http://www.zhenghe.cn")
                //     return false
                // }
                else if($.trim(this.$refs.postCode.value) == ""){
                    this.$Message.warning("邮编不能为空")
                    return false
                }else if(!((/^[1-9][0-9]{5}$/).test(this.$refs.postCode.value))){
                    this.$Message.warning("邮编格式错误")
                    return false
                }else if($.trim(this.$refs.brief.value) == ""){
                    this.$Message.warning("简介不能为空")
                    return false
                }else if(this.$refs.brief.value.length > 100){
                    this.$Message.warning("简介内容长度不能超过100个字符")
                    return false
                }else if(this.currentRoleNameList.length <= 0){
                    this.$Message.warning("请选择角色")
                    return false
                }
            },
            openEditUserInfoPopUp(){
                this.departmentName = null
                this.effectSwitch.editUserAlertSwitch=true
                this.editUserInfoModel.isModifyFlag=false
                this.currentRoleNameList = []
                document.getElementById("birthdayEle").value=""
                this.editUserInfoModel.userInfoModel={
                    "sex":"",
                    "userId":"",
                    "realname":"",
                    "nickname":"",
                    "email":"",
                    "birthday":"",
                    "address":"",
                    "areaInfoArea":{},
                    "areaInfoCity":{},
                    "areaInfoProvice":{},
                    "brief":"",
                    "createTime":"",
                    "deptId":0,
                    "mobile":"",
                    "roles":[],
                    "status":"1",
                    "username":"",
                    "createTime":""
                }
                this.currentProvince = "请选择省"
                this.currentCity = "请选择市"
                this.currentArea = "请选择区"
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
            this.getUserInformationList(0, this.pageSize)
            this.getProvinceGroup(1)
            this.getRoleDataList()
            // this.makeButtonAuthorityArray()
        },
        destroyed() {
            document.querySelector('body').removeEventListener('click', this.bodyClickFunction)
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

    .user-manage-box {
        font-size: 14px;
    }

    .top-tool-box {
        height: 60px;
    }

    .content-title {
        height: 60px;
        line-height: 60px;
    }

    .search-btn {
        width: 16px;
        height: 16px;
        margin: 20px 0 0 10px;
    }

    .add-user-btn {
        width: 90px;
        height: 34px;
        line-height: 34px;
        margin: 14px 25px 0 0;
        text-align: center;
        border-radius: 3px;
        background: #2299ee;
    }

    .close-btn {
        width: 15px;
        height: 15px;
        margin-top: 22px;
        /*background:url("../../../assets/images/bm_close.png") no-repeat;*/
    }

    #add-user-alert-box, #edit-user-alert-box {
        z-index: 1500;
        width: 900px;
        height: 500px;
        left: 50%;
        margin-left: -451px;
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

    .close-alert-btn {
        margin-top: 12px;
    }

    .rotate90:hover {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
    }

    .form-tag {
        width: 112px;
        line-height: 36px;
    }
    .alert-box-content{
        height: 406px;
        overflow: auto;
    }
    .alert-box-content input[type='text'] {
        height: 34px;
        line-height: 34px;
        text-indent: 10px;
        border-radius: 3px;
        color: #999;
        border: 1px solid #ddd;
    }

    .checkbox-group {
        width: 700px;
    }

    .checkbox-group label {
        margin-bottom: 10px;
        margin-right: 20px;
    }

    #shadow {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .1);
    }

    .user-search-box {
        z-index: 1500;
        top: 50px;
        left: 100px;
        width: 362px;
        padding:20px;
        border: 1px solid #e0e0e0;
        border-radius: 3px;
        box-shadow: 0 0 10px #e0e0e0;
        background: #fff;
    }

    .user-search-box p.title {
        height: 43px;
        line-height: 43px;
        color: #c0c5c9;
    }

    .user-search-box .user-name-select {
        width: 88px;
        height: 28px;
        line-height: 28px;
        border-radius: 3px;
        border: 1px solid #e0e0e0;
    }

    .user-search-box .keyword-input {
        width: 250px;
        height: 32px;
        line-height: 32px;
        text-indent: 10px;
        border: 1px solid #e0e0e0;
    }

    .user-search-box .close-btn {
        width: 16px;
        height: 16px;
        margin-top: 6px;
    }

    #jiansuo-btn {
        width: 70px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        background: #2299ee;
    }

    .user-detail-wrapper {
        top: 0px;
        right: 0px;
        z-index: 10;
        height: 100%;
        width: 970px;
        background: #fff;
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

    .per12 {
        width: 12.5%;
    }

    .UserName {
        display: inline-block;
        height: 42.5px;
        line-height: 42.5px;
        width: 100%;
        padding-left: 15px;
        color: #666;
    }

    .UserName:hover, .UserName:active {
        border: 1px solid #2299ee;
    }

    .bgTit {
        background-color: #f3f5f9;
    }

    .bgTr {
        background-color: #f6f8fc;
    }

    .editBox {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
    }

    .alert-box-content .title {
        height: 54px;
        line-height: 54px;
    }

    .alert-box-content .title .line {
        width: 755px;
        margin-top: 25px;
        border-bottom: 1px solid #e0e0e0;
    }

    .alert-box-content .alert-form-tag {
        width: 85px;
        height: 36px;
        line-height: 36px;
    }

    .alert-box-content input[type='text'] {
        height: 34px;
        line-height: 34px;
        padding-left: 12px;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
    }

    .alert-box-content .dateInput {
        width: 158px;
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

    .alert-box-content input.text-input {
        width: 305px;
    }

    .alert-box-content .datePickerBox {
        width: 200px;
    }
    #department-tree-alert-box{
        width: 350px;
        z-index: 1500;
        height: 400px;
        left: 50%;
        margin-left: -175px;
        margin-top: 100px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
    }
    .department-tree-box{
        overflow: auto;
        height: 296px;
    }
    #password-alert-box{
        width: 450px;
        z-index: 1500;
        height: 300px;
        left: 50%;
        margin-left: -275px;
        margin-top: 100px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
    }
    .password-tree-box{
        overflow: auto;
        height: 200px;
    }
    .password-tree-box input[type='password']{
        display: block;
        width: 305px;
        padding-left: 10px;
        height: 34px;
        line-height: 34px;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .RightSlide {
        width: 970px;
        height:100%;
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
        width: 440px;
        height: 48px;
    }

    .baseTagName {
        width: 80px;
        height: 48px;
        line-height: 48px;
    }

    .baseCon {
        width: 360px;
        line-height: 48px;
    }
</style>
