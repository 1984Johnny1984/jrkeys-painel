import { createRouter, createWebHistory } from 'vue-router'

// Importa as views
import Login from '../views/Login.vue'
import Sinal from '../views/Sinal.vue'

// Define as rotas
const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'home', component: Sinal }
]

// Cria o roteador
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
