<template>
  <li
    id="itemMenuSiderbar"
    class="w-fit hover:text-main"
    :class="[{ 'text-main': active }]"
    @click="handlerLinks(type, name)"
  >
    <NuxtLink
      :to="path"
      class="leading-4 cursor-pointer text-xl"
      :class="[
        { activeLink: active },
        { 'from-left': position === 'left' },
        { 'from-right': position === 'right' },
      ]"
    >
      {{ $t(`${changeButtonLogin(name)}`) }}
    </NuxtLink>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores
import { SiderbarMenu } from "./../../../../storage/siderbarMenu/siderbarMenu";
import { AuthStore } from "./../../../../storage/auth/auth";
import { ProfilePanelStore } from "./../../../../storage/profilePanel/profilePanel";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { activeLink, changeButtonLogin } = SiderbarMenu();

    const authStore = AuthStore();
    const profilePanelStore = ProfilePanelStore();

    const handlerLinks = async (type: string, name: string) => {
      if (type === "login") {
        await authStore.singIn();
        return;
      }

      if (name === "sidebar.siderbarMenu.adminPanel") {
        profilePanelStore.saveTab("user");
      }

      activeLink(name);
    };

    return { handlerLinks, changeButtonLogin };
  },
});
</script>

<style scoped>
a:after {
  display: block;
  content: "";
  border-bottom: solid 1px #ff7200;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}

a:hover:after {
  transform: scaleX(1);
}

a.activeLink:after {
  transform: scaleX(1);
}

a.from-left:after {
  transform-origin: left;
}

a.from-right:after {
  transform-origin: right;
}
</style>
