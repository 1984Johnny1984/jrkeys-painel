import { createRouter, createWebHistory } from 'vue-router'

// Páginas
import Sinal from '../components/Sinal.vue'      // home
import Historico from '../components/Historico.vue'
import Login from '../views/Login.vue'           // tela de login por código

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'home', component: Sinal },            // 👈 Home = Sinal.vue
  { path: '/historico', name: 'historico', component: Historico },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de autenticação simples (usa localStorage 'auth' = 'ok')
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('auth') === 'ok'
  if (to.name !== 'login' && !isAuth) return next({ name: 'login' })
  next()
})

export default router
