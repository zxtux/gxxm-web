import Http from './request';

export const getPlatformToken = async () => {
    let res;
    const platform = window.globalData.platform;

    if (platform === 'YZDX') {
        res = await getYZDX();
    } else {
        res = await getGJPT();
    }

    return await new Http().fetchData({
        url: '/vr/authController/libToLogin',
        type: 1,
        params: {
            username: platform === 'YZDX' ? res.token : res.token.un,
            tokenRestVo: res.token
        },
        config: {
            checkToken: false
        }
    });
};

async function getGJPT() {
    const ticket = window.location.search.split('ticket=')[1];
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
