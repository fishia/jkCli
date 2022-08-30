/*
 * @Author: yemu
 * @Date: 2021-03-30 22:27:16
 * @LastEditTime: 2021-04-04 22:26:43
 * @LastEditors: yemu
 * @Description: 按钮权限
 */
import { useEffect, useState } from 'react';
import http from '@/utils/request';
import { getUrlParam } from '@vtx/utils';
import { name as packageName } from '../../package';

// 从地址栏中获取用户信息和系统code信息
const { userId, systemCode } = getUrlParam();
// 接口路径
const FUNCTION_INTERFACE_PATH =
    '/cloud/management/rest/np/function/getFunctionsByUsreIdAndSystem.read';

function usePermission(route = {}) {
    const [permissions, setPermissions] = useState({});

    // 请求接口服务，默认生产环境开启
    useEffect(() => {
        if (process.env.UMI_ENV === 'prod') {
            http.get(FUNCTION_INTERFACE_PATH, {
                body: { parameters: JSON.stringify({ userId, systemCode }) },
            }).then(res => {
                if (Array.isArray(res?.data)) {
                    const CODE = `_${packageName?.toUpperCase()}_${route?.path
                        ?.replace('/', '')
                        ?.toUpperCase()}`;
                    let currentPageFunctionMap = {};
                    res.data.map(item => {
                        if (item?.code?.includes(CODE)) {
                            currentPageFunctionMap[item.code.match('[^_]+(?!.*_)')[0]] = true;
                        }
                    });
                    setPermissions(currentPageFunctionMap);
                }
            });
        }
    }, []);

    // 验证
    const validate = type => {
        if (process.env.UMI_ENV !== 'prod') {
            return true;
        } else {
            return !!permissions[type?.toUpperCase()];
        }
    };

    return {
        validate,
        codes: permissions,
    };
}

export default usePermission;
