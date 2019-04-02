var menuArr = [
  {
    menuName: '机构设置',
    menuUrl: '1',
    icon: 'icon iconfont iconzuzhijigou',
    auth: 'orgset',
    level: 1,
    childMenus: [
      {
        menuName: '账号管理',
        menuUrl: '/page/userslist',
        auth: 'userslist',
        level: 2,
        childMenus: []
      }, {
        menuName: '角色管理',
        menuUrl: '/page/rolelist',
        auth: 'rolelist',
        level: 2,
        childMenus: []
      }, {
        menuName: '机构设置',
        menuUrl: '/page/agencylist',
        auth: 'agencylist',
        level: 2,
        childMenus: []
      }
    ]
  }, {
    menuName: '资产管理',
    menuUrl: '234324324443',
    auth: 'assetset',
    icon: 'icon iconfont iconshebei2',
    level: 1,
    childMenus: [
      {
        menuName: '资产',
        menuUrl: '/page/assetmanage',
        auth: 'assetmanage',
        level: 2,
        childMenus: []
      }, {
        menuName: '资产运行管理',
        menuUrl: '/page/assetRun',
        auth: 'assetRun',
        level: 2,
        childMenus: []
      }, {
        menuName: '资产故障',
        menuUrl: '/page/assetfailure',
        auth: 'assetfailure',
        level: 2,
        childMenus: []
      }, {
        menuName: '保养',
        menuUrl: '/page/maintenanceMain',
        auth: 'maintenanceMain',
        level: 2,
        childMenus: []
      }, {
        menuName: '质控',
        menuUrl: '/page/maintenanceQa',
        auth: 'maintenanceQa',
        level: 2,
        childMenus: []
      }, {
        menuName: '投诉',
        menuUrl: '/page/complaint',
        level: 2,
        auth: 'complaint',
        childMenus: []
      }
    ]
  }, {
    menuName: '物联管理',
    menuUrl: '21312312',
    auth: 'thingsset',
    icon: 'icon iconfont iconshebei4',
    level: 1,
    childMenus: [
      {
        menuName: '房间管理',
        menuUrl: '/page/house',
        auth: 'house',
        level: 2,
        childMenus: []
      }, {
        menuName: '物联设备管理',
        menuUrl: '/page/device',
        auth: 'device',
        level: 2,
        childMenus: []
      }
    ]
  }
]
export default menuArr
