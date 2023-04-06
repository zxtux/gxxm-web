const Home = () => import('@/views/home');
const Login = () => import('@/views/login');

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
];
