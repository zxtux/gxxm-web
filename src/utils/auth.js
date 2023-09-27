import router from '@/router/index';
import store from '@/stores';
import Http from './request';

export const checkout = async () => {
    store.commit('common/clear');
    router.replace('/login');
};

export const checkToken = () => {
    return new Promise((resolve, reject) => {
        if (!getToken()) {
            checkout();
            reject('登录失效，请重新登录');
        } else {
            resolve();
        }
    });
};

export const getToken = () => {
    return store.state.common.token;
};

export const setToken = token => {
    if (token) {
        store.dispatch('common/setData', { key: 'token', value: token, modules: 'common' });
    } else {
        router.replace('/login');
    }
};

export const verifyAccessToken = async () => {
    const res = await new Http().fetchData({
        url: '/vr/authController/checkToken',
        type: 2
    });
    return res === 200;
};
