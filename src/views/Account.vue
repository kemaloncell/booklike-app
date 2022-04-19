<template>
  <app-header></app-header>
  <div class="flex flex-row">
  <Sidebar />
    <app-bookmark-list v-if="bookmarkList?.length > 0" :items="bookmarkList" />
    <div v-else> Bookmark bulunmamaktadır...</div>
  </div>
</template>
<script>
import Sidebar from "@/components/Account/Sidebar";
export default {
  components: {Sidebar},
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
}
</script>