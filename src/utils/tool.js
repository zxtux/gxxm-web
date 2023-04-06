export async function getUrlParams() {
    let url = decodeURIComponent(window.location.href);

    if (!url.includes('?')) {
        return false;
    }

    if (url.includes('#')) {
        url = url.split('#')[0];
    }

    const tmpArray = url.split('?')[1].split('&');
    const params = {};

    tmpArray.forEach(item => {
        Object.assign(params, {
            [item.split('=')[0]]: item.split('=')[1]
        });
    });

    return params;
}

export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

export default {
    getUrlParams,
    guid
};
