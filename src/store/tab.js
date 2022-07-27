import Cookie from "js-cookie"
// import router from "router"

export default {
    state: {
        isCollapse: true,
        //  1. 定义面包屑相关数据 点击路由对应的数据
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                //  2.1  当索引不存在，就往tabslist里面添加数据，点了重复的就切换高亮，不需要添加
                if (result === -1) {
                    state.tabsList.push(val)
                } else {
                    state.currentMenu = null
                }
            }
        },
        //  3. 网页上关闭 tag 以后， 要将store中的 tabsList对应数据删除
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state, val) {
            state.menu = val
            //   4.  menu 数据要缓存在cookie中，避免刷新丢失数据
         Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
               addMenu(state,router) {
          if(!Cookie.get('menu')){
            return
          }
          const menu = JSON.parse(Cookie.get('menu'))
          state.menu = menu
          const menuArray = []
          menu.forEach(item => {
            console.log("item",item)
            if (item.children) {
              item.children = item.children.map(item=>{
                item.component = () => import(`../views/${item.url}`)
                return item
              })
              menuArray.push(...item.children)
            } else {
              item.component = () => import(`../views/${item.url}`)
              menuArray.push(item)
            }
          });
          //路由的动态添加
          menuArray.forEach(item => {
            router.addRoute('Main',item)
          })
        }
    }
}