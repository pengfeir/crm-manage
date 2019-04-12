import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const page = r => require.ensure([], () => r(require('@/components/manage')), 'manage')
const Home = r => require.ensure([], () => r(require('@/components/page/home.vue')), 'home')
const AgencyList = r => require.ensure([], () => r(require('@/components/page/mechanism/agencylist.vue')), 'agencylist')
const AgencyAdd = r => require.ensure([], () => r(require('@/components/page/mechanism/agencyadd.vue')), 'agencyadd')
const RoleList = r => require.ensure([], () => r(require('@/components/page/mechanism/rolelist.vue')), 'rolelist')
const RoleAdd = r => require.ensure([], () => r(require('@/components/page/mechanism/roleadd.vue')), 'roleadd')
const UserList = r => require.ensure([], () => r(require('@/components/page/mechanism/userslist.vue')), 'userslist')
const UserAdd = r => require.ensure([], () => r(require('@/components/page/mechanism/usersadd.vue')), 'usersadd')
const assetManage = r => require.ensure([], () => r(require('@/components/page/assetManage/device/assetManage.vue')), 'assetManage')
const assetManageAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/device/assetmanageadd.vue')), 'assetmanage')

const assetFailure = r => require.ensure([], () => r(require('@/components/page/assetManage/fault/assetFailure.vue')), 'assetFailure')
const assetFailurAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/fault/assetfailureadd.vue')), 'assetFailureadd')
const maintenanceQa = r => require.ensure([], () => r(require('@/components/page/assetManage/maintain/maintenanceqa.vue')), 'maintenanceqa')
const maintenanceQaAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/maintain/maintenanceqaadd.vue')), 'maintenanceqaadd')
const maintenanceMain = r => require.ensure([], () => r(require('@/components/page/assetManage/maintain/maintenancemain.vue')), 'maintenancemain')
const maintenanceMainAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/maintain/maintenancemainadd.vue')), 'maintenancemain')
const complaint = r => require.ensure([], () => r(require('@/components/page/assetManage/complaint/complaint.vue')), 'complaint')
const complaintAdd = r => require.ensure([], () => r(require('@/components/page/assetManage/complaint/complaintadd.vue')), 'complaintadd')
const assetRun = r => require.ensure([], () => r(require('@/components/page/assetManage/assetrun/assetRun.vue')), 'assetRun')
const assetRunEcharts = r => require.ensure([], () => r(require('@/components/page/assetManage/assetrun/assetecharts.vue')), 'assetecharts')
const device = r => require.ensure([], () => r(require('@/components/page/device/device.vue')), 'device')
const deviceAdd = r => require.ensure([], () => r(require('@/components/page/device/deviceAdd.vue')), 'deviceAdd')
const houseAdd = r => require.ensure([], () => r(require('@/components/page/device/houseAdd.vue')), 'houseAdd')
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
    redirect: '/page/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'agencylist',
        component: AgencyList,
        meta: {
          name: '机构设置'
        }
      },
      {
        path: 'agencyadd',
        component: AgencyAdd,
        meta: {
          name: '机构设置'
        }
      },
      {
        path: 'rolelist',
        component: RoleList,
        meta: {
          name: '权限管理'
        }
      },
      {
        path: 'roleadd',
        component: RoleAdd,
        meta: {
          name: '权限管理'
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
        path: 'useradd',
        component: UserAdd,
        meta: {
          name: '账号管理'
        }
      },
      {
        path: 'assetmanage',
        component: assetManage,
        meta: {
          name: '设备录入'
        }
      },
      {
        path: 'assetmanageadd',
        component: assetManageAdd,
        meta: {
          name: '设备录入'
        }
      },
      {
        path: 'assetfailure',
        component: assetFailure,
        meta: {
          name: '设备维修'
        }
      },
      {
        path: 'assetfailuradd',
        component: assetFailurAdd,
        meta: {
          name: '设备维修'
        }
      },
      {
        path: 'assetRun',
        component: assetRun,
        meta: {
          name: '设备监测'
        }
      },
      {
        path: 'assetRunSee',
        component: assetRunEcharts,
        meta: {
          name: '设备监测'
        }
      },
      {
        path: 'maintenanceMain',
        component: maintenanceMain,
        meta: {
          name: '设备保养'
        }
      },
      {
        path: 'maintenanceMainadd',
        component: maintenanceMainAdd,
        meta: {
          name: '设备保养'
        }
      },
      {
        path: 'maintenanceQa',
        component: maintenanceQa,
        meta: {
          name: '设备质控'
        }
      },
      {
        path: 'maintenanceQaAdd',
        component: maintenanceQaAdd,
        meta: {
          name: '设备质控'
        }
      },
      {
        path: 'complaint',
        component: complaint,
        meta: {
          name: '不良事件/投诉'
        }
      },
      {
        path: 'complaintadd',
        component: complaintAdd,
        meta: {
          name: '不良事件/投诉'
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
        path: 'deviceAdd',
        component: deviceAdd,
        meta: {
          name: '物联设备管理'
        }
      },
      {
        path: 'houseAdd',
        component: houseAdd,
        meta: {
          name: '物联网络配置'
        }
      },
      {
        path: 'house',
        component: house,
        meta: {
          name: '物联网络配置'
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
