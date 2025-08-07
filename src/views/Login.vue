<template>
  <div class="login-container">
    <h1>Bem-vindo ao Painel JR KEYS</h1>
    <button @click="entrar">Entrar no Painel</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function entrar() {
  router.push('/painel')
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}
button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
