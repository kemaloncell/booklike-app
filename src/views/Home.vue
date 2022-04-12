<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <SideBar></SideBar>

    <app-bookmark-list />
  </div>
</template>

<script>
import SideBar from "@/components/Home/Sidebar";
export default {
  components: {
    SideBar
 }
}
</script>

