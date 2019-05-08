import Vue from 'vue';
import router from 'vue-router';
// import axios from 'axios';
Vue.use(router);

// let routers=new router({
export default new router({
        routes: [
            // 路由重定向功能
            {
              path: '/',
              component: resolve => require(['../components/login.vue'], resolve),
            },
          {
            path: '/login',
            component: resolve => require(['../components/login.vue'], resolve),
          },
          
            {
              path: '/Layout',
              component: resolve => require(['../components/layout.vue'], resolve),
              children: [
                //科技数据库-企业类型库
                {
                  path: '/EnterpriseType',//科技型中小企业
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/EnterpriseType.vue'], resolve),
                },
                {
                  path: '/ListedCompany',//上市企业
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/ListedCompany.vue'], resolve),
                },
                {
                  path: '/NewThree',//新三板
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/NewThree.vue'], resolve),
                },
                {
                  path: '/NewFour',//新四板
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/NewFour.vue'], resolve),
                },
                {
                  path: '/CitySoar',//市高企
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/CitySoar.vue'], resolve),
                },
                {
                  path: '/nationalHigh',//国家高企
                  component: resolve => require(['../components/SciAndTechDatabase/EnterpriseType/nationalHigh.vue'], resolve),
                },
                //科技数据库-基础信息库
                {
                  path: '/BusinessData',
                  component: resolve => require(['../components/SciAndTechDatabase/BasicInfobase/BusinessData.vue'], resolve),
                },
                 //科技数据库-知识产权
                 {
                  path: '/IntelProperty',
                  component: resolve => require(['../components/SciAndTechDatabase/BasicInfobase/IntelProperty.vue'], resolve),
                },
                 //科技数据库-税务数据
                 {
                  path: '/taxData',
                  component: resolve => require(['../components/SciAndTechDatabase/BasicInfobase/taxData.vue'], resolve),
                },
                //双创载体-孵化器
                {
                  path: '/incubator',
                  component: resolve => require(['../components/SciAndTechDatabase/DoubleCarrier/incubator.vue'], resolve),
                },
                  //双创载体-众创空间
                  {
                    path: '/hitSpace',
                    component: resolve => require(['../components/SciAndTechDatabase/DoubleCarrier/hitSpace.vue'], resolve),
                  },
                   //双创载体-生产力促进中心
                   {
                    path: '/productProCenter',
                    component: resolve => require(['../components/SciAndTechDatabase/DoubleCarrier/productProCenter.vue'], resolve),
                  },
                  //双创载体-创新创业基地
                  {
                    path: '/landingPad',
                    component: resolve => require(['../components/SciAndTechDatabase/DoubleCarrier/landingPad.vue'], resolve),
                  },
                  //人才库-新型企业家keyLaboratory
                  {
                    path: '/talentPool',
                    component: resolve => require(['../components/SciAndTechDatabase/talentPool/talentPool.vue'], resolve),
                  },
                //研发机构库-重点实验室
                {
                  path: '/keyLaboratory',
                  component: resolve => require(['../components/SciAndTechDatabase/researchInstitute/keyLaboratory.vue'], resolve),
                },
                //工程研究中心
                {
                  path:'/engineering',
                  component: resolve => require(['../components/SciAndTechDatabase/researchInstitute/engineering.vue'], resolve),
                },
                //企业技术中心
                {
                  path:'/techniqueCenter',
                  component: resolve => require(['../components/SciAndTechDatabase/researchInstitute/techniqueCenter.vue'], resolve),
                },
                //高企协会
                {
                  path:'/highAssociation',
                  component: resolve => require(['../components/SciAndTechDatabase/highAssociation/highAssociation.vue'], resolve),
                },
                //国际科技合作基地
                {
                  path:'/scienceCooperation',
                  component: resolve => require(['../components/SciAndTechDatabase/researchInstitute/scienceCooperation.vue'], resolve),
                },
                 //技术转移机构
                 {
                  path:'/Service',
                  component: resolve => require(['../components/SciAndTechDatabase/Service/Service.vue'], resolve),
                },
                 //技术交易
                 {
                  path:'/technologyTrading',
                  component: resolve => require(['../components/SciAndTechDatabase/technologyTrading/technologyTrading.vue'], resolve),
                },
                //创通票服务机构
                {
                  path:'/GenPassService',
                  component: resolve => require(['../components/SciAndTechDatabase/GenPass/GenPassService.vue'], resolve),
                },
                 //创通票注册企业
                 {
                  path:'/RegisterEnterprise',
                  component: resolve => require(['../components/SciAndTechDatabase/GenPass/RegisterEnterprise.vue'], resolve),
                },
                //火炬统计
                {
                  path:'/torchInfo',
                  component: resolve => require(['../components/SciAndTechDatabase/torchInfo/torchInfo.vue'], resolve),
                },
                 //院士专家
                 {
                  path:'/academician',
                  component: resolve => require(['../components/SciAndTechDatabase/researchInstitute/academician.vue'], resolve),
                },
                {
                  path: '/UserManage',
                  component: resolve => require(['../components/SystemSettings/UserManage/UserManage.vue'], resolve),
                },
                {
                  path: '/DepartmentManage',
                  component: resolve => require(['../components/SystemSettings/DepartmentManage/DepartmentManage.vue'], resolve),
                },
                {
                  path: '/RoleManage',
                  component: resolve => require(['../components/SystemSettings/RoleManage/RoleManage.vue'], resolve),
                },
                {
                  path: '/AuthorityManage',
                  component: resolve => require(['../components/SystemSettings/AuthorityManage/AuthorityManage.vue'], resolve),
                },
                {
                  path: '/ChangePassword',
                  component: resolve => require(['../components/SystemSettings/ChangePassword/ChangePassword.vue'], resolve),
                },
                {
                  path: '/eyasPlan',
                  component: resolve => require(['../components/SciAndTechDatabase/eyasPlan/eyasPlan.vue'], resolve),
                },{
                  path: '/projectLibrary',
                  component: resolve => require(['../components/SciAndTechDatabase/projectLibrary/projectLibrary.vue'], resolve),
                },{
                  path: '/DataShow',
                  component: resolve => require(['../components/SciAndTechDatabase/DataShow/DataShow.vue'], resolve),
                },{
                  path: '/ScienceNum',
                  component: resolve => require(['../components/SciAndTechDatabase/DataShow/ScienceNum.vue'], resolve),
                },{
                  path: '/Innovative',
                  component: resolve => require(['../components/SciAndTechDatabase/DataShow/Innovative.vue'], resolve),
                },{
                  path: '/Company',
                  component: resolve => require(['../components/SciAndTechDatabase/DataShow/Company.vue'], resolve),
                },{
                  path: '/HighAnalysis',
                  component: resolve => require(['../components/SciAndTechDatabase/DataShow/HighAnalysis.vue'], resolve),
                }
              ]
            }
          ]
})
// //直接跳转路由，拦截器失效，需要拦截请求，然后增加消息头token
// routers.beforeEach((to, from, next) => {
//   // console.log("0000000000000=============");
//   if (localStorage.getItem("jwt_token")) {
//     Vue.prototype.$Ajax.defaults.headers = {
//       'jwt_token': localStorage.getItem("jwt_token")
//     }
//     next();
//   }else{
//     next({
//       path: '/',//如果为假，则重定向到这个路由路劲
//       query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//   }

// })
