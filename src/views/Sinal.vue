<template>
  <div class="painel-container">
    <h1>Painel JR KEYS Online ✅</h1>

    <section class="sinais">
      <h2>Sinais Atuais</h2>
      <ul>
        <li v-for="(sinal, index) in sinais" :key="index">
          <strong>{{ sinal.par }}</strong> - {{ sinal.tipo }} - {{ sinal.horario }}
        </li>
      </ul>
    </section>

    <section class="historico">
      <h2>Histórico de Sinais</h2>
      <ul>
        <li v-for="(item, index) in historico" :key="index">
          <strong>{{ item.par }}</strong> - {{ item.tipo }} - {{ item.horario }} - {{ item.resultado }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estado dos sinais
const sinais = ref([])
const historico = ref([])

onMounted(() => {
  // Simulação de sinais (você pode substituir por integração real depois)
  sinais.value = [
    { par: 'EUR/USD', tipo: 'CALL', horario: '21:40' },
    { par: 'GBP/USD', tipo: 'PUT', horario: '21:45' }
  ]

  historico.value = [
    { par: 'EUR/USD', tipo: 'CALL', horario: '21:30', resultado: 'WIN' },
    { par: 'GBP/USD', tipo: 'PUT', horario: '21:25', resultado: 'LOSS' }
  ]
})
</script>

<style scoped>
.painel-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.sinais, .historico {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
