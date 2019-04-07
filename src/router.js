import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const page = r => require.ensure([], () => r(require('@/components/manage')), 'manage')
const group = r => require.ensure([], () => r(require('@/views/group')), 'group')
const role = r => require.ensure([], () => r(require('@/views/role')), 'role')
const AgencyList = r => require.ensure([], () => r(require('@/components/page/mechanism/agencylist.vue')), 'agencylist')
const RoleList = r => require.ensure([], () => r(require('@/components/page/mechanism/rolelist.vue')), 'rolelist')
const UserList = r => require.ensure([], () => r(require('@/components/page/mechanism/userslist.vue')), 'userslist')
const assetManage = r => require.ensure([], () => r(require('@/components/page/assetManage/device/assetManage.vue')), 'assetManage')
const assetManageAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/device/assetmanageadd.vue')), 'assetmanage')

const assetFailure = r => require.ensure([], () => r(require('@/components/page/assetManage/fault/assetFailure.vue')), 'assetFailure')
const assetFailurAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/fault/assetfailureadd.vue')), 'assetFailureadd')
const maintenanceQa = r => require.ensure([], () => r(require('@/components/page/assetManage/maintenanceqa.vue')), 'maintenanceqa')
const maintenanceMain = r => require.ensure([], () => r(require('@/components/page/assetManage/maintenancemain.vue')), 'maintenancemain')
const complaint = r => require.ensure([], () => r(require('@/components/page/assetManage/complaint.vue')), 'complaint')
const assetRun = r => require.ensure([], () => r(require('@/components/page/assetManage/assetRun.vue')), 'assetRun')
const device = r => require.ensure([], () => r(require('@/components/page/device/device.vue')), 'device')
const house = r => require.ensure([], () => r(require('@/components/page/device/house.vue')), 'house')
const routerarr = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/page',
    component: page,
    name: '',
    redirect: '/page/group',
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
        component: AgencyList,
        meta: {
          name: '机构设置'
        }
      },
      {
        path: 'rolelist',
        component: RoleList,
        meta: {
          name: '角色管理'
        }
      },
      {
        path: 'userslist',
        component: UserList,
        meta: {
          name: '账号管理'
        }
      },
      {
        path: 'assetmanage',
        component: assetManage,
        meta: {
          name: '设备'
        }
      },
      {
        path: 'assetmanageadd',
        component: assetManageAdd,
        meta: {
          name: '设备'
        }
      },
      {
        path: 'assetfailure',
        component: assetFailure,
        meta: {
          name: '设备故障'
        }
      },
      {
        path: 'assetfailuradd',
        component: assetFailurAdd,
        meta: {
          name: '设备故障'
        }
      },
      {
        path: 'assetRun',
        component: assetRun,
        meta: {
          name: '设备运行管理'
        }
      },
      {
        path: 'maintenanceMain',
        component: maintenanceMain,
        meta: {
          name: '保养'
        }
      },
      {
        path: 'maintenanceQa',
        component: maintenanceQa,
        meta: {
          name: '质控'
        }
      },
      {
        path: 'complaint',
        component: complaint,
        meta: {
          name: '投诉'
        }
      },
      {
        path: 'device',
        component: device,
        meta: {
          name: '物联设备管理'
        }
      },
      {
        path: 'house',
        component: house,
        meta: {
          name: '房间管理'
        }
      }
    ]
  },
  { path: '*', component: login }
]
const router = new Router({ mode: 'history', base: process.env.BASE_URL, routes: routerarr })
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
