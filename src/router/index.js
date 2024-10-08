import { createRouter ,createWebHistory} from 'vue-router'
import store from '../store'

const routes=[
    {
    name:'Home',
    path:'/',
    component: () => import('@/views/Home')
    },
    {
    name:'Login',
    path:'/login',
    component: () => import('@/views/Login')
    },
    {
    name:'Register',
    path:'/register',
    component: () => import('@/views/Register')
    },
    {
    name:'NewBookmarkPage',
    path:'/new',
    component: () => import('@/views/NewBookmark')
    },
    {
    name:'Favorites',
    path:'/account',
    meta:{
        componentsName:"appBookmarkList"
    },
    component: () => import('@/views/Account')
    },
    {
    name:'Likes',
    path:'/likes',
    meta:{
        componentsName:"appBookmarkList"
    },
    component: () => import('@/views/Account')
    },
    {
    name:'Settings',
    path:'/settings',
    meta:{
        componentsName:"userSettings"
    },
    component: () => import('@/views/Account')
    },

];


const router =  createRouter({
    routes,
    history: createWebHistory()
})

//kullanıcı giriş yapmış mı kontrolü
router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ['Home'];
    const authNotRequiredRoutes = ['Login', 'Register'];
    const _authenticated = store.getters._isAuthenticated

    if(authNotRequiredRoutes.indexOf(to.name) > -1 && _authenticated) next({name: 'Home'})
    if(authRequiredRoutes.indexOf(to.name) > - 1) {
        if (_authenticated) next();
        else next({ name: 'Login' });
    }
    else {
        next();
    }
    });


export default router;