<template>
  <div class="app">
    <h1>Sinais em Tempo Real</h1>
    <div v-if="sinais.length === 0">
      <p style="color: white;">Nenhum sinal encontrado.</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Horário</th>
          <th>Par</th>
          <th>Direção</th>
          <th>Estratégia</th>
          <th>Extra</th>
          <th>Gale</th>
          <th>RSI</th>
          <th>Tendência</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sinal, index) in sinais" :key="index">
          <td>{{ formatarHorario(sinal.horario) }}</td>
          <td>{{ sinal.par }}</td>
          <td>{{ sinal.direcao || '-' }}</td>
          <td>{{ sinal.estrategia }}</td>
          <td>{{ sinal.extrategia || '-' }}</td>
          <td>{{ sinal.gale }}</td>
          <td>{{ sinal.rsi || '-' }}</td>
          <td>{{ sinal.tendencia || '-' }}</td>
          <td :style="{ color: sinal.resultado === 'WIN' ? 'lime' : 'red' }">
            {{ sinal.resultado || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const sinais = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('sinais')
    .select('*')
    .order('id', { ascending: false })
    .limit(5)

  if (data) sinais.value = data

  supabase
    .channel('public:sinais')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'sinais' }, payload => {
      sinais.value.unshift(payload.new)
      if (sinais.value.length > 5) sinais.value.pop()
    })
    .subscribe()
})

function formatarHorario(unix) {
  if (!unix) return '-'
  const date = new Date(parseInt(unix) * 1000)
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style>
body {
  background-color: #111;
  color: white;
  font-family: Arial, sans-serif;
}
.app {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: #222;
}
th, td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #333;
}
th {
  background: #111;
  color: #0ff;
}
</style>
