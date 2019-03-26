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
          }, {
            menuName: '角色管理',
            menuUrl: '/manage/rolelist',
            auth: 'dddd',
            childMenus: []
          }
        ]
      }, {
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
  }, {
    menuName: '资产管理',
    menuUrl: '234324324443',
    auth: 'ffff',
    childMenus: [
      {
        menuName: '资产',
        menuUrl: '/manage/assetmanage',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '资产运行管理',
        menuUrl: '/manage/assetRun',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '资产故障',
        menuUrl: '/manage/assetfailure',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '保养质检',
        menuUrl: '/manage/maintenance',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '投诉',
        menuUrl: '/manage/complaint',
        auth: 'bbbb',
        childMenus: []
      }
    ]
  }, {
    menuName: '物联管理',
    menuUrl: '21312312',
    auth: 'ffff',
    childMenus: [
      {
        menuName: '房间管理',
        menuUrl: '/manage/house',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '物联设备管理',
        menuUrl: '/manage/device',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '物联设备和房间管理',
        menuUrl: '/manage/deviceAndHouse',
        auth: 'bbbb',
        childMenus: []
      }, {
        menuName: '物联设备和资产管理',
        menuUrl: '/manage/deviceAndAsset',
        auth: 'bbbb',
        childMenus: []
      }
    ]
  }
]
export default a
