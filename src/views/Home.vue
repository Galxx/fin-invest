<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="getinfo"
          elevation="6"
        >Get</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import api from "../services/apiService";

export default {
  name: "Home",
  methods: {
    async getinfo(){
      const response = await api.accounts();
      console.log(response);
    }
  }
};
</script>
