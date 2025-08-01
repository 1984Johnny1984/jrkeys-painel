<template>
  <div class="historico">
    <h2>Histórico de Sinais</h2>
    <ul>
      <li v-for="item in lista" :key="item.id">
        {{ item.horario }} - {{ item.par }} - 
        {{ item.direcao }} - {{ item.resultado }} 
        <span v-if="item.gale">({{ item.gale }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Historico',
  props: {
    lista: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.historico {
  margin-top: 20px;
  padding: 10px;
  background-color: #111318;
  border-radius: 6px;
}
li {
  padding: 4px 0;
}
</style>
