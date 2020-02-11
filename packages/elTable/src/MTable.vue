<template>
  <div class="vue_table">
        <!--  data           显示的数据                array
          ref vue.ref     选中表格
          show-summary	  是否在表尾显示合计行	      Boolean
          summary-method	自定义的合计计算方法    	  Function
          row-key       行数据的 Key，用来优化        Function
                          Table 的渲染；在使用
                        reserve-selection 功
                        能与显示树形数据时，该属
                        性是必填的。
          stripe        是否为斑马纹 table	         boolean
          size	        Table 的尺寸	              string	medium / small / mini
    Events：
          selection-change  当选择项发生变化时会触发该事件  Function
          select-all        当用户手动勾选全选 Checkbox 时触发的事件  Function
          cell-click	       当某个单元格被点击时会触发该事件   Function
          row-click           当某一行被点击时会触发该事件
    -->
    <el-table
      :border="border"
      :data="tableData.datas"
      :ref="tableRef"
      :show-summary="showSummary"
      :summary-method="showSummary?getSummaries:undefined"
      select-on-indeterminate
      :row-key="rowKey"
      :stripe ="stripe"
      :size="tableSize? tableSize:'small'"
      style="width:100%"
      @selection-change="handleSelectionChange"
      @select-all="selectAll"
      @cell-click="cellClick"
      @row-click="rowClick"
       >
            <!--
        width	          对应列的宽度	              string
        min-width       对应列的最小宽度             string
        fixed	          列是否固定在左侧或者右侧，     string, boolean	  true, left, right
                        true 表示固定在左侧
        align	          对齐方式                   String	         left/center/right
        header-align	  表头对齐方式，若不设置该项，   String	left/center/right
                        则使用表格的对齐方式
        sortable	      对应列是否可以排序，         boolean, string	 true, false, 'custom'
        class-name	    列的 className	          string

        reserve-selection	仅对 type=selection 的             Boolean
                          列有效，类型为 Boolean，为
                          true 则会在数据更新之后保留
                          之前选中的数据（需指定 row-key）

        type              对应列的类型。如果设置了 selection     string   selection/index/expand
                          则显示多选框；如果设置了 index 则显
                          示该行的索引（从 1 开始计算）；如果设
                          置了 expand 则显示为一个可展开的按钮

        index	            如果设置了 type=index，可以通过传递    number, Function(index)
                          index 属性来自定义索引
        resizable         对应列是否可以通过拖动改变宽度          boolean   true
                        （需要在 el-table 上设置 border 属性为真）         
     -->
      <!-- 勾选列 -->
      <el-table-column
        v-if="tableData.selection"
        :width="tableData.selection.width"
        :min-width="tableData.selection.minWidth"
        :fixed="tableData.selection.fixed"
        :align="tableData.selection.align"
        :header-align="tableData.selection.headerAlign"
        :sortable="tableData.selection.sortable"
        type="selection"
        :index="tableData.selection.index"
        :resizable="tableData.selection.resizable"
        :class-name="tableData.selection.className"
        :reserve-selection="tableData.selection.select"
      />
      <template v-for="title in tableData.titles">
        <!-- 常规列 -->
        <!-- 
          title.columnType  显示形式
              nomal   默认   正常显示
              input   显示输入框
              img     图片
              btn     操作按钮
              slectBtn  多个操作按钮

            -->
          <el-table-column
          v-if="title.columnType === 'nomal'||!title.columnType"
          :key="title.prop"
          :prop="title.prop"
          :label="title.label"
          :width="title.width"
          :min-width="title.minWidth"
          :fixed="title.fixed"
          :align="title.align"
          :header-align="title.headerAlign"
          :sortable="title.sortable"
          :type="title.type"
          :index="title.index"
          :resizable="title.resizable"
          :class-name="title.className"
        />
          <!-- 显示输入框列  input-->
        <el-table-column
          v-if="title.columnType === 'input'"
          :key="title.prop"
          :label="title.label"
          :width="title.width"
          :min-width="title.minWidth"
          :fixed="title.fixed"
          :align="title.align"
          :header-align="title.headerAlign"
          :sortable="title.sortable"
          :type="title.type"
          :index="title.index"
          :resizable="title.resizable"
          :class-name="title.className"
        >
             <!-- slot-scope="scope" scope能获取到data数据 -->
          <template slot-scope="scope">
            <el-input
              v-model="scope.row[title.prop]"
              :placeholder="title.placeholder"
              class="slotInput"
              @blur="setSort(scope.row)"/>
          </template>
        </el-table-column>
        <!-- 显示图片列  img-->
        <el-table-column
          v-if="title.columnType === 'img'"
          :key="title.prop"
          :label="title.label"
          :width="title.width"
          :min-width="title.minWidth"
          :fixed="title.fixed"
          :align="title.align"
          :header-align="title.headerAlign"
          :sortable="title.sortable"
          :type="title.type"
          :index="title.index"
          :resizable="title.resizable"
          :class-name="title.className"
        >
          <template slot-scope="scope">
            <img :src="scope.row[title.prop]" class="slotImg" style="width:50px;height:50px;" >
            </template>
               </el-table-column>

                <!-- 显示按钮列 btnList
        resizable 对应列是否可以通过拖动改变宽度
      -->
        <el-table-column
          v-if="title.columnType === 'btn'"
          :key="title.prop"
          :label="title.label"
          :width="title.width"
          :min-width="title.minWidth"
          :fixed="title.fixed"
          :align="title.align"
          :header-align="title.headerAlign"
          :resizable="title.resizable"
          :class-name="title.className"
          :type="title.type"
        >
              <template slot-scope="scope" >
                  <!-- 自定义名字按钮 通过数组btnview控制按钮显示个数-->
            <el-button
              v-for="btn in title.btns"
              :key="btn.type"
              :type="btn.btnType?btn.btnType:'text'"
              :disabled="btn.disable"
              :class="{'btnTextColor':!scope.row.isEnable&&btn.select}"
              size="small"
              @click="handleClick(btn,scope.row,scope)">{{ btn.select? scope.row.isEnable ? btn.name:btn.unselectName  : btn.name }}</el-button>
               
       </template> 
        </el-table-column>
        <!-- 多个按钮下拉列表 -->
        <el-table-column
        v-if="title.columnType === 'btnDropdown'"
        :key="title.prop"
        :label="title.label"
        :width="title.width"
        :min-width="title.minWidth"
        :fixed="title.fixed"
        :align="title.align"
        :header-align="title.headerAlign"
        :resizable="title.resizable"
        :class-name="title.className"
        :type="title.type"
        >
      >
    <template slot-scope="scope">
      <div class="dropCommom">
    <el-dropdown :trigger="title.trigger" @command="handleClick($event,scope.row,scope)">
      <span class="el-dropdown-link">
        操作<i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for=" btn in title.btns"
          :key="btn.type"
          :command="btn.type">{{ btn.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

        </template>
      </el-table-column>
      <!-- switch开关-->
         <el-table-column
          v-if="title.columnType === 'switch'"
          :key="title.prop"
          :label="title.label"
          :width="title.width"
          :min-width="title.minWidth"
          :fixed="title.fixed"
          :align="title.align"
          :header-align="title.headerAlign"
          :resizable="title.resizable"
          :class-name="title.className"
          :type="title.type"
        >
              <template slot-scope="scope">

                  <el-switch
                    v-for="swh in title.btns"
                    :key="swh.type"
                    v-model="scope.row[title.prop]"
                    :active-color="title.activeColor"
                    :inactive-color="title.inactiveColor"
                    :active-text="swh.name"
                    @change="switchClick(scope.row[title.prop],scope.row,scope)"
                  >
                  </el-switch>
               
       </template> 
        </el-table-column>
      </template>
      </el-table>
      <el-pagination
      v-if="pageData.total"
      :page-size="pageData.pageSize"
      :current-page="pageData.currentPage ? pageData.currentPage : 1"
      :total="pageData.total"
      small
      background
      layout="prev, pager, next, total, jumper"
      @current-change="handleCurrentChange"
    />
        </div >
      </template>
      <script>
        export default {
          name:'MTable',
          props:{
                tableData: { // 表格渲染
                type: Object,
                default: () => { 
                  return {
                    datas:{ //渲染数据
                       type: Object,
                       default: ()=>{
                         return []
                       }
                    }
                  } 
                  }
                 },
               showSummary:{ //是否在表尾显示合计行
                 type:Boolean,
                 required: false,
                 default:false
               },
               stripe:{ //是否为斑马纹 table	  
                 type:Boolean,
                 required: false,
                 default:true 
               },
               border:{ //是否有边框table	  
                 type:Boolean,
                 required: false,
                 default:false 
               },
               tableSize:{ //table的尺寸
                  type:String,
                 required: false,
                 default:"small" 
               },
               tableRef:{ //table的ref
                 type:String,
                 default:'tableRef'
               },
                  pageData: {
                  type: Object,
                  required: false,
                  default: () => { return {} }
                },
          },
          data() {
            return {
              
            }
          },
          mounted () {
            
          },
          methods: {
                    rowKey(row) {
                      return row.id
                    },
                    handleSelectionChange(val) { //当勾选项发生变化时会触发该事件
                    this.$emit('handleSelectionChange', val)
                  },
                      selectAll(selection) { //当用户手动勾选全选 Checkbox 时触发的事件
                    this.$emit('selectAll', selection)
                  },
                  cellClick(row, column, cell, event) { // 当某个单元格被点击时会触发该事件
                    this.$emit('cellClick', row, column, cell, event)
                  },
                  rowClick(row, column, event) { // 当某一行被点击时会触发该事件
                    this.$emit('rowClick', row, column, event)
                  },
                   getSummaries(params) { //自定义的合计计算方法   
                    return this.$parent.getSummaries(params)
                  },
                    setSort(row) { //输入框失去焦点触发
                    this.$emit('setSort', row)
                  },
                      handleClick(type, row, all) { //操作按钮事件
                    
                      // console.log(row,2222);
                    this.$emit('handleBtnClick', type, row, all)
                  },
                      switchClick(type, row, all) { //swich按钮事件
                    this.$emit('switchClick', type, row, all)
                  },
                  handleCurrentChange(val) { //分页事件
                    this.$emit('pageChage', val)
                  },
          },
        }
      
      </script>
      <style  scoped>
        .vue_table .el-pagination{
          text-align: center;
          margin-top: 20px;
        }
        /* .vue_table{
          min-height: 500px;
        } */
        .vue_table .el-dropdown{
          cursor: pointer;
        }
        .vue_table .btnTextColor{
          color: red;
        }
        
      </style>