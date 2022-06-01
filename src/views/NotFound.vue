<template>
  <Error :error="{ statusCode: 404, message: 'Page not founded' }" />
</template>

<script lang="ts">
import Error from "@/components/global/Error.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageNotFound",
  components: { Error },
});
</script>
