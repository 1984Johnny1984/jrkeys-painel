<template>
  <div class="sinal" :class="sinal.direcao.toLowerCase()">
    <strong>{{ sinal.par }}</strong> - 
    {{ sinal.direcao }} às {{ sinal.horario }}
    <br>
    Estratégia: <em>{{ sinal.estrategia }}</em>
    <br>
    Confluência: {{ sinal.porcentagem_confluencia }}%
  </div>
</template>

<script>
export default {
  name: 'Sinal',
  props: {
    sinal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sinal {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #1c1f26;
  box-shadow: 0 0 4px #00bfff44;
}
.call {
  border-left: 5px solid #00ff88;
}
.put {
  border-left: 5px solid #ff3b3b;
}
</style>
