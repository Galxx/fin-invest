<template>
  <div class="chart"></div>
</template>

<script>
/* eslint-disable */

import Anychart from 'anychart'

  export default {
    props: ['options', 'Anychart'],
    name: 'VueAnychart',
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      if (!this.chart && this.options) {
        this.init();
      }
    },

    methods: {
      addSeries(data) {

        if(this.chart && data){
          this.chart.dispose();
          this.chart = null;
        };

        if(data){
          let _Anychart = this.Anychart || Anychart;
          this.chart = new _Anychart.fromJson(data);
          this.chart.container(this.$el).draw();
          // TODO Понять почему не работает код ниже
          //this.chart.data(data);
        }

      },

      init() {
        if (!this.chart && this.options) {
          let _Anychart = this.Anychart || Anychart;
          this.chart = new _Anychart.fromJson(this.options);
          this.chart.container(this.$el).draw();
        }
      }
    },
    watch: {
      options: function (options) {
        if (!this.chart && options) {
          this.init()
        } else {
          this.chart.dispose();
          this.chart = null;
          this.init();
        }
      }
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    }
  }
</script>
