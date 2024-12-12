<template>
  <div class="home">
    <UserList />
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";

export default {
  name: "HomeView",
  components: {
    UserList,
  },
};
</script>
