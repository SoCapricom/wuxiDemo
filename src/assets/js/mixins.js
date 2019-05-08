// 创建一个需要混入的对象
export const mixinsDetailAja = {
  data: function () {
    return {
      entpriDetailSource:[],//企业详情数据
      busiDetailData:[],//工商详情数据
      tabName:'',//从子组件接收到的tabName
      tabShowSign:''//enterpriTypeSign传递当前列表页面的标志，控制详情页对应tab显示
    }
  },
  created() {
    // this.hello(this.a1);
    // this.getDetailAja();
  },
  methods: {
    hello( a1) {
      // console.log(a1);
    },
    //接收子组件传递的数据-tab点击切换的时候
    getTabName(receiveTabName, receiveDetailData){
      this.tabName = receiveTabName;
      if(this.tabName === 'enterpriTypeSign'){
        this.entpriDetailSource = receiveDetailData;
      }else if(this.tabName === 'businessDataSign'){
        this.busiDetailData = receiveDetailData;
      }

       // console.log(this.tabName);
    },
    getDetailAja(){
      //在第一次进入详情页的时候读取数据
      if(this.tabShowSign === 'enterpriTypeSign'){
        this.$Ajax.post('/techSmallCompany/queryList', {
            "companyCode": this.commonId
        })
          .then(response => {
            this.entpriDetailSource = response.data.obj[0];
            console.log(this.entpriDetailSource);
             console.log(this.commonId);
          })
          .catch(error => {
            console.log(error);
          });
      }

      //在tab切换的时候获取详情数据
      console.log(this.tabName);
      if(this.tabName === 'enterpriTypeSign'){//企业数据
        console.log('tab点击到了企业列表');

        this.tabShowSign = 'enterpriTypeSign';
        this.$Ajax.post('/techSmallCompany/queryList', {
          "companyCode": this.commonId
        })
          .then(response => {
            this.entpriDetailSource = response.data.obj[0];
            console.log(this.entpriDetailSource);
            console.log(this.commonId);
          })
          .catch(error => {
            console.log(error);
          });

      }
      else if(this.tabName === 'businessDataSign'){//工商数据
        console.log('tab点击到了工商列表');
        console.log(this.commonId);

        this.tabShowSign = 'businessDataSign';
        //关于工商详情+关于顶部工商信息
        this.$Ajax.post('/companyOrg/queryList', {
          "companyCode": this.commonId
        }).then(response => {
          this.busiDetailData = response.data.obj[0];
          // console.log(this.busiDetailData);
        })
        .catch(error => {
          console.log(error);
        });

      }

    },


  }
};
