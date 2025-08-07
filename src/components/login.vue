<template>
  <div class="login-container">
    <h1>Painel JR KEYS</h1>
    <div class="form-group">
      <input v-model="username" type="text" placeholder="Usuário" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button @click="login">Entrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  if (username.value === 'admin' && password.value === '911549Jo@&$') {
    localStorage.setItem('auth', 'true')
    router.push('/painel')
  } else {
    error.value = 'Usuário ou senha inválidos'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
