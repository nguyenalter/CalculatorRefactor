<template>
  <div class="history p-2 p-3">
    <h1>This is a history page</h1>
    <HistoryTable :people="people" />
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
      people: [],
    };
  },
  mounted() {
    // await fetch
    this.people = [];
  },
};
</script>
