import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Sinal from '../components/Sinal.vue'
import Historico from '../components/Historico.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/painel',
    name: 'Painel',
    component: Sinal,
    meta: { requiresAuth: true }
  },
  {
    path: '/historico',
    name: 'Histórico',
    component: Historico,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção das rotas
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('auth') === 'true'

  if (to.meta.requiresAuth && !isAuth) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
