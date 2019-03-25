import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/components/manage')), 'manage')
const group = r => require.ensure([], () => r(require('@/views/group')), 'group')
const role = r => require.ensure([], () => r(require('@/views/role')), 'role')
const AgencyStaffsList = r => require.ensure([], () => r(require('@/components/page/agencystaffslist.vue')), 'agencystaffslist')
const AgencyList = r => require.ensure([], () => r(require('@/components/page/agencylist.vue')), 'agencylist')
const RoleList = r => require.ensure([], () => r(require('@/components/page/role/rolelist.vue')), 'rolelist')
const RoleAdd = r => require.ensure([], () => r(require('@/components/page/role/roleadd.vue')), 'roleladd')
const assetManage = r => require.ensure([], () => r(require('@/components/page/assetManage/assetManage.vue')), 'assetManage')
const routerarr = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    redirect: '/manage/group',
    children: [
      {
        path: 'group',
        component: group
      },
      {
        path: 'role',
        component: role
      },
      {
        path: 'agencylist',
        component: AgencyList
      },
      {
        path: 'rolelist',
        component: RoleList
      },
      {
        path: 'roleadd',
        component: RoleAdd
      },
      {
        path: 'assetmanage',
        component: assetManage
      }
    ]
  },
  { path: '*', component: login }
]
const router = new Router({ mode: 'history', base: process.env.BASE_URL, routes: routerarr })
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // // 判断该路由是否需要登录权限
    // if (localStorage.getItem('token')) {
    //   // 通过vuex state获取当前的token是否存在
    //   next()
    // } else {
    //   next({
    //     path: '/login',
    //     query: {
    //       redirect: to.fullPath
    //     }
    //     // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //   })
    // }
  } else {
    next()
  }
})
export default router
