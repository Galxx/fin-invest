<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="getinfo"
               elevation="6"
        >Get
        </v-btn>
      </v-col>

    </v-row>

    <section class="chart-container">
      <vue-anychart :options="lineOptions" ref="lineChart"></vue-anychart>
    </section>

    <v-data-table
      :headers="headers"
      :items="operations"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>

import api from "../services/apiService";
import VueAnychart from "../components/VueAnychart";
import { format, parseISO } from "date-fns";
import * as data from "../data/data";


export default {
  name: "Home",
  components: {
    VueAnychart
  },
  data() {
    return {
      headers: [
        {
          text: "operationType",
          align: "start",
          sortable: false,
          value: "operationType"
        },
        { text: "date", value: "date" },
        { text: "figi", value: "figi" },
        { text: "currency", value: "currency" },
        { text: "price", value: "price" },
        { text: "quantityExecuted", value: "quantityExecuted" },
        { text: "payment", value: "payment" }
      ],
      operations: [],
      lineOptions: null
    };
  },

  methods: {
    async getinfo() {
      const response = await api.operations();
      const operations = [];
      const dataChart = [];
      let totalAmount = 0;
      response.payload.operations.forEach((item) => {
        if (item.operationType === "Buy") {
          const operation = {
            "operationType": item.operationType,
            "date": parseISO(item.date),
            "figi": item.figi,
            "currency": item.currency,
            "price": item.price,
            "quantityExecuted": item.quantityExecuted,
            "payment": item.payment
          };
          operations.push(operation);
        }
      });

      operations.sort((prev, next) => {
        if (prev.date > next.date) return 1;
        return -1;
      });

      operations.forEach(item => {
        item.date =  format(item.date, "yyyy.MM.dd");

        totalAmount += -item.payment;
        dataChart.push({ "x": item.date, "value": totalAmount });
      });

      this.operations = operations;

      data.LineData.chart.series[0].data = dataChart;
      this.$refs.lineChart.addSeries(data.LineData);

    }
  }
};


</script>

<style>
.chart {
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
}

.chart-container {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>