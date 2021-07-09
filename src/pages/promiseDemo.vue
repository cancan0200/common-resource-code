<template>
  <div>
    <input type="text" @input="handleInput" />

    <button @click="handleThrottle">throttle</button>

    <c-transition title="text">
      <div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </c-transition>
  </div>
</template>

<script>
import CPromise from "@/js/Promise";
import { debounce, throttle } from "@/js/common";
import CTransition from "@/components/Transition";
export default {
  components: {
    CTransition
  },

  computed: {
    debounce() {
      return debounce;
    }
  },

  mounted() {
    const test = () => {
      return new CPromise((resolve, reject) => {
        resolve(2);
      });
    };
    test().then(v => {
      console.log("then", v);
    });

    var Person = function(name, age) {
      this.name = name;
      this.age = age;
    };
    Person.prototype.show = function() {
      console.log(this.name, this.age);
    };
    var p = new Person("bella", 10);
    console.log(p);
  },

  methods: {
    handleInput: debounce(e => {
      console.log(e);
    }, 1000),

    handleThrottle: throttle(t => {
      console.log(t);
    }, 1000)
  }
};
</script>

<style></style>
