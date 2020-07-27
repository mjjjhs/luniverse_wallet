import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            const info = localStorage.getItem('info');
            if(!info) {
                next();
                return;
            }
            const token = JSON.parse(info).token;
            if(token) {
                next('/home');
                return;
            }
        }
    },
    {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        beforeEnter: (to, from, next) => {
            const info = localStorage.getItem('info');
            if(!info) {
                next('/login');
                return;
            }
            next();
        }
    },
    {
        path: '*',
        redirect: '/login'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
