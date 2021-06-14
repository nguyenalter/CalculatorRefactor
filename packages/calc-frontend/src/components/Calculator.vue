<template>
  <div class="container mx-auto grid items-center ">
    <p class="font-bold text-4xl text-center mt-5 text-blue-400">
      Simple Calculator
    </p>
    <br />
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-20">
      <div class="col-span-auto">
        <p class="text-center font-bold text-2xl text-purple-800">Introduce</p>
        <p>
          Simple calculator for adding, subtracting or multiplying two infinite
          integers.
        </p>
      </div>
      <div class="col-span-auto sm:col-span-2 flex flex-col">
        <p class="text-center font-bold text-2xl text-purple-800">Calculator</p>
        <p class="font-bold text-md text-green-800">Enter first integer</p>
        <textarea
          v-model="firstVal"
          placeholder="accept [+-]?[0-9]+"
          rows="4"
          class="border-black border-2 rounded px-3"
        ></textarea>

        <div class="flex flex-row my-3 gap-5 mx-auto">
          <input type="radio" id="one" value="+" v-model="option" />
          <label for="one" class="mr-10 -ml-4"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              /></svg
          ></label>
          <br />
          <input type="radio" id="two" value="-" v-model="option" />
          <label for="two" class="mr-10 -ml-4"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <br />
          <input type="radio" id="three" value="*" v-model="option" />
          <label for="three" class="mr-10 -ml-4"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              /></svg
          ></label>
        </div>

        <p class="font-bold text-md text-green-800">Enter second integer</p>
        <textarea
          v-model="secondVal"
          placeholder="accept [+-]?[0-9]+"
          rows="4"
          class="border-black border-2 rounded px-3"
        ></textarea>
        <div class="grid grid-cols-3 my-3 gap-1">
          <button
            class="bg-red-400 rounded h-10 text-white font-semibold "
            @click="clearAll"
          >
            CLEAR
          </button>
          <button
            class="bg-blue-400 rounded h-10 text-white font-semibold "
            @click="swapInput"
          >
            SWAP
          </button>
          <button
            class="bg-green-400 rounded h-10 text-white font-semibold "
            @click="calculate"
          >
            CALC
          </button>
        </div>
        <p v-if="errorObj.status" class="text-red-400 font-bold text-md">
          <!-- Return errorObj message based on type -->
          Error: {{ errorObj.message[errorObj.fromUser ? 0 : 1] }}
        </p>
        <div>
          <p class="float-left font-bold text-md text-green-800">Result</p>
          <p class="float-right text-gray-400" v-if="calculateTime">
            calculation time: {{ calculateTime }} seconds
          </p>
        </div>

        <textarea
          rows="4"
          class="border-black border-2 rounded px-3"
          v-model="result"
          disabled
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapActions } from "vuex";

export default {
  name: "Calculator",
  props: {
    msg: String,
    // firstVal: String,
    // secondVal: String,
    // option: String,
  },
  data() {
    return {
      result: "",
      firstVal: "",
      secondVal: "",
      option: "+",
      calculateTime: null,
      errorObj: {
        status: false,
        fromUser: true,
        message: [
          "Please double check your input! Input must in format: [+-]?[0-9]+",
          "Error while fetching result from server. Did you start your server yet?",
        ],
      },
    };
  },
  methods: {
    resetError() {
      this.errorObj.status = false;
      this.errorObj.fromUser = true;
    },
    inputError() {
      this.errorObj.status = true;
      this.errorObj.fromUser = true;
    },
    serverError() {
      this.errorObj.status = true;
      this.errorObj.fromUser = false;
    },
    validateInput(input) {
      // accept: [+-]?[0-9]+
      let re = /^[+,-]?[0-9]+$/;
      return re.test(input);
    },
    validateOption(option) {
      // Option must be +, -, or *
      return option == "+" || option == "-" || option == "*";
    },
    calculate() {
      // Validate input
      if (
        !(
          this.validateInput(this.firstVal) &&
          this.validateInput(this.secondVal) &&
          this.validateOption(this.option)
        )
      ) {
        // Return when validate failed
        this.inputError();
        return;
      }
      // Not an error
      this.errorObj.status = false;
      let t0 = performance.now();
      this.$store
        .dispatch("fetchResult", {
          firstVal: this.firstVal,
          secondVal: this.secondVal,
          option: this.option,
        })
        .then((res) => {
          // Fetch result successfully
          this.result = res;
          // Time counter
          this.calculateTime = (performance.now() - t0) / 1000;
          // Reset error state to default
          this.resetError();
        })
        .catch((err) => {
          // Server error - store will throw error here!
          console.log("Error happened: " + err);
          this.serverError();
        });
    },
    swapInput() {
      [this.firstVal, this.secondVal] = [this.secondVal, this.firstVal];
    },
    clearAll() {
      this.calculateTime = null;
      this.firstVal = this.secondVal = this.result = "";
      this.resetError();
    },
  },
  mounted() {
    // console.log(this.$store.getters.fetchResult);
    // console.log("............");
    // console.log(this.$store.state.result);
  },
};
</script>
