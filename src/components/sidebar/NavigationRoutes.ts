export interface INavigationRoute {
  name: string
  displayName: string
  meta: { iconName: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconName: 'dashboard',
      },
    },
    {
      name: 'users',
      displayName: 'menu.users',
      meta: {
        iconName: 'group',
      },
    },
    {
      name: 'datasets',
      displayName: 'menu.datasets',
      meta: {
        iconName: 'dataset',
      },
    },

    {
      name: 'detection',
      displayName: 'menu.detection',
      meta: {
        iconName: 'troubleshoot',
      },
    },
    {
      name: 'history',
      displayName: 'menu.history',
      meta: {
        iconName: 'history',
      },
    },
    {
      name: 'tokenization',
      displayName: 'menu.tokenization',
      meta: {
        iconName: 'token',
      },
    },
    {
      name: 'training',
      displayName: 'menu.training',
      meta: {
        iconName: 'model_training',
      },
    },

    {
      name: 'projects',
      displayName: 'menu.projects',
      meta: {
        icon: 'folder_shared',
      },
    },
    {
      name: 'payments',
      displayName: 'menu.payments',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'payment-methods',
          displayName: 'menu.payment-methods',
        },
        {
          name: 'pricing-plans',
          displayName: 'menu.pricing-plans',
        },
        {
          name: 'billing',
          displayName: 'menu.billing',
        },
      ],
    },
    {
      name: 'auth',
      displayName: 'menu.auth',
      meta: {
        icon: 'login',
      },
      children: [
        {
          name: 'login',
          displayName: 'menu.login',
        },
        {
          name: 'signup',
          displayName: 'menu.signup',
        },
        {
          name: 'recover-password',
          displayName: 'menu.recover-password',
        },
      ],
    },

    {
      name: 'faq',
      displayName: 'menu.faq',
      meta: {
        icon: 'quiz',
      },
    },
    {
      name: '404',
      displayName: 'menu.404',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'preferences',
      displayName: 'menu.preferences',
      meta: {
        icon: 'manage_accounts',
      },
    },
    {
      name: 'settings',
      displayName: 'menu.settings',
      meta: {
        icon: 'settings',
      },
    },
  ] as INavigationRoute[],
}
