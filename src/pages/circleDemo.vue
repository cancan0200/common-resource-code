<template>
  <div class="hello">
    <v-circle></v-circle>
    
  </div>
</template>

<script>
import Circle from "../components/CircleComponent";
export default {
  name: "CircleDemo",
  components: {
    "v-circle": Circle
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
  
};
</script>

<style scoped></style>
