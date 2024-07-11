<template>
  <div class="w-full flex flex-col p-3">
    <ProfileTab />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import ProfileTab from "./../../components/Tabs/ProfilePanel/Profile.vue";

export default defineComponent({
  components: {
    ProfileTab,
  },
  setup() {
    return {};
  },
});
</script>
