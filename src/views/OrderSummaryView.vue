<template>
  <div class="OrderSummaryView">
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <h1 class="font-weight-regular">Order Summary</h1>
          </div>
          <div class="d-flex justify-end">
            <v-text-field color="#B55B68" dense rounded outlined placeholder="Search" class="shrink ml-2"
              append-icon="mdi-magnify"></v-text-field>
          </div>

          <v-card>
            <v-data-table :loading="loading ? '#B55B68' : null" loading-text="Loading Order Summary... Please wait"
              :headers="headers" :items="orders" :items-per-page="5" :sort-desc="[false, true]" multi-sort>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon class="mr-0" v-on:click="selectPatientRecord(item.id)" color="primary">mdi-eye
                </v-icon>
              </template>
              <template v-slot:[`item.price`]="{ item }">
                {{ formartValue(item.price) }}
              </template>
              <template v-slot:[`item.total`]="{ item }">
                {{ formartValue(item.total) }}
              </template>
              <template v-slot:[`item.vat`]="{ item }">
                {{ formartValue(item.vat) }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import OrdersService from '../services/OrdersService'
export default {
  name: "OrderSummaryView",
  data() {
    return {
      loading: false,
      orderSummary: [],
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Item', value: 'item' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' },
        { text: 'VAT', value: 'vat' },
        { text: 'Total', value: 'total' },
      ],
    }
  },
  methods: {
    async fetchDataFromAPI(order_id) {
      this.loading = true
      try {
        const response = await OrdersService.show(order_id);
        this.orders = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.handleError(error);
      }
    },
    formartValue(value) {
      return parseInt(value).toLocaleString('en-US', { minimumFractionDigits: 2 })
    },
  },
  mounted() {
    this.fetchDataFromAPI(this.$route.params.order_id);
  }
};
</script>
