import { demoService } from './service';
import u from 'updeep';

const initState = {};

export default {
    namespace: 'demo',

    state: { ...initState },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                if (pathname === '/demo') {
                    // 初始化state
                    dispatch({
                        type: 'updateState',
                        payload: {
                            ...initState,
                        },
                    });
                }
            });
        },
    },

    effects: {
        // 获取列表
        *getList({ payload = {} }, { call }) {
            const { formData, page, size } = payload;
            const res = yield call(demoService.getList, {
                ...formData,
                page: page - 1,
                size: size,
            });
            let dataSource = [],
                total = 0;
            if (res?.result == 0) {
                if (Array.isArray(res.data?.rows)) {
                    dataSource = res.data.rows.map(item => ({
                        ...item,
                        key: item.id,
                    }));
                    total = res.data.total;
                }
            }
            return {
                total,
                list: dataSource,
            };
        },

        *view({ payload }, { call }) {
            const res = yield call(demoService.view, {
                id: payload.id,
            });

            if (res?.result == 0) {
                return res?.data || {};
            }
            return {};
        },

        // 新增or编辑
        *saveOrUpdate({ payload }, { call }) {
            const { type, params, id } = payload;
            const res = yield call(type === 'save' ? demoService.save : demoService.update, {
                id,
                ...params,
                confType: 1,
            });
            return res?.result == 0;
        },

        // 删除
        *deleteItems({ payload }, { call, put, select }) {
            let { ids = [] } = payload;
            const res = yield call(demoService.delete, ids);
            return res?.result == 0;
        },
    },

    reducers: {
        updateState(state, action) {
            return u(action.payload, state);
        },
    },
};
