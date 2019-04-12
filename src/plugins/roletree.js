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
        menuName: '权限管理',
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
    menuName: '设备管理',
    menuUrl: '234324324443',
    auth: 'assetset',
    icon: 'icon iconfont iconshebei2',
    level: 1,
    childMenus: [
      {
        menuName: '设备录入',
        menuUrl: '/page/assetmanage',
        auth: 'assetmanage',
        level: 2,
        childMenus: []
      }, {
        menuName: '设备监测',
        menuUrl: '/page/assetRun',
        auth: 'assetRun',
        level: 2,
        childMenus: []
      }, {
        menuName: '设备维修',
        menuUrl: '/page/assetfailure',
        auth: 'assetfailure',
        level: 2,
        childMenus: []
      }, {
        menuName: '设备保养',
        menuUrl: '/page/maintenanceMain',
        auth: 'maintenanceMain',
        level: 2,
        childMenus: []
      }, {
        menuName: '设备质控',
        menuUrl: '/page/maintenanceQa',
        auth: 'maintenanceQa',
        level: 2,
        childMenus: []
      }, {
        menuName: '不良事件/投诉',
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
        menuName: '物联网络配置',
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
