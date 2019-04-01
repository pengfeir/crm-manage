var menuArr = [
  {
    menuName: '机构设置',
    menuUrl: '1',
    auth: 'orgset',
    childMenus: [
      {
        menuName: '账号管理',
        menuUrl: '/page/userslist',
        auth: 'userslist',
        childMenus: []
      }, {
        menuName: '角色管理',
        menuUrl: '/page/rolelist',
        auth: 'rolelist',
        childMenus: []
      }, {
        menuName: '机构设置',
        menuUrl: '/page/agencylist',
        auth: 'agencylist',
        childMenus: []
      }
    ]
  }, {
    menuName: '资产管理',
    menuUrl: '234324324443',
    auth: 'assetset',
    childMenus: [
      {
        menuName: '资产',
        menuUrl: '/page/assetmanage',
        auth: 'assetmanage',
        childMenus: []
      }, {
        menuName: '资产运行管理',
        menuUrl: '/page/assetRun',
        auth: 'assetRun',
        childMenus: []
      }, {
        menuName: '资产故障',
        menuUrl: '/page/assetfailure',
        auth: 'assetfailure',
        childMenus: []
      }, {
        menuName: '保养',
        menuUrl: '/page/maintenanceMain',
        auth: 'maintenanceMain',
        childMenus: []
      }, {
        menuName: '质控',
        menuUrl: '/page/maintenanceQa',
        auth: 'maintenanceQa',
        childMenus: []
      }, {
        menuName: '投诉',
        menuUrl: '/page/complaint',
        auth: 'complaint',
        childMenus: []
      }
    ]
  }, {
    menuName: '物联管理',
    menuUrl: '21312312',
    auth: 'thingsset',
    childMenus: [
      {
        menuName: '房间管理',
        menuUrl: '/page/house',
        auth: 'house',
        childMenus: []
      }, {
        menuName: '物联设备管理',
        menuUrl: '/page/device',
        auth: 'device',
        childMenus: []
      }
    ]
  }
]
export default menuArr
