<template>
  <div class="container mx-auto grid items-center">
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
          <label for="one" class="mr-10 -ml-4"><addIcon /></label>
          <br />
          <input type="radio" id="two" value="-" v-model="option" />
          <label for="two" class="mr-10 -ml-4"><minusIcon /> </label>
          <br />
          <input type="radio" id="three" value="*" v-model="option" />
          <label for="three" class="mr-10 -ml-4"><multiplyIcon /></label>
        </div>

        <p class="font-bold text-md text-green-800">Enter second integer</p>
        <textarea
          v-model="secondVal"
          placeholder="accept [+-]?[0-9]+"
          rows="4"
          class="border-black border-2 rounded px-3"
        ></textarea>
        <div class="grid grid-cols-3 my-3 gap-1">
          <button class="bg-red-400 custom-btn" @click="clearAllInput">CLEAR</button>
          <button class="bg-blue-400 custom-btn" @click="swapInput">
            SWAP
          </button>
          <button class="bg-green-400 custom-btn" @click="calculate">
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
import addIcon from '../assets/add.svg';
import minusIcon from '../assets/minus.svg';
import multiplyIcon from '../assets/multiply.svg';

export default {
  name: 'Calculator',
  components: { addIcon, minusIcon, multiplyIcon },
  data() {
    return {
      result: '',
      firstVal: '',
      secondVal: '',
      option: '+',
      calculateTime: null,
      errorObj: {
        status: false,
        fromUser: true,
        message: [
          'Please double check your input! Input must in format: [+-]?[0-9]+',
          'Error while fetching result from server. Did you start your server yet?',
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
      const re = /^[+,-]?[0-9]+$/;
      return re.test(input);
    },
    validateOption(option) {
      // Option must be +, -, or *
      return option == '+' || option == '-' || option == '*';
    },
    async calculate() {
      // Validate input
      if (
        !(
          this.validateInput(this.firstVal)
          && this.validateInput(this.secondVal)
          && this.validateOption(this.option)
        )
      ) {
        // Return when validate failed
        this.inputError();
        return;
      }
      // Not an error
      this.errorObj.status = false;

      try {
        const t0 = performance.now();
        this.result = await this.$store.dispatch('fetchResult', {
          firstVal: this.firstVal,
          secondVal: this.secondVal,
          option: this.option,
        });
        this.calculateTime = (performance.now() - t0) / 1000;
      } catch (err) {
        this.serverError();
        // this.errorObj.message[1] = err;
      }
    },
    swapInput() {
      [this.firstVal, this.secondVal] = [this.secondVal, this.firstVal];
    },
    clearAllInput() {
      this.calculateTime = null;
      this.firstVal = '';
      this.option = '+';
      this.secondVal = '';
      this.result = '';
      this.resetError();
    },
  },
};
</script>

<style lang="postcss" scoped>
.custom-btn {
  @apply rounded h-10 text-white font-semibold;
}
</style>
