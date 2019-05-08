<template>
  <!--右侧滑框 start-->
    <div>
      <!--顶部工具栏 start-->
      <div class="RightSlideTit pl25 pr25 mt20 pa">
        <p class="currentYear f_9 pa f16">【 <span>2018年</span> 数据 】</p>
        <!--<p class="currentYear f_9 pa f16">{{ companyId }}</p>-->
        <!--<p class="currentYear f_9 pa f16">【 <span>{{ techSmallCompData.year }}</span> 数据 】</p>-->
        <p><i class="iconfont icon-enterprise mr5 mr10"></i>
          <!-- <span class="f18" v-if="companyOrgData"></span> -->
          <span>{{ companyOrgData? companyOrgData.companyName:'--' }}</span>
        </p>
        <ul class="toolTip clearfix ml30 mt5 mb5">
          <li class="fl">科技型中小企业</li>
        </ul>
        <table class="titTable per40 f14 mt5">
          <tr class="f_9">
            <td class="per20">运营状态</td>
            <td class="per60">法定代表人</td>
            <td class="per20">所属区县</td>
            <td class="per20">公司类型</td>
          </tr>
          <tr>
            <td>{{ dictInfoDto?dictInfoDto.name:'--' }}</td>
            <td>{{ companyOrgData?companyOrgData.regOwner:'--' }}</td>
            <td>{{ areaInfoArea?areaInfoArea.regionName:'--' }}</td>
            <td>{{ companyOrgData?companyOrgData.industryCategoryDto.name:'--' }} </td>
          </tr>
        </table>
      </div>
      <!--顶部工具栏 end-->
      <!--详情主体 start-->
      <div class="RightSlideBody pa">
        <Tabs @on-click="clickTabShow" :value="this.tabSign" type="card" :animated="false">
          <TabPane name="companyOrgSign" v-if="companyOrgData" label="工商数据" class="companyOrgBox"><!--v-if="this.tabSign === 'businessDataSign'"-->
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#companyOrg01">工商信息</a></li>
              <li class="fl"><a href="#companyOrg02">主要成员</a></li>
              <li class="fl"><a href="#companyOrg03">企业概况</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <!--01-->
              <div id="companyOrg01" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">工商信息</p><i class="pa"></i></h3>
                 <p v-if="!companyOrgData">暂无数据展示</p>
                <table class="tableList" width="100%" cellpadding="5">
                  <tbody v-if="companyOrgData">
                  <tr>
                    <td width="16%"  class="f_9">工商注册号</td>
                    <td width="34%" >{{ companyOrgData.busiNo?companyOrgData.busiNo:''}}</td>
                    <td width="16%"  class="f_9">组织机构代码</td>
                    <td width="34%" >{{ companyOrgData.companyCode?companyOrgData.companyCode:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">统一信用代码</td>
                    <td width="34%" >{{ companyOrgData.companyCode? companyOrgData.companyCode:''}}</td>
                    <td width="16%"  class="f_9">注册类型</td>
                    <td width="34%" >{{ companyOrgData.regTypeDto?companyOrgData.regTypeDto.name:''}}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">行业分类</td>
                    <td width="34%" >{{ companyOrgData.industryCategoryDto?companyOrgData.industryCategoryDto.name:''}}</td>
                    <td width="16%"  class="f_9">法定代表人</td>
                    <td width="34%" >{{ companyOrgData.regOwner?companyOrgData.regOwner:''}}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">注册资本</td>
                    <td width="34%" >{{ companyOrgData.regMoney?companyOrgData.regMoney:''}}<span> 万元 </span></td>
                    <td width="16%"  class="f_9">注册日期</td>
                    <td width="34%" >{{ companyOrgData.regTime?companyOrgData.regTime:''}}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">营业期限</td>
                    <td width="34%" >{{ companyOrgData.operateDate?companyOrgData.operateDate:'' }}</td>
                    <td width="16%"  class="f_9">核准日期</td>
                    <td width="34%" >{{ companyOrgData.allowDate?companyOrgData.allowDate:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">登记机关</td>
                    <td width="34%" >{{ companyOrgData.regOrg?companyOrgData.regOrg:'' }}</td>
                    <td width="16%"  class="f_9">注册地址</td>
                    <td width="34%" >{{ companyOrgData.regAddr?companyOrgData.regAddr:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%"  class="f_9">经营范围</td>
                    <td width="34%"  colspan="3">{{ companyOrgData.regScope?companyOrgData.regScope:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--02-->
              <div id="companyOrg02" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">主要成员</p><i class="pa"></i></h3>
                <p v-if="!companyOrgData.companyMainPersonDtos">暂无数据</p>
                <p v-if="!companyOrgData">暂无数据展示</p>
                <ul v-if="companyOrgData" class="clearfix memberList" >
                  <li class="fl clearfix" :key="index" v-for="(item,index) in companyOrgData.companyMainPersonDtos">
                    <i class="iconfont icon-member ml10 mr15 fl"></i>
                    <div class="fl">
                      <p>{{ item.duty }}</p>
                      <p class="f_3">{{ item.name }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <!--03-->
              <div id="companyOrg03" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业概况</p><i class="pa"></i></h3>
                <p v-if="!NewThreeFourData">暂无数据展示</p>
                <table style="width: 100%;" v-if="NewThreeFourData">
                  <tbody>
                  <tr>
                    <td width="16%" class="tit">上市企业</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.isListed?NewThreeFourData.isListed:'' }}</td>
                    <td width="16%" class="tit">上市时间</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.listRegTime?NewThreeFourData.listRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%">新三板企业</td>
                    <td width="34%">{{ NewThreeFourData.isNewThree?NewThreeFourData.isNewThree:'' }}</td>
                    <td width="16%">挂牌日期</td>
                    <td width="34%">{{ NewThreeFourData.newThreeRegTime?NewThreeFourData.newThreeRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">新四板企业</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.isNewFour?NewThreeFourData.isNewFour:'' }}</td>
                    <td width="16%" class="tit">挂牌日期</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.newFourRegTime?NewThreeFourData.newFourRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%">国家高新技术企业</td>
                    <td width="34%">{{ NewThreeFourData.isGovHighTech?NewThreeFourData.isGovHighTech:'' }}</td>
                    <td width="16%">认定时间</td>
                    <td width="34%">{{ NewThreeFourData.govHighTechRegTime?NewThreeFourData.govHighTechRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">市级高新技术企业</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.isCityHighTech?NewThreeFourData.isCityHighTech:'' }}</td>
                    <td width="16%" class="tit">认定时间</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.cityHighTechRegTime?NewThreeFourData.cityHighTechRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%">科技型中小企业</td>
                    <td width="34%">{{ NewThreeFourData.isTechSmallCo? NewThreeFourData.isTechSmallCo:'' }}</td>
                    <td width="16%">认定时间</td>
                    <td width="34%">{{ NewThreeFourData.techSmallCoRegTime?NewThreeFourData.techSmallCoRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">科技计划企业</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.isTechPlanCo?NewThreeFourData.isTechPlanCo:'' }}</td>
                    <td width="16%" class="tit">认定时间</td>
                    <td width="34%" class="tit">{{ NewThreeFourData.techPlanCoRegTime?NewThreeFourData.techPlanCoRegTime:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%">科技“小巨人”企业</td>
                    <td width="34%">{{ NewThreeFourData.isTechGiantCo?NewThreeFourData.isTechGiantCo:'' }}</td>
                    <td width="16%">认定时间</td>
                    <td width="34%">{{ NewThreeFourData.techGiantCoRegTime? NewThreeFourData.techGiantCoRegTime:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane name="techSmallCompSign" v-if="techSmallCompData" label="科技型中小企业" class="techSmallCompBox"><!--v-if="this.tabSign === 'enterpriTypeSign'"-->
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#EntpriItem01">企业概况</a></li>
              <li class="fl"><a href="#EntpriItem02">负责人信息</a></li>
              <li class="fl"><a href="#EntpriItem03">科研信息</a></li>
              <li class="fl"><a href="#EntpriItem04">经营状况</a></li>
              <li class="fl"><a href="#EntpriItem05">资金信息</a></li>
              <li class="fl"><a href="#EntpriItem06">人员信息</a></li>
              <li class="fl"><a href="#EntpriItem07">知识产权信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <!--01-->
              <div id="EntpriItem01" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业概况</p><i class="pa"></i></h3>
                <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit">上级主管单位</td>
                    <td width="55%" colspan="3">{{ techSmallCompData.chiefUnit?techSmallCompData.chiefUnit:'' }}</td>
                    <td width="15%" class="tit">所属乡镇街</td>
                    <td width="15%">{{ techSmallCompData.belongStreet?techSmallCompData.belongStreet:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">坐落区县</td>
                    <td colspan="3">{{ techSmallCompData.areaInfo?techSmallCompData.areaInfo.regionName:"" }}</td>
                    <td class="tit">企业来源</td>
                    <td>{{ techSmallCompData.companySource?techSmallCompData.companySource:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">联系人</td>
                    <td colspan="3">{{ techSmallCompData.linkManName?techSmallCompData.linkManName:'' }}</td>
                    <td class="tit">联系电话</td>
                    <td>{{ techSmallCompData.linkManTel?techSmallCompData.linkManTel:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">所在孵化器</td>
                    <td colspan="5">{{ techSmallCompData.localIncubator?techSmallCompData.localIncubator :'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">所在工业园区</td>
                    <td colspan="5">{{ techSmallCompData.localPark?techSmallCompData.localPark:'' }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">是否是高新技术认定企业</td>
                    <td width="15%">{{ techSmallCompData.isHighTechEnterpr?techSmallCompData.isHighTechEnterpr:'' }}</td>
                    <td width="15%" class="tit">认定途径及方式</td>
                    <td width="15%">{{ techSmallCompData.cognizanceMethod?techSmallCompData.cognizanceMethod:'' }}</td>
                    <td width="15%" class="tit">高新技术企业认定编号</td>
                    <td width="15%">{{ techSmallCompData.cognizanceCode?techSmallCompData.cognizanceCode:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">坐落地址</td>
                    <td colspan="5">{{ techSmallCompData.localAdd?techSmallCompData.localAdd:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">主要产品（服务）名称</td>
                    <td colspan="5">{{ techSmallCompData.productName ?techSmallCompData.productName :""}}</td>
                  </tr>
                  <tr>
                    <td class="tit">主要产品（服务）所属技术领域</td>
                    <td colspan="5">{{ techSmallCompData.productField?techSmallCompData.productField:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">企业网址</td>
                    <td colspan="5">{{ techSmallCompData.companyUrl ? techSmallCompData.companyUrl:''}}</td>
                  </tr>
                  <tr>
                    <td class="tit">企业简介</td>
                    <td colspan="5">{{ techSmallCompData.companyBrief?techSmallCompData.companyBrief:'' }}</td>
                  </tr>

                  </tbody>
                </table>
              </div>
              <!--02-->
              <div id="EntpriItem02" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">负责人信息</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="16.7%" class="tit">企业负责人</td>
                    <td>{{ techSmallCompData.companyHeaderName?techSmallCompData.companyHeaderName:'' }}</td>
                    <td width="17%" class="tit">企业负责人性别</td>
                    <td>{{ techSmallCompData.companyHeaderSex ?techSmallCompData.companyHeaderSex:''}}</td>
                  </tr>
                  <tr>
                    <td class="tit">负责人出生年月</td>
                    <td>{{ techSmallCompData.companyHeaderBirthday?techSmallCompData.companyHeaderBirthday:'' }}</td>
                    <td class="tit">负责人学历学位</td>
                    <td>{{ techSmallCompData.companyHeaderDegree?techSmallCompData.companyHeaderDegree:'' }}</td>
                  </tr>
                  <tr>
                    <td class="tit">负责人手机</td>
                    <td>{{ techSmallCompData.companyHeaderMobile?techSmallCompData.companyHeaderMobile:'' }}</td>
                    <td class="tit">电子邮箱</td>
                    <td>{{ techSmallCompData.companyHeaderEmail?techSmallCompData.companyHeaderEmail:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--03-->
              <div id="EntpriItem03" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">科研信息</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;">
                  <tbody v-if="techSmallCompData">
                  <tr>
                    <td width="15%" class="tit">企业重点实验室</td>
                    <td width="15%">{{ techSmallCompData.companyLabNum?techSmallCompData.companyLabNum:'' }}</td>
                    <td width="15%" class="tit">工程中心</td>
                    <td width="15%">{{ techSmallCompData.projectCenterNum?techSmallCompData.projectCenterNum:'' }}</td>
                    <td width="15%" class="tit">生产力促进中心</td>
                    <td width="15%">{{ techSmallCompData.productivityCenterNum?techSmallCompData.productivityCenterNum:'' }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">科技企业孵化器</td>
                    <td width="15%">{{ techSmallCompData.techIncubatorNum?techSmallCompData.techIncubatorNum:'' }}</td>
                    <td width="15%" class="tit">企业技术中心</td>
                    <td width="15%">{{ techSmallCompData.techCenterNum?techSmallCompData.techCenterNum:'' }}</td>
                    <td width="15%" class="tit">博士后工作站</td>
                    <td width="15%">{{ techSmallCompData.postdoctorWorkstationNum?techSmallCompData.postdoctorWorkstationNum:'' }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">院士工作站</td>
                    <td width="15%" colspan="5">{{ techSmallCompData.academicWorkstationNum? techSmallCompData.academicWorkstationNum:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--04-->
              <div id="EntpriItem04" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">经营状况</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;">
                  <tbody v-if="techSmallCompData">
                  <tr>
                    <td width="15%" class="tit t">工业总产值(万元)</td>
                    <td width="15%">{{ techSmallCompData.industryOutputValue?techSmallCompData.industryOutputValue :'' }}</td>
                    <td width="15%" class="tit">净利润(万元)</td>
                    <td width="15%">{{ techSmallCompData.netMargin?techSmallCompData.netMargin:'' }}</td>
                    <td width="15%" class="tit t">总收入(万元)</td>
                    <td width="15%">{{ techSmallCompData.totalIncome ?techSmallCompData.totalIncome:''}}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">上缴税费总额(万元)</td>
                    <td width="15%">{{ techSmallCompData.totalPayment?techSmallCompData.totalPayment:'' }}</td>
                    <td width="15%" class="tit">主营业务收入(万元)</td>
                    <td width="15%">{{ techSmallCompData.mainBusnissIncome? techSmallCompData.mainBusnissIncome:'' }}</td>
                    <td width="15%" class="tit">总资产（万元）</td>
                    <td width="15%">{{ techSmallCompData.totalAssets?techSmallCompData.totalAssets:'' }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">总负债(万元)</td>
                    <td width="15%">{{ techSmallCompData.totalDebt?techSmallCompData.totalDebt:'' }}</td>
                    <td width="15%" class="tit">高新技术转化的产品服务销售收入(万元)</td>
                    <td width="15%">{{ techSmallCompData.highTechIncome?techSmallCompData.highTechIncome:'' }}</td>
                    <td width="15%" class="tit">经由知识产权或专有技术转化的产品服务销售收入(万元)</td>
                    <td width="15%">{{ techSmallCompData.propertyIncome?techSmallCompData.propertyIncome:'' }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">企业R&D投入(万元)	</td>
                    <td width="15%" colspan="5">{{ techSmallCompData.rdInput?techSmallCompData.rdInput:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--05资金信息-->
              <div id="EntpriItem05" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">资金信息</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">科技活动经费筹集额(万元)</td>
                    <td width="15%">{{ techSmallCompData.techActFundsRaise }}</td>
                    <td width="15%" class="tit">科技活动经费内部支出(万元)</td>
                    <td width="15%">{{ techSmallCompData.techFundsInternalOutput }}</td>
                    <td width="15%" class="tit t">科技活动经费外部支出(万元)</td>
                    <td width="15%">{{ techSmallCompData.techFundsExterOutput }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">本年科技项目数</td>
                    <td width="15%">{{ techSmallCompData.yearProjectNum }}</td>
                    <td width="15%" class="tit">科技项目经费筹集额(万元)</td>
                    <td width="15%">{{ techSmallCompData.techProjFundsRaise }}</td>
                    <td width="15%" class="tit">国家财政拨款(万元)</td>
                    <td width="15%">{{ techSmallCompData.nationalFinancialAppropriation }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">市级财政拨款(万元)</td>
                    <td width="15%">{{ techSmallCompData.municipalFinancialAppropriation }}</td>
                    <td width="15%" class="tit">区县财政拨款(万元)</td>
                    <td width="15%">{{ techSmallCompData.areaFinancialAppropriation }}</td>
                    <td width="15%" class="tit">企业资金(万元)</td>
                    <td width="15%">{{ techSmallCompData.enterpriseFunds }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">金融机构资金(万元)</td>
                    <td width="15%">{{ techSmallCompData.financialFunds }}</td>
                    <td width="15%" class="tit">国外资金(万元)</td>
                    <td width="15%">{{ techSmallCompData.offshoreFunds }}</td>
                    <td width="15%" class="tit">其他资金(万元)</td>
                    <td width="15%">{{ techSmallCompData.otherFunds }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--06人员信息-->
              <div id="EntpriItem06" class="navPosiCon_items"> 
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">人员信息</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;">
                  <tbody v-if="techSmallCompData">
                  <tr>
                    <td width="15%" class="tit t">从业人员数</td>
                    <td width="15%">{{ techSmallCompData.employeeNum }}</td>
                    <td width="15%" class="tit">科技活动人员</td>
                    <td width="15%">{{ techSmallCompData.techPerson }}</td>
                    <td width="15%" class="tit t">外聘研发人员</td>
                    <td width="15%">{{ techSmallCompData.externalRdPerson }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">高级职称</td>
                    <td width="15%">{{ techSmallCompData.seniorTitleNum }}</td>
                    <td width="15%" class="tit">中级职称</td>
                    <td width="15%">{{ techSmallCompData.middleTitleNum }}</td>
                    <td width="15%" class="tit">大专学历</td>
                    <td width="15%">{{ techSmallCompData.collegeDegree }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">本科学历</td>
                    <td width="15%">{{ techSmallCompData.universityDegree }}</td>
                    <td width="15%" class="tit">研究生学历</td>
                    <td width="15%">{{ techSmallCompData.graduateDegree }}</td>
                    <td width="15%" class="tit">硕士以上学历</td>
                    <td width="15%">{{ techSmallCompData.aboveMasterDegree }}</td>
                  </tr>
                  </tbody>
                </table>
                
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">中国科学院院士</td>
                    <td width="15%">{{ techSmallCompData.casAcademician }}</td>
                    <td width="15%" class="tit">中国工程院院士</td>
                    <td width="15%">{{ techSmallCompData.engineerAcademician }}</td>
                    <td width="15%" class="tit t">973项目首席科学家</td>
                    <td width="15%">{{ techSmallCompData.projectScientist }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">青年拔尖人才</td>
                    <td width="15%">{{ techSmallCompData.youngTalent }}</td>
                    <td width="15%" class="tit">新世纪优秀人才</td>
                    <td width="15%">{{ techSmallCompData.talentPerson }}</td>
                    <td width="15%" class="tit">长江学者</td>
                    <td width="15%">{{ techSmallCompData.changjiangScholar }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">国家杰出青年科学基金获得者</td>
                    <td width="15%">{{ techSmallCompData.toypGainer }}</td>
                    <td width="15%" class="tit">何梁何利基金获得者</td>
                    <td width="15%">{{ techSmallCompData.hljjGainer }}</td>
                    <td width="15%" class="tit t">国家自然科学基金优秀创新群体带头人</td>
                    <td width="15%">{{ techSmallCompData.techInnovateLeader }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">国家有突出贡献的中青年专家	</td>
                    <td width="15%">{{ techSmallCompData.outstandMidageExpert }}</td>
                    <td width="15%" class="tit">教育部创新团队带头人</td>
                    <td width="15%" colspan="3">{{ techSmallCompData.teachInnovateLeader }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">入选百千万人才工程</td>
                    <td width="15%">{{ techSmallCompData.hundredThousandTalent }}</td>
                    <td width="15%" class="tit">入选科技部创新人才推进计划	</td>
                    <td width="15%">{{ techSmallCompData.techTalentPlan }}</td>
                    <td width="15%" class="tit t">入选万人计划</td>
                    <td width="15%">{{ techSmallCompData.tenThousandTalent }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit t">入选天津市创新人才推进计划</td>
                    <td width="15%">{{ techSmallCompData.tjTalentPlan }}</td>
                    <td width="15%" class="tit">入选天津市131创新型人才培养工程</td>
                    <td width="15%">{{ techSmallCompData.tjInnovateTrainProject }}</td>
                    <td width="15%" class="tit t">入选国家“千人计划"	</td>
                    <td width="15%">{{ techSmallCompData.govThousandPlan }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">入选天津“千人计划"	</td>
                    <td width="15%">{{ techSmallCompData.tjThousandPlan }}</td>
                    <td width="15%" class="tit">入选中科院百人计划</td>
                    <td width="15%" colspan="3">{{ techSmallCompData.hundredTalent }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">天津市新型企业家培养工程</td>
                    <td width="15%">{{ techSmallCompData.tjInnovateEntrepreneur }}</td>
                    <td width="15%" class="tit">享受政府特殊津贴专家</td>
                    <td width="15%">{{ techSmallCompData.specialGovAllowanceExpert }}</td>
                    <td width="15%" class="tit t">天津市授衔专家人</td>
                    <td width="15%">{{ techSmallCompData.tjExpert }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">天津市高层次创新型科技领军人才	</td>
                    <td width="15%" colspan="5">{{ techSmallCompData.tjHighInnovateTalent }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--07知识产权信息-->
              <div id="EntpriItem07" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">知识产权信息</p><i class="pa"></i></h3>
                 <p v-if="!techSmallCompData">暂无数据展示</p>
                <table style="width: 100%;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">申请专利</td>
                    <td width="15%">{{ techSmallCompData.patentApply }}</td>
                    <td width="15%" class="tit">申请发明专利</td>
                    <td width="15%">{{ techSmallCompData.inventionPatentApply }}</td>
                    <td width="15%" class="tit t">授权专利</td>
                    <td width="15%">{{ techSmallCompData.authPatent }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">授权发明专利</td>
                    <td width="15%">{{ techSmallCompData.authInventionPatent }}</td>
                    <td width="15%" class="tit">拥有有效专利数</td>
                    <td width="15%">{{ techSmallCompData.ownPatent }}</td>
                    <td width="15%" class="tit">拥有有效发明专利</td>
                    <td width="15%">{{ techSmallCompData.ownInventionPatent }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="15%" class="tit t">软件著作权</td>
                    <td width="15%">{{ techSmallCompData.softCopyright }}</td>
                    <td width="15%" class="tit">企业标准</td>
                    <td width="15%">{{ techSmallCompData.enterpriseStandard }}</td>
                    <td width="15%" class="tit t">商标注册</td>
                    <td width="15%">{{ techSmallCompData.trademarkRegister }}</td>
                  </tr>
                  <tr>
                    <td width="15%" class="tit">其它专有技术(服务)</td>
                    <td width="15%">{{ techSmallCompData.otherTech }}</td>
                    <td width="15%" class="tit">植物新品种</td>
                    <td width="15%">{{ techSmallCompData.newPlantType }}</td>
                    <td width="15%" class="tit">集成电路布图设计</td>
                    <td width="15%">{{ techSmallCompData.icDesign }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="16.7%" class="tit">享受研究开发费用加计扣除减免税(万元)</td>
                    <td width="16.8%">{{ techSmallCompData.rdTaxReliefs }}</td>
                    <td width="16.6%" class="tit">享受高新技术企业减免税(万元)</td>
                    <td colspan="3">{{ techSmallCompData.techTaxReliefs }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 100%; margin-top: 10px;" v-if="techSmallCompData">
                  <tbody>
                  <tr>
                    <td width="16.7%" class="tit">具体专利、标准或其他专有技术(服务)名称</td>
                    <td colspan="5">{{ techSmallCompData.zlZb }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </TabPane>
          <TabPane name="listedCompSign" v-if="listedCompData" label="上市企业" class="listedCompany"><!--v-if="this.tabSign === 'businessDataSign'"-->
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#listedComp01">上市信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <!--01-->
              <div id="listedComp01" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">上市信息</p><i class="pa"></i></h3>
                <p v-if="!listedCompData">暂无数据展示</p>
                <table class="" width="100%" cellpadding="5" v-if="listedCompData">
                  <tbody>
                    <tr>
                      <td width="16%" class="tit">证券代码</td>
                      <td width="34%">{{ listedCompData.stoneCode?listedCompData.stoneCode:'' }}</td>
                      <td width="16%" class="tit">证券简称</td>
                      <td width="34%">{{ listedCompData.stoneName?listedCompData.stoneName:'' }}</td>
                    </tr>
                    <tr>
                      <td width="16%" class="tit">上市版块</td>
                      <td width="34%">{{ listedCompData.listedPlateDto?listedCompData.listedPlateDto.name:'' }}</td>
                      <td width="16%" class="tit">上市时间</td>
                      <td width="34%">{{ listedCompData.listedTime?listedCompData.listedTime:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane name="newThreeSign" v-if="newThreeData" label="新三板企业" class="newThreeBox"><!--v-if="this.tabSign === 'businessDataSign'"-->
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#newThree01">新三板信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <!--01-->
              <div id="newThree01" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">新三板信息</p><i class="pa"></i></h3>
                <p v-if="!newThreeData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="newThreeData">
                  <tbody>
                  <tr>
                    <td width="16%" class="tit">挂牌日期</td>
                    <td width="34%">{{ newThreeData.quotedTime?newThreeData.quotedTime:'' }}</td>
                    <td width="16%" class="tit">交易方式</td>
                    <td width="34%">{{ newThreeData.dealStyle?newThreeData.dealStyle:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">核心区数</td>
                    <td width="34%">{{ newThreeData.coreNum?newThreeData.coreNum:'' }}</td>
                    <td width="16%" class="tit">大园区数</td>
                    <td width="34%">{{ newThreeData.bigNum?newThreeData.bigNum:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">联系人</td>
                    <td width="34%">{{ newThreeData.relaPerson?newThreeData.relaPerson:'' }}</td>
                    <td width="16%" class="tit">联系方式</td>
                    <td width="34%">{{ newThreeData.mobile?newThreeData.mobile:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">备注</td>
                    <td width="34%" colspan="3">{{ companyOrgData?companyOrgData.regMoney:''}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane name="newFourSign" v-if="newFourData" label="新四板企业" class="newThreeBox"><!--v-if="this.tabSign === 'businessDataSign'"-->
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#newFour01">新四板信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <!--01-->
              <div id="newFour01" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">新四板信息</p><i class="pa"></i></h3>
                <p v-if="!newFourData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="newFourData">
                  <tbody>
                  <tr>
                    <td width="16%" class="tit">挂牌板块</td>
                    <td width="34%">{{ newFourData.quotedPlate?newFourData.quotedPlate:'' }}</td>
                    <td width="16%" class="tit">挂牌日期</td>
                    <td width="34%">{{ newFourData.quotedTime?newFourData.quotedTime:"" }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">推荐机构</td>
                    <td width="34%">{{ newFourData.introOrg?newFourData.introOrg:'' }}</td>
                    <td width="16%" class="tit">企业联系人</td>
                    <td width="34%">{{ newFourData.relaPerson?newFourData.relaPerson:'' }}</td>
                  </tr>
                  <tr>
                    <td width="16%" class="tit">企业联系方式</td>
                    <td width="34%" colspan="3">{{ newFourData.mobile?newFourData.mobile:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane name="incubatorSign" v-if="incubatorData" label="孵化器" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#incubator">孵化器</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="incubator" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">孵化器</p><i class="pa"></i></h3>
                  <p v-if="!incubatorData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="incubatorData">
                  <tbody>
                  <!-- 孵化器详情 -->
                    <tr>
                      <td width="16%" class="tit">孵化器名称</td>
                      <td width="34%">{{ incubatorData?incubatorData.name:''}}</td>
                      <td width="16%" class="tit">运营管理机构</td>
                      <td width="34%">{{ incubatorData?incubatorData.companyCode:'' }}</td>
                    </tr>
                    <tr>
                      <td width="16%" class="tit">级别</td>
                      <td width="34%">{{ incubatorLevel.name?incubatorLevel.name:'' }}</td>
                      <td width="16%" class="tit">类型</td>
                      <td width="34%">{{ incubatorType.name?incubatorType.name:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane name="spaceSign" v-if="spaceData" label="众创空间" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#space">众创空间</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="space" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">众创空间</p><i class="pa"></i></h3>
                <p v-if="!spaceData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="spaceData">
                  <tbody>
                  <!-- 众创空间详情 -->
                    <tr>
                      <td width="16%" class="tit">众创空间名称</td>
                      <td width="34%">{{ spaceData.companyCode?spaceData.companyCode:''}}</td>
                      <td width="16%" class="tit">运营管理机构</td>
                      <td width="34%">{{ spaceData.companyCode?spaceData.companyCode:'' }}</td>
                    </tr>
                    <tr>
                      <td width="16%" class="tit">级别</td>
                      <td width="34%">{{ spaceData.levelDto?spaceData.levelDto.name:'' }}</td>
                      <td width="16%" class="tit">类型</td>
                      <td width="34%">{{ incubatorType.name?incubatorType.name:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
         <TabPane name="productSign" v-if="productData" label="生产力促进中心" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#product">生产力促进中心</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="product" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">生产力促进中心</p><i class="pa"></i></h3>
                <p v-if="!productData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="productData">
                  <tbody>
                  <!-- 生产力促进中心详情 -->
                    <tr>
                      <td width="16%" class="tit">生产力促进中心名称</td>
                      <td width="34%">{{ productData.companyCode?productData.companyCode:''}}</td>
                      <td width="16%" class="tit">级别</td>
                      <td width="34%">{{ productData.levelDto?productData.levelDto.name:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

           <TabPane name="landingSign" v-if="landingData" label="创新创业基地" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#landing">创新创业基地</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="landing" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">创新创业基地</p><i class="pa"></i></h3>
                <p v-if="!landingData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="landingData">
                  <tbody>
                  <!-- 创新创业基地详情 -->
                    <tr>
                      <td width="10%" class="tit">基地名称</td>
                      <td width="30%">{{ landingData.name?landingData.name:''}}</td>
                      <td width="10%" class="tit">所属单位</td>
                      <td width="30%">{{ landingData.companyCode?landingData.companyCode:''}}</td>
                      <td width="10%" class="tit">级别</td>
                      <td width="10%">{{ landingData.levelDto?landingData.levelDto.name:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

            <TabPane name="talentPoolSign" v-if="talentData" label="新型企业家" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#talentPoolSign">新型企业家</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="talentPoolSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">新型企业家</p><i class="pa"></i></h3>
                <p v-if="!talentData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="talentData">
                  <tbody>
                  <!-- 新型企业家详情 -->
                    <tr>
                      <td width="5%" class="tit">姓名</td>
                      <td width="10%">{{ talentData.name?talentData.name:''}}</td>
                      <td width="5%" class="tit">年龄</td>
                      <td width="5%">{{ talentData.age?talentData.age:''}}</td>
                      <td width="5%" class="tit">性别</td>
                      <td width="5%">{{ talentData.sex?talentData.sex:'' }}</td>
                      <td width="10%" class="tit">工作单位</td>
                      <td width="20%">{{ talentData.companyCode?talentData.companyCode:'' }}</td>
                      <td width="15%" class="tit">职务</td>
                      <td width="20%">{{ talentData.post?talentData.post:'' }}</td>
                    </tr>
                    <tr>
                      <td width="5%" class="tit">学位</td>
                      <td width="10%">{{ talentData.degree?talentData.degree:''}}</td>
                      <td width="5%" class="tit">学历</td>
                      <td width="5%">{{ talentData.record?talentData.record:''}}</td>
                      <td width="10%" class="tit">联系方式</td>
                      <td width="15%">{{ talentData.contactsNum?talentData.contactsNum:'' }}</td>
                      <td width="20%" class="tit">所属地区</td>
                      <td width="10%">{{ talentData.areaInfo?talentData.areaInfo.regionName:'' }}</td>
                      <td width="10%" class="tit">认定时间</td>
                      <td width="10%">{{ talentData.year?talentData.year:'' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>


          
           <TabPane name="keyLaboratorySign" v-if="keyLaboratoryData"  label="重点实验室" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#keyLaboratory">重点实验室</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="keyLaboratory" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">重点实验室</p><i class="pa"></i></h3>
                <p v-if="!keyLaboratoryData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="keyLaboratoryData">
                  <tbody>
                  <!-- 重点实验室详情 -->
                    <tr>
                      <td width="10%" class="tit">实验室名称</td>
                      <td width="40%">{{ keyLaboratoryData.projectName?keyLaboratoryData.projectName:''}}</td>
                      <td width="10%" class="tit">类型</td>
                      <td width="40%">{{ keyLaboratoryData.typeDto?keyLaboratoryData.typeDto.name:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="10%" class="tit">依托单位</td>
                      <td width="40%">{{ keyLaboratoryData.companyCode?keyLaboratoryData.companyCode:'' }}</td>
                      <td width="10%" class="tit">所在区县</td>
                      <td width="40%">{{ keyLaboratoryData.areaInfo?keyLaboratoryData.areaInfo.regionName:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="10%" class="tit">组建时间</td>
                      <td width="40%">{{ keyLaboratoryData.createDate?keyLaboratoryData.createDate:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

          <TabPane name="engineeringSign" v-if="EngineeringData" label="工程研究中心" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#engineering">工程研究中心</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="engineering" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">工程研究中心</p><i class="pa"></i></h3>
                <p v-if="!EngineeringData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="EngineeringData">
                  <tbody>
                  <!-- 工程研究中心详情 -->
                    <tr>
                      <td width="10%" class="tit">名称</td>
                      <td width="40%">{{ EngineeringData.projectName?EngineeringData.projectName:''}}</td>
                      <td width="10%" class="tit">类型</td>
                      <td width="40%">{{ EngineeringData.typeDto?EngineeringData.typeDto.name:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="10%" class="tit">依托单位</td>
                      <td width="40%">{{ EngineeringData.companyCode?EngineeringData.companyCode:'' }}</td>
                      <td width="10%" class="tit">所在区县</td>
                      <td width="40%">{{ EngineeringData.areaInfo?EngineeringData.areaInfo.regionName:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="10%" class="tit">组建时间</td>
                      <td width="40%">{{ EngineeringData.createDate?EngineeringData.createDate:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>


           <TabPane name="techniqueCenterSign" v-if="ComtechCenterData" label="企业技术中心" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#techniqueCenterSign">企业技术中心</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="techniqueCenterSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业技术中心</p><i class="pa"></i></h3>
                <p v-if="!ComtechCenterData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="ComtechCenterData">
                  <tbody>
                  <!-- 企业技术中心详情 -->
                    <tr>
                      <td width="10%" class="tit">名称</td>
                      <td width="40%">{{ ComtechCenterData.projectName?ComtechCenterData.projectName:''}}</td>
                      <td width="10%" class="tit">类型</td>
                      <td width="40%">{{ ComtechCenterData.typeDto?ComtechCenterData.typeDto.name:''}}</td>
                      
                    </tr>
                    <tr>
                    
                      <td width="10%" class="tit">所在区县</td>
                      <td width="40%">{{ ComtechCenterData.areaInfo?ComtechCenterData.areaInfo.regionName:''}}</td>
                       <td width="10%" class="tit">组建时间</td>
                      <td width="40%">{{ ComtechCenterData.createDate?ComtechCenterData.createDate:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

           <TabPane name="scienceCooperationSign" v-if="ScienceCooperationData" label="国际合作基地" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#scienceCooperationSign">国际合作基地</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="scienceCooperationSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">国际合作基地</p><i class="pa"></i></h3>
                <p v-if="!ScienceCooperationData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="ScienceCooperationData">
                  <tbody>
                  <!-- 国际合作基地详情 -->
                    <tr>
                      <td width="10%" class="tit">基地类型</td>
                      <td width="40%">{{ ScienceCooperationData.typeDto?ScienceCooperationData.typeDto.name:''}}</td>
                      <td width="10%" class="tit">依托单位</td>
                      <td width="40%">{{ ScienceCooperationData.companyCode?ScienceCooperationData.companyCode:''}}</td>
                      
                    </tr>
                    <tr>
                    
                      <td width="10%" class="tit">所在区县</td>
                      <td width="40%">{{ ScienceCooperationData.areaInfo?ScienceCooperationData.areaInfo.regionName:''}}</td>
                       <td width="10%" class="tit">认定时间</td>
                      <td width="40%">{{ ScienceCooperationData.createDate?ScienceCooperationData.createDate:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>


            <TabPane name="academicianSign" v-if="academicianData" label="企业院士专家工作站" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#academicianSign">工作站信息</a></li>
              <li class="fl"><a href="#academicianSign2">进站院士信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="academicianSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">工作站信息</p><i class="pa"></i></h3>
                <p v-if="!academicianData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="academicianData">
                  <tbody>
                  <!-- 企业院士专家工作站详情 -->
                    <tr>
                      <td width="10%" class="tit">建站单位</td>
                      <td width="20%">{{ academicianData.companyCode?academicianData.companyCode:''}}</td>
                      <td width="10%" class="tit">级别</td>
                      <td width="20%">{{ academicianData.levelDto?academicianData.levelDto.name:''}}</td>
                      <td width="10%" class="tit">所属区县</td>
                      <td width="10%">{{ academicianData.areaInfo?academicianData.areaInfo.regionName:''}}</td>
                      <td width="10%" class="tit">建站时间</td>
                      <td width="10%">{{ academicianData.createDate?academicianData.createDate:''}}</td>
                      
                    </tr>

                  </tbody>
                </table>
              </div>
              <div id="academicianSign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">进站院士信息</p><i class="pa"></i></h3>
                <p v-if="!academicianData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="academicianData">
                  <tbody>
                  <!-- 企业院士专家工作站详情 -->

                    <tr>
                    
                      <td width="10%" class="tit">院士姓名</td>
                      <td width="25%">{{ academicianData.academicianExpertDtos?academicianData.academicianExpertDtos.expertName:''}}</td>
                       <td width="10%" class="tit">院士学部</td>
                      <td width="25%">{{ academicianData.academicianExpertDtos?academicianData.academicianExpertDtos.studyDept:''}}</td>
                      <td width="10%" class="tit">当选时间</td>
                      <td width="20%">{{ academicianData.academicianExpertDtos?academicianData.academicianExpertDtos.electionDate:''}}</td>
                    
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>


          <TabPane name="taxDataSign" v-if="taxDataData" label="税务数据" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#taxDataSign">税务数据</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="taxDataSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">税务数据</p><i class="pa"></i></h3>
                <p v-if="!taxDataData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="taxDataData">
                  <tbody>
                  <!-- 税务数据详情 -->
                    <tr>
                      <td width="15%" class="tit">纳税人识别号</td>
                      <td width="15%">{{ taxDataData.identificationNumber?taxDataData.identificationNumber:''}}</td>
                      <td width="10%" class="tit">所属期起</td>
                      <td width="10%">{{ taxDataData.periodFrom?taxDataData.periodFrom:''}}</td>
                      <td width="10%" class="tit">所属期止</td>
                      <td width="10%">{{ taxDataData.dueDate?taxDataData.dueDate:''}}</td>
                      <td width="10%" class="tit">增值税(本期)</td>
                      <td width="10%">{{ taxDataData.vatBq?taxDataData.vatBq:''}}</td>
                    </tr>
                    <tr>
                    
                      <td width="15%" class="tit">增值税(基期)</td>
                      <td width="15%">{{ taxDataData.vatJq?taxDataData.vatJq:''}}</td>
                       <td width="15%" class="tit">企业所得税(本期)</td>
                      <td width="10%">{{ taxDataData.taxBq?taxDataData.taxBq:''}}</td>
                       <td width="15%" class="tit">企业所得税(基期)</td>
                      <td width="10%">{{ taxDataData.taxJq?taxDataData.taxJq:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

           <TabPane name="serviceSign"  v-if="serviceSignData" label="技术转移机构" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#serviceSign">服务机构</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="serviceSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">服务机构</p><i class="pa"></i></h3>
                <p v-if="!serviceSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="serviceSignData">
                  <tbody>
                  <!--技术转移机构详情 -->
                    <tr>
                      <td width="20%" class="tit">服务机构名称</td>
                      <td width="15%">{{ serviceSignData.serviceName?serviceSignData.serviceName:''}}</td>
                      <td width="15%" class="tit">法人类型</td>
                      <td width="15%">{{ serviceSignData.serviceType?serviceSignData.serviceType:''}}</td>
                      <td width="15%" class="tit">服务机构类型	</td>
                      <td width="20%">{{ serviceSignData.legalInfo?serviceSignData.legalInfo.name:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="20%" class="tit">是否申报示范机构</td>
                      <td width="15%">{{ serviceSignData.isDeclarationAgency?'是':'否'}}</td>
                      <td width="15%" class="tit">是否入选示范机构</td>
                      <td width="15%">{{ serviceSignData.isDemonstrationFacility?'是':'否'}}</td>
                       <td width="15%" class="tit">联系人</td>
                      <td width="20%">{{ serviceSignData.corporate?serviceSignData.corporate:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="20%" class="tit">联系方式</td>
                      <td width="15%">{{ serviceSignData.phone?serviceSignData.phone:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

           <TabPane name="teachSign" v-if="teachSignData" label="技术交易" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#teachSign">技术交易</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="teachSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">技术交易</p><i class="pa"></i></h3>
                <p v-if="!teachSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="teachSignData">
                  <tbody>
                  <!--技术交易详情 -->
                    <tr>
                      <td width="20%" class="tit">卖方企业名称</td>
                      <td width="15%">{{ teachSignData.sellerName?teachSignData.sellerName:''}}</td>
                      <td width="15%" class="tit">项目名称</td>
                      <td width="15%">{{ teachSignData.projectName?teachSignData.projectName:''}}</td>
                      <td width="15%" class="tit">成交额	</td>
                      <td width="20%">{{ teachSignData.turnover?teachSignData.turnover:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="20%" class="tit">技术交易额</td>
                      <td width="15%">{{ teachSignData.technologyTrading?teachSignData.technologyTrading:''}}</td>
                      <td width="15%" class="tit">合同类别</td>
                      <td width="15%">{{ teachSignData.contractDto?teachSignData.contractDto.name:''}}</td>
                       <td width="15%" class="tit">技术领域</td>
                      <td width="20%">{{ teachSignData.technicalDto?teachSignData.technicalDto.name:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="20%" class="tit">知识产权</td>
                      <td width="15%">{{ teachSignData.intellectualProperty?teachSignData.intellectualProperty:''}}</td>
                      <td width="20%" class="tit">交易年度</td>
                      <td width="15%">{{ teachSignData.tradingYear?teachSignData.tradingYear:''}}</td>
                      <td width="20%" class="tit">所属区县</td>
                      <td width="15%">{{ teachSignData.areaInfo?teachSignData.areaInfo.regionName:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>

          <TabPane name="GenPassServiceSign" v-if="GenPassServiceSignData" label="创通票服务机构" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#GenPassServiceSign">创通票服务机构</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="GenPassServiceSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">创通票服务机构</p><i class="pa"></i></h3>
                <p v-if="!GenPassServiceSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="GenPassServiceSignData">
                  <tbody>
                  <!--创通票服务机构详情 -->
                   <tr>
                    <td width="10%" class="tit">机构名称</td>
                    <td width="40%" >{{ GenPassServiceSignData.agencyName?GenPassServiceSignData.agencyName:''}}</td>
                    <td width="10%" class="tit">公司规模</td>
                    <td width="40%" >{{ GenPassServiceSignData.companySize?GenPassServiceSignData.companySize:'' }}</td>
                  </tr>
                  <tr>
                    <td width="10%" class="tit">公司人数	</td>
                    <td width="40%" >{{ GenPassServiceSignData.corporateNumbers?GenPassServiceSignData.corporateNumbers:''}}</td>
                    <td width="10%" class="tit">所属区县	</td>
                    <td width="40%">{{ GenPassServiceSignData.county? GenPassServiceSignData.county:''}}</td>
                  </tr>
                  <tr>
                    <td width="10%" class="tit">网址</td>
                    <td width="40%" >{{ GenPassServiceSignData.theUrl?GenPassServiceSignData.theUrl:''}}</td>
                    <td width="10%" class="tit">公司描述</td>
                    <td width="40%">{{ GenPassServiceSignData.companyDescription?GenPassServiceSignData.companyDescription:''}}</td>
                  </tr>
                  <tr>
                    <td width="10%" class="tit">依靠单位</td>
                    <td width="40%" >{{ GenPassServiceSignData.byUnit?GenPassServiceSignData.byUnit:''}}</td>
                    <td width="10%" class="tit">研究区域</td>
                    <td width="40%" >{{ GenPassServiceSignData.studyArea? GenPassServiceSignData.studyArea:''}}</td>
                  </tr>
                  <tr>
                    <td width="10%" class="tit">服务包</td>
                    <td width="40%" >{{ GenPassServiceSignData.servicePack?GenPassServiceSignData.servicePack:'' }}</td>
                    <td width="10%" class="tit">服务项目</td>
                    <td width="40%" >{{ GenPassServiceSignData.serviceItems?GenPassServiceSignData.serviceItems:'' }}</td>
                  </tr>
                  <tr>
                    <td width="10%" class="tit">法人</td>
                    <td width="40%">{{ GenPassServiceSignData.corporate?GenPassServiceSignData.corporate:'' }}</td>
                    <td width="10%" class="tit">法人手机</td>
                    <td width="40%" >{{ GenPassServiceSignData.corporatePhone?GenPassServiceSignData.corporatePhone:'' }}</td>
                  </tr>
                   <tr>
                    <td width="10%" class="tit">法人电话</td>
                    <td width="40%" >{{ GenPassServiceSignData.corporateCell?GenPassServiceSignData.corporateCell:'' }}</td>
                    <td width="10%" class="tit">邮箱</td>
                    <td width="40%" >{{ GenPassServiceSignData.email?GenPassServiceSignData.email:'' }}</td>
                  </tr>
                   <tr>
                    <td width="10%" class="tit">联系人</td>
                    <td width="40%" >{{ GenPassServiceSignData.contacts? GenPassServiceSignData.contacts:'' }}</td>
                    <td width="10%" class="tit">联系人电话</td>
                    <td width="40%">{{ GenPassServiceSignData.contactsPhone?GenPassServiceSignData.contactsPhone:'' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </TabPane>
          

         <TabPane name="RegisterEnterpriseSign" v-if="RegisterEnterpriseSignData" label="注册企业" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#RegisterEnterpriseSign">注册企业</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="RegisterEnterpriseSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">注册企业</p><i class="pa"></i></h3>
                <p v-if="!RegisterEnterpriseSignData">暂无数据展示</p>

                <table width="100%" cellpadding="5" v-if="RegisterEnterpriseSignData" :key="index" v-for="(item,index) in RegisterEnterpriseSignDatas" style="margin-bottom:30px;">
                  <tbody>
                  <!--注册企业详情 -->
                    <tr>
                      <td width="10%" class="tit">企业名称</td>
                      <td width="15%">{{ RegisterEnterpriseSignData.businessName?RegisterEnterpriseSignData.businessName:''}}</td>
                      <td width="15%" class="tit">领取服务包类型</td>
                      <td width="15%">{{ item?item.packageType:''}}</td>
                      <td width="15%" class="tit">领取服务项目	</td>
                      <td width="20%">{{ item?item.projectType:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">企业手机号码</td>
                      <td width="15%">{{ RegisterEnterpriseSignData.phone?RegisterEnterpriseSignData.phone:''}}</td>
                      <td width="15%" class="tit">服务机构名称</td>
                      <td width="15%">{{ item?item.agencyName:''}}</td>
                       <td width="15%" class="tit">服务机构手机号码</td>
                      <td width="20%">{{ item?item.agencyPhone:''}}</td>
                      
                    </tr>
                    <tr>
                      <td width="10%" class="tit">领票时间</td>
                      <td width="20%">{{ item?item.receiptTime:''}}</td>
                      <td width="20%" class="tit">签约时间</td>
                     <td width="20%">{{ item?item.signingTime:''}}</td>

                    </tr>
                  </tbody>
                </table>
              </div>
              
            </div>
          </TabPane>



        <TabPane name="torchSign" v-if="torchSignData" label="火炬统计" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#torchSign">企业概况</a></li>
              <li class="fl"><a href="#torchSign1">经营概况</a></li>
              <li class="fl"><a href="#torchSign2">人员概况</a></li>
              <li class="fl"><a href="#torchSign3">科技活动人员情况</a></li>
              <li class="fl"><a href="#torchSign4">科技活动费用情况</a></li>
              <li class="fl"><a href="#torchSign5">企业办(境内)研发机构情况</a></li>
              <li class="fl"><a href="#torchSign6">高新技术科技活动产出及相关情况</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="torchSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业概况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 企业概况详情 -->
                    <tr>
                      <td width="25%" class="tit">企业隶属关系</td>
                      <td width="25%">{{ torchSignData.qylsgx42?torchSignData.qylsgx42:'无'}}</td>
                      <td width="25%" class="tit">法人性质</td>
                      <td width="25%">{{ torchSignData.frxzInfo?torchSignData.frxzInfo.name:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">企业控股情况</td>
                      <td width="25%">{{ torchSignData.kgqk71?torchSignData.kgqk71:'无'}}</td>
                      <td width="25%" class="tit">企业负责人</td>
                      <td width="25%">{{ torchSignData.qyfzr32?torchSignData.qyfzr32:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">企业通讯地址</td>
                      <td width="25%">{{ torchSignData.qytxdz29?torchSignData.qytxdz29:'无'}}</td>
                      <td width="25%" class="tit">联系电话</td>
                      <td width="25%">{{ torchSignData.lxdh33?torchSignData.lxdh33:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">统计负责人</td>
                      <td width="25%">{{ torchSignData.tjfzr35?torchSignData.tjfzr35:'无'}}</td>
                      <td width="25%" class="tit">填报人</td>
                      <td width="25%">{{ torchSignData.tbr36?torchSignData.tbr36:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">填报人电话</td>
                      <td width="25%">{{ torchSignData.tbrdh37?torchSignData.tbrdh37:'无'}}</td>
                      <td width="25%" class="tit">填报人手机</td>
                      <td width="25%">{{ torchSignData.tbrsj38?torchSignData.tbrsj38:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">填报时间</td>
                      <td width="25%">{{ torchSignData.tbsj39?torchSignData.tbsj39:'无'}}</td>
                      <td width="25%" class="tit">Email</td>
                      <td width="25%">{{ torchSignData.yx22?torchSignData.yx22:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">地址</td>
                      <td width="25%">{{ torchSignData.dz17?torchSignData.dz17:'无'}}</td>
                      <td width="25%" class="tit">网址</td>
                      <td width="25%">{{ torchSignData.wz41?torchSignData.wz41:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">是否高新区管委会直属</td>
                      <td width="25%">{{ torchSignData.sfgxqgwhzs43==1?'是':'否'}}</td>
                      <td width="25%" class="tit">企业执行会计准则情况</td>
                      <td width="25%">{{ torchSignData.qyzxhjzzqk48?torchSignData.qyzxhjzzqk48:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="25%" class="tit">是否进入国家高新技术产业开发区</td>
                      <td width="25%">{{ torchSignData.sfjrgjgxjscykfq50==1?'是':'否'}}</td>
                      <td width="25%" class="tit">所在高新区名称</td>
                      <td width="25%">{{ torchSignData.rsqxzszgxqmc51?torchSignData.rsqxzszgxqmc51:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">进区时间</td>
                      <td width="25%">{{ torchSignData.jqsjn52?torchSignData.jqsjn52:'无'}}</td>
                      <td width="25%" class="tit">企业是否进入国家自主创新示范区</td>
                      <td width="25%">{{ torchSignData.qysfjrgjzzcxsfq53==1?'是':''}}</td>
                    </tr>
                     <tr>
                      <td width="25%" class="tit">所在自创区名称</td>
                      <td width="25%">{{ torchSignData.rsqxzszzcqmc54?torchSignData.rsqxzszzcqmc54:'无'}}</td>
                      <td width="25%" class="tit">企业集团情况</td>
                      <td width="25%">{{ torchSignData.qyjtqk55?torchSignData.qyjtqk55:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">上级单位</td>
                      <td width="25%">{{ torchSignData.qb09rw2qt56?torchSignData.qb09rw2qt56:'无'}}</td>
                      <td width="25%" class="tit">是否为经过认定的高新技术企业</td>
                      <td width="25%">{{ torchSignData.sfwjgrddgxjsqy57==1?'是':'否'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">被认定（复审）为高企的时间</td>
                      <td width="25%">{{ torchSignData.brdfswgqdsj58?torchSignData.brdfswgqdsj58:'无'}}</td>
                      <td width="25%" class="tit">高企证书编号	</td>
                      <td width="25%">{{ torchSignData.gqzsbh59?torchSignData.gqzsbh59:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">与科技企业孵化器关系</td>
                      <td width="25%">{{ torchSignData.ykjqyfhqgx60?torchSignData.ykjqyfhqgx60:'无'}}</td>
                      <td width="25%" class="tit">入孵时间</td>
                      <td width="25%">{{ torchSignData.rfsj61?torchSignData.rfsj61:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="25%" class="tit">毕业时间</td>
                      <td width="25%">{{ torchSignData.bysj62?torchSignData.bysj62:'无'}}</td>
                      <td width="25%" class="tit">上市及新三板四板挂牌情况	</td>
                      <td width="25%">{{ torchSignData.ssjxsbsbgpqk63?torchSignData.ssjxsbsbgpqk63:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">股票代码</td>
                      <td width="25%">{{ torchSignData.gpdm64?torchSignData.gpdm64:'无'}}</td>
                      <td width="25%" class="tit">上市挂牌时间</td>
                      <td width="25%">{{ torchSignData.ssgpsj65?torchSignData.ssgpsj65:'无'}}</td>
                    </tr>
                      <tr>
                      <td width="25%" class="tit">本公司是否为上市（挂牌）企业主体</td>
                      <td width="25%">{{ torchSignData.bgssfwssgpqyzt66==1?'是':'否'}}</td>
                      <td width="25%" class="tit">上市公司主体名称	</td>
                      <td width="25%">{{ torchSignData.rwfqtxssgsztmc67?torchSignData.rwfqtxssgsztmc67:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="tit">上市企业年末市值	</td>
                      <td width="25%">{{ torchSignData.ssqynmsz68?torchSignData.ssqynmsz68:'无'}}</td>
                      <td width="25%" class="tit">企业所属技术领域</td>
                      <td width="25%">{{ torchSignData.jsly69?torchSignData.jsly69:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="25%" class="tit">企业核心技术所属国家重点支持的高新技术领域	</td>
                      <td width="25%">{{ torchSignData.qyhxjsssgj70?torchSignData.qyhxjsssgj70:'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="torchSign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">经营概况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 经营概况详情 -->
                    <tr>
                    <td width="60%" class="tit">工业总产值（当年价格）</td>
                      <td width="40%">{{ torchSignData.gyzczdnjg72!=0?torchSignData.gyzczdnjg72+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">营业收入</td>
                      <td width="40%">{{ torchSignData.yysr73!=0?torchSignData.yysr73+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：主营业务收入</td>
                      <td width="40%">{{ torchSignData.qtyysr83!=0?torchSignData.qtyysr83+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：技术收入</td>
                      <td width="40%">{{ torchSignData.qzjssr75!=0?torchSignData.qzjssr75+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：技术转让收入</td>
                      <td width="40%">{{ torchSignData.qzjszrsr76!=0?torchSignData.qzjszrsr76+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">技术承包收入</td>
                      <td width="40%">{{ torchSignData.jscbsr77!=0?torchSignData.jscbsr77+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">技术咨询与服务收入</td>
                      <td width="40%">{{ torchSignData.jszxyfwsr78!=0?torchSignData.jszxyfwsr78+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">接受委托研究开发收入</td>
                      <td width="40%">{{ torchSignData.jswtyjkfsr79!=0?torchSignData.jswtyjkfsr79+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">产品销售收入</td>
                      <td width="40%">{{ torchSignData.xcpxssr197!=0?torchSignData.xcpxssr197+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">其中：高新技术产品</td>
                      <td width="40%">{{ torchSignData.qzgxjscp81!=0?torchSignData.qzgxjscp81+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">商品销售收入</td>
                      <td width="40%">{{ torchSignData.spxssr82!=0?torchSignData.spxssr82+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其他营业收入</td>
                      <td width="40%">{{ torchSignData.qtyysr83!=0?torchSignData.qtyysr83+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">进出口总额</td>
                      <td width="40%">{{ torchSignData.jckze84!=0?torchSignData.jckze84+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：出口总额</td>
                      <td width="40%">{{ torchSignData.qzckze85!=0?torchSignData.qzckze85+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：高新技术产品出口</td>
                      <td width="40%">{{ torchSignData.qzgxjscpck86!=0?torchSignData.qzgxjscpck86+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">技术服务出口</td>
                      <td width="40%">{{ torchSignData.jsfwck87!=0?torchSignData.jsfwck87+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit">营业成本</td>
                      <td width="40%">{{ torchSignData.yycb88!=0?torchSignData.yycb88+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit" >税金及附加</td>
                      <td width="40%">{{ torchSignData.sjjfj89!=0?torchSignData.sjjfj89+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit">销售费用</td>
                      <td width="40%">{{ torchSignData.xsfy90!=0?torchSignData.xsfy90+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit">管理费用</td>
                      <td width="40%">{{ torchSignData.glfy91!=0?torchSignData.glfy91+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit">财务费用</td>
                      <td width="40%">{{ torchSignData.cwfy92!=0?torchSignData.cwfy92+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">资产减值损失</td>
                      <td width="40%">{{ torchSignData.zcjzss93!=0?torchSignData.zcjzss93+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">公允价值变动收益</td>
                      <td width="40%">{{ torchSignData.gyjzbdsyssyHj94!=0?torchSignData.gyjzbdsyssyHj94+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">投资收益</td>
                      <td width="40%">{{ torchSignData.tzsyssyHj95!=0?torchSignData.tzsyssyHj95+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">其他收益</td>
                      <td width="40%">{{ torchSignData.qtsy96!=0?torchSignData.qtsy96+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">营业利润</td>
                      <td width="40%">{{ torchSignData.yylr97!=0?torchSignData.yylr97+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">营业外收入</td>
                      <td width="40%">{{ torchSignData.yywsr98!=0?torchSignData.yywsr98+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit">营业外支出</td>
                      <td width="40%">{{ torchSignData.yywzc99!=0?torchSignData.yywzc99+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit">净利润</td>
                      <td width="40%">{{ torchSignData.jlr100!=0?torchSignData.jlr100+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >所得税费用</td>
                      <td width="40%">{{ torchSignData.sdsfy101!=0?torchSignData.sdsfy101+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >实际上缴税费总额</td>
                      <td width="40%">{{ torchSignData.sjsjsfze102!=0?torchSignData.sjsjsfze102+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：增值税</td>
                      <td width="40%">{{ torchSignData.qzzzs103!=0?torchSignData.qzzzs103+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:6.3%">所得税</td>
                      <td width="40%">{{ torchSignData.sds104!=0?torchSignData.sds104+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >减免税总额</td>
                      <td width="40%">{{ torchSignData.jmsze105!=0?torchSignData.jmsze105+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：增值税</td>
                      <td width="40%">{{ torchSignData.qzzzs106!=0?torchSignData.qzzzs106+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:6.3%">所得税</td>
                      <td width="40%">{{ torchSignData.sds107!=0?torchSignData.sds107+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:7.3%">其中：享受高新技术企业所得税减免</td>
                      <td width="40%">{{ torchSignData.qzxsgxjsqysdsjm108!=0?torchSignData.qzxsgxjsqysdsjm108+'千元':'无'}}</td>
                    </tr>
                     <tr>
                     <td width="60%" class="tit" style="padding-left:10.6%">研发加计扣除所得税减免</td>
                      <td width="40%">{{ torchSignData.yfjjkcsdsjm109!=0?torchSignData.yfjjkcsdsjm109+'千元':'无'}}</td>
                    </tr>
                    <tr>
                     <td width="60%" class="tit" style="padding-left:10.6%">技术转让所得税减免</td>
                      <td width="40%">{{ torchSignData.jszrsdsjm110!=0?torchSignData.jszrsdsjm110+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >应交增值税</td>
                      <td width="40%">{{ torchSignData.yjzzs111!=0?torchSignData.yjzzs111+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >本年应付职工薪酬（本年贷方累计发生额）</td>
                      <td width="40%">{{ torchSignData.bnyfzgxcbndfljfse112!=0?torchSignData.bnyfzgxcbndfljfse112+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >年末资产总计</td>
                      <td width="40%">{{ torchSignData.nmzczj113!=0?torchSignData.nmzczj113+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：流动资产合计</td>
                      <td width="40%">{{ torchSignData.qzldzchj114!=0?torchSignData.qzldzchj114+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:6.3%">固定资产合计</td>
                      <td width="40%">{{ torchSignData.gdzchj115!=0?torchSignData.gdzchj115+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:6.3%">累计折旧</td>
                      <td width="40%">{{ torchSignData.ljzj116!=0?torchSignData.ljzj116+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:7.3%">其中：本年折旧</td>
                      <td width="40%">{{ torchSignData.qzbnzj117!=0?torchSignData.qzbnzj117+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" style="padding-left:6.3%">无形资产</td>
                      <td width="40%">{{ torchSignData.wxzc118!=0?torchSignData.wxzc118+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >年末负债合计</td>
                      <td width="40%">{{ torchSignData.nmfzhj119!=0?torchSignData.nmfzhj119+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >年末所有者权益（股东权益）</td>
                      <td width="40%">{{ torchSignData.nmsyzqygdqy120!=0?torchSignData.nmsyzqygdqy120+'千元':'无'}}</td>
                    </tr>
                      <tr>
                    <td width="60%" class="tit" style="padding-left:3%">其中：实收资本（股本）</td>
                      <td width="40%">{{ torchSignData.qzsszbgb121!=0?torchSignData.qzsszbgb121+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" style="padding-left:7.3%">其中：企业上市融资股本</td>
                      <td width="40%">{{ torchSignData.qzqyssrzgb122!=0?torchSignData.qzqyssrzgb122+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" style="padding-left:9.3%">其中：企业海外上市融资股本</td>
                      <td width="40%">{{ torchSignData.qzqyhwssrzgb123!=0?torchSignData.qzqyhwssrzgb123+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >当年获得创业风险投资机构的风险投资额</td>
                      <td width="40%">{{ torchSignData.dnhdcyfxtzjgdfxtze124!=0?torchSignData.dnhdcyfxtzjgdfxtze124+'千元':'无'}}</td>
                    </tr>
                    <tr>
                    <td width="60%" class="tit" >对境外直接投资额</td>
                      <td width="40%">{{ torchSignData.djwzjtze125!=0?torchSignData.djwzjtze125+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >本年完成固定资产投资额</td>
                      <td width="40%">{{ torchSignData.bnwcgdzctze126!=0?torchSignData.bnwcgdzctze126+'千元':'无'}}</td>
                    </tr>
                     <tr>
                    <td width="60%" class="tit" >规模以上工业企业及重点耗能企业综合能源消费量</td>
                      <td width="40%">{{ torchSignData.gmysgyqyjz127!=0?torchSignData.gmysgyqyjz127+'千元':'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="torchSign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">人员概况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 人员概况详情 -->
                    <tr>
                      <td width="60%" class="tit" style="font-size:14px;">一、从业人员数</td>
                      <td width="40%"></td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >从业人员期末人数</td>
                      <td width="40%">{{ torchSignData.cyryqmrs129?torchSignData.cyryqmrs129+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：留学归国人员</td>
                      <td width="40%">{{ torchSignData.qzlxggry130!=0?torchSignData.qzlxggry130+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：外籍常驻人员</td>
                      <td width="40%">{{ torchSignData.qzwjczry131!=0?torchSignData.qzwjczry131+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：引进外籍专家</td>
                      <td width="40%">{{ torchSignData.qzyjwjzj132!=0?torchSignData.qzyjwjzj132+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年新增从业人员</td>
                      <td width="40%">{{ torchSignData.qzdnxzcyry133!=0?torchSignData.qzdnxzcyry133+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：吸纳高校应届毕业生</td>
                      <td width="40%">{{ torchSignData.qzxngxyjbys134!=0?torchSignData.qzxngxyjbys134+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：参加社保人数</td>
                      <td width="40%">{{ torchSignData.qzcjsbrs135!=0?torchSignData.qzcjsbrs135+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">从业人员年平均人数</td>
                      <td width="40%">{{ torchSignData.cyrynpjrs136!=0?torchSignData.cyrynpjrs136+'人':'无'}}</td>
                    </tr>
                  <tr>
                      <td width="60%" class="tit" style="font-size:14px;">一、从业人员构成</td>
                      <td width="40%"></td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >（一）按学历、学位分</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >研究生</td>
                      <td width="40%">{{ torchSignData.yjs138!=0?torchSignData.yjs138+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：博士</td>
                      <td width="40%">{{ torchSignData.qzbs139!=0?torchSignData.qzbs139+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6.3%">硕士</td>
                      <td width="40%">{{ torchSignData.qzss140!=0?torchSignData.qzss140+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >本科</td>
                      <td width="40%">{{ torchSignData.bk141?torchSignData.bk141+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >大专</td>
                      <td width="40%">{{ torchSignData.dz142?torchSignData.dz142+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >理工类本科学历以上人员</td>
                      <td width="40%">{{ torchSignData.lglbkxlysry143?torchSignData.lglbkxlysry143+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >（二）按岗位类型分</td>
                      <td width="40%"></td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >中层及以上管理人员</td>
                      <td width="40%">{{ torchSignData.zcjysglry144?torchSignData.zcjysglry144+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >专业技术人员</td>
                      <td width="40%">{{ torchSignData.zyjsry145?torchSignData.zyjsry145+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >技术工人</td>
                      <td width="40%">{{ torchSignData.jsgr146?torchSignData.jsgr146+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >企业法人性别</td>
                      <td width="40%">{{ torchSignData.qyfrxb147?torchSignData.qyfrxb147+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >出生年份</td>
                      <td width="40%">{{ torchSignData.csnf148	?torchSignData.csnf148	+'人':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" >学历</td>
                      <td width="40%">{{ torchSignData.xl149?torchSignData.xl149+'人':'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="torchSign3" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">科技活动人员情况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 科技活动人员情况详情 -->
                    <tr>
                      <td width="60%" class="tit" >科技活动人员合计</td>
                      <td width="40%">{{ torchSignData.kjhdryhj151?torchSignData.kjhdryhj151+'人':'无'}}</td>
                    </tr>
                      <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：参加科技项目人员</td>
                      <td width="40%">{{ torchSignData.qz1cjkjxmry152!=0?torchSignData.qz1cjkjxmry152+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6.3%">科技管理和服务人员</td>
                      <td width="40%">{{ torchSignData.kjglhfwry153!=0?torchSignData.kjglhfwry153+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:9%">其中：高中级技术职称人员</td>
                      <td width="40%">{{ torchSignData.qz1gzjjszcry154!=0?torchSignData.qz1gzjjszcry154+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:12.3%">无高中级技术职称博士人员</td>
                      <td width="40%">{{ torchSignData.wgzjjszcbsry155!=0?torchSignData.wgzjjszcbsry155+'人':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:15.3%">其中：全时人员</td>
                      <td width="40%">{{ torchSignData.qzqsry156!=0?torchSignData.qzqsry156+'人':'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="torchSign4" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">科技活动费用情况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 人科技活动费用情况详情 -->
                   <tr>
                      <td width="60%" class="tit" >科技活动经费支出合计</td>
                      <td width="40%">{{ torchSignData.kjhdjfzchj158!=0?torchSignData.kjhdjfzchj158+'千元':'无'}}</td>
                    </tr>
                      <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：使用来自政府部门的科技活动经费</td>
                      <td width="40%">{{ torchSignData.qzsylzzfbmdkjhdjf159!=0?torchSignData.qzsylzzfbmdkjhdjf159+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">（一）企业内部的日常科技活动经费支出</td>
                      <td width="40%">{{ torchSignData.yqynbdrckjhdjfzc160!=0?torchSignData.yqynbdrckjhdjfzc160+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">人员人工费（包含各种补贴）</td>
                      <td width="40%">{{ torchSignData.ryrgfbhgzbt161!=0?torchSignData.ryrgfbhgzbt161+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">原材料费</td>
                      <td width="40%">{{ torchSignData.yclf162!=0?torchSignData.yclf162+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">折旧费用与长期费用摊销</td>
                      <td width="40%">{{ torchSignData.zjfyyzqfytx163!=0?torchSignData.zjfyyzqfytx163+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">无形资产摊销</td>
                      <td width="40%">{{ torchSignData.wxzctx164!=0?torchSignData.wxzctx164+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其他费用</td>
                      <td width="40%">{{ torchSignData.qtfy165!=0?torchSignData.qtfy165+'千元':'无'}}</td>
                    </tr>
                      <tr>
                      <td width="60%" class="tit" style="padding-left:3%">（二）当年形成用于科技活动的固定资产支出</td>
                      <td width="40%">{{ torchSignData.ednxcyykjhddgdzczc166	!=0?torchSignData.ednxcyykjhddgdzczc166	+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：仪器和设备</td>
                      <td width="40%">{{ torchSignData.qzyqhsb167!=0?torchSignData.qzyqhsb167+'千元':'无'}}</td>
                    </tr>
                       <tr>
                      <td width="60%" class="tit" style="padding-left:3%">（三）委托外单位开展科技活动的经费支出	</td>
                      <td width="40%">{{ torchSignData.swtwdwkzkjhddjfzc168!=0?torchSignData.swtwdwkzkjhddjfzc168+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：对境内研究机构支出</td>
                      <td width="40%">{{ torchSignData.qzdjnyjjgzc169!=0?torchSignData.qzdjnyjjgzc169+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">对境内高等学校支出</td>
                      <td width="40%">{{ torchSignData.djngdxxzc170!=0?torchSignData.djngdxxzc170+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">对境内企业支出</td>
                      <td width="40%">{{ torchSignData.djnqyzc171!=0?torchSignData.djnqyzc171+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:9.3%">对境外支出</td>
                      <td width="40%">{{ torchSignData.djwzc172!=0?torchSignData.djwzc172+'千元':'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
               <div id="torchSign5" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业办(境内)研发机构情况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 企业办(境内)研发机构情况详情 -->
                <tr>
                  <td width="60%" class="tit" >期末机构数</td>
                  <td width="40%">{{ torchSignData.qmjgs174!=0?torchSignData.qmjgs174+'个':'无'}}</td>
                </tr>
                <tr>
                  <td width="60%" class="tit" >机构人员合计</td>
                  <td width="40%">{{ torchSignData.jgryhj175!=0?torchSignData.jgryhj175+'人':'无'}}</td>
                </tr>
                <tr>
                  <td width="60%" class="tit" >机构经费支出</td>
                  <td width="40%">{{ torchSignData.jgjfzc176!=0?torchSignData.jgjfzc176+'千元':'无'}}</td>
                </tr>
                  </tbody>
                </table>
              </div>
               <div id="torchSign6" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">高新技术科技活动产出及相关情况</p><i class="pa"></i></h3>
                <p v-if="!torchSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="torchSignData">
                  <tbody>
                  <!-- 高新技术科技活动产出及相关情况详情 -->
                   <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（一）自主知识产权情况</td>
                      <td width="40%"></td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" >当年专利申请数</td>
                      <td width="40%">{{ torchSignData.dnzlsqs179!=0?torchSignData.dnzlsqs179+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：申请发明专利</td>
                      <td width="40%">{{ torchSignData.qzsqfmzl180!=0?torchSignData.qzsqfmzl180+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：申请国内发明专利</td>
                      <td width="40%">{{ torchSignData.qzsqgnfmzl181!=0?torchSignData.qzsqgnfmzl181+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：申请欧美日专利</td>
                      <td width="40%">{{ torchSignData.qzsqomrzl182!=0?torchSignData.qzsqomrzl182+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：申请PCT国际专利</td>
                      <td width="40%">{{ torchSignData.qzsqpctgjzl183!=0?torchSignData.qzsqpctgjzl183+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">当年专利授权数</td>
                      <td width="40%">{{ torchSignData.dnzlsqs184!=0?torchSignData.dnzlsqs184+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：授权发明专利</td>
                      <td width="40%">{{ torchSignData.qzsqfmzl185!=0?torchSignData.qzsqfmzl185+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：授权国内发明专利</td>
                      <td width="40%">{{ torchSignData.qzsqgnfmzl186!=0?torchSignData.qzsqgnfmzl186+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：授权欧美日专利</td>
                      <td width="40%">{{ torchSignData.qzsqomrzl187!=0?torchSignData.qzsqomrzl187+'件':'无'}}</td>
                    </tr>
                      <tr>
                      <td width="60%" class="tit">期末拥有有效专利数</td>
                      <td width="40%">{{ torchSignData.qmyyyxzls188!=0?torchSignData.qmyyyxzls188+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：发明专利</td>
                      <td width="40%">{{ torchSignData.qzfmzl189!=0?torchSignData.qzfmzl189+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：境外授权发明专利</td>
                      <td width="40%">{{ torchSignData.qzjwsqfmzl190!=0?torchSignData.qzjwsqfmzl190+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：拥有境外授权专利</td>
                      <td width="40%">{{ torchSignData.qzyyjwsqzl191!=0?torchSignData.qzyyjwsqzl191+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="padding-left:6%">其中：拥有欧美日专利</td>
                      <td width="40%">{{ torchSignData.qzyyomrzl192!=0?torchSignData.qzyyomrzl192+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">专利所有权转让及许可数</td>
                      <td width="40%">{{ torchSignData.zlsyqzrjxks193!=0?torchSignData.zlsyqzrjxks193+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">专利所有权转让及许可收入</td>
                      <td width="40%">{{ torchSignData.zlsyqzrjxksr194!=0?torchSignData.zlsyqzrjxksr194+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（二）新产品生产及销售情况</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">新产品产值</td>
                      <td width="40%">{{ torchSignData.xcpcz196!=0?torchSignData.xcpcz196+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">新产品销售收入</td>
                      <td width="40%">{{ torchSignData.xcpxssr197!=0?torchSignData.xcpxssr197+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：出口</td>
                      <td width="40%">{{ torchSignData.qzck198!=0?torchSignData.qzck198+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（三）境外分支机构设立情况</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">其中：境外营销服务机构数</td>
                      <td width="40%">{{ torchSignData.qzjwyxfwjgs200!=0?torchSignData.qzjwyxfwjgs200+'个':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3.3%">外技术研发机构数</td>
                      <td width="40%">{{ torchSignData.jwjsyfjgs201!=0?torchSignData.jwjsyfjgs201+'个':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3.3%">境外生产制造基地数</td>
                      <td width="40%">{{ torchSignData.jwsczzjds202!=0?torchSignData.jwsczzjds202+'个':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（四）其他情况</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">发表科技论文</td>
                      <td width="40%">{{ torchSignData.fbkjlw204!=0?torchSignData.fbkjlw204+'篇':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">期末拥有注册商标</td>
                      <td width="40%">{{ torchSignData.qmyyzcsb205!=0?torchSignData.qmyyzcsb205+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年注册商标</td>
                      <td width="40%">{{ torchSignData.qzdnzcsb206!=0?torchSignData.qzdnzcsb206+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：境外注册商标</td>
                      <td width="40%">{{ torchSignData.qzjwzcsb207!=0?torchSignData.qzjwzcsb207+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">拥有软件著作权</td>
                      <td width="40%">{{ torchSignData.yyrjzzq208!=0	?torchSignData.yyrjzzq208	+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年获得软件著作权</td>
                      <td width="40%">{{ torchSignData.qzdnhdrjzzq209!=0?torchSignData.qzdnhdrjzzq209+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">拥有集成电路布图</td>
                      <td width="40%">{{ torchSignData.yyjcdlbt210!=0?torchSignData.yyjcdlbt210+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年获得集成电路布图</td>
                      <td width="40%">{{ torchSignData.qzdnhdjcdlbt211!=0?torchSignData.qzdnhdjcdlbt211+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">拥有植物新品种</td>
                      <td width="40%">{{ torchSignData.yyzwxpz212!=0?torchSignData.yyzwxpz212+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年获得植物新品种</td>
                      <td width="40%">{{ torchSignData.qzdnhdzwxpz213!=0?torchSignData.qzdnhdzwxpz213+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">拥有国家一类新药品种</td>
                      <td width="40%">{{ torchSignData.yygjylxypz214!=0?torchSignData.yygjylxypz214+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年获得国家一类新药证书</td>
                      <td width="40%">{{ torchSignData.qzdnhdgjylxyzs215!=0?torchSignData.qzdnhdgjylxyzs215+'件':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">拥有国家一级中药保护品种</td>
                      <td width="40%">{{ torchSignData.yygjyjzybhpz216!=0?torchSignData.yygjyjzybhpz216+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit" style="padding-left:3%">其中：当年获得国家一级中药保护品种证书</td>
                      <td width="40%">{{ torchSignData.qzdnhdgjyjzybhpzzs217!=0?torchSignData.qzdnhdgjyjzybhpzzs217+'件':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">当年形成国际标准</td>
                      <td width="40%">{{ torchSignData.dnxcgjbz218!=0?torchSignData.dnxcgjbz218+'项':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">当年形成国家或行业标准</td>
                      <td width="40%">{{ torchSignData.dnxcgjhxybz219!=0?torchSignData.dnxcgjhxybz219+'项':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">当年获得国家科技奖励</td>
                      <td width="40%">{{ torchSignData.dnhdgjkjjl220!=0?torchSignData.dnhdgjkjjl220+'项':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（五）技术获取和技术改造情况</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">技术改造经费支出</td>
                      <td width="40%">{{ torchSignData.jsgzjfzc222!=0?torchSignData.jsgzjfzc222+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">引进境外技术经费支出</td>
                      <td width="40%">{{ torchSignData.yjjwjsjfzc223!=0?torchSignData.yjjwjsjfzc223+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">引进境外技术的消化吸收经费支出</td>
                      <td width="40%">{{ torchSignData.yjjwjsdxhxsjfzc224!=0?torchSignData.yjjwjsdxhxsjfzc224+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">购买境内技术经费支出</td>
                      <td width="40%">{{ torchSignData.gmjnjsjfzc225!=0?torchSignData.gmjnjsjfzc225+'千元':'无'}}</td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit" style="font-size:14px;">（六）技术合同交易情况</td>
                      <td width="40%"></td>
                    </tr>
                     <tr>
                      <td width="60%" class="tit">认定登记的技术合同项数</td>
                      <td width="40%">{{ torchSignData.rddjdjshtxs227!=0?torchSignData.rddjdjshtxs227+'千元':'无'}}</td>
                    </tr>
                    <tr>
                      <td width="60%" class="tit">认定登记的技术合同成交金额</td>
                      <td width="40%">{{ torchSignData.rddjdjshtcjje228!=0?torchSignData.rddjdjshtcjje228+'千元':'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>


         <TabPane name="citySoarSign" v-if="citySoarSignData" label="市级高企" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#citySoarSign">市级高企</a></li>
              <li class="fl"><a href="#citySoarSign1">负责人信息</a></li>
              <li class="fl"><a href="#citySoarSign2">经营状况</a></li>
              <li class="fl"><a href="#citySoarSign3">人员信息</a></li>
              <li class="fl"><a href="#citySoarSign4">知识产权</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="citySoarSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业概况</p><i class="pa"></i></h3>
                <p v-if="!citySoarSignData">暂无数据展示</p>

                <table width="100%" cellpadding="5" v-if="citySoarSignData"  style="margin-bottom:30px;">
                  <tbody>
                  <!--注册企业详情 -->
                    <tr>
                      <td width="10%" class="tit">认证机构</td>
                      <td width="15%">{{ citySoarSignData.certificationBody?citySoarSignData.certificationBody:''}}</td>
                      <td width="15%" class="tit">证书编号</td>
                      <td width="15%">{{ citySoarSignData.certificateNumber?citySoarSignData.certificateNumber:''}}</td>
                      <td width="15%" class="tit">认证年份	</td>
                      <td width="20%">{{ citySoarSignData.transitTime?citySoarSignData.transitTime:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">技术领域</td>
                      <td width="15%">{{ citySoarSignData.technicalDto?citySoarSignData.technicalDto.name:''}}</td>
                      <td width="15%" class="tit">外资国别</td>
                      <td width="15%">{{ citySoarSignData.foreignCountry?citySoarSignData.foreignCountry:''}}</td>
                       <td width="15%" class="tit">是否曾被评为国家高企</td>
                      <td width="20%">{{ citySoarSignData.isNationalHigh?citySoarSignData.isNationalHigh:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">最新国家高企证书编号</td>
                      <td width="15%">{{ citySoarSignData.nationalHighCode?citySoarSignData.nationalHighCode:''}}</td>
                      <td width="15%" class="tit">是否是科技型中小企业</td>
                      <td width="15%">{{ citySoarSignData.isTechnologySmes?citySoarSignData.isTechnologySmes:''}}</td>
                       <td width="15%" class="tit">是否隶属于天津市工业集团</td>
                      <td width="20%">{{ citySoarSignData.isTijin?citySoarSignData.isTijin:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">是否中央驻津企业</td>
                      <td width="15%">{{ citySoarSignData.isInTijin?citySoarSignData.isInTijin:''}}</td>
                      <td width="15%" class="tit">是否有上市需求</td>
                      <td width="15%">{{ citySoarSignData.isPublicDemand?citySoarSignData.isPublicDemand:''}}</td>
                       <td width="15%" class="tit">是否上市</td>
                      <td width="20%">{{ citySoarSignData.isListed?citySoarSignData.isListed:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">上市形式</td>
                      <td width="15%">{{ citySoarSignData.listedForm?citySoarSignData.listedForm:''}}</td>
                      <td width="15%" class="tit">上市时间</td>
                      <td width="15%">{{ citySoarSignData.listedTime?citySoarSignData.listedTime:''}}</td>
                       <td width="15%" class="tit">是否有贷款需求</td>
                      <td width="20%">{{ citySoarSignData.isLoanDemand?citySoarSignData.isLoanDemand:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">是否引入风险投资</td>
                      <td width="15%">{{ citySoarSignData.isVentureCapital?citySoarSignData.isVentureCapital:''}}</td>
                      <td width="15%" class="tit">投资额度</td>
                      <td width="15%">{{ citySoarSignData.investmentQuota?citySoarSignData.investmentQuota:''}}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
               <div id="citySoarSign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">负责人信息</p><i class="pa"></i></h3>
                <p v-if="!citySoarSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="citySoarSignData">
                  <tbody>
                    <tr>
                      <td width="10%" class="tit">企业法人</td>
                      <td width="15%">{{ citySoarSignData.enterprisePerson?citySoarSignData.enterprisePerson:''}}</td>
                      <td width="15%" class="tit">法人代码</td>
                      <td width="15%">{{ citySoarSignData.corporateCode?citySoarSignData.corporateCode:''}}</td>
                      <td width="15%" class="tit">身份证	</td>
                      <td width="20%">{{ citySoarSignData.identificationCard?citySoarSignData.identificationCard:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">email</td>
                      <td width="15%">{{ citySoarSignData.email1?citySoarSignData.email1:''}}</td>
                      <td width="15%" class="tit">手机</td>
                      <td width="15%">{{ citySoarSignData.mobilePhone?citySoarSignData.mobilePhone:''}}</td>
                       <td width="15%" class="tit">座机</td>
                      <td width="20%">{{ citySoarSignData.landline?citySoarSignData.landline:''}}</td>
                      
                    </tr>
                    <tr style="margin-bottom:30px;">
                      <td width="10%" class="tit">传真</td>
                      <td width="15%">{{ citySoarSignData.fax?citySoarSignData.fax:''}}</td>
                    </tr>
                    <tr>
                      
                    <td width="10%" class="tit">联系人</td>
                      <td width="15%">{{ citySoarSignData.contactPerson?citySoarSignData.contactPerson:''}}</td>
                      <td width="15%" class="tit">email</td>
                      <td width="15%">{{ citySoarSignData.email2?citySoarSignData.email2:''}}</td>
                       <td width="15%" class="tit">手机</td>
                      <td width="20%">{{ citySoarSignData.mobilePhone2?citySoarSignData.mobilePhone2:''}}</td>
                      
                    </tr>
                    <tr>
                    <td width="10%" class="tit">电话</td>
                      <td width="15%">{{ citySoarSignData.landline2?citySoarSignData.landline2:''}}</td>
                      <td width="15%" class="tit">传真</td>
                      <td width="15%">{{ citySoarSignData.fax2?citySoarSignData.fax2:''}}</td>
                    
                      
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="citySoarSign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">经营情况</p><i class="pa"></i></h3>
                <p v-if="!citySoarSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="citySoarSignData">
                  <tbody>
                <tr>
                  <td width="40%" class="tit" >近1年企业总收入</td>
                  <td width="60%">{{ citySoarSignData.oneTotalAssets?citySoarSignData.oneTotalAssets:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >近1年高新技术产品（服务）收入</td>
                  <td width="60%">{{ citySoarSignData.forNearlyYear?citySoarSignData.forNearlyYear:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >近三年研究开发费用总额（万元）</td>
                  <td width="60%">{{ citySoarSignData.threeYearDevelopment?citySoarSignData.threeYearDevelopment:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" style="padding-left:3%">其中：中国境内研发费用总和</td>
                  <td width="60%">{{ citySoarSignData.domesticExpenses?citySoarSignData.domesticExpenses:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第一年销售收入</td>
                  <td width="60%">{{ citySoarSignData.oneYearIncome?citySoarSignData.oneYearIncome:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第二年销售收入</td>
                  <td width="60%">{{ citySoarSignData.twoYearIncome?citySoarSignData.twoYearIncome:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第三年销售收入</td>
                  <td width="60%">{{ citySoarSignData.threeYearIncome?citySoarSignData.threeYearIncome:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第一年总资产</td>
                  <td width="60%">{{ citySoarSignData.oneTotalAssets?citySoarSignData.oneTotalAssets:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第二年总资产</td>
                  <td width="60%">{{ citySoarSignData.twoTotalAssets?citySoarSignData.twoTotalAssets:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">第三年总资产</td>
                  <td width="60%">{{ citySoarSignData.threeTotalAssets?citySoarSignData.threeTotalAssets:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">项目总数量</td>
                  <td width="60%">{{ citySoarSignData.projectNumber?citySoarSignData.projectNumber:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" style="padding-left:6%">服务总数量</td>
                  <td width="60%">{{ citySoarSignData.serviceNumber?citySoarSignData.serviceNumber:'无'}}</td>
                </tr>

                  </tbody>
                </table>
              </div>

               <div id="citySoarSign3" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">人员信息</p><i class="pa"></i></h3>
                <p v-if="!citySoarSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="citySoarSignData">
                  <tbody>
                <tr>
                  <td width="40%" class="tit" >职工总数（人）</td>
                  <td width="60%">{{ citySoarSignData.staffNumber!=0?citySoarSignData.staffNumber:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >大专以上学历科技人员（人）</td>
                  <td width="60%">{{ citySoarSignData.techs!=0?citySoarSignData.techs:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >从事研究开发人员（人）</td>
                  <td width="60%">{{ citySoarSignData.developer!=0?citySoarSignData.developer:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" >留学归国人员（人）</td>
                  <td width="60%">{{ citySoarSignData.returnees!=0?citySoarSignData.returnees:'无'}}</td>
                </tr>
                <!-- <tr>
                  <td width="40%" class="tit" >科技人员数量</td>
                  <td width="60%">{{ citySoarSignData.domesticExpenses?citySoarSignData.domesticExpenses:'无'}}</td>
                </tr> -->


                  </tbody>
                </table>
              </div>
                           <div id="citySoarSign4" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">知识产权</p><i class="pa"></i></h3>
                <p v-if="!citySoarSignData">暂无数据展示</p>
                <table width="100%" cellpadding="5" v-if="citySoarSignData">
                  <tbody>
                <tr>
                  <td width="40%" class="tit" >Ⅰ类知识产权:发明专利（件）</td>
                  <td width="60%">{{ citySoarSignData.inventionPatent!=0?citySoarSignData.inventionPatent:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >集成电路布图设计专有权（件）</td>
                  <td width="60%">{{ citySoarSignData.integratedCircuit!=0?citySoarSignData.integratedCircuit:'无'}}</td>
                </tr>
                <tr>
                  <td width="40%" class="tit" >植物新品种（件）</td>
                  <td width="60%">{{ citySoarSignData.plantVariety!=0?citySoarSignData.plantVariety:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" >其他（件）</td>
                  <td width="60%">{{ citySoarSignData.other!=0?citySoarSignData.other:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" >Ⅱ类知识产权:实用新型（件）</td>
                  <td width="60%">{{ citySoarSignData.usingNew!=0?citySoarSignData.usingNew:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" >外观设计（件）</td>
                  <td width="60%">{{ citySoarSignData.design!=0?citySoarSignData.design:'无'}}</td>
                </tr>
                 <tr>
                  <td width="40%" class="tit" >软件著作权（件）</td>
                  <td width="60%">{{ citySoarSignData.softwareCopyright!=0?citySoarSignData.softwareCopyright:'无'}}</td>
                </tr>



                  </tbody>
                </table>
              </div>
            </div>

          </TabPane>



         <TabPane name="intelSign" v-if="intelSignData" label="知识产权" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#intelSign">年度专利数</a></li>
              <li class="fl"><a href="#intelSign1">授权明细</a></li>
              <li class="fl"><a href="#intelSign2">有效明细</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="intelSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">年度专利数</p><i class="pa"></i></h3>
                <p v-if="!intelSignData.intellectualApply">暂无数据展示</p>

                <table width="100%" cellpadding="5" v-if="intelSignData.intellectualApply"  style="margin-bottom:30px;">
                  <tbody>
                    <tr>
                      <td width="10%"  rowspan="4"  class="tit">申请专利数量</td>
                      <td width="10%"  rowspan="4" >{{ intelSignData.intellectualApply?intelSignData.intellectualApply.total:''}}</td>
                    </tr>
                    <tr>
                      <td width="10%" class="tit">发明</td>
                      <td width="10%">{{ intelSignData.intellectualApply?intelSignData.intellectualApply.invent:''}}</td>
                     </tr>
                     <tr>
                      <td width="10%" class="tit">实用新型	</td>
                      <td width="10%">{{ intelSignData.intellectualApply?intelSignData.intellectualApply.utilityModel:''}}</td>
                       </tr>
                       <tr>
                      <td width="10%" class="tit">外观设计	</td>
                      <td width="10%">{{ intelSignData.intellectualApply?intelSignData.intellectualApply.design:''}}</td>
                    </tr>
                  </tbody>
                </table>
                <table width="100%" cellpadding="5" v-if="intelSignData.intellectualAuthorize"  style="margin-bottom:30px;">
                   <p v-if="!intelSignData.intellectualAuthorize">暂无数据展示</p>
                  <tbody>
                    <tr>
                      <td width="10%"  rowspan="4"  class="tit">授权专利数量</td>
                      <td width="10%"  rowspan="4" >{{ intelSignData.intellectualAuthorize?intelSignData.intellectualAuthorize.total:''}}</td>
                    </tr>
                    <tr>
                      <td width="10%" class="tit">发明</td>
                      <td width="10%">{{ intelSignData.intellectualAuthorize?intelSignData.intellectualAuthorize.invent:''}}</td>
                     </tr>
                     <tr>
                      <td width="10%" class="tit">实用新型	</td>
                      <td width="10%">{{ intelSignData.intellectualAuthorize?intelSignData.intellectualAuthorize.utilityModel:''}}</td>
                       </tr>
                       <tr>
                      <td width="10%" class="tit">外观设计	</td>
                      <td width="10%">{{ intelSignData.intellectualAuthorize?intelSignData.intellectualAuthorize.design:''}}</td>
                    </tr>
                  </tbody>
                </table>
                <table width="100%" cellpadding="5" v-if="intelSignData.intellectualEffective"  style="margin-bottom:30px;">
                  <tbody>
                    <p v-if="!intelSignData.intellectualEffective">暂无数据展示</p>
                    <tr>
                      <td width="10%"  rowspan="4"  class="tit">有效专利数量</td>
                      <td width="10%"  rowspan="4" >{{ intelSignData.intellectualEffective?intelSignData.intellectualEffective.total:''}}</td>
                    </tr>
                    <tr>
                      <td width="10%" class="tit">发明</td>
                      <td width="10%">{{ intelSignData.intellectualEffective?intelSignData.intellectualEffective.invent:''}}</td>
                     </tr>
                     <tr>
                      <td width="10%" class="tit">实用新型	</td>
                      <td width="10%">{{ intelSignData.intellectualEffective?intelSignData.intellectualEffective.utilityModel:''}}</td>
                       </tr>
                       <tr>
                      <td width="10%" class="tit">外观设计	</td>
                      <td width="10%">{{ intelSignData.intellectualEffective?intelSignData.intellectualEffective.design:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
               <div id="intelSign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">授权明细</p><i class="pa"></i></h3>
                <p v-if="!intelSignData.authorizedDetails">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="intelSignData.authorizedDetails" :key="index" v-for="(item,index) in intelSignData.authorizedDetails">
                 <tbody>
 
                  <tr>
                      <!-- <td width="84"  rowspan="4" colspan="1" class="tit">
                          {{index+1}}<br/>
                      </td> -->
                      <td width=" 10%"  class="tit">
                          发明名称
                      </td>
                      <td width=" 10%" >{{item.inventName}}</td>
                      <td width=" 10%"   class="tit">
                          专利类型
                      </td>
                      <td width=" 10%" >{{item.patentType}}</td>
                      <td width=" 10%"   class="tit">
                          主分类号
                      </td>
                      <td width=" 10%" >{{item.mainClassification}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%"   class="tit">
                          申请号
                      </td>
                      <td width=" 10%" >{{item.applicationNumber}}</td>
                      <td width=" 10%"   class="tit">
                          申请日
                      </td>
                      <td width=" 10%" >{{item.applicationDay}}</td>
                      <td width=" 10%"   class="tit">
                          授权入库日
                      </td>
                      <td width=" 10%" >{{item.authorizationDay}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit" rowspan="2" colspan="1">代理机构</td>
                      <td rowspan="2" colspan="3">{{item.agencyName}}</td>
                      <td width=" 10%" rowspan="2" colspan="1"  class="tit">代理机构代码</td>
                      <td width=" 10%" rowspan="2" colspan="1">{{item.agencyCode}}</td>
                  </tr>
      
              </tbody>
               </table>
              </div>

              <div id="intelSign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">有效明细</p><i class="pa"></i></h3>
                <p v-if="!intelSignData.validDetail">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="intelSignData.validDetail" :key="index" v-for="(item,index) in intelSignData.validDetail">
                  <tbody >
                  <tr>
                      <!-- <td width="84"  rowspan="4" colspan="1" class="tit">
                          {{index+1}}<br/>
                      </td> -->
                      <td width=" 10%"  class="tit">
                          发明名称
                      </td>
                      <td width=" 10%" >{{item.inventName}}</td>
                      <td width=" 10%"   class="tit">
                          专利类型
                      </td>
                      <td width=" 10%" >{{item.patentType}}</td>
                      <td width=" 10%"   class="tit">
                          主分类号
                      </td>
                      <td width=" 10%" >{{item.mainClassification}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%"   class="tit">
                          申请号
                      </td>
                      <td width=" 10%" >{{item.applicationNumber}}</td>
                      <td width=" 10%"   class="tit">
                          申请日
                      </td>
                      <td width=" 10%" >{{item.applicationDay}}</td>
                      <td width=" 10%"   class="tit">
                          授权入库日
                      </td>
                      <td width=" 10%" >{{item.authorizationDay}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit" rowspan="2" colspan="1">代理机构</td>
                      <td rowspan="2" colspan="3">{{item.agencyName}}</td>
                      <td width=" 10%" rowspan="2" colspan="1"  class="tit">代理机构代码</td>
                      <td width=" 10%" rowspan="2" colspan="1">{{item.agencyCode}}</td>
                  </tr>

                  </tbody>
                </table>
              </div>


            </div>

          </TabPane>


                   <TabPane name="nationalHighSign" v-if="nationalHighSignData" label="国家级高企" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#nationalHighSign">企业概况</a></li>
              <li class="fl"><a href="#nationalHighSign1">人员信息</a></li>
              <li class="fl"><a href="#nationalHighSign2">经营概况</a></li>
              <li class="fl"><a href="#nationalHighSign3">知识产权</a></li>
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="nationalHighSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业概况</p><i class="pa"></i></h3>
                <p v-if="!nationalHighSignData">暂无数据展示</p>

                <table width="100%" cellpadding="5" v-if="nationalHighSignData"  style="margin-bottom:30px;">
                  <tbody>
                    <tr>
                      <td width="40%" class="tit">手机</td>
                      <td width="60%">{{ nationalHighSignData.phone?nationalHighSignData.phone:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">认定类型（新认定/重新认定）</td>
                      <td width="60%">{{ nationalHighSignData.typeDto?nationalHighSignData.typeDto.name:'无'}}</td>
                     </tr>
                     <tr>
                      <td width="40%" class="tit">认定年份	</td>
                      <td width="60%">{{ nationalHighSignData.thatYear?nationalHighSignData.thatYear:'无'}}</td>
                       </tr>
                       <tr>
                      <td width="40%" class="tit">主营产品所属技术领域	</td>
                      <td width="60%">{{ nationalHighSignData.productDomain?nationalHighSignData.productDomain:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">是否国有独资或国有控股企业	</td>
                      <td width="60%">{{ nationalHighSignData.isSoleProprietor?nationalHighSignData.isSoleProprietor:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">所得税主管税务机关	</td>
                      <td width="60%">{{ nationalHighSignData.payrollTaxes?nationalHighSignData.payrollTaxes:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">企业所得税征收方式	</td>
                      <td width="60%">{{ nationalHighSignData.collectionMethod?nationalHighSignData.collectionMethod:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">是否含有外资成分（含港、澳、台）、外资来源地	</td>
                      <td width="60%">{{ nationalHighSignData.isForeignElement?nationalHighSignData.isForeignElement:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">企业是否上市	</td>
                      <td width="60%">{{ nationalHighSignData.isListed?nationalHighSignData.isListed:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">上市时间	</td>
                      <td width="60%">{{ nationalHighSignData.listedTime?nationalHighSignData.listedTime:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">股票代码	</td>
                      <td width="60%">{{ nationalHighSignData.stockCode?nationalHighSignData.stockCode:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">上市类型	</td>
                      <td width="60%">{{ nationalHighSignData.listedType?nationalHighSignData.listedType:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">是否属于国家级高新区域内企业	</td>
                      <td width="60%">{{ nationalHighSignData.isNationalLevel?nationalHighSignData.isNationalLevel:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">高新区名称	</td>
                      <td width="60%">{{ nationalHighSignData.highName?nationalHighSignData.highName:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">技术领域	</td>
                      <td width="60%">{{ nationalHighSignData.productDomain?nationalHighSignData.productDomain:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">专审事务所	</td>
                      <td width="60%">{{ nationalHighSignData.firm?nationalHighSignData.firm:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">科技服务中介	</td>
                      <td width="60%">{{ nationalHighSignData.serviceAgent?nationalHighSignData.serviceAgent:'无'}}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
               <div id="nationalHighSign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">人员信息</p><i class="pa"></i></h3>
                <p v-if="!nationalHighSignData">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="nationalHighSignData" >
                 <tbody>
                    <tr>
                      <td width="40%" class="tit">科技人员占总职工比例（%）	</td>
                      <td width="60%">{{ nationalHighSignData.techRatio?nationalHighSignData.techRatio:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="40%" class="tit">职工总数	</td>
                      <td width="60%">{{ nationalHighSignData.staffNumber?nationalHighSignData.staffNumber:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="40%" class="tit">科技人员数	</td>
                      <td width="60%">{{ nationalHighSignData.techCount?nationalHighSignData.techCount:'无'}}</td>
                    </tr>
                
              </tbody>
               </table>
              </div>

              <div id="nationalHighSign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">经营情况</p><i class="pa"></i></h3>
                <p v-if="!nationalHighSignData">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="nationalHighSignData">
                  <tbody >
                  <tr>
                      <td width=" 10%" class="tit">近一年企业总收入（万元）</td>
                      <td rowspan="1" colspan="2">{{ nationalHighSignData.yearGross?nationalHighSignData.yearGross:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">近一年高新技术产品（服务）收入（万元）</td>
                      <td rowspan="1" colspan="2">{{ nationalHighSignData.yearProducts?nationalHighSignData.yearProducts:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">高新技术产品占总比收入比例（%）</td>
                      <td rowspan="1" colspan="2">{{ nationalHighSignData.highTechRatio?nationalHighSignData.highTechRatio:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" rowspan="3" colspan="1" class="tit">近3年每年销售收入（万元）</td>
                      <td width=" 10%" class="tit">（认定年-1）年销售收入</td>
                      <td width=" 10%">{{ nationalHighSignData.threeSales?nationalHighSignData.threeSales:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">（认定年-2）年销售收入</td>
                      <td width=" 10%">{{ nationalHighSignData.twoSales?nationalHighSignData.twoSales:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">（认定年-3）年销售收入</td>
                      <td width=" 10%">{{ nationalHighSignData.oneSales?nationalHighSignData.oneSales:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" rowspan="3" colspan="1" class="tit">近3年每年利润总额（万元）</td>
                      <td width=" 10%" class="tit">（认定年-1）年利润总额</td>
                      <td width=" 10%">{{ nationalHighSignData.threeProfits?nationalHighSignData.threeProfits:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">（认定年-2）年利润总额</td>
                      <td width=" 10%">{{ nationalHighSignData.twoProfits?nationalHighSignData.twoProfits:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">（认定年-3）年利润总额</td>
                      <td width=" 10%">{{ nationalHighSignData.oneProfits?nationalHighSignData.oneProfits:'0'}}</td>
                  </tr>
                  <tr>
                      <td colspan="1" rowspan="3" class="tit">近3年每年净资产（万元）</td>
                      <td colspan="1" rowspan="1" class="tit">（认定年-1）年净资产</td>
                      <td colspan="1" rowspan="1">{{ nationalHighSignData.threeWorth?nationalHighSignData.threeWorth:'0'}}</td>
                  </tr>
                  <tr>
                      <td colspan="1" rowspan="1" class="tit">（认定年-2）年净资产</td>
                      <td colspan="1" rowspan="1">{{ nationalHighSignData.twoWorth?nationalHighSignData.twoWorth:'0'}}</td>
                  </tr>
                  <tr>
                      <td width=" 10%" class="tit">（认定年-3）年净资产</td>
                      <td width=" 10%">{{ nationalHighSignData.oneWorth?nationalHighSignData.oneWorth:'0'}}</td>
                  </tr>

                  </tbody>
                </table>
                <table>
                  <tbody>
                    
                      <tr>
                          <td width=" 10%" class="tit" rowspan="2" colspan="1" >
                              近三年研发费用总额（万元）<br/>
                          </td>
                          <td width=" 10%"  rowspan="2" colspan="1">{{ nationalHighSignData.developmentCosts?nationalHighSignData.developmentCosts:'0'}}</td>
                          <td width=" 10%" class="tit">
                              基础研究投入费用总额（万元）
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.basicCost?nationalHighSignData.basicCost:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              在中国境内研发费用总额（万元）
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.domesticExpenses?nationalHighSignData.domesticExpenses:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              近三年研发费占销售收入比例（%）
                          </td>
                          <td  rowspan="1" colspan="3">{{ nationalHighSignData.threeRdRate?nationalHighSignData.threeRdRate:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              境内研发费占总研发费比例（%）
                          </td>
                          <td  rowspan="1" colspan="3">{{ nationalHighSignData.domesticRdRatio?nationalHighSignData.domesticRdRatio:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit" rowspan="15" colspan="1">
                              近三年每年研发费用明细（万元）<br/>
                          </td>
                          <td width=" 10%" class="tit" rowspan="5" colspan="1" >
                              （认定年-1）研发费用明细
                          </td>
                          <td width=" 10%" class="tit">
                              内部研究开发投入额合计
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.threeResearchDevelopment?nationalHighSignData.threeResearchDevelopment:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              其他费用合计
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.oneWorth?nationalHighSignData.oneWorth:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              委托外部研究开发投入额合计
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.threeOtherFees?nationalHighSignData.threeOtherFees:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              其中：境内的外部研发投入额
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.threeDomesticInput?nationalHighSignData.threeDomesticInput:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              研究开发费用（内、外部）小计
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.threeRdCost?nationalHighSignData.threeRdCost:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="5" class="tit">
                              （认定年-2）研发费用明细
                          </td>
                          <td  colspan="1" rowspan="1" class="tit" width=" 10%">
                              内部研究开发投入额合计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.twoResearchDevelopment?nationalHighSignData.twoResearchDevelopment:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" width=" 10%" class="tit">
                              其他费用合计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.twoOtherFees?nationalHighSignData.twoOtherFees:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" width=" 10%" class="tit">
                              委托外部研究开发投入额合计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.twoEntrusted?nationalHighSignData.twoEntrusted:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" width=" 10%" class="tit">
                              其中：境内的外部研发投入额
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.twoDomesticInput?nationalHighSignData.twoDomesticInput:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" width=" 10%" class="tit">
                              研究开发费用（内、外部）小计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.twoRdCost?nationalHighSignData.twoRdCost:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="5" class="tit">
                              （认定年-3）研发费用明细
                          </td>
                          <td  colspan="1" rowspan="1" class="tit"  width=" 10%" >
                              内部研究开发投入额合计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.oneResearchDevelopment?nationalHighSignData.oneResearchDevelopment:'0'}}</td>
                      </tr>
                      <tr>
                          <td width=" 10%" class="tit">
                              其他费用合计
                          </td>
                          <td width=" 10%" >{{ nationalHighSignData.oneOtherFees?nationalHighSignData.oneOtherFees:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" class="tit"  width=" 10%" >
                              委托外部研究开发投入额合计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.oneEntrusted?nationalHighSignData.oneEntrusted:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" class="tit"  width=" 10%" >
                              其中：境内的外部研发投入额
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.oneDomesticInput?nationalHighSignData.oneDomesticInput:'0'}}</td>
                      </tr>
                      <tr>
                          <td  colspan="1" rowspan="1" class="tit"  width=" 10%" >
                              研究开发费用（内、外部）小计
                          </td>
                          <td  colspan="1" rowspan="1">{{ nationalHighSignData.oneRdCost?nationalHighSignData.oneRdCost:'0'}}</td>
                      </tr>

                  </tbody>
                </table>
              </div>

              <div id="nationalHighSign3" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">知识产权</p><i class="pa"></i></h3>
                <p v-if="!nationalHighSignData">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="nationalHighSignData" >
                <tbody>
                    <tr>
                        <td width="10%" rowspan="7" colspan="1" class="tit">
                            符合要求的Ⅰ类知识产权（件）
                        </td>
                        <td width="10%" rowspan="7" colspan="1">{{ nationalHighSignData.fitBillOne!=0?nationalHighSignData.fitBillOne:'无'}}</td>
                        <td width="10%" class="tit">
                            发明专利（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.inventionPatent!=0?nationalHighSignData.inventionPatent:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            国家专利（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.defensePatent!=0?nationalHighSignData.defensePatent:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            植物新品种（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.plantVariety!=0?nationalHighSignData.plantVariety:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            国际级农作物品种（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.nationalVarieties!=0?nationalHighSignData.nationalVarieties:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            国家新药（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.nationalDrug!=0?nationalHighSignData.nationalDrug	:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            国家一级中药保护品种（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.chineseMedicine!=0?nationalHighSignData.chineseMedicine:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            集成电路布图设计专有权（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.integratedCircuit!=0?nationalHighSignData.integratedCircuit:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" rowspan="3" colspan="1" class="tit">
                            符合要求的Ⅱ类知识产权（件）
                        </td>
                        <td width="10%" rowspan="3" colspan="1">{{ nationalHighSignData.fitBillTwo!=0?nationalHighSignData.fitBillTwo:'无'}}</td>
                        <td width="10%" class="tit">
                            实用新型（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.utilityModel!=0?nationalHighSignData.utilityModel:'无'}}</td>
                    </tr>
                    <tr>
                        <td width="10%" class="tit">
                            外观设计（件）
                        </td>
                        <td width="10%">{{ nationalHighSignData.design!=0?nationalHighSignData.design:'无'}}</td>
                    </tr>
                    <tr>
                        <td colspan="1" rowspan="1" class="tit">
                            软件著作权
                        </td>
                        <td colspan="1" rowspan="1">{{ nationalHighSignData.softwareCopyright!=0?nationalHighSignData.softwareCopyright:'无'}}</td>
                    </tr>
              </tbody>
              </table>
              </div>
            </div>

          </TabPane>


           <TabPane name="eyasPlanSign" v-if="eyasPlanSignData" label="雏鹰计划" class="newThreeBox">
            <ul class="clearfix navPosiTit">
              <li class="fl"><a href="#eyasPlanSign">申报数据</a></li>
              <!-- <li class="fl"><a href="#eyasPlanSign1">年报数据</a></li> -->
            </ul>
            <div class="navPosiCon scrollBar">
              <div id="eyasPlanSign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">申报数据</p><i class="pa"></i></h3>
                <p v-if="!eyasPlanSignData">暂无数据展示</p>

                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                  <tr>
                    <td width="10%" class="tit">雏鹰计划申请时间 </td>
                    <td width="10%">{{eyasPlanSignData.baseCreateTime?eyasPlanSignData.baseCreateTime:'无'}}</td>
                    <td width="10%" class="tit">雏鹰计划申请金额</td>
                    <td width="10%">{{eyasPlanSignData.projectinfo?eyasPlanSignData.projectinfo.applyAmount:'无'}}</td>
                </tr>
                <tr>
                    <td width="10%" class="tit">企业主营产品</td>
                    <td rowspan="1" colspan="3">{{eyasPlanSignData.mainProducts?eyasPlanSignData.mainProducts:'无'}}</td>
                </tr>
                <tr>
                    <td width="10%" class="tit">主营产品应用领域</td>
                    <td rowspan="1" colspan="3">{{eyasPlanSignData.projectinfo.technicalDto?eyasPlanSignData.projectinfo.technicalDto.name:'无'}}</td>
                </tr>
                <tr>
                    <td colspan="1" rowspan="1" class="tit">上年度营业收入（万元）</td>
                    <td colspan="1" rowspan="1">{{eyasPlanSignData.yearOutputValue?eyasPlanSignData.yearOutputValue:'无'}}</td>
                    <td colspan="1" rowspan="1" class="tit">上年度纳税金额（万元）</td>
                    <td colspan="1" rowspan="1">{{eyasPlanSignData.yearPayTaxes?eyasPlanSignData.yearPayTaxes:'无'}}</td>
                </tr>
                <tr>
                    <td width="10%" class="tit">申请时间</td>
                    <td width="10%">{{eyasPlanSignData.projectinfo?eyasPlanSignData.projectinfo.applyDate:'无'}}</td>
                    <td width="10%" class="tit">申请金额</td>
                    <td width="10%">{{eyasPlanSignData.projectinfo?eyasPlanSignData.projectinfo.applyAmount:'无'}}</td>
                </tr>
                  </tbody>
                </table>
                <!-- 研发投入 -->
                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit" rowspan="5" colspan="1">研发投入（万元）</td>
                        
                    </tr>
                    <tr :key="index" v-for="(item,index) in devinputsData">
                        <td width="10%" class="tit">{{item.yearDec}}</td>
                        <td width="10%">{{item.inputAmount}}</td>
                    </tr>

                  </tbody>
                </table>
              <!-- 知识产权产出 -->
              <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                   <tr>
                     <h3 style="font-size:14px;text-align:center;width:100%;font-weight:800;margin-bottom:10px;">知识产权产出</h3>
                   </tr>
                    <tr>
                      <td width="10%" class="tit">
                          序号
                      </td>
                      <td width="10%" class="tit">
                          类型
                      </td>
                      <td width="10%" class="tit">
                          名称
                      </td>
                      <td width="10%" class="tit" >
                          技术来源
                      </td>
                      <td width="10%" class="tit">
                          证书/授权编号
                      </td>
                      <td width="10%" class="tit">
                          授权时间
                      </td>
                  </tr>
                  <tr :key="index" v-for="(item,index) in zhishichanquanData">
                      <td width="10%">{{index+1}}</td>
                      <td width="10%">{{item.zsTypeId}}</td>
                      <td width="10%">{{item.zsName}}</td>
                      <td width="10%">{{item.zsScourceId}}</td>
                      <td width="10%">{{item.zsNumber}}</td>
                      <td width="10%">{{item.zsDate}}</td>
                  </tr>
                  </tbody>
                </table>
                <!-- 计划项目立项 -->
                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                   <tr>
                     <h3 style="font-size:14px;text-align:center;width:100%;font-weight:800;margin-bottom:10px;">计划项目立项</h3>
                   </tr>
                    <tr>
                      <td width="10%" class="tit">
                          序号
                      </td>
                      <td width="10%" class="tit">
                          立项类型
                      </td>
                      <td width="10%" class="tit">
                          项目名称
                      </td>
                      <td width="10%" class="tit" >
                          立项编号
                      </td>
                  </tr>
                  <tr :key="index" v-for="(item,index) in xiangmulixiangData">
                      <td width="10%">{{index+1}}</td>
                      <td width="10%">{{item.xmTypeId}}</td>
                      <td width="10%">{{item.xmName}}</td>
                      <td width="10%">{{item.xmNumber}}</td>
                  </tr>
                  </tbody>
                </table>
                <!-- 技术交易情况 -->
                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                   <tr>
                     <h3 style="font-size:14px;text-align:center;width:100%;font-weight:800;margin-bottom:10px;">技术交易情况</h3>
                   </tr>
                    <tr>
                      <td width="10%" class="tit">
                          序号
                      </td>
                      <td width="10%" class="tit">
                          合同名称
                      </td>
                      <td width="10%" class="tit">
                          交易对象
                      </td>
                      <td width="10%" class="tit" >
                          合同编号
                      </td>
                  </tr>
                  <tr :key="index" v-for="(item,index) in jishujiaoyiData">
                      <td width="10%">{{index+1}}</td>
                      <td width="10%">{{item.htName}}</td>
                      <td width="10%">{{item.jyObject}}</td>
                      <td width="10%">{{item.htNumber}}</td>
                  </tr>
                  </tbody>
                </table>
                <!-- 私募股权融资情况 -->
                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                   <tr>
                     <h3 style="font-size:14px;text-align:center;width:100%;font-weight:800;margin-bottom:10px;">私募股权融资情况</h3>
                   </tr>
                    <tr>
                      <td width="10%" class="tit">
                          序号
                      </td>
                      <td width="10%" class="tit">
                          融资时间
                      </td>
                      <td width="10%" class="tit">
                          投资方
                      </td>
                      <td width="10%" class="tit" >
                          融资规模（万元）
                      </td>
                  </tr>
                  <tr :key="index" v-for="(item,index) in rongziqingkuangData">
                      <td width="10%">{{index+1}}</td>
                      <td width="10%">{{item.rzDate}}</td>
                      <td width="10%">{{item.investor}}</td>
                      <td width="10%">{{item.rzAmount}}</td>
                  </tr>
                  </tbody>
                </table>
                          <!-- 今后三年收入与利润预期 -->
                <table width="100%" cellpadding="5" v-if="eyasPlanSignData"  style="margin-bottom:30px;">
                  <tbody>
                    <tr>
                      <td width="10%" rowspan="3" colspan="1"  class="tit">
                          今后三年收入与利润预期<br/>
                      </td>
                      <td width="10%" rowspan="2" colspan="1"  class="tit">
                          主营业务收入（万元）<br/>
                      </td>
                      <td width="10%" class="tit" :key="index" v-for="(item,index) in shouruyuqiData">
                          {{item.yqDate}}年
                      </td>
                  </tr>
                  <tr>
                      <td width="10%" :key="index" v-for="(item,index) in shouruyuqiData">{{item.yqProfit}}</td>
          
                  </tr>
                  <tr>
                      <td width="10%" class="tit">
                          净利润（万元）
                      </td>
                      <td width="10%" :key="index" v-for="(item,index) in shouruyuqiData">{{item.yqNetAssets}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!-- 没有数据暂时不做 -->
               <!-- <div id="eyasPlanSign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">年报数据</p><i class="pa"></i></h3>
                <p v-if="!eyasPlanSignData">暂无数据展示</p>
                <table style="margin-bottom:30px;" width="100%" cellpadding="5" v-if="eyasPlanSignData">
                 <tbody>

        

      
              </tbody>
               </table>
              </div> -->
            </div>
           </TabPane>


           <!-- 项目库 -->
          <TabPane name="ProjectLibrarySign" v-if="projetLibraryBata" label="科技计划项目" class="newThreeBox">
             <!-- <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目名称</p><i class="pa"></i></h3> -->
            <ul class="projectName clearfix">
              <li  class="fl"><a style="width:130px;font-weight:bold;">企业申报项目：</a></li>
              <li  v-for="(item,index) in AllProjectData" :key="index"  class="fl"><a @click="getProjectDetailsOne($event,item.id,index)" :title="item.projectName"  :class="{active:num==index}">{{item.projectName}}</a></li>
              
            </ul>
            <!-- 非科技技术创新引导基金的详情字段 -->
            <div v-show="planType!=2">
            <ul class="clearfix navPosiTit" style="top:40px" >
              <li class="fl"><a href="#ProjectLibrarySign">项目信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign1">项目负责人信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign2">项目经费信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign3">项目组成员信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar" style="top:75px">
              <!-- 项目信息 -->
              <div id="ProjectLibrarySign" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">项目名称</td>
                        <td width="15%">{{ProjectData.projectName?ProjectData.projectName:'无'}}</td>
                        <td width="10%" class="tit">项目状态</td>
                        <td width="15%">{{ProjectData.projectStatus?ProjectData.projectStatus:'无'}}</td>
                        <td width="10%" class="tit">计划类别</td>
                        <td width="15%">{{ProjectData.planTypeDto?ProjectData.planTypeDto.name:'无'}}</td>
                        <td width="10%" class="tit">项目类别</td>
                        <td width="15%">{{ProjectData.categoryDto?ProjectData.categoryDto.name:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">重点领域</td>
                        <td width="15%">{{ProjectData.keyAreas?ProjectData.keyAreas:'无'}}</td>
                        <td width="10%" class="tit">主承担单位</td>
                        <td width="15%">{{ProjectData.primaryUnit?ProjectData.primaryUnit:'无'}}</td>
                        <td width="10%" class="tit">提交时间</td>
                        <td width="15%">{{ProjectData.submitTime?ProjectData.submitTime:'无'}}</td>
                        <td width="10%" class="tit">开始时间</td>
                        <td width="15%">{{ProjectData.startTime?ProjectData.startTime:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">结束时间</td>
                        <td width="15%">{{ProjectData.endTime?ProjectData.endTime:'无'}}</td>
                        <td width="10%" class="tit">技术领域</td>
                        <td width="15%">{{ProjectData.technicalField?ProjectData.technicalField:'无'}}</td>
                        <td width="10%" class="tit">项目主要优势</td>
                        <td width="15%">{{ProjectData.mainBenefits?ProjectData.mainBenefits:'无'}}</td>
                        <td width="10%" class="tit">技术来源</td>
                        <td width="15%">{{ProjectData.technicalSource?ProjectData.technicalSource:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">现处阶段</td>
                        <td width="15%">{{ProjectData.presentStage?ProjectData.presentStage:'无'}}</td>
                        <td width="10%" class="tit">应用产业领域</td>
                        <td width="15%">{{ProjectData.appliedIndustry?ProjectData.appliedIndustry:'无'}}</td>
                        <td width="10%" class="tit">所属学科</td>
                        <td width="15%">{{ProjectData.subject?ProjectData.subject:'无'}}</td>
                        <td width="10%" class="tit">相关学科</td>
                        <td width="15%">{{ProjectData.relatedDisciplines?ProjectData.relatedDisciplines:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">社会经济目标</td>
                        <td width="15%">{{ProjectData.target?ProjectData.target:'无'}}</td>
                        <td width="10%" class="tit">活动类型</td>
                        <td width="15%">{{ProjectData.activityType?ProjectData.activityType:'无'}}</td>
                        <td width="10%" class="tit">国际、港澳台合作</td>
                        <td width="15%">{{ProjectData.cooperate?ProjectData.cooperate:'无'}}</td>
                         <td width="10%" class="tit">产品或技术出口</td>
                        <td width="15%">{{ProjectData.export?ProjectData.export:'无'}}</td>
                      </tr>
                      <tr>                    
                        <td width="10%" class="tit">联系人姓名</td>
                        <td width="15%">{{ProjectData.contactName?ProjectData.contactName:'无'}}</td>
                        <td width="10%" class="tit">手机号码</td>
                        <td width="15%">{{ProjectData.phone?ProjectData.phone:'无'}}</td>
                        <td width="10%" class="tit">传真</td>
                        <td width="15%">{{ProjectData.fax?ProjectData.fax:'无'}}</td>
                        <td width="10%" class="tit">地址</td>
                        <td width="15%">{{ProjectData.address?ProjectData.address:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">电子信箱</td>
                        <td width="15%">{{ProjectData.email?ProjectData.email:'无'}}</td>
                        <td width="10%" class="tit">邮编</td>
                        <td width="15%">{{ProjectData.zipCode?ProjectData.zipCode:'无'}}</td>
                        <td width="10%" class="tit">国家科技部计划</td>
                        <td width="15%">{{ProjectData.technologyPlan?ProjectData.technologyPlan:'无'}}</td>
                        <td width="10%" class="tit">国家自然科学基金</td>
                        <td width="15%">{{ProjectData.scienceFund?ProjectData.scienceFund:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">国家其他部委科技计划</td>
                        <td width="15%">{{ProjectData.otherPlans?ProjectData.otherPlans:'无'}}</td>
                        <td width="10%" class="tit">天津市科技计划</td>
                        <td width="15%">{{ProjectData.cityScienceProject?ProjectData.cityScienceProject:'无'}}</td>
                        <td width="10%" class="tit">天津市其它委办计划</td>
                        <td width="15%">{{ProjectData.cityPlan?ProjectData.cityPlan:'无'}}</td>
                        <td width="10%" class="tit">区县科技计划</td>
                        <td width="15%">{{ProjectData.countyScienceProject?ProjectData.countyScienceProject:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">论文论著</td>
                        <td width="15%">{{ProjectData.treatises?ProjectData.treatises:'无'}}</td>
                        <td width="10%" class="tit">研究（咨询）报告</td>
                        <td width="15%">{{ProjectData.researchReport?ProjectData.researchReport:'无'}}</td>
                        <td width="10%" class="tit">新产品（或农业新品种）</td>
                        <td width="15%">{{ProjectData.newProduct?ProjectData.newProduct:'无'}}</td>
                        <td width="10%" class="tit">新装置（装备）</td>
                        <td width="15%">{{ProjectData.newDevice?ProjectData.newDevice:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">新材料</td>
                        <td width="15%">{{ProjectData.newMaterial?ProjectData.newMaterial:'无'}}</td>
                        <td width="10%" class="tit">新工艺（或新方法，新模式）</td>
                        <td width="15%">{{ProjectData.newProcess?ProjectData.newProcess:'无'}}</td>
                        <td width="10%" class="tit">计算机软件</td>
                        <td width="15%">{{ProjectData.computerSoftware?ProjectData.computerSoftware:'无'}}</td>
                        <td width="10%" class="tit">人才培养</td>
                        <td width="15%">{{ProjectData.personnelTraining?ProjectData.personnelTraining:'无'}}</td>
                      </tr>
                       <tr>
                        <td width="10%" class="tit">技术标准</td>
                        <td width="15%">{{ProjectData.technicalCriteria?ProjectData.technicalCriteria:'无'}}</td>
                        <td width="10%" class="tit">基地建设</td>
                        <td width="15%">{{ProjectData.baseConstruction?ProjectData.baseConstruction:'无'}}</td>
                        <td width="10%" class="tit">专利</td>
                        <td width="15%">{{ProjectData.patent?ProjectData.patent:'无'}}</td>
                        <td width="10%" class="tit">商标</td>
                        <td width="15%">{{ProjectData.tradeMark?ProjectData.tradeMark:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div> 
              <!-- 项目负责人信息 -->
              <div id="ProjectLibrarySign1" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目负责人信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">姓名</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.name:'无'}}</td>
                        <td width="10%" class="tit">性别</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.sex:'无'}}</td>
                        <td width="10%" class="tit">年龄</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.age:'无'}}</td>
                        <td width="10%" class="tit">人才种类</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.talent:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">学历</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.degree:'无'}}</td>
                        <td width="10%" class="tit">学位</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.degreeIn:'无'}}</td>
                        <td width="10%" class="tit">职称系列</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.titleSeries:'无'}}</td>
                        <td width="10%" class="tit">职称级别</td>
                        <td width="15%">{{ProjectData.titleLevel?ProjectData.titleLevel:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">国籍或地区</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.nationality:'无'}}</td>
                        <td width="10%" class="tit">证件种类</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.certificateType:'无'}}</td>
                        <td width="10%" class="tit">证件号码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.documentNumber:'无'}}</td>
                        <td width="10%" class="tit">手机号码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.phone:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">联系电话</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.cell:'无'}}</td>
                        <td width="10%" class="tit">联系传真</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.fax:'无'}}</td>
                        <td width="10%" class="tit">电子邮箱</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.email:'无'}}</td>
                        <td width="10%" class="tit">毕业院校</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.graduateSchool:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">所学专业</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.learnProfessional	:'无'}}</td>
                        <td width="10%" class="tit">从事专业</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.specialise:'无'}}</td>
                        <td width="10%" class="tit">享受省级政府特殊津贴</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.allowance:'无'}}</td>
                        <td width="10%" class="tit">单位名称</td>
                        <td width="15%">{{ProjectData.companyCode?ProjectData.headInformation.companyCode:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">邮政编码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.zipCode:'无'}}</td>
                        <td width="10%" class="tit">单位地址</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.unitAddress:'无'}}</td>
                        <td width="10%" class="tit">所在部门</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.department:'无'}}</td>
                        <td width="10%" class="tit">单位职务</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.unitPosition:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">是否留学归国</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.isStudyAbroad:'无'}}</td>
                        <td width="10%" class="tit">留学国家</td>
                        <td width="15%">{{ProjectData.projectLeader?ProjectData.projectLeader.studyAbroad:'无'}}</td>
                        <td width="10%" class="tit">留学院校</td>
                        <td width="15%">{{ProjectData.projectLeader?ProjectData.projectLeader.studySchool:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
              <!-- 项目经费信息 -->
               <div id="ProjectLibrarySign2" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目经费信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">资金来源</td>
                        <td width="15%">{{ProjectData.projectFunds?ProjectData.projectFunds.sourceFunds:'无'}}</td>
                        <td width="10%" class="tit">时间</td>
                        <td width="15%">{{ProjectData.projectFunds?ProjectData.projectFunds.time:'无'}}</td>
                        <td width="10%" class="tit">年预算金额</td>
                        <td width="15%">{{ProjectData.projectFunds?ProjectData.projectFunds.yearBudget:'无'}}</td>
                        <td width="10%" class="tit">预算金额</td>
                        <td width="15%">{{ProjectData.projectFunds?ProjectData.projectFunds.budget:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
              <!-- 项目组成员信息 -->
               <div id="ProjectLibrarySign3" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目组成员信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">总人数</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.totalNumber:'无'}}</td>
                        <td width="10%" class="tit">正高级</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.highLevel:'无'}}</td>
                        <td width="10%" class="tit">副高级</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.deputyHigh:'无'}}</td>
                        <td width="10%" class="tit">中级</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.medium:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">初级</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.xprimary:'无'}}</td>
                        <td width="10%" class="tit">其他</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.other:'无'}}</td>
                        <td width="10%" class="tit">博士</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.doctor:'无'}}</td>
                        <td width="10%" class="tit">硕士</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.master:'无'}}</td>
                      </tr>
                       <tr>
                        <td width="10%" class="tit">学士</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.bachelor:'无'}}</td>
                        <td width="10%" class="tit">其他</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.otherOne:'无'}}</td>
                        <td width="10%" class="tit">研究生</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.graduateStudent:'无'}}</td>
                        <td width="10%" class="tit">大学</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.college:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">大专</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.juniorCollege:'无'}}</td>
                        <td width="10%" class="tit">留学回国人数</td>
                        <td width="15%">{{ProjectData.projectMember?ProjectData.projectMember.studyAbroad:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
              
            </div>
             </div>
             <!-- 非科技技术创新引导基金的详情字段 -->
             <!-- 科技技术创新引导基金的详情字段 -->
            <div v-show="planType==2">
            <ul class="clearfix navPosiTit" style="top:40px">
              <li class="fl"><a href="#ProjectLibrarySign4">项目信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign5">企业信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign6">人员信息</a></li>
              <li class="fl"><a href="#ProjectLibrarySign7">营收缴税信息</a></li>
            </ul>
            <div class="navPosiCon scrollBar" style="top:75px">
              <!-- 项目信息 -->
              <div id="ProjectLibrarySign4" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">项目信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">产品名称及型号</td>
                        <td width="15%">{{ProjectData.projectName?ProjectData.projectName:'无'}}</td>
                        <td width="10%" class="tit">计划类别</td>
                        <td width="15%">{{ProjectData.planTypeDto?ProjectData.planTypeDto.name:'无'}}</td>
                        <td width="10%" class="tit">项目类别</td>
                        <td width="15%">{{ProjectData.categoryDto?ProjectData.categoryDto.name:'无'}}</td>
                        <td width="10%" class="tit">重点领域</td>
                        <td width="15%">{{ProjectData.keyAreas?ProjectData.keyAreas:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">提交时间</td>
                        <td width="15%">{{ProjectData.submitTime?ProjectData.submitTime:'无'}}</td>
                        <td width="10%" class="tit">审核状态</td>
                        <td width="15%">{{ProjectData.projectStatus?ProjectData.projectStatus:'无'}}</td>
                        <td width="10%" class="tit">主承担单位</td>
                        <td width="15%">{{ProjectData.primaryUnit?ProjectData.primaryUnit:'无'}}</td>
                        <td width="10%" class="tit">优先方向</td>
                        <td width="15%">{{ProjectData.priority?ProjectData.priority:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">姓名</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.name:'无'}}</td>
                        <td width="10%" class="tit">性别</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.sex:'无'}}</td>
                        <td width="10%" class="tit">证件类型</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.certificateType:'无'}}</td>
                        <td width="10%" class="tit">证件号码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.documentNumber:'无'}}</td>
                      </tr>
                       <tr>
                        <td width="10%" class="tit">职称级别</td>
                        <td width="15%">{{ProjectData.titleLevel?ProjectData.titleLevel:'无'}}</td>
                        <td width="10%" class="tit">电子邮箱</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.email:'无'}}</td>
                        <td width="10%" class="tit">手机号码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.phone:'无'}}</td>
                        <td width="10%" class="tit">固定电话</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.cell:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="10%" class="tit">传真号码</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.fax:'无'}}</td>
                        <td width="10%" class="tit">毕业院校</td>
                        <td width="15%">{{ProjectData.headInformation?ProjectData.headInformation.graduateSchool:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div> 
              <!-- 企业信息信息 -->
              <div id="ProjectLibrarySign5" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">企业信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="20%" class="tit">是否国家科技型中小企业</td>
                        <td width="35%">{{ProjectData.isSmes?ProjectData.isSmes:'无'}}</td>
                        <td width="20%" class="tit">国家科技型中小企业入库登记编号</td>
                        <td width="30%">{{ProjectData.registrationNumber?ProjectData.registrationNumber:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">是否国家高新技术企业</td>
                        <td width="35%">{{ProjectData.isTechEnterprise?ProjectData.isTechEnterprise:'无'}}</td>
                        <td width="20%" class="tit">国家高新技术企业证书编号</td>
                        <td width="30%">{{ProjectData.certificateNumber?ProjectData.certificateNumber:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">是否市级高新技术企业</td>
                        <td width="35%">{{ProjectData.isCityTechEnterprise?ProjectData.isCityTechEnterprise:'无'}}</td>
                        <td width="20%" class="tit">市级科技型企业认定编号</td>
                        <td width="30%">{{ProjectData.thatNumber?ProjectData.thatNumber:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">近两年企业是否参加中国或天津市创新创业大赛</td>
                        <td width="35%">{{ProjectData.isEntrepreneurialContest?ProjectData.isEntrepreneurialContest:'无'}}</td>
                        <td width="20%" class="tit">近三年内有无产品认定为天津市重点新产品</td>
                        <td width="30%">{{ProjectData.isNewProduct?ProjectData.isNewProduct:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">隶属关系</td>
                        <td width="35%">{{ProjectData.affiliation?ProjectData.affiliation:'无'}}</td>
                        <td width="20%" class="tit">隶属中央部门</td>
                        <td width="30%">{{ProjectData.centralDivision?ProjectData.centralDivision:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">企业规模</td>
                        <td width="35%">{{ProjectData.corporateSize?ProjectData.corporateSize:'无'}}</td>
                        <td width="20%" class="tit">主要竞争企业</td>
                        <td width="30%">{{ProjectData.majorCompetitors?ProjectData.majorCompetitors:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                     <tr>
                        <td width="100%" class="tit">企业主导产品、产品产业化能力简要说明</td>
                      </tr>
                      <tr>
                        <td width="100%">{{ProjectData.briefDescription?ProjectData.briefDescription:'无'}}</td>
                      </tr>
                      <!-- <tr>
                        <td width="100%" class="tit">商业模式、品牌优势、及市场竞争力分析</td>
                      </tr>
                       <tr>
                        <td width="100%">{{ProjectData.majorCompetitors?ProjectData.majorCompetitors:'无'}}</td>
                      </tr> -->
                  </tbody>
                </table>
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="20%" class="tit">法定代表人</td>
                        <td width="30%">{{ProjectData.legalRepresentative?ProjectData.legalRepresentative:'无'}}</td>
                        <td width="20%" class="tit">性别</td>
                        <td width="30%">{{ProjectData.sexOne?ProjectData.sexOne:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">出生年月</td>
                        <td width="30%">{{ProjectData.birthDate?ProjectData.birthDate:'无'}}</td>
                        <td width="20%" class="tit">证件类型</td>
                        <td width="30%">{{ProjectData.documentTypeOne?ProjectData.documentTypeOne:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">证件号码</td>
                        <td width="35%">{{ProjectData.documentNumberOne?ProjectData.documentNumberOne:'无'}}</td>
                        <td width="20%" class="tit">手机号码</td>
                        <td width="30%">{{ProjectData.phoneOne?ProjectData.phoneOne:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">职称开户名称</td>
                        <td width="35%">{{ProjectData.theTitle?ProjectData.theTitle:'无'}}</td>
                        <td width="20%" class="tit">银行账号</td>
                        <td width="30%">{{ProjectData.bankAccount?ProjectData.bankAccount:'无'}}</td>
                      </tr>
                      <tr>
                        <td width="20%" class="tit">开户银行</td>
                        <td width="35%">{{ProjectData.bank?ProjectData.bank:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
              <!-- 项目经费信息 -->
               <div id="ProjectLibrarySign6" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">人员信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                      <tr>
                        <td width="10%" class="tit">职工人数</td>
                        <td width="20%">{{ProjectData.staff?ProjectData.staff:'无'}}</td>
                        <td width="15%" class="tit">工程技术人员数</td>
                        <td width="20%">{{ProjectData.numberEngineers?ProjectData.numberEngineers:'无'}}</td>
                        <td width="15%" class="tit">当年新增大学生就业人数</td>
                        <td width="20%">{{ProjectData.numberJobs?ProjectData.numberJobs:'无'}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
              <!-- 项目组成员信息 -->
               <div id="ProjectLibrarySign7" class="navPosiCon_items">
                <h3 class="navPosiCon_title pr"><p class="pa f16 fb">营收缴税信息</p><i class="pa"></i></h3>
                <p v-if="!ProjectData">暂无数据展示</p>
                
                <table width="100%" cellpadding="5" v-if="ProjectData" style="margin-bottom:30px;">
                  <tbody>
                   <tr>
                      <td width="15%" class="tit">上年度企业研发经费投入</td>
                      <td width="10%">{{ProjectData.fundInput?ProjectData.fundInput:'无'}}</td>
                      <td width="10%" class="tit">资产总额</td>
                      <td width="15%">{{ProjectData.totalAssets?ProjectData.totalAssets:'无'}}</td>
                      <td width="10%" class="tit">净利润</td>
                      <td width="15%">{{ProjectData.netProfit?ProjectData.netProfit:'无'}}</td>
                      <td width="10%" class="tit">创汇</td>
                      <td width="15%">{{ProjectData.wireTransfer?ProjectData.wireTransfer:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="15%" class="tit">营业收入</td>
                      <td width="10%">{{ProjectData.operatingIncome?ProjectData.operatingIncome:'无'}}</td>
                      <td width="10%" class="tit">上缴增值税</td>
                      <td width="15%">{{ProjectData.payment?ProjectData.payment:'无'}}</td>
                      <td width="10%" class="tit">资产负债率</td>
                      <td width="15%">{{ProjectData.ratio?ProjectData.ratio:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">前两年产量</td>
                      <td width="10%">{{ProjectData.rirstTwoYears?ProjectData.rirstTwoYears:'无'}}</td>
                      <td width="10%" class="tit">前两年销售额</td>
                      <td width="15%">{{ProjectData.twoYearsSales?ProjectData.twoYearsSales:'无'}}</td>
                      <td width="10%" class="tit">前两年利润</td>
                      <td width="15%">{{ProjectData.firstTwoYears?ProjectData.firstTwoYears:'无'}}</td>
                      <td width="10%" class="tit">前两年创汇</td>
                      <td width="15%">{{ProjectData.twoYearsWire?ProjectData.twoYearsWire:'无'}}</td>
                    </tr>
                     <tr>
                      <td width="15%" class="tit">前两年上缴增值税</td>
                      <td width="10%">{{ProjectData.twoYearsPayment?ProjectData.twoYearsPayment:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">前一年产量</td>
                      <td width="10%">{{ProjectData.rirstOneYears?ProjectData.rirstOneYears:'无'}}</td>
                      <td width="10%" class="tit">前一年销售额</td>
                      <td width="15%">{{ProjectData.twoOneSales?ProjectData.twoOneSales:'无'}}</td>
                      <td width="10%" class="tit">前一年利润</td>
                      <td width="15%">{{ProjectData.firstOneYears?ProjectData.firstOneYears:'无'}}</td>
                      <td width="10%" class="tit">前一年创汇</td>
                      <td width="15%">{{ProjectData.oneYearsWire?ProjectData.oneYearsWire:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">前一年上缴增值税</td>
                      <td width="10%">{{ProjectData.oneYearsPayment?ProjectData.oneYearsPayment:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">当年截至目前产量</td>
                      <td width="10%">{{ProjectData.currentProduction?ProjectData.currentProduction:'无'}}</td>
                      <td width="10%" class="tit">当年截至目前销售额</td>
                      <td width="15%">{{ProjectData.currentSales?ProjectData.currentSales:'无'}}</td>
                      <td width="10%" class="tit">当年截至目前利润</td>
                      <td width="15%">{{ProjectData.currentProfit?ProjectData.currentProfit:'无'}}</td>
                      <td width="10%" class="tit">当年截至目前创汇</td>
                      <td width="15%">{{ProjectData.currentWire?ProjectData.currentWire:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">当年截至目前上缴增值税</td>
                      <td width="10%">{{ProjectData.currentPayment?ProjectData.currentPayment:'无'}}</td>
                      <td width="10%" class="tit">当年全年预计产量</td>
                      <td width="15%">{{ProjectData.projectedYield?ProjectData.projectedYield:'无'}}</td>
                      <td width="10%" class="tit">当年全年预计销售额</td>
                      <td width="15%">{{ProjectData.estimatedSales?ProjectData.estimatedSales:'无'}}</td>
                      <td width="10%" class="tit">当年全年预计利润</td>
                      <td width="15%">{{ProjectData.expectedProfit?ProjectData.expectedProfit:'无'}}</td>
                    </tr>
                    <tr>
                      <td width="15%" class="tit">当年全年预计创汇</td>
                      <td width="10%">{{ProjectData.projected?ProjectData.projected:'无'}}</td>
                      <td width="10%" class="tit">当年全年预计上缴增值税</td>
                      <td width="15%">{{ProjectData.expectedPayment?ProjectData.expectedPayment:'无'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
            </div>
             </div>
             <!-- 科技技术创新引导基金的详情字段 -->
          </TabPane>
        </Tabs>
      </div>
      <!--详情主体 end-->
    </div>
  <!--右侧滑框 end-->
</template>
<script>
import "../../../assets/css/animate.css";
import "../../../../static/IconFont/iconfont.css";
import { postAjax, getAjax } from "../../../api/api.js";
export default {
  data() {
    return {
      techSmallCompData: [], //科技型中小企业数据
      companyOrgData: [{
        areaInfoProvice:{
          regionName:''
        },
        dictInfoDto:{
          name:''
        },
        industryCategoryDto:{
          name:''
        },
        companyMainPersonDtos:[{
          name:''
        }],
        regTypeDto:{}
      }], //工商数据
      dictInfoDto: [],
      areaInfoArea: [],
      incubatorData: [], //孵化器
      incubatorLevel: [],
      incubatorType: [],
      NewThreeFourData: [], //工商信息中的新三板四板数据
      listedCompData: [],
      newThreeData: [], //新三板数据
      newFourData: [], //新四板数据
      spaceData: [], //众创空间
      productData: [], //促进生产力中心
      landingData: [], //创新创业基地
      talentData: [], //新型企业家
      keyLaboratoryData: [], //重点实验室
      EngineeringData: [], //工程研究中心
      ScienceCooperationData: [], //国际科技合作基地
      ComtechCenterData: [], //企业技术中心
      academicianData: [], //企业院士专家工作站
      taxDataData: [], //税务数据
      serviceSignData: [], //技术转移
      teachSignData: [{
        technicalDto:{
          name:'',
        }
      }], //技术交易
      GenPassServiceSignData: [], //创通票服务机构
      RegisterEnterpriseSignData: [], //注册企业
      RegisterEnterpriseSignDatas: [], //注册服务包
      torchSignData: [], //火炬计划
      citySoarSignData: [], //市级高企
      intelSignData: [], //知识产权
      nationalHighSignData: [], //国家高企
      eyasPlanSignData: [{
        projectinfo:{

        }
      }], //雏鹰计划
      zhishichanquanData:[],
      jishujiaoyiData:[],
      rongziqingkuangData:[],
      xiangmulixiangData:[],
      devinputsData:[],
      shouruyuqiData:[],
      ProjectLibrarySignData:[],//项目库
      planType:'',//计划类别
      activeProjectId:'',//当前项目的iD
      primaryUnit:'',//主承担单位差所有项目
      AllProjectData:[],//查询到的所以项目名称
      ProjectData:[{
        headInformation:{
          companyCode:''
        }
      }],//当前传进来ID的详情
      projetLibraryBata:[],//项目总详情
      num:0,
      tabSign: this.tabShowSign
    };
  },
  props: ["tabShowSign", "companyId"],
  components: {},
  created() {},
  methods: {
    //点击tab切换数据
    clickTabShow(sign) {
      this.tabSign = sign;
      //根据点击的tab获取当前应该显示的对应列表详情信息
      if (sign === "techSmallCompSign") {
        //科技型中小企业
        this.getTechSmallCompData();
      } else if (sign === "companyOrgSign") {
        //工商信息
        this.getCompanyOrgData();
      } else if (sign === "listedCompSign") {
        //上市企业
        this.getListedCompData();
      } else if (sign === "newThreeSign") {
        //新三板
        this.getNewThreeData();
      } else if (sign === "newFourSign") {
        //新四板
        this.getNewFourData();
      } else if (sign === "incubatorSign") {
        //孵化器
        this.getincubatorData();
      } else if (sign === "spaceSign") {
        //众创空间
        this.getSpaceData();
      } else if (sign === "productSign") {
        //生产力促进中心
        this.getProductData();
      } else if (sign === "landingSign") {
        //生产力促进中心
        this.getlandingData();
      } else if (sign === "talentPoolSign") {
        //生产力促进中心
        this.gettalentData();
      } else if (sign === "keyLaboratorySign") {
        //重点实验室
        this.getkeyLaboratoryData();
      } else if (sign === "engineeringSign") {
        //工程研究中心
        this.getEngineeringData();
      } else if (sign === "techniqueCenterSign") {
        //企业技术中心
        this.getComtechCenterData();
      } else if (sign === "scienceCooperationSign") {
        //国际合作基地
        this.getScienceCooperationData();
      } else if (sign === "academicianSign") {
        //企业院士专家工作站
        this.getacademicianData();
      } else if (sign === "taxDataSign") {
        //税务数据
        this.gettaxDataSignData();
      } else if (sign === "serviceSign") {
        //服务机构
        this.getserviceSignData();
      } else if (sign === "teachSign") {
        //技术交易
        this.getteachSignData();
      } else if (sign === "GenPassServiceSign") {
        //创通票机构
        this.getGenPassServiceSignData();
      } else if (sign === "RegisterEnterpriseSign") {
        //注册企业
        this.getRegisterEnterpriseSignData();
      } else if (sign === "torchSign") {
        //注册企业
        this.getorchSignData();
      } else if (sign === "citySoarSign") {
        //市级高企
        this.getcitySoarSignData();
      } else if (sign === "intelSign") {
        //市级高企
        this.getintelSignData();
      } else if (sign === "nationalHighSign") {
        //国家高企
        this.getnationalHighSignData();
      } else if (sign === "eyasPlanSign") {
        //雏鹰计划
        this.geteyasPlanSignData();
      }else if (sign === "ProjectLibrarySign") {
        //项目库
        this.getProjectLibrarySignData();
        this.getAllProject();
      }
    },
    //获取科技中小企数据
    getTechSmallCompData() {
        this.$Loading.start();
      postAjax("/techSmallCompany/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.techSmallCompData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取工商信息数据
    getCompanyOrgData() {
       this.$Loading.start();
      postAjax("/companyOrg/queryList", {
        companyName: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          //            console.log("---"+typeof(response.data.obj));
          this.companyOrgData = response.data.obj.CompanyOrgDto[0];
          this.dictInfoDto = response.data.obj.CompanyOrgDto[0].dictInfoDto;
          this.areaInfoArea = response.data.obj.CompanyOrgDto[0].areaInfoProvice;
          this.NewThreeFourData = response.data.obj.CompanyTypeDto;
          //            debugger
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取上市企业数据
    getListedCompData() {
       this.$Loading.start();
      postAjax("/listedCompanies/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.listedCompData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取新三板数据
    getNewThreeData() {
       this.$Loading.start();
      postAjax("/newTree/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.newThreeData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取新四板数据
    getNewFourData() {
       this.$Loading.start();
      postAjax("/newFour/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.newFourData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取孵化器数据
    getincubatorData() {
       this.$Loading.start();
      postAjax("/incubator/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
           this.$Loading.start();
          this.$Loading.finish();
          this.incubatorData = response.data.obj[0];
          this.incubatorLevel = response.data.obj[0].levelDto;
          this.incubatorType = response.data.obj[0].typeDto;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //众创空间
    getSpaceData() {
       this.$Loading.start();
      postAjax("/space/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.spaceData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //生产力促进中心
    getProductData() {
       this.$Loading.start();
      postAjax("/increaseProCenter/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.productData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //创新创业基地
    getlandingData() {
       this.$Loading.start();
      postAjax("/innovationEntrepreneurship/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.landingData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //新型企业家
    gettalentData() {
       this.$Loading.start();
      postAjax("/newEntrepreneur/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.talentData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //重点实验室通用
    getkeyLaboratoryData() {
       this.$Loading.start();
      postAjax("/importantLab/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.keyLaboratoryData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //工程研究中心
    getEngineeringData() {
       this.$Loading.start();
      postAjax("/importantResearchCenter/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.EngineeringData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //企业技术中心
    getComtechCenterData() {
       this.$Loading.start();
      postAjax("/comTechCenter/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.ComtechCenterData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //国际科技合作基地
    getScienceCooperationData() {
       this.$Loading.start();
      postAjax("/nationalCooperationBase/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.ScienceCooperationData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //企业院士专家工作站
    getacademicianData() {
       this.$Loading.start();
      postAjax("/compExpertWorkstation/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.academicianData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //税务数据
    gettaxDataSignData() {
       this.$Loading.start();
      postAjax("/taxData/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.taxDataData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //技术转移机构
    getserviceSignData() {
       this.$Loading.start();
      postAjax("/serviceAgencies/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.serviceSignData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //技术交易
    getteachSignData() {
       this.$Loading.start();
      postAjax("/technologyTrading/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.teachSignData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //创通票服务机构
    getGenPassServiceSignData() {
       this.$Loading.start();
      postAjax("/chuangtongInstitutions/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.GenPassServiceSignData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    //注册企业
    getRegisterEnterpriseSignData() {
       this.$Loading.start();
      postAjax("/registeredEnterprise/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.RegisterEnterpriseSignData = response.data.obj[0];
          this.RegisterEnterpriseSignDatas =
            response.data.obj[0].registrationServicesDtos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //注册企业
    getorchSignData() {
       this.$Loading.start();
      postAjax("/techTorch/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.torchSignData = response.data.obj[0];
          //  this.torchSignData = response.data.obj[0].registrationServicesDtos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //市级高企
    getcitySoarSignData() {
       this.$Loading.start();
      postAjax("/municipalHigh/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.citySoarSignData = response.data.obj[0];
          //  this.torchSignData = response.data.obj[0].registrationServicesDtos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getintelSignData() {
       this.$Loading.start();
      postAjax("/intellectual/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.intelSignData = response.data.obj[0];
          //  this.torchSignData = response.data.obj[0].registrationServicesDtos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //国家高企
    getnationalHighSignData() {
       this.$Loading.start();
      postAjax("/nationalHigh/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.nationalHighSignData = response.data.obj[0];
          //  this.torchSignData = response.data.obj[0].registrationServicesDtos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //雏鹰计划
    geteyasPlanSignData() {
       this.$Loading.start();
      postAjax("/company/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.eyasPlanSignData = response.data.obj[0];
           this.zhishichanquanData = response.data.obj[0].projectinfo.zhishichanquan;
           this.xiangmulixiangData = response.data.obj[0].projectinfo.xiangmulixiang;
           this.rongziqingkuangData = response.data.obj[0].projectinfo.rongziqingkuang;
           this.jishujiaoyiData = response.data.obj[0].projectinfo.jishujiaoyi;
           this.devinputsData = response.data.obj[0].projectinfo.devinputs;
           this.shouruyuqiData = response.data.obj[0].projectinfo.shouruyuqi;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //项目库
    getProjectLibrarySignData(){
       this.$Loading.start();
        postAjax("/projectLibrary/queryList", {
        companyCode: this.companyId
      })
        .then(response => {
          this.$Loading.finish();
          this.projetLibraryBata=response.data.obj
          this.ProjectLibrarySignData = response.data.obj[0];
          this.planType = response.data.obj[0].planType;//计划类别
          this.activeProjectId = response.data.obj[0].id;//当前项目的ID
          this.primaryUnit = response.data.obj[0].primaryUnit;//主承担单位
           this.getAllProject()
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllProject(){
       this.$Loading.start();
      // alert(this.primaryUnit);
        postAjax("/projectLibrary/queryList", {
        primaryUnit: this.primaryUnit
      })
        .then(response => {
          this.$Loading.finish();
          this.AllProjectData = response.data.obj;
          this.getProjectDetails()
        })
        .catch(error => {
          console.log(error);
        });
    },
    //科技项目列表点击
    
    getProjectDetails(){
       this.$Loading.start();
       postAjax("/projectLibrary/queryList", {
        id: this.activeProjectId
      })
        .then(response => {
          this.$Loading.finish();
          this.ProjectData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProjectDetailsOne(e,val,index){
       this.$Loading.start();
       postAjax("/projectLibrary/queryList", {
        id: val
      })
        .then(response => {
          this.$Loading.finish();
          this.num = index;
          this.ProjectData = response.data.obj[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  watch: {
    companyId: function(val) {
      console.log("监听到id的变化");
      let sign = this.tabSign;

      if (sign === "techSmallCompSign") {
        //科技型中小企业
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();

      } else if (sign === "companyOrgSign") {
        //工商信息
                this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "listedCompSign") {
        //上市企业
                this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "newThreeSign") {
        //新三板企业
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "newFourSign") {
        //新四板企业
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "incubatorSign") {
        //孵化器
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "spaceSign") {
        //众创空间
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "productSign") {
        //众创空间
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "landingSign") {
        //创新创业基地
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "talentPoolSign") {
        //新型企业家
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "keyLaboratorySign") {
        //重点实验室
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "engineeringSign") {
        //工程研究中心
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "techniqueCenterSign") {
        //企业技术中心
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "scienceCooperationSign") {
        //国际合作基地
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "academicianSign") {
        //国际合作基地
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "taxDataSign") {
        //税务数据
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "serviceSign") {
        //技术转移
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "teachSign") {
        //技术交易
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "GenPassServiceSign") {
        //创通票机构
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "RegisterEnterpriseSign") {
        //创通票机构
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "torchSign") {
        //创通票机构
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "citySoarSign") {
        //市级高企
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "intelSign") {
        //知识产权
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "nationalHighSign") {
        //知识产权
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      } else if (sign === "eyasPlanSign") {
        //雏鹰计划
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
      }else if (sign === "ProjectLibrarySign") {
        //知识产权
        this.getCompanyOrgData();
        this.getTechSmallCompData();
        this.getListedCompData();
        this.getNewThreeData();
        this.getNewFourData();
        this.getincubatorData();
        this.getSpaceData();
        this.getProductData();
        this.getlandingData();
        this.gettalentData();
        this.getkeyLaboratoryData();
        this.getEngineeringData();
        this.getComtechCenterData();
        this.getScienceCooperationData();
        this.getacademicianData();
        this.gettaxDataSignData();
        this.getserviceSignData();
        this.getteachSignData();
        this.getGenPassServiceSignData();
        this.getRegisterEnterpriseSignData();
        this.getorchSignData();
        this.getcitySoarSignData();
        this.getintelSignData();
        this.getnationalHighSignData();
        this.geteyasPlanSignData();
        this.getProjectLibrarySignData();
        // this.getAllProject();
      }
    }
  },
  mounted() {},
  destroyed() {}
};
</script>
<style scoped>
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
  right: 0;
  top: 0;
}
.RightSlideTit .currentYear {
  right: 20px;
  top: 0px;
}
.RightSlideTit .iconfont {
  color: #2399ee;
  font-size: 18px;
}
.RightSlide .titTable {
  margin-left: 30px;
  width: 95%;
}
.RightSlide .titTable td {
  height: 28px;
}
.RightSlide .toolTip li {
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  background: #fa9749;
  border-radius: 3px;
  margin-right: 5px;
  color: #fff;
}
.RightSlideBody {
  width: 100%;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 0;
}
.RightSlideBody .navPosiTit {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  padding: 0 28px;
  box-shadow: 0 1px 2px #f5f5f5;
}
.RightSlideBody .navPosiTit li {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  background: #f6f6f6;
  color: #7199b6;
  font-size: 14px;
  text-align: center;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 4px;
  margin-top: 9px;
}
.RightSlideBody .navPosiTit li a {
  display: block;
}
.RightSlideBody .navPosiCon {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  padding: 0px 25px 30px;
}
.navPosiCon_title {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
.navPosiCon_title p {
  left: 0;
  top: 0px;
  height: 50px;
  line-height: 50px;
  background: #fff;
  padding: 0 10px 0 0;
  z-index: 1;
  color: #2399ee;
}
.navPosiCon_title i {
  width: 100%;
  border: 1px solid #e0e0e0;
  left: 0;
  top: 24px;
  z-index: 0;
}
.navPosiCon table td {
  border: 1px solid #e7eaec;
  height: 30px;
  padding: 0 10px;
}
.navPosiCon table td.tit {
  background: #f3f5f9;
  font-size: 12px;
  font-weight: bold;
}
.companyOrgBox .navPosiCon table td.tit {
  font-weight: 400;
}
.navPosiCon .tableList td {
  border: 0;
  font-size: 13px;
  height: 40px;
  padding: 0 10px;
  line-height: 24px;
  /*color: #333;*/
}
.navPosiCon .memberList li {
  width: 130px;
  border: 1px solid #eee;
  padding: 10px;
  font-size: 14px;
  margin-right: 25px;
}
.navPosiCon .iconfont {
  color: #00c2df;
  font-size: 18px;
}
.projectName li{
    font-size: 14px;
    font-weight: 400;
    margin: 10px 10px;
    
}
.active{
    background-color: #fa9749;
    border-radius: 5px;
    color: #fff;
}

.projectName li a{
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding: 5px 10px;
}
</style>
