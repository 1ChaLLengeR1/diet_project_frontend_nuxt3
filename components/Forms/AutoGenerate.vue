<template>
  <div class="w-full h-fit">
    <Vueform id="profileForm" class="w-full" ref="form" v-bind="schemaForm" />
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
    loadForm: {
      type: Boolean,
      required: false,
      default: false,
    },
    dataForm: {
      type: Object as SchemaJsonType,
      required: false,
      default: null,
    },
  },
  emits: ["handler-form", "handler-deleteImage"],
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

    const loadForm = async () => {
      if (props.loadForm) {
        setTimeout(() => {
          form.value.update(props.dataForm);
        }, 500);
      }
    };
    loadForm();

    const deleteFile = async (value: string) => {
      ctx.emit("handler-deleteImage", value);
    };

    const generatorForm = () => {
      schemaForm.value = props.schemaJson;
      const convertedJsonSchema = JSON.parse(
        JSON.stringify(schemaForm.value),
        (key, value) => {
          if (
            key === "buttonLabel" ||
            key === "label" ||
            key === "required" ||
            key === "max" ||
            key === "min" ||
            key === "placeholder" ||
            key === "add-text"
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

    generatorForm();

    watch(props, () => {
      generatorForm();
    });

    watch(dictionaryStore, async () => {
      generatorForm();
    });

    return { schemaForm, form };
  },
});
</script>
