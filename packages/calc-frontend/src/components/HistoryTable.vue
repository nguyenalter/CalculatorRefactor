<template>
  <div class="container mx-auto grid justify-items-center">
    <div v-if="historyData.length == 0">
      <p class="font-bold text-4xl text-center my-5 text-blue-400">
        No Calculation History
      </p>
    </div>
    <div v-else>
      <p class="font-bold text-4xl text-center my-5 text-blue-400">
        Calculation History
      </p>
      <div class="text-center">
        <button
          @click="deleteAll"
          class="rounded border-2 border-blue-400 bg-red-400"
          v-tooltip="{
            content: 'Delete your history',
            placement: 'left',
            offset: 5,
          }"
        >
          <deleteSVG />
        </button>
        <button
          @click="exportToCSV"
          class="rounded border-2 border-blue-400 bg-green-400"
          v-tooltip="{
            content: 'Export to csv',
            placement: 'right',
            offset: 5,
          }"
        >
          <saveSVG />
        </button>
      </div>

      <p
        class="font-bold text-md text-left my-3 text-red-600"
        v-if="username == ''"
      >
        Sign in to save your history!
      </p>
      <p class="font-bold text-md text-left my-3 text-green-600" v-else>
        Current user: {{ username }}
      </p>
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="table-header-custom">Time</th>
              <th scope="col" class="table-header-custom">first integer</th>
              <th scope="col" class="table-header-custom">operator</th>
              <th scope="col" class="table-header-custom">second integer</th>
              <th scope="col" class="table-header-custom">result</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Replay</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(record, index) in historyData"
              :key="index"
              v-bind:class="{ 'bg-blue-100': index % 2 }"
            >
              <td class="row-custom">
                {{ dayjs(record.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
              </td>
              <td class="row-custom">
                {{ record.firstVal }}
              </td>
              <td class="row-custom">
                {{ record.option }}
              </td>
              <td class="row-custom">
                {{ record.secondVal }}
              </td>
              <td class="row-custom">
                {{ record.result }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  whitespace-nowrap
                  text-right text-sm
                  font-medium
                "
              >
                <a
                  href="javascript:"
                  class="text-indigo-600 hover:text-indigo-900"
                  @click="deleteOneRowFromHistory(record.createdAt)"
                  >Remove</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { exportCSV } from '../services/utils';
import deleteSVG from '../assets/delete.svg';
import saveSVG from '../assets/save.svg';
import '../assets/tooltip.css';

export default {
  name: 'HistoryTable',
  components: {
    deleteSVG,
    saveSVG,
  },
  data() {
    return {
      dayjs,
      exportCSV,
      localHistory: [],
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    historyData() {
      return this.$store.getters.getHistory.concat(this.localHistory).reverse();
    },
  },
  mounted() {
    console.log('mounted run');
    this.localHistory = JSON.parse(localStorage.getItem('history')) || [];
  },
  methods: {
    exportToCSV() {
      exportCSV(this.historyData);
    },
    deleteAll() {
      console.log('delete all clicked');
      if (this.username == '') {
        // delete from local
        this.localHistory = [];
        localStorage.removeItem('history');
      } else {
        // delete from server
        this.$store.dispatch('deleteAllHistoryData');
      }
    },
    deleteOneRowFromHistory(createdAt) {
      if (this.username == '') {
        // delete one history data from local
        const newHistory = JSON.parse(localStorage.getItem('history')).filter(
          (ele) => ele.createdAt != createdAt,
        );
        console.log('remove one row clicked');
        this.localHistory = newHistory;
        localStorage.setItem('history', JSON.stringify(newHistory));
      } else {
        // delete one history data from server
        this.$store.dispatch('deleteOneHistoryData', { createdAt });
        this.localHistory = [];
      }
    },
  },
};
</script>
