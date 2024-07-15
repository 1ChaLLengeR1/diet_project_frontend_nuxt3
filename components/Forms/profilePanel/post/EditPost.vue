<template>
  <div class="w-full">
    <Vueform size="md" ref="form">
      <TextElement
        name="day"
        :label="$t('profilePanel.autoGenerateForm.day')"
        :rules="['required']"
        input-type="number"
        :messages="{
          required: $t('profilePanel.autoGenerateForm.messages.required'),
        }"
        :columns="{ container: mobile.mobileOne, label: 12, wrapper: 12 }"
      />
      <TextElement
        name="weight"
        :label="$t('profilePanel.autoGenerateForm.weight')"
        :rules="['required']"
        input-type="number"
        :messages="{
          required: $t('profilePanel.autoGenerateForm.messages.required'),
        }"
        :columns="{ container: mobile.mobileOne, label: 12, wrapper: 12 }"
      />
      <TextElement
        name="kcal"
        :label="$t('profilePanel.autoGenerateForm.kcal')"
        :rules="['required']"
        input-type="number"
        :messages="{
          required: $t('profilePanel.autoGenerateForm.messages.required'),
        }"
        :columns="{ container: mobile.mobileOne, label: 12, wrapper: 12 }"
      />
      <CustomSelectProjectElement
        name="selectProject"
        :label="$t('profilePanel.autoGenerateForm.selectProject')"
        :columns="{ container: mobile.mobileOne, label: 12, wrapper: 12 }"
        :disabled="true"
      />
      <FileElement
        name="fileFigure"
        :drop="true"
        accept=".jpg,.png,.gif,.jpeg"
        view="gallery"
        :auto="false"
        :url="false"
        :submit="false"
        :label="$t('profilePanel.autoGenerateForm.fileFigure')"
        :rules="['max:4096']"
        :remove-endpoint="handlerRemoveFile"
        :messages="{
          max: $t('profilePanel.autoGenerateForm.messages.image.max'),
        }"
        :columns="{ container: mobile.mobileTwo, label: 12, wrapper: 12 }"
        type="file"
      />
      <FileElement
        name="fileWeight"
        :drop="true"
        accept=".jpg,.png,.gif,.jpeg"
        view="gallery"
        :auto="false"
        :url="false"
        :submit="false"
        :remove-endpoint="handlerRemoveFile"
        :label="$t('profilePanel.autoGenerateForm.fileWeight')"
        :rules="['max:4096']"
        :messages="{
          max: $t('profilePanel.autoGenerateForm.messages.image.max'),
        }"
        :columns="{ container: mobile.mobileTwo, label: 12, wrapper: 12 }"
        type="file"
      />
      <FileElement
        name="fileKcal"
        :drop="true"
        accept=".jpg,.png,.gif,.jpeg"
        view="gallery"
        :auto="false"
        :url="false"
        :submit="false"
        :remove-endpoint="handlerRemoveFile"
        :label="$t('profilePanel.autoGenerateForm.fileKcal')"
        :rules="['max:4096']"
        :messages="{
          max: $t('profilePanel.autoGenerateForm.messages.image.max'),
        }"
        :columns="{ container: mobile.mobileTwo, label: 12, wrapper: 12 }"
        type="file"
      />
      <FileElement
        name="fileTraining"
        :drop="true"
        accept=".jpg,.png,.gif,.jpeg"
        view="gallery"
        :auto="false"
        :url="false"
        :submit="false"
        :remove-endpoint="handlerRemoveFile"
        :label="$t('profilePanel.autoGenerateForm.fileTraining')"
        :rules="['max:4096']"
        :messages="{
          max: $t('profilePanel.autoGenerateForm.messages.image.max'),
        }"
        :columns="{ container: mobile.mobileTwo, label: 12, wrapper: 12 }"
        type="file"
      />
      <ListElement
        id="listTraining"
        name="collectionTraining"
        :initial="0"
        :add-text="$t('profilePanel.autoGenerateForm.button.addTraining')"
      >
        <template #default="{ index }">
          <ObjectElement :name="index">
            <SelectElement
              :label="$t('profilePanel.autoGenerateForm.type')"
              name="type"
              :native="true"
              :columns="{
                container: mobile.mobileThree,
                label: 12,
                wrapper: 12,
              }"
              :rules="['typeTraining']"
              :items="
                options.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))
              "
            />
            <TextElement
              name="time"
              :label="$t('profilePanel.autoGenerateForm.time')"
              :rules="['required']"
              input-type="text"
              :messages="{
                required: $t('profilePanel.autoGenerateForm.messages.required'),
              }"
              :columns="{
                container: mobile.mobileThree,
                label: 12,
                wrapper: 12,
              }"
            />
            <TextElement
              name="kcal"
              :label="$t('profilePanel.autoGenerateForm.kcal')"
              :rules="['required']"
              input-type="number"
              :messages="{
                required: $t('profilePanel.autoGenerateForm.messages.required'),
              }"
              :columns="{
                container: mobile.mobileThree,
                label: 12,
                wrapper: 12,
              }"
            />
          </ObjectElement>
        </template>
      </ListElement>
      <ButtonElement
        name="button"
        :buttonLabel="$t('profilePanel.autoGenerateForm.button.changePost')"
        full="full"
        type="button"
        @click="handlerButton"
      />
    </Vueform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted } from "vue";
import _ from "lodash";

// components
import CustomSelectProjectElement from "./../../customs/CustomSelectProjectElement.vue";
import CustomSelectTypeTrainingElement from "./../../customs/CustomSelectTypeTrainingElement.vue";

// types
import type { collectionTraining } from "./../../../../data/types/storage/post/types";

export default defineComponent({
  components: {
    CustomSelectProjectElement,
    CustomSelectTypeTrainingElement,
  },
  emits: ["handler-remove-file", "handler-form"],
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
    selectProject: {
      type: String,
      required: true,
    },
    collectionTraining: {
      type: Array<collectionTraining>,
      required: true,
    },
    filesUrl: {
      type: Array<{ name: String; url: String }>,
      required: true,
    },
  },
  setup(props, ctx) {
    const form = ref();
    const { $i18n } = useNuxtApp();
    const { day, weight, kcal, selectProject, collectionTraining, filesUrl } =
      toRefs(props);
    const mobile = ref<{
      mobileOne: number;
      mobileTwo: number;
      mobileThree: number;
    }>({
      mobileOne: 6,
      mobileTwo: 3,
      mobileThree: 4,
    });

    const options = [
      { label: $i18n.t("selects.typeTraining.bike"), value: "bike" },
      { label: $i18n.t("selects.typeTraining.run"), value: "run" },
      { label: $i18n.t("selects.typeTraining.swim"), value: "swim" },
      { label: $i18n.t("selects.typeTraining.hike"), value: "hike" },
      { label: $i18n.t("selects.typeTraining.gym"), value: "gym" },
    ];

    setTimeout(() => {
      form.value.update({
        day: day.value,
        weight: weight.value,
        kcal: kcal.value,
        selectProject: selectProject.value,
        collectionTraining: collectionTraining.value,
      });

      if (filesUrl.value.length > 0) {
        for (let i = 0; i < filesUrl.value.length; i++) {
          form.value.update({
            [filesUrl.value[i].name]: filesUrl.value[i].url,
          });
        }
      }
    }, 500);

    const checkScreenWidth = _.throttle(() => {
      mobile.value =
        window.innerWidth >= 1280
          ? mobile.value
          : { mobileOne: 12, mobileTwo: 12, mobileThree: 12 };
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    const handlerRemoveFile = async (url: string) => {
      ctx.emit("handler-remove-file", url);
    };

    const handlerButton = (formData: any) => {
      ctx.emit("handler-form", formData.data);
    };
    return { form, options, mobile, handlerButton, handlerRemoveFile };
  },
});
</script>

<style scoped></style>
