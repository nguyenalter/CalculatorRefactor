<template>
  <Calculator :msg="title" />
  <!-- <button class="bg-green-500">Button</button> -->
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

let title = "Simple Calculator";

export default {
  name: "Home",
  components: {
    Calculator,
  },
  data() {
    return {
      title,
    };
  },
};
</script>
