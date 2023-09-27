import Vue from 'vue';
import Axios from 'axios';
import { Loading } from 'element-ui';
import { getToken, checkout, checkToken } from '@/utils/auth';

const vm = new Vue();

const paramsSerializer = params => {
    const parts = [];

    for (let key in params) {
        let val = params[key];

        if (val === null || Object.prototype.toString.call(val) === '[object Undefined]') {
            continue;
        }

        if (Array.isArray(val)) {
            val = JSON.stringify(val);
        }

        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }

    const result = parts.join('&');

    return result;
};

const baseConfig = {
    checkToken: true
};

export default class http {
    constructor() {
        this.loadingInstance = null;

        this.instance = Axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            timeout: 0,
            paramsSerializer: params => {
                return this.paramsSerializer(params);
            }
        });
        this.instance.interceptors.request.use(
            config => {
                checkToken()
                    .then(() => {
                        config.headers['Authorization'] = getToken();
                    })
                    .catch(() => {
                        if (config.url !== '/vr/authController/checkToken') {
                            console.log('22222222222');
                            checkout();
                        }
                    });

                config.baseURL =
                    process.env.NODE_ENV === 'production' ? window.location.origin : '';

                return Promise.resolve(config);
            },

            error => Promise.reject(error)
        );
        this.instance.interceptors.response.use(
            response => {
                const { data } = response;
                if (response.config.url === '/vr/authController/checkToken') {
                    return data.code;
                }

                if (data.code !== 200) {
                    http.notify({ text: (data.Msg || data.msg) ?? '未知错误' });
                    console.log('111111111');
                    checkout();

                    return Promise.reject(response);
                }
                return Promise.resolve(data);
            },
            error => {
                const code = parseInt(error.response && error.response.status);
                let tips = '';
                switch (code) {
                    case 400: {
                        const { message } = error.response.data.errors[0];
                        error.response.errorMsg = `${message}(错误代码${code})`;

                        http.notify({ text: `${message}(错误代码${code})` });
                        break;
                    }
                    case 401:
                        tips = '登录失效或没有登录权限';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        vm.$alert(`${tips}(错误代码${code})`, {
                            confirmButtonText: '确定',
                            callback: () => {
                                throw Promise.reject('token不存在，请重新登录');
                            }
                        });
                        break;
                    case 403:
                        tips = '您访问的接口未赋予权限';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    case 404:
                        tips = '请求接口地址不存在';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    case 405:
                        tips = '请求接口类型不正确';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    case 408:
                        tips = '请求超时';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    case 500:
                        tips = '服务器内部错误';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    case 502:
                        tips = '网关错误';
                        error.response.errorMsg = `${tips}(错误代码${code})`;

                        http.notify({ text: `${tips}(错误代码${code})` });
                        break;
                    default:
                        http.notify({ text: `错误代码${code}` });
                }
                return Promise.reject(error);
            }
        );
    }

    fetchData = ({ url = '', params = {}, type = 1, config = {} }, loading) => {
        http.loadingFn(loading);

        return new Promise((resolve, reject) => {
            if (type === 2) {
                params = paramsSerializer(params);
            }
            this.instance[type === 2 ? 'get' : 'post'](
                url,
                type === 2 ? { params, ...{ ...baseConfig, ...config } } : params,
                { ...baseConfig, ...config }
            )
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(error.data);
                })
                .finally(() => {
                    vm.$nextTick(() => {
                        if (loading) {
                            setTimeout(() => {
                                http.closeLoading();
                            }, 1000);
                        }
                    });
                });
        });
    };

    fetchList = ({ url = '', params = {}, action, showSuccess, showError }, loading) => {
        http.loadingFn(loading);

        return new Promise((resolve, reject) => {
            this.instance
                .post(url, {
                    v: {
                        ...params
                    }
                })
                .then(res => {
                    if (res.Data && res.Data.Result) {
                        const data = res.Data.Result || [];

                        http.batchHandle(data, { action, showSuccess, showError });
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error.data);
                })
                .finally(() => {
                    vm.$nextTick(() => {
                        if (loading) {
                            setTimeout(() => {
                                http.closeLoading();
                            }, 1000);
                        }
                    });
                });
        });
    };

    static notify({ text = '' } = {}) {
        vm.$notify.error({
            title: '错误',
            message: text
        });
    }

    static closeLoading() {
        this.loadingInstance.close();
    }

    static loadingFn({ text = '加载中...', show = false } = {}) {
        if (show) {
            this.loadingInstance = Loading.service({
                lock: true,
                text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    }

    static batchHandle(data, { action = '操作', showSuccess = true, showError = true }) {
        if (!data.length) return;

        const error = [],
            success = [];

        data.forEach(v => {
            if (v.Success) {
                success.push(`<div>${v.Id}：${v.Message}</div>`);
            } else {
                error.push(`<div>${v.Id}：${v.Message}</div>`);
            }
        });

        const html = `
            <div style="color:#67C23A;">成功<strong>${success.length}条</strong>数据</div>
            ${success.join('')}
            <div style="color:#F56C6C;">失败<strong>${error.length}条</strong>数据</div>
            ${error.join('')}
        `;

        if (!error.length && showSuccess) {
            vm.$notify({
                type: 'success',
                title: '成功',
                message: `${action}成功`
            });
        } else {
            if (showError) {
                vm.$notify.warning({
                    title: '警告',
                    message: html,
                    dangerouslyUseHTMLString: true,
                    duration: 6000,
                    customClass: 'qt-notification'
                });
            }
        }

        return !error.length;
    }
}
