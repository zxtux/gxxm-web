import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/register')
    },
    {
        path: '/lineUp',
        name: 'lineUp',
        component: () => import('@/views/home/components/lineUp')
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/error/404')
    }
];

const createRouter = () =>
    new Router({
        routes
    });

const router = createRouter();

export default router;
