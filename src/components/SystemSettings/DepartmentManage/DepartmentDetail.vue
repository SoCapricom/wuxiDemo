<template>
    <div class="apartment-detail-box">
        <div class="detail-top-box pt25 pr pl25">
            <div class="mb15">
                <span class="inlineblock pl25 f18 apartment-name">技术部</span>
            </div>
            <div class="infor-table-box">
                <table>
                    <thead>
                        <th class="f_9" width="60">部门ID</th>
                        <th class="f_9" width="165">上级部门</th>
                        <th class="f_9" width="50">排序号</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>4</td>
                            <td>政和科技股份有限公司</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pa tool-box clearfix">
                <a class="block fr f_6 add-btn" href="javascript:;">+新建子部门</a>
                <span class="ml15 mr15 fr block" style="color: #e0e0e0;height: 16px;line-height: 14px;">|</span>
                <a class="block pl15 fr f_6 delete-btn" href="javascript:;">删除</a>
                <span class="ml15 mr15 fr block" style="color: #e0e0e0;height: 16px;line-height: 14px;">|</span>
                <a class="block pl15 fr f_6 edit-btn" href="javascript:;">编辑</a>
            </div>
        </div>
        <div class="detail-table-box">
        </div>
    </div>
</template>

<script>
export default {
  name: 'apartment-detail',
  data () {
    return {
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    }
  }
}
</script>

<style scoped>
.apartment-detail-box{
     width: 970px;
     height: 100%;
     background: #fff;
}
.apartment-detail-box .apartment-name{
    height: 20px;
    line-height: 20px;
    /*background:url("../../../assets/images/bm_bgName.png") no-repeat left center;*/
}
.detail-top-box{
    border-bottom: 2px solid #2299ee;
}
.infor-table-box{
    width: 275px;
}
.infor-table-box table{
    width: 100%;
}
.infor-table-box table td{
    height:35px;
}
.tool-box{
    top: 25px;
    right: 25px;
}
.tool-box .edit-btn,.tool-box .delete-btn,.tool-box .add-btn{
    color: #666;
    line-height: 16px;
    height: 16px;
}
.tool-box .edit-btn{
    /*background:url("../../../assets/images/bm_edit.png") no-repeat left center;*/
}
.tool-box .edit-btn:hover{
    color: #2299ee;
    /*background:url("../../../assets/images/bm_editHover.png") no-repeat left center;*/
}
.tool-box .delete-btn{
    /*background: url("../../../assets/images/bm_delete.png") no-repeat left center;*/
}
.tool-box .delete-btn:hover{
    color: #2299ee;
    /*background: url("../../../assets/images/bm_deleteHover.png") no-repeat left center;*/
}
.tool-box .add-btn:hover{
    color: #2299ee;
}
</style>
