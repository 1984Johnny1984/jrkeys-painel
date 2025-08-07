<template>
  <div class="container">
    <h1>Painel JR KEYS Online ✅</h1>
    <ul>
      <li v-for="sinal in sinais" :key="sinal.id">
        <strong>{{ sinal.par }}</strong> - {{ sinal.direcao }} - {{ sinal.estrategia }} - {{ sinal.horario }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const sinais = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('sinais')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Erro ao carregar sinais:', error)
  } else {
    sinais.value = data
  }
})
</script>

<style>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
}
h1 {
  color: #007bff;
}
li {
  margin-bottom: 10px;
  font-size: 16px;
  list-style: none;
}
</style>
