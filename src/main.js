import Vue from 'vue'
import App from './App.vue'
import {Button, Container, Main, Header, Aside, Submenu, Menu, MenuItemGroup, MenuItem, Dropdown,DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, BreadcrumbItem, Breadcrumb, Tag, Form, FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination, MessageBox, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '../router'
//  2. 引入提前写好的一些公共样式
import './assets/less/index.less'

import store from '../store'
import http from 'axios'
//  4.  Mock引入
import '../api/mock.js'


Vue.use(Row);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Card);
Vue.use(Col);
Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false
//  2. axios 不是插件, 绑定在原型对象上
Vue.prototype.$http = http
//  3. 警示框 要绑定在原型对象上
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//  4.  导航守卫 （重点）
router.beforeEach((to, form, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  // console.log(token);
  if (!token && to.name != 'login') {
    next({name: 'login'})
  } else if (token && to.name === 'login') {
    next({name: 'home'})
  } else {
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App),
  //   5.  在创建vue实例的周期函数中 就调用addMenu，  防止白屏
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
