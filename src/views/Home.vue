<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <SideBar :categoryList="categoryList" />

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
      bookmarkList:null,
      categoryList:null,
    }
  },
  created() {
    this.$appAxios.get('/bookmarks?_expand=category&_expand=user').then(response => {
      this.bookmarkList = response?.data || [];
      console.log(response.data)
    });

    this.$appAxios.get('/categories').then(response => {
      this.categoryList = response?.data || [];
      console.log(response.data)
    });
  }
}
</script>

