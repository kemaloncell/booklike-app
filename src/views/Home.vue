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
    fetchData() {
      this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
        console.log("bookmark_list_response :>> ", bookmark_list_response);
        this.bookmarkList = bookmark_list_response?.data || [];
      });
      //! Bookmark olarak eklediklerimizi çekmek için user_bookmarks üzerinden çekelim..
      this.$appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then(user_bookmark_response => {
        console.log("user_bookmark_response :>> ", user_bookmark_response);
        this.$store.commit("setBookmarks", user_bookmark_response?.data);
      });
      //! Like olarak eklediklerimizi çekmek için user_likes üzerinden çekelim..
      this.$appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then(user_likes_response => {
        this.$store.commit("setLikes", user_likes_response?.data);
      });
    },


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

