import { createRouter ,createWebHistory} from 'vue-router'

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
    }
];


export default createRouter({
    routes,
    history: createWebHistory()
})
