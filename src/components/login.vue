<template>
  <div class="login-container">
    <h1>Painel JR KEYS</h1>
    <input v-model="email" placeholder="Usuário" />
    <input v-model="senha" placeholder="Senha" type="password" />
    <button @click="fazerLogin">Entrar</button>
    <p v-if="erro" class="erro">{{ erro }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()

const fazerLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: senha.value
  })

  if (error) {
    erro.value = 'Usuário ou senha inválidos.'
  } else {
    localStorage.setItem('usuarioLogado', 'true')
    router.push('/sinal')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
}
input {
  padding: 10px;
  font-size: 16px;
}
button {
  padding: 10px;
  font-size: 16px;
  background-color: #00aaff;
  color: white;
  border: none;
  cursor: pointer;
}
.erro {
  color: red;
}
</style>
