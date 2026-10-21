import CryptoJS from 'crypto-js';
import Http from './request';

const key = CryptoJS.enc.Utf8.parse('0CoJUm6Qyw8W8jud');
const iv = CryptoJS.enc.Utf8.parse('0102030405060708');

const aesEncrypt = text => CryptoJS.AES.encrypt(String(text), key, { iv }).toString();

const aesDecrypt = text => CryptoJS.AES.decrypt(text, key, { iv }).toString(CryptoJS.enc.Utf8);

export const getPlatformToken = async () => {
    let res;
    let platform = window.globalData.platform;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('platform');
    if (code) {
        platform = code;
    }
    if (platform === 'YZDX') {
        res = await getYZDX();
    } else if (platform === 'XALG') {
        res = await getXALG();
    } else {
        res = await getGJPT();
    }

    const username = platform === 'YZDX' ? res.token : res.token.un;
    const isLibToLogin = platform !== 'XALG';
    const params = {
        username: isLibToLogin ? aesEncrypt(username) : username,
        tokenRestVo: res.token
    };

    if (isLibToLogin) {
        const time = Date.now();
        params.time = time;
        params.validate = aesEncrypt(`${username},${time},YYSD`);
    }

    const loginRes = await new Http().fetchData({
        url: isLibToLogin
            ? '/vr/authController/libToLogin'
            : '/vr/authController/xautlibToLogin',
        type: 1,
        params,
        config: {
            checkToken: false
        }
    });

    if (isLibToLogin && loginRes && loginRes.token) {
        loginRes.token = aesDecrypt(loginRes.token);
    }

    return loginRes;
};

async function getGJPT() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const ticket = params.get('ticket');
    return await new Http().fetchData({
        url: '/vr/libController/getAccessToken?ticket=' + encodeURIComponent(ticket),
        type: 2,
        config: {
            checkToken: false
        }
    });
}

async function getYZDX() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const ticket = params.get('ticket');
    const code = params.get('code');

    return await new Http().fetchData({
        url:
            '/vr/yzLabxController/getAccessToken?ticket=' +
            encodeURIComponent(ticket) +
            '&code=' +
            encodeURIComponent(code),
        type: 2,
        config: {
            checkToken: false
        }
    });
}

async function getXALG() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const ticket = params.get('ticket');
    return await new Http().fetchData({
        url: '/vr/xautController/getAccessToken?ticket=' + encodeURIComponent(ticket),
        type: 2,
        config: {
            checkToken: false
        }
    });
}
