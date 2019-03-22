const login = r => require.ensure([], () => r(require('@/components/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/components/manage')), 'manage')
const group = r => require.ensure([], () => r(require('@/views/group')), 'group')
const role = r => require.ensure([], () => r(require('@/views/role')), 'role')
const routerArr = [
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
      } ]
  },
  { path: '*', component: login }
]
export default routerArr