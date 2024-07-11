<template>
  <ElementLayout>
    <template #element>
      <SelectElement
        name="type"
        :native="true"
        @input="handleInput"
        :items="
          options.map((item) => ({
            value: item.value,
            label: item.label,
          }))
        "
      />
    </template>
  </ElementLayout>
</template>

<script>
import { defineElement, TagsElement } from "@vueform/vueform";

export default defineElement({
  ...TagsElement,
  name: "CustomSelectTypeTrainingElement",
  setup(_, { element }) {
    const { update } = element;
    const { $i18n } = useNuxtApp();

    const handleInput = (val) => {
      setTimeout(() => {
        const index = val.target.selectedIndex;
        update(val.target[index]._value);
      }, 200);
    };

    const options = [
      { label: $i18n.t("selects.typeTraining.bike"), value: "bike" },
      { label: $i18n.t("selects.typeTraining.run"), value: "run" },
      { label: $i18n.t("selects.typeTraining.swim"), value: "swim" },
      { label: $i18n.t("selects.typeTraining.hike"), value: "hike" },
      { label: $i18n.t("selects.typeTraining.gym"), value: "gym" },
    ];

    return { options, handleInput };
  },
});
</script>
