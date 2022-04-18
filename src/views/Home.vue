<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <SideBar @category-changed="updateBookmarkList"/>

    <app-bookmark-list v-if="bookmarkList?.length > 0" :items="bookmarkList" />
    <div v-else> Bookmark bulunmamaktadır...</div>
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
      const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`;
      this.$appAxios.get(url).then(response => {
        this.bookmarkList = response?.data || [];
        console.log(response.data)
      });
    }
  }
}
</script>

