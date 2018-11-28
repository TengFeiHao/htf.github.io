export const routers = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: resolve => require(['../pages/container/Container.vue'], resolve),
    children: [
      {
        name: 'home',
        path: '/home',
        component: resolve => require(['../pages/home/Home.vue'], resolve),
        meta: {
          title: '首页',
          path: '/home'
        }
      },
      {
        name: 'operatorInforMg',
        path: '/operatorInforMg',
        component: resolve => require(['../pages/operatorInforMg/OperatorInforMg.vue'], resolve),
        meta: {
          list: '权限管理',
          title: '操作员信息管理',
          path: '/operatorInforMg'
        }
      },
      {
        name: 'operatorRoleMg',
        path: '/operatorRoleMg',
        component: resolve => require(['../pages/operatorRoleMg/OperatorRoleMg.vue'], resolve),
        meta: {
          list: '权限管理',
          title: '操作员角色管理',
          path: '/operatorRoleMg'
        }
      },
      {
        name: 'memberInforMg',
        path: '/memberInforMg',
        component: resolve => require(['../pages/memberInforMg/MemberInforMg.vue'], resolve),
        meta: {
          list: '会员管理',
          title: '会员信息管理',
          path: '/memberInforMg'
        }
      },
      {
        name: 'memberScoreMg',
        path: '/memberScoreMg',
        component: resolve => require(['../pages/memberScoreMg/MemberScoreMg.vue'], resolve),
        meta: {
          list: '会员管理',
          title: '会员积分管理',
          path: '/memberScoreMg'
        }
      },
      {
        name: 'memberLevelMg',
        path: '/memberLevelMg',
        component: resolve => require(['../pages/memberLevelMg/MemberLevelMg.vue'], resolve),
        meta: {
          list: '会员管理',
          title: '会员等级管理',
          path: '/memberLevelMg'
        }
      },
      {
        name: 'memberEquityMg',
        path: '/memberEquityMg',
        component: resolve => require(['../pages/memberEquityMg/MemberEquityMg.vue'], resolve),
        meta: {
          list: '会员管理',
          title: '会员权益管理',
          path: '/memberEquityMg'
        }
      },
      {
        name: 'carouselMg',
        path: '/carouselMg',
        component: resolve => require(['../pages/carouselMg/CarouselMg.vue'], resolve),
        meta: {
          list: '基础管理',
          title: '轮播图片管理',
          path: '/carouselMg'
        }
      },
      {
        name: 'productDictionaryMg',
        path: '/productDictionaryMg',
        component: resolve => require(['../pages/productDictionaryMg/ProductDictionaryMg.vue'], resolve),
        meta: {
          list: '产品管理',
          title: '产品字典管理',
          path: '/productDictionaryMg'
        }
      },
      {
        name: 'productUpperMg',
        path: '/productUpperMg',
        component: resolve => require(['../pages/productUpperMg/ProductUpperMg.vue'], resolve),
        meta: {
          list: '产品管理',
          title: '产品上架管理',
          path: '/productUpperMg'
        }
      },
      {
        name: 'logisticsSetUp',
        path: '/logisticsSetUp',
        component: resolve => require(['../pages/logisticsSetUp/LogisticsSetUp.vue'], resolve),
        meta: {
          list: '物流管理',
          title: '物流设置',
          path: '/logisticsSetUp'
        }
      },
      {
        name: 'transactionMg',
        path: '/transactionMg',
        component: resolve => require(['../pages/transactionMg/TransactionMg.vue'], resolve),
        meta: {
          list: '订单管理',
          title: '交易管理',
          path: '/operatorRoleMg'
        }
      },
      {
        name: 'refundMg',
        path: '/refundMg',
        component: resolve => require(['../pages/refundMg/RefundMg.vue'], resolve),
        meta: {
          list: '订单管理',
          title: '退款管理',
          path: '/refundMg'
        }
      },
      {
        name: 'errorMg',
        path: '/errorMg',
        component: resolve => require(['../pages/errorMg/ErrorMg.vue'], resolve),
        meta: {
          title: '差错管理',
          path: '/errorMg'
        }
      },
      {
        name: 'settlementMg',
        path: '/settlementMg',
        component: resolve => require(['../pages/settlementMg/SettlementMg.vue'], resolve),
        meta: {
          title: '结算管理',
          path: '/settlementMg'
        }
      },
      {
        name: 'searchMg',
        path: '/searchMg',
        component: resolve => require(['../pages/searchMg/SearchMg.vue'], resolve),
        meta: {
          list: '综合管理',
          title: '搜索管理',
          path: '/searchMg'
        }
      },
      {
        name: 'wishingMg',
        path: '/wishingMg',
        component: resolve => require(['../pages/wishingMg/WishingMg.vue'], resolve),
        meta: {
          title: '许愿管理',
          path: '/wishingMg'
        }
      },
      {
        name: 'marketingMg',
        path: '/marketingMg',
        component: resolve => require(['../pages/marketingMg/MarketingMg.vue'], resolve),
        meta: {
          title: '营销管理',
          path: '/marketingMg'
        }
      }]
  },
  {
    path: '/locking',
    name: 'locking',
    component: resolve => require(['../pages/locking/LockPage.vue'], resolve)
  }
]
