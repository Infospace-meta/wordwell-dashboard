<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-10">
      <CDropdownItem>
        <CIcon icon="cil-lock-locked" />
        <div @click="handleLogout">Logout</div>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
import avatar from "@/assets/images/avatars/8.jpg";
import { useAuthStore } from "../store";

/**VARIABLES */
const itemsCount = 42;
const auth = useAuthStore();

/**FUNCTION */
/**Handle logout and redirect */
const handleLogout = async () => {
  await auth.logout();
  router.push("/login"); // Redirect to login page after signing out
};
</script>
