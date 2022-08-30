import qs from 'qs';

export const getUrlParam = key => {
    const params = qs.parse(location.href.split('?')[1]);
    return key ? params[key] : params;
};
