// 导入组件，组件必须声明 name
import MTable from './src/MTable.vue'

// 为组件添加 install 方法，用于按需引入
MTable.install = function (Vue) {
    Vue.component(MTable.name, MTable)
}

export default MTable