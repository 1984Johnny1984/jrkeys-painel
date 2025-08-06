<template>
  <div class="container">
    <h1>Painel de Sinais JR KEYS ⚡</h1>

    <table v-if="sinais.length > 0">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Par</th>
          <th>Direção</th>
          <th>Preço</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sinal in sinais" :key="sinal.id">
          <td>{{ formatarHorario(sinal.timestamp) }}</td>
          <td>{{ sinal.par }}</td>
          <td>{{ sinal.direcao }}</td>
          <td>{{ sinal.preco }}</td>
          <td>{{ sinal.resultado || 'Aguardando' }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Nenhum sinal disponível ainda...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const sinais = ref([])

const carregarSinais = async () => {
  const { data, error } = await supabase
    .from('sinais')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(10)

  if (data) sinais.value = data
}

// Atualização em tempo real com Supabase Realtime
onMounted(async () => {
  await carregarSinais()

  supabase
    .channel('sinais-stream')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'sinais' },
      (payload) => {
        sinais.value.unshift(payload.new)
        if (sinais.value.length > 10) sinais.value.pop()
      }
    )
    .subscribe()
})

const formatarHorario = (timestamp) => {
  const data = new Date(timestamp)
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #111;
  color: #fff;
  margin: 0;
  padding: 2rem;
}
.container {
  max-width: 800px;
  margin: auto;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #222;
}
th, td {
  padding: 0.75rem;
  border-bottom: 1px solid #444;
  text-align: center;
}
th {
  background-color: #333;
}
</style>
