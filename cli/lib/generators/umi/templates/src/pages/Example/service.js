import http from '@/utils/request';

export const demoService = (function(url) {
    return {
        // 表格查询
        getList: params => {
            return http.get(`${url}/page`, {
                body: params,
            });
        },

        view: params => {
            return http.get(`${url}/get`, {
                body: params,
            });
        },

        // 保存
        save: params => {
            return http.post(`${url}/add`, {
                body: JSON.stringify(params),
            });
        },

        // 编辑
        update: params => {
            return http.post(`${url}/edit`, {
                body: JSON.stringify(params),
            });
        },

        delete: params => {
            return http.post(`${url}/delete`, {
                body: JSON.stringify(params),
            });
        },
    };
})('/cloud/hw/demo');
