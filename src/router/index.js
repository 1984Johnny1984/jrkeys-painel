import { createRouter, createWebHistory } from 'vue-router'

// Importa as views
const Login = () => import('../views/Login.vue')
const Sinal = () => import('../views/Sinal.vue')

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'home', component: Sinal } // Home agora é o painel de sinais
]

const router = createRouter({
  history: createWebHistory(),
  routes
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
