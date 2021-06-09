<template>
  <div class="history mx-5">
    <p class="font-bold text-4xl text-center my-5">Calculation History</p>
    <HistoryTable :historyData="historyData" />
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable.vue";

export default {
  components: {
    HistoryTable,
  },
  data() {
    return {
      historyData: [],
    };
  },
  mounted() {
    // await fetch
    // TODO - fetch history if signed in
    // local storage
    this.historyData = JSON.parse(localStorage.getItem("history")) || [];
  },
};
</script>
