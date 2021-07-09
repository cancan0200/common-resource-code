<template>
  <div>
    <div>
      {{ title }}
    </div>
    <transition
      name="fade"
      @before-enter="beforeEnter"
      @after-enter="afterEnterLeave"
    >
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    afterEnterLeave(el) {
      console.log("afterenter", el);
    },
    beforeEnter(el) {
      console.log("beforeEnter", el);
    }
  }
};
</script>

