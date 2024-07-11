<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn color="red" v-bind="activatorProps">
          {{ $t(`${openDialog}`) }}
        </v-btn>
      </template>
      <v-card
        color="warning"
        prepend-icon="mdi-alert"
        :text="$t(`${text}`, { name: nameValue })"
        :title="$t(`${title}`)"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            {{ $t("tabs.confirmButton.default.buttons.close") }}
          </v-btn>

          <v-btn id="confirmButton" @click="deleteHandler">
            {{ $t(`${confirmd}`) }}</v-btn
          >
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    openDialog: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    nameValue: {
      type: String,
      require: true,
    },
    confirmd: {
      type: String,
      require: true,
    },
  },
  emits: ["delete-handler"],
  setup(_, ctx) {
    const dialog = ref<boolean>(false);

    const deleteHandler = () => {
      dialog.value = false;
      ctx.emit("delete-handler");
    };

    return { dialog, deleteHandler };
  },
});
</script>
