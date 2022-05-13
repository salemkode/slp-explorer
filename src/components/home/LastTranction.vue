<template>
  <!-- Just html -->
  <section class="transactions-section container my-5">
    <h3 class="table-title">Latest Transactions</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Transaction Hash</th>
          <th scope="col">Symbol</th>
          <th scope="col">Amount</th>
          <th scope="col">Version</th>
          <th scope="col">Block Height</th>
          <th scope="col">Block Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 7" :key="i">
          <th>1cba55e48869...b3ef5</th>
          <td>
            Sweetpop Choco-Bunny No. 3199
            <br />
            $SWEDC
          </td>
          <td>1</td>
          <td>NFT1-Child [view parent]</td>
          <td>Pending</td>
          <td>Pending</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LastTranction",
});
</script>

<style scoped>
.transactions-section {
  overflow-x: auto;
}
</style>
