<template>
  <div class="content">

   <MTable
   :table-data="tableData"
  :page-data="pageData"
  class="OverhangtableBox"
  @handleBtnClick="handleBtnClick"
  @switchClick="switchClick"
  @cellClick="cellClick"
  @handleSelectionChange="selectionChange"
  :tableSize ="'small'"
  :border="true"
  @pageChage="pageChage">

   </MTable>
  </div>
</template>
<script>
export default {

  data() {
    return {
      multipleSelection:[],
     pageData: {
        pageNum: 1,
        pageSize: 10,
        total: 1,
        currentPage: 1
      },
      tableData: {
    selection:{ //勾选列设置
    align:'center', //对齐方式  
    className:'class', //列的 className	
    select:true
  },
  titles: [
      {
      type: 'index',
      label: '序号',
      align: 'center',
    },
    {
    columnType:'nomal',
    sortable:true,//对应列是否可以排序
    resizable:true,
    prop: 'mobile',
    label: '会员账号',
    align: 'center',
  }, {
      columnType:'img',
    prop: 'imgUrl',
    label: '会员头像',
    align: 'center',
  },
   {
    prop: 'gmtCreate',
    label: '申请时间',
    align: 'center',
  },
   {
    columnType:'input',
    prop: 'inputValue',
    label: '添加备注',
    align: 'center',
  },

  {
    columnType:'switch',
    prop:'switch',
    label:'状态',
     align: 'center',
     activeColor:"#13ce66",
     inactiveColor:"#ff4949",
    btns:[
    {
      type: 'state',
      name: '启用'
    },
    ]
  },

  {
    columnType:'btn',
    prop:'btn',
    label:'操作',
     align: 'center',
    btns:[{
      type: 'view',
      name: '查看详情'
    },
    {
      type: 'del',
      name: '删除'
    },
    {
      type:"switchBtn",
      select:true,
      name:"选中",
      unselectName:"未选中"

    }
    ]
  },

  {
    columnType:'btnDropdown',
    prop:'btnDropdown',
    label:'操作',
     align: 'center',
    btns:[{
      type: 'update',
      name: '修改'
    },
    {
      type: 'open',
      name: '启用',
    }
    ]
  },
],
  datas: [
    {
      id:1,
      mobile:12112,
      gmtCreate:55555,
      imgUrl:'http://img.zhumengapp.com/group1/M00/01/F7/rBLFZl2umUuAEmYIAAoMmFYklEM494.jpg',
      inputValue:'inputValue',
      switch:true,
      isEnable:false,
    },
    {
      id:2,
    mobile:12112,
    imgUrl:'http://img.zhumengapp.com/group1/M00/01/F7/rBLFZl2umUuAEmYIAAoMmFYklEM494.jpg',
    gmtCreate:55555,
       switch:false,
       isEnable:false,
    },
    {
       id:3,
    mobile:12112,
    gmtCreate:55555,
     switch:false,
       isEnable:false,

    }
  ],
}

    }
  },
  methods: {
   // 操作
    handleBtnClick(type, row,data) {
        if(type.select){
                       row.isEnable = !row.isEnable //通过该判定来改中和未选中
                      }
      console.log(type, row,data,'handleBtnClick');
    },
   // switch选择
    switchClick(type, row,data) {
      console.log(type, row,data,'switchClick');
    },
     cellClick(row, column, cell, event) { // 当某个单元格被点击时会触发该事件
                 console.log(row, column, cell, event,'cellClick')
                  },
     selectionChange(val) { //当勾选项发生变化时会触发该事件
       this.multipleSelection = val;
                  },
      pageChage(page) {
        console.log(page,'page');
      this.pageData.pageNum = page
      this.pageData.currentPage = page
    },
  },
}
</script>

<style  scoped>
.content{
  width: 60%;
  height: 500px;
  margin: 0 auto;
}
</style>