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
      name: '404',
      displayName: 'menu.404',
      meta: {
        icon: 'vuestic-iconset-files',
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
