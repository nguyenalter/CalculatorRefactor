<template>
  <div class="container mx-auto grid items-center ">
    <p class="font-bold text-4xl text-center my-5">{{ msg }}</p>
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
          <!-- <button
            class="bg-yellow-300 rounded h-10 hover:bg-yellow-500 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-1 focus:ring-opacity-75"
            type="button"
          >
            <svg
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
          >
          </button>
          <button
            class="bg-yellow-300 rounded h-10 hover:bg-yellow-500 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-1 focus:ring-opacity-75"
          >
            <svg
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
          </button>
          <button
            class="bg-yellow-300 rounded h-10 hover:bg-yellow-500 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-1 focus:ring-opacity-75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button> -->
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
        <p class="font-bold text-md text-green-800">Result</p>
        <textarea
          rows="4"
          class="border-black border-2 rounded px-3"
          v-model="result"
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
      option: "",
    };
  },
  methods: {
    calculate() {
      this.$store
        .dispatch("fetchResult", {
          firstVal: this.firstVal,
          secondVal: this.secondVal,
          option: this.option,
        })
        .then((res) => {
          this.result = res;
          console.log("Received data " + res);
        })
        .catch((err) => console.log(err));
    },
    swapInput() {
      [this.firstVal, this.secondVal] = [this.secondVal, this.firstVal];
    },
    clearAll() {
      this.firstVal = this.secondVal = this.result = "";
    },
  },
  mounted() {
    // console.log(this.$store.getters.fetchResult);
    // console.log("............");
    // console.log(this.$store.state.result);
  },
};
</script>
