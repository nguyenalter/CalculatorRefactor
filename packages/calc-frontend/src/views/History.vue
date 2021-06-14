<template>
  <HistoryTable :historyData="historyData" />
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
    this.historyData = (
      JSON.parse(localStorage.getItem("history")) || []
    ).reverse();
  },
};
</script>
