<!-- This example requires Tailwind CSS v2.0+ -->
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          @click="exportCSV"
          class="rounded border-2 border-blue-400 bg-green-400"
          v-tooltip="{
            content: 'Export to csv',
            placement: 'right',
            offset: 5,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"
            />
            <path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z" />
          </svg>
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
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Time
              </th>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                first integer
              </th>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                operator
              </th>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                second integer
              </th>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                result
              </th>
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{
                  dayjs(parseInt(record.timestamp)).format(
                    "YYYY/MM/DD HH:mm:ss"
                  )
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ record.firstVal }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ record.option }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ record.secondVal }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  @click="deleteRecord(record.timestamp)"
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
import dayjs from "dayjs";
import { saveAs } from "file-saver";
export default {
  name: "HistoryTable",
  data() {
    return {
      dayjs,
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    historyData() {
      return [
        ...(JSON.parse(localStorage.getItem("history")) ||
          this.$store.state.historyData),
        //].sort((data1, data2) => data2.timestamp - data1.timestamp);
      ].reverse();
    },
  },
  mounted() {},
  methods: {
    deleteAll() {
      console.log("delete all clicked");
      if (this.username == "") {
        // delete from local
        localStorage.removeItem("history");
      } else {
        // delete from server
        this.$store.dispatch("deleteAll");
      }
    },
    exportCSV() {
      console.log("export clicked");
      const currentHistory = this.historyData;
      let csv =
        "firstOperand,operator,secondOperand,result,timestamp\n" +
        currentHistory
          .map(function(d) {
            return JSON.stringify(Object.values(d));
          })
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");
      var file = new File([csv], "history.csv", {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file);
    },
    deleteRecord(timestamp) {
      console.log("remove clicked");
      if (this.username == "") {
        // delete from local
        localStorage.removeItem("history");
      } else {
        // delete from server
        this.$store.dispatch("deleteOne", { timestamp });
      }
    },
  },
};
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
