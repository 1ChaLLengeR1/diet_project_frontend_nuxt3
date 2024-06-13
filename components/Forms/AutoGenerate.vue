<template>
  <div class="w-full h-fit">
    <Vueform
      id="profileForm"
      class="w-full"
      :add-class="[
        { 'custom-form-create-project': typeButton === 'create' },
        { 'bg-primary': typeButton === 'change' },
      ]"
      ref="form"
      v-bind="schemaForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

// types
type SchemaJsonType = any;

// stores
import { DictionaryStore } from "./../../storage/dictionary/dictionary";

export default defineComponent({
  props: {
    schemaJson: {
      type: Object as SchemaJsonType,
      required: true,
    },
    typeButton: {
      type: String,
      required: false,
      default: "create",
    },
  },
  emits: ["handler-form"],
  setup(props, ctx) {
    const dictionaryStore = DictionaryStore();
    const { $i18n } = useNuxtApp();
    const schemaForm = ref();
    const form = ref();

    const handlerButton = async () => {
      await form.value.validate();
      if (form.value.invalid) {
        setTimeout(async () => {
          form.value.resetValidators();
        }, 5000);
        return;
      }
      ctx.emit("handler-form", form.value.data);
    };

    const deleteFile = async (value: string) => {
      console.log(value);
    };

    const loadForm = () => {
      schemaForm.value = props.schemaJson;
      const convertedJsonSchema = JSON.parse(
        JSON.stringify(schemaForm.value),
        (key, value) => {
          if (
            key === "buttonLabel" ||
            key === "label" ||
            key === "required" ||
            key === "max" ||
            key === "min"
          ) {
            return $i18n.t(value);
          }

          if (key === "messages" && value.email) {
            value.email = $i18n.t(value.email);
          }

          if (value === "deleteFile()") {
            return deleteFile;
          }

          if (value === "handlerButton()") {
            return handlerButton;
          }

          return value;
        }
      );
      schemaForm.value = convertedJsonSchema;
    };
    loadForm();

    watch(dictionaryStore, async () => {
      loadForm();
    });

    return { schemaForm, form };
  },
});
</script>

<style lang="scss">
.custom-form-create-project {
  button {
    background-color: var(--button-create);
    color: white;
    font-weight: bold;
  }
  button:hover {
    transform: scale(1);
  }
}
</style>
