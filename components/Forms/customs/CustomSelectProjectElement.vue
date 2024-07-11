<template>
  <ElementLayout>
    <template #element>
      <SelectElement
        name="selectProject"
        :native="true"
        :disabled="disableSelect"
        @input="handleInput"
        :items="
          projectStore.collectionAll.map((item) => ({
            value: item.id,
            label: item.title,
          }))
        "
      />
    </template>
  </ElementLayout>
</template>

<script>
import { defineElement, TagsElement } from "@vueform/vueform";
import { toRefs } from "vue";
import { ProjectStore } from "../../../storage/project/project";

export default defineElement({
  ...TagsElement,
  name: "CustomSelectProjectElement",
  setup(props, { element }) {
    const projectStore = ProjectStore();
    const { update } = element;
    const { type } = toRefs(props);

    const disableSelect = type._object.disabled;

    const handleInput = (val) => {
      setTimeout(() => {
        const index = val.target.selectedIndex;
        update(val.target[index]._value);
      }, 200);
    };

    const runActions = async () => {
      setTimeout(async () => {
        await projectStore.apiFetchAll();
      }, 1000);
    };
    runActions();

    return { projectStore, handleInput, disableSelect };
  },
});
</script>
