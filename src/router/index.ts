import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import RouteViewComponent from '../layouts/RouterBypass.vue'
import { useUserStore } from '../stores/user-store'
import { routes } from './routes'
// // complete routing table
// const routes: Array<RouteRecordRaw> = [
// 	{
// 		path: '/:pathMatch(.*)*',
// 		redirect: { name: 'dashboard' },
// 	},
// 	{
// 		name: 'admin',
// 		path: '/',
// 		component: AppLayout,
// 		redirect: { name: 'dashboard' },
// 		children: [
// 			{
// 				name: 'dashboard',
// 				path: 'dashboard',
// 				component: () => import('../pages/admin/dashboard/Dashboard.vue'),
// 			},
// 			{
// 				name: 'datasets',
// 				path: 'datasets',
// 				component: () => import('../pages/datasets/DatasetPage.vue'),
// 			},
// 			{
// 				name: 'detection',
// 				path: 'detection',
// 				component: () => import('../pages/detection/DetectionPage.vue'),
// 			},
// 			{
// 				name: 'detect',
// 				path: 'detect',
// 				component: () => import('../pages/detection/DetectPage.vue'),
// 				meta: {
// 					roles: ["guest"]
// 				}
// 			},
// 			{
// 				name: 'history',
// 				path: 'history',
// 				component: () => import('../pages/history/HistoryPage.vue'),
// 			},
// 			{
// 				name: 'tokenization',
// 				path: 'tokenization',
// 				component: () => import('../pages/tokenization/TokenizationPage.vue'),
// 			},
// 			{
// 				name: 'training',
// 				path: 'training',
// 				component: () => import('../pages/training/TrainingPage.vue'),
// 			},
// 			{
// 				name: 'settings',
// 				path: 'settings',
// 				component: () => import('../pages/settings/Settings.vue'),
// 			},
// 			{
// 				name: 'preferences',
// 				path: 'preferences',
// 				component: () => import('../pages/preferences/Preferences.vue'),
// 			},
// 			{
// 				name: 'users',
// 				path: 'users',
// 				component: () => import('../pages/users/UsersPage.vue'),
// 			},
// 			{
// 				name: 'projects',
// 				path: 'projects',
// 				component: () => import('../pages/projects/ProjectsPage.vue'),
// 			},
// 			{
// 				name: 'payments',
// 				path: '/payments',
// 				component: RouteViewComponent,
// 				children: [
// 					{
// 						name: 'payment-methods',
// 						path: 'payment-methods',
// 						component: () => import('../pages/payments/PaymentsPage.vue'),
// 					},
// 					{
// 						name: 'billing',
// 						path: 'billing',
// 						component: () => import('../pages/billing/BillingPage.vue'),
// 					},
// 					{
// 						name: 'pricing-plans',
// 						path: 'pricing-plans',
// 						component: () => import('../pages/pricing-plans/PricingPlans.vue'),
// 					},
// 				],
// 			},
// 			{
// 				name: 'faq',
// 				path: '/faq',
// 				component: () => import('../pages/faq/FaqPage.vue'),
// 			},
// 		],
// 	},
// 	{
// 		path: '/auth',
// 		component: AuthLayout,
// 		children: [
// 			{
// 				name: 'login',
// 				path: 'login',
// 				component: () => import('../pages/auth/Login.vue'),
// 			},
// 			{
// 				name: 'signup',
// 				path: 'signup',
// 				component: () => import('../pages/auth/Signup.vue'),
// 			},
// 			{
// 				name: 'recover-password',
// 				path: 'recover-password',
// 				component: () => import('../pages/auth/RecoverPassword.vue'),
// 			},
// 			{
// 				name: 'recover-password-email',
// 				path: 'recover-password-email',
// 				component: () => import('../pages/auth/CheckTheEmail.vue'),
// 			},
// 			{
// 				path: '',
// 				redirect: { name: 'login' },
// 			},
// 		],
// 	},
// 	{
// 		name: '404',
// 		path: '/404',
// 		component: () => import('../pages/404.vue'),
// 	},
// ]

// const get_user_routes = (store) => {
// 	let accessedRoutes = [];
// 	routes.forEach(route => {
// 		if (route.meta.roles.some((role: string) => store.state.roles.includes(role))) {
// 			accessedRoutes.push(route);
// 		}
// 	});
// };

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes: routes,
})

export default router
