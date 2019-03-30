var menuArr = [
  {
    menuName: '机构设置',
    menuUrl: '1',
    auth: 'aaaa',
    childMenus: [
      {
        menuName: '账号管理',
        menuUrl: '/page/userslist',
        auth: 'cccc',
        childMenus: []
      }, {
        menuName: '角色管理',
        menuUrl: '/page/rolelist',
        auth: 'dddd',
        childMenus: []
      }, {
        menuName: '机构设置',
        menuUrl: '/page/agencylist',
        auth: 'eeee',
        childMenus: []
      }
    ]
  }, {
    menuName: '资产管理',
    menuUrl: '234324324443',
    auth: 'ffff',
    childMenus: [
      {
        menuName: '资产',
        menuUrl: '/page/assetmanage',
        auth: 'aawer',
        childMenus: []
      }, {
        menuName: '资产运行管理',
        menuUrl: '/page/assetRun',
        auth: 'erty',
        childMenus: []
      }, {
        menuName: '资产故障',
        menuUrl: '/page/assetfailure',
        auth: 'wwq2',
        childMenus: []
      }, {
        menuName: '保养',
        menuUrl: '/page/maintenanceMain',
        auth: 'erth',
        childMenus: []
      },{
        menuName: '质控',
        menuUrl: '/page/maintenanceQa',
        auth: 'erthwer',
        childMenus: []
      }, {
        menuName: '投诉',
        menuUrl: '/page/complaint',
        auth: 'bbbrert',
        childMenus: []
      }
    ]
  }, {
    menuName: '物联管理',
    menuUrl: '21312312',
    auth: 'ewrr22',
    childMenus: [
      {
        menuName: '房间管理',
        menuUrl: '/page/house',
        auth: 'vvbrty',
        childMenus: []
      }, {
        menuName: '物联设备管理',
        menuUrl: '/page/device',
        auth: 'wawerrt',
        childMenus: []
      }
    ]
  }
]
export default menuArr
