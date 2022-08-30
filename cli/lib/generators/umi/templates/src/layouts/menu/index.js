import React, { useState } from 'react';
import { Link } from 'umi';
import { Layout, Menu, Icon } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { stringifyQuerystring } from '@vtx/utils';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

import styles from './index.less';
const { Header, Sider, Content } = Layout;

const Management = props => {
    const [collapsed, setCollapsed] = useState(false);
    const routes = props.route?.routes?.filter(item => item.path);
    return (
        <ConfigProvider locale={zhCN}>
            <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        className={styles.menu}
                        selectedKeys={[props.location.pathname]}
                    >
                        {routes.map(item => {
                            return (
                                <Menu.Item key={item.path}>
                                    <Link
                                        key={item.path}
                                        to={`${item.path}?${stringifyQuerystring()}`}
                                    >
                                        <Icon type="setting" />
                                        <span>{item.title}</span>
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => setCollapsed(oldValue => !oldValue)}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '16px 16px',
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default Management;
