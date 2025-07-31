<template>
  <div class="painel-sinais">
    <h2>Sinais em Tempo Real</h2>
    <ul>
      <li v-for="sinal in sinais" :key="sinal.id">
        <strong>{{ sinal.horario }} - {{ sinal.par }}</strong> → 
        <span :class="sinal.direcao === 'CALL' ? 'call' : 'put'">
          {{ sinal.direcao }}
        </span>
        <small>({{ sinal.estrategia }})</small>
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  name: 'Signals',
  data() {
    return {
      sinais: []
    }
  },
  mounted() {
    this.carregarSinais()

    // WebSocket em tempo real:
    supabase
  .channel('public:sinais')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'sinais' }, () => {
    this.carregarSinais()
  })
  .subscribe()
  },
  methods: {
    async carregarSinais() {
      const { data, error } = await supabase
        .from('sinais')
        .select('*')
        .order('horario', { ascending: false })
        .limit(5)

      if (!error) {
        this.sinais = data
      }
    }
  }
}
</script>

<style scoped>
.painel-sinais {
  margin: 30px;
  padding: 20px;
  background-color: #0d0d0d;
  border-radius: 10px;
  color: #00f0ff;
  font-family: Arial, sans-serif;
}

.call {
  color: #00ff88;
}

.put {
  color: #ff4c4c;
}
</style>
