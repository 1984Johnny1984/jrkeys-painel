import { createRouter, createWebHistory } from 'vue-router'

// Lazy load das views
const Home = () => import('../App.vue')
const Login = () => import('../views/Login.vue')

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'home', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('auth') === 'ok'
  if (to.name !== 'login' && !isAuth) {
    return next({ name: 'login' })
  }
  next()
})

export default router
