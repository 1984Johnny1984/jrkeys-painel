<template>
  <div class="login">
    <h1>🔐 Acesso ao Painel JR KEYS</h1>

    <form @submit.prevent="entrar">
      <label for="code">Código de acesso</label>
      <input
        id="code"
        v-model="code"
        type="password"
        placeholder="Digite seu código"
        autocomplete="off"
      />

      <button type="submit">Entrar</button>

      <p v-if="erro" class="erro">Código incorreto. Tente novamente.</p>
    </form>

    <p class="dica">Dica: você pode alterar o código dentro deste arquivo (const ACCESS_CODE).</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref('')
const erro = ref(false)

// 🔧 Altere este código para o que você quiser
const ACCESS_CODE = '911549Jo@&$'

function entrar() {
  if (code.value.trim() === ACCESS_CODE) {
    localStorage.setItem('auth', 'ok')
    router.push('/')
  } else {
    erro.value = true
    setTimeout(() => (erro.value = false), 2000)
  }
}
</script>

<style scoped>
.login {
  max-width: 360px;
  margin: 60px auto;
  padding: 24px;
  background: #111;
  border: 1px solid #222;
  border-radius: 10px;
  color: #eee;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
h1 {
  margin: 0 0 16px;
  color: #00d1ff;
  font-size: 20px;
  text-align: center;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #bbb;
}
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #fff;
  outline: none;
}
input:focus { border-color: #00d1ff; }
button {
  width: 100%;
  margin-top: 12px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: #00d1ff;
  color: #001018;
  font-weight: 700;
  cursor: pointer;
}
button:hover { filter: brightness(1.05); }
.erro {
  color: #ff5b5b;
  margin-top: 10px;
  text-align: center;
}
.dica {
  margin-top: 14px;
  font-size: 12px;
  color: #9aa3aa;
  text-align: center;
}
</style>
