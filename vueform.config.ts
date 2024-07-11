import en from "@vueform/vueform/locales/en";
import de from "@vueform/vueform/locales/de";
import vueform from "@vueform/vueform/themes/vueform";
import { defineConfig, Validator } from "@vueform/vueform";
import "@vueform/vueform/dist/vueform.css";
import { validateAndFormatTime } from "./storage/common/formaters";

en.vueform.elements.list.add = "Add item";

// custom Forms
import CustomSelectProjectElement from "./components/Forms/customs/CustomSelectProjectElement.vue";
import CustomSelectTypeTrainingElement from "./components/Forms/customs/CustomSelectTypeTrainingElement.vue";

// roles
const projectRequiredRule = class extends Validator {
  get message() {
    const { $i18n } = useNuxtApp();
    return $i18n.t("profilePanel.autoGenerateForm.messages.custom.project");
  }
  check(value: string) {
    if (value && value[0]) {
      return value;
    }
  }
};

const typeTrainingRule = class extends Validator {
  get message() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(
      "profilePanel.autoGenerateForm.messages.custom.typeTraining"
    );
  }
  check(value: string) {
    if (value && value[0]) {
      return value;
    }
  }
};

const typeTrainingTimeRule = class extends Validator {
  get message() {
    const { $i18n } = useNuxtApp();
    return $i18n.t(
      "profilePanel.autoGenerateForm.messages.custom.typeTrainingTime"
    );
  }

  check(value: string) {
    if (value && value[0]) {
      if (validateAndFormatTime(value) !== null) {
        return value;
      }
    }
  }
};

export default defineConfig({
  theme: vueform,
  locales: { en, de },
  locale: "en",
  elements: [CustomSelectProjectElement, CustomSelectTypeTrainingElement],
  rules: {
    typeTraining: typeTrainingRule,
    projectRequired: projectRequiredRule,
    typeTrainingTime: typeTrainingTimeRule,
  },
});
