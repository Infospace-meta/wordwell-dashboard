<template>
  <Header class="flex w-full flex-col sticky-top bg-white">
    <Container
      class="border-bottom px-4 flex w-full justify-content-between items-center h-13"
      fluid
    >
      <div @click="sidebar.toggleVisible()" style="margin-inline-start: -14px">
        <span class="material-symbols-outlined"> menu </span>
      </div>
        <AppHeaderDropdownAccnt />
    </Container>
    <!-- <Container class="px-4 mx-auto w-full flex items-center h-8">
      <AppBreadcrumb />
    </Container> -->
  </Header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useColorModes } from "@coreui/vue";
import AppHeaderDropdownAccnt from "@/components/AppHeaderDropdownAccnt.vue";
import { useSidebarStore } from "@/store/sidebar.js";

const headerClassNames = ref("mb-4 p-0");
const { colorMode, setColorMode } = useColorModes(
  "coreui-free-vue-admin-template-theme"
);
const sidebar = useSidebarStore();

onMounted(() => {
  document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = "mb-4 p-0 shadow-sm";
    } else {
      headerClassNames.value = "mb-4 p-0";
    }
  });
});
</script>
