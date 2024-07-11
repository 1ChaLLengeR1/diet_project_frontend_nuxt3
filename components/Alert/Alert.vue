<template>
  <div class="fixed top-24 right-1 z-50">
    <ul class="w-full flex flex-col gap-3">
      <li v-for="(item, index) in storeAlert.collection" :key="index">
        <Positive
          v-if="item.type === 'positive'"
          :id="item.id"
          :message="item.message"
        />
        <Error
          v-if="item.type === 'error'"
          :id="item.id"
          :message="item.message"
        />
        <Warning
          v-if="item.type === 'warning'"
          :id="item.id"
          :message="item.message"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import Positive from "./Variant/Positive.vue";
import Error from "./Variant/Error.vue";
import Warning from "./Variant/Warning.vue";

// stores
import { AlertStore } from "./../../storage/alert/alert";

export default defineComponent({
  components: {
    Positive,
    Error,
    Warning,
  },
  setup() {
    const storeAlert = AlertStore();
    return { storeAlert };
  },
});
</script>

<style scoped></style>
