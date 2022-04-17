<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <SideBar></SideBar>

    <app-bookmark-list :items="bookmarkList" />
  </div>
</template>

<script>
import SideBar from "@/components/Home/Sidebar";
export default {
  components: {
    SideBar
 },
  data(){
    return {
      bookmarkList:null
    }
  },
  created() {
    this.$appAxios.get('/bookmarks').then(response => {
      this.bookmarkList = response?.data || [];
    })
  }
}
</script>

