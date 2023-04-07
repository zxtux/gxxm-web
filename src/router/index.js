import Vue from 'vue';
import Router from 'vue-router';
import Home from './modules/home';

Vue.use(Router);

export const routes = [
    ...Home,
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/register')
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
