<template>
  <v-card class="w-full">
    <v-list>
      <v-list-subheader>{{
        $t("lists.profilePanel.posts.informationDay")
      }}</v-list-subheader>
      <div class="w-full flex justify-between flex-wrap gap-3 p-2">
        <ItemInformation>
          {{ $t("lists.profilePanel.posts.day", { day: day }) }}
        </ItemInformation>
        <ItemInformation>
          {{ $t("lists.profilePanel.posts.weight", { weight: weight }) }}
        </ItemInformation>
        <ItemInformation>
          {{ $t("lists.profilePanel.posts.kcal", { kcal: kcal }) }}
        </ItemInformation>
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//components
import ItemInformation from "./ItemInformation.vue";

export default defineComponent({
  components: {
    ItemInformation,
  },
  props: {
    day: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    kcal: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
