<template>
  <div class="app">
    <h1>Sinais em Tempo Real</h1>
    <ul>
      <li v-for="sinal in sinais" :key="sinal.id">
        <strong>{{ sinal.horario }}</strong> -
        <span>{{ sinal.par }}</span> →
        <span>{{ sinal.direcao }}</span> |
        <span>Estratégia: {{ sinal.estrategia }}</span> |
        <span>RSI: {{ sinal.rsi }}</span> |
        <span>Tendência: {{ sinal.tendencia }}</span> |
        <span>Gale: {{ sinal.gale }}</span> |
        <span>Preço: {{ sinal.preco }}</span> |
        <span>Resultado: {{ sinal.resultado }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase.js'

const sinais = ref([])

const carregarSinais = async () => {
  const { data, error } = await supabase
    .from('sinais')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (!error) {
    sinais.value = data
  }
}

onMounted(() => {
  carregarSinais()
  supabase
    .channel('sinais_live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'sinais' }, carregarSinais)
    .subscribe()
})
</script>

<style scoped>
.app {
  font-family: sans-serif;
  padding: 20px;
  background-color: #111;
  color: #0ff;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
