import Vue from 'vue'
import App from './App.vue'
import {
   Button, 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Pagination,
  Input,
  Switch
 } from 'element-ui'
 import MTable from '../packages/index';
Vue.component(Button.name, Button);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Input.name, Input);
Vue.component(Switch.name, Switch);
Vue.use(MTable)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
