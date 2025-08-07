template>
  <div id="app" style="text-align: center; padding: 2rem;">
    <h1>Painel JR KEYS Online!</h1>

    <div v-if="loading">🔄 Carregando sinais...</div>

    <div v-else-if="sinais.length === 0">⚠️ Nenhum sinal encontrado.</div>

    <div v-else>
      <table border="1" cellpadding="10" style="margin: auto;">
        <thead>
          <tr>
            <th>⏱️ Horário</th>
            <th>📉 Par</th>
            <th>🎯 Direção</th>
            <th>📊 Estratégia</th>
            <th>✅ Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sinal in sinais" :key="sinal.id">
            <td>{{ formatarHorario(sinal.horario) }}</td>
            <td>{{ sinal.par }}</td>
            <td>{{ sinal.direcao }}</td>
            <td>{{ sinal.estrategia }}</td>
            <td>{{ sinal.resultado || '⏳' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase.js'

const sinais = ref([])
const loading = ref(true)

const carregarSinais = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('sinais')
    .select('*')
    .order('horario', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Erro ao carregar sinais:', error)
  } else {
    sinais.value = data
  }
  loading.value = false
}

const formatarHorario = (horario) => {
  try {
    const data = new Date(horario)
    return data.toLocaleTimeString('pt-BR')
  } catch {
    return horario
  }
}

onMounted(() => {
  carregarSinais()

  // Atualização em tempo real
  supabase
    .channel('sinais-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'sinais' }, () => {
      carregarSinais()
    })
    .subscribe()
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
