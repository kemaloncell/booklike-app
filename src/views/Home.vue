<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <SideBar @category-changed="updateBookmarkList"/>

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
  },
  methods:{
    updateBookmarkList(categoryId){
      this.$appAxios.get('/bookmarks?_expand=category&_expand=user&categoryId='+categoryId).then(response => {
        this.bookmarkList = response?.data || [];
        console.log(response.data)
      });
    }
  }
}
</script>

