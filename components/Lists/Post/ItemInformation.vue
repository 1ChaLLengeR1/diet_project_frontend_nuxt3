<template>
  <div
    class="min-h-12 flex justify-center items-center bg-main rounded-sm"
    :class="{ 'min-w-full xl:min-w-72': !mainWidthSet }"
    :style="{
      'background-color': mainColor,
      width: mainWidth,
    }"
  >
    <p class="text-xl" :style="{ color: mainColorText }">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { ColorsStore } from "./../../../storage/colors/colors";

export default defineComponent({
  props: {
    color: {
      type: String,
      required: false,
      default: "",
    },
    width: {
      type: String,
      required: false,
      default: "",
    },
    colorText: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const colorsStore = ColorsStore();

    const mainColor = ref<string>(colorsStore.main);
    const mainWidth = ref<string>("288px");
    const mainWidthSet = ref<boolean>(false);
    const mainColorText = ref<string>("white");

    const loadData = () => {
      if (props.color !== "") {
        mainColor.value = props.color;
      }

      if (props.width !== "") {
        mainWidth.value = props.width;
        mainWidthSet.value = true;
      }

      if (props.colorText !== "") {
        mainColorText.value = props.colorText;
      }
    };

    watch(props, () => {
      loadData();
    });

    onMounted(() => {
      loadData();
    });

    return { mainColor, mainWidth, mainWidthSet, mainColorText };
  },
});
</script>

<style scoped></style>
