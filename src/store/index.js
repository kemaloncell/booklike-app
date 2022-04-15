import {createStore} from 'vuex';
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user:null,
        saltKey: 'booklike123!456'
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    getters:{
        _isAuthenticated: state=> state.user !== null,
        _getCurrentUser(state){
            //  "?" = if userın içinde bir password var ise bunu sil password oradan oraya gitmesin güvenlik
            const user = state?.user;
            delete user.password;
            return user;
        },
        _saltKey: state=> state.saltKey
     },
    // vuex-persistedstate ile store'ın içinde bir değişiklik olursa secure ile şifrelenmiş şekilde localStorage'a kaydedilir
    plugins: [createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        }
    })]
});



