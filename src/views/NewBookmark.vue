<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input ref="title" v-model="userData.title" type="text" placeholder="Başlık" class="input mb-3" />
    <input v-model="userData.url" type="text" placeholder="URL" class="input mb-3" />
    <select class="input mb-3" v-model="userData.category_id">
      <option disabled value="" selected>Kategori</option>
      <option value="category.id" v-for="category in categoryList" :key="category.id">{{category.name}}</option>
    </select>
    <textarea v-model="userData.description" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button @click="$router.push({name : 'Home'})" class="secondary-button">İptal</button>
      <button @click="onSave" class="default-button">Kaydet</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        categoryList:[],
        userData:{
          title: null,
          url: null,
          category_id: null,
          description: null
        }
      };
    },
    mounted() {
    this.$appAxios.get('/categories').then(response => {
      this.categoryList = response?.data || [];
    });
      this.$refs.title.focus() // ref ile input elementi focus ediyoruz
    },
    methods:{
      onSave: function () {
        const saveData = {
          ...this.userData,
          user_id : this._getCurrentUser?.id,
          created_at: new Date(),
        }
        this.$appAxios.post('/bookmarks', saveData).then(response => {
          Object.keys(this.userData).forEach(key => {
            this.userData[key] = null; // clear form
          })
          console.log(response)
        });
      }
    },

    computed:{
      ...mapGetters(['_getCurrentUser'])
    }
  };
</script>