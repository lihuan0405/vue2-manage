import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main.vue'
// import MyHome from '../views/MyHome.vue'
// import MyUser from '../views/MyUser.vue'
// import MyMall from '../views/MyMall.vue'
// import MyPage1 from '../views/other/MyPage1.vue'
// import MyPage2 from '../views/other/MyPage2.vue'
// import MyLogin from '../views/MyLogin.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', name: 'main', component: Main,
        redirect: '/home',
        // children: [
            // {path: '/home', name:'home', component: MyHome},
            // {path: '/user', name:'user', component: MyUser},
            // {path: '/mall',  name:'mall', component: MyMall},
            // {path: '/page1', name:'page1', component: MyPage1},
            // {path: '/page2', name:'page2', component: MyPage2},
        // ]
    },
    {
        path: '/login', name: 'login', component: ()=> import('../views/MyLogin.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router