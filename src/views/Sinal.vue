<template>
  <div class="painel">
    <h1>Painel JR KEYS Online ✅</h1>

    <!-- Lista de sinais -->
    <div v-if="sinais.length">
      <div v-for="(sinal, index) in sinais" :key="index" class="sinal">
        <strong>{{ sinal.par }}</strong> - {{ sinal.tipo }} - {{ sinal.horario }}
      </div>
    </div>

    <div v-else>
      <p>Carregando sinais...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sinais = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://jrkeys-painel.vercel.app/sinais.json')
    sinais.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar sinais:', error)
  }
})
</script>

<style scoped>
.painel {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #111827;
  color: white;
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: #00aaff;
}

.sinal {
  padding: 10px;
  border-bottom: 1px solid #333;
}
</style>
