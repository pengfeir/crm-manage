var a = [
  {
    menuName: '机构设置',
    menuUrl: '1',
    auth: 'aaaa',
    childMenus: [
      {
        menuName: '权限管理',
        menuUrl: '1-1',
        auth: 'bbbb',
        childMenus: [
          {
            menuName: '账号管理',
            menuUrl: '/manage/group',
            auth: 'cccc',
            childMenus: []
          },
          {
            menuName: "角色管理",
            menuUrl: "/manage/rolelist",
            auth:'dddd',
            childMenus: []
          }
        ]
      },
      {
        menuName: '机构管理',
        menuUrl: '1-2',
        childMenus: [
          {
            menuName: '机构设置',
            menuUrl: '/manage/agencylist',
            auth: 'eeee',
            childMenus: []
          }
        ]
      }
    ]
  },
  {
    menuName: '资产管理',
    menuUrl: '',
    auth: 'ffff',
    childMenus: [
      {
        menuName: '资产列表',
        menuUrl: '/manage/assetmanage',
        auth: 'bbbb',
        childMenus: [

        ]
      }
    ]
  }
]
export default a
