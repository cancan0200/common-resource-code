<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-07 13:28:28
-->
<template>
  <div class="hello">
    <div class="circle" :style="{ 'border-color': color }">
      <div class="circle" style="left:0">
        <div class="pie_left"><div class="left"></div></div>
        <div class="pie_right"><div class="right"></div></div>
        <div class="mask"><span>0</span>%</div>
      </div>
      <div class="circle" style="left:220px">
        <div class="pie_left"><div class="left"></div></div>
        <div class="pie_right"><div class="right"></div></div>
        <div class="mask"><span>15</span>%</div>
      </div>
      <div class="circle" style="left:440px">
        <div class="pie_left"><div class="left"></div></div>
        <div class="pie_right"><div class="right"></div></div>
        <div class="mask"><span>30</span>%</div>
      </div>
      <div class="circle" style="left:660px">
        <div class="pie_left"><div class="left"></div></div>
        <div class="pie_right"><div class="right"></div></div>
        <div class="mask"><span>60</span>%</div>
      </div>
      <div class="circle" style="left:880px">
        <div class="pie_left"><div class="left"></div></div>
        <div class="pie_right"><div class="right"></div></div>
        <div class="mask"><span>90</span>%</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "vCircle",
  props: {
    color: {
      type: String,
      default: () => "blue"
    },
    percent: {
      type: Number,
      default: () => 50
    }
  },

  computed: {
    rightDeg() {
      if (this.percent > 50) {
        return 180;
      } else {
        return 360 * (this.percent / 100);
      }
    },
    leftDeg() {
      if (this.percent > 50) {
        return 180;
      } else {
        return 360 * (this.percent / 100);
      }
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped>
/* @import "./circle"; */
</style>
