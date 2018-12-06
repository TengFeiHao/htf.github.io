export default {
  slideBarToggle: false,
  routeMeta: {},
  // 侧边栏
  slideData: [
    {
      icon: 'el-icon-setting',
      index: 'administration',
      title: '权限管理',
      subs: [
        {
          index: 'operatorInforMg',
          title: '操作员信息管理'
        },
        {
          index: 'operatorRoleMg',
          title: '操作员角色管理'
        }
      ]
    },
    {
      icon: 'el-icon-tickets',
      index: 'membershipMg',
      title: '会员管理',
      subs: [
        {
          index: 'memberInforMg',
          title: '会员信息管理'
        },
        {
          index: 'memberLevelMg',
          title: '会员等级管理'
        }
      ]
    },
    {
      icon: 'el-icon-message',
      index: 'basicMg',
      title: '基础管理',
      subs: [
        {
          index: 'carouselMg',
          title: '轮播图片管理'
        }
      ]
    },
    {
      icon: 'el-icon-date',
      index: 'productMg',
      title: '产品管理',
      subs: [
        {
          index: 'productDictionaryMg',
          title: '产品字典管理'
        },
        {
          index: 'productUpperMg',
          title: '产品上架管理'
        }
      ]
    },
    {
      icon: 'el-icon-star-on',
      index: 'logisticsMg',
      title: '物流管理',
      subs: [
        {
          index: 'logisticsSetUp',
          title: '物流设置'
        }
      ]
    },
    {
      icon: 'el-icon-rank',
      index: 'orderMg',
      title: '订单管理',
      subs: [
        {
          index: 'transactionMg',
          title: '交易管理'
        },
        {
          index: 'refundMg',
          title: '退款管理'
        }
      ]
    },
    {
      icon: 'el-icon-warning',
      index: 'errorMg',
      title: '差错管理'
    },
    {
      icon: 'el-icon-error',
      index: 'settlementMg',
      title: '结算管理'
    },
    {
      icon: 'el-icon-error',
      index: 'comprehensiveMg',
      title: '综合管理',
      subs: [
        {
          index: 'searchMg',
          title: '搜索管理'
        },
        {
          index: 'wishingMg',
          title: '许愿管理'
        }
      ]
    },
    {
      icon: 'el-icon-error',
      index: 'marketingMg',
      title: '营销管理'
    }
  ]
}
