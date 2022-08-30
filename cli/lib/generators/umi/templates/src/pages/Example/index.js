import React, { forwardRef } from 'react';
import { connect } from 'umi';

import { VtxDatagrid, VtxPageLayout } from '@vtx/components';
import { VtxGrid } from 'vtx-ui';
import { Button, message, Input, Form } from 'antd';

import { renderColumns } from '@/utils/renderColumn';
import useFormTable from '@/hooks/useFormTable';
import useFormModal from '@/hooks/useFormModal';
import useDeleteRows from '@/hooks/useDeleteRows';

import Add from './components/Add';
import Edit from './components/Add';

const { Page, ButtonWrap, Content, TableWrap } = VtxPageLayout;

function Demo({ dispatch, demo, form }, ref) {
    const { getFieldDecorator } = form;

    // 列表分页查询
    const getTableData = ({ current, pageSize }, formData) => {
        return dispatch({
            type: 'demo/getList',
            payload: {
                formData,
                page: current,
                size: pageSize,
            },
        });
    };
    const { search, refresh, run, params, tableProps, selectedRowKeys } = useFormTable(
        getTableData,
        {
            form,
        },
    );
    const { submit, reset } = search;

    // 表格列
    const columns = [
        ...renderColumns([
            ['名称', 'name'],
            ['描述', 'desc'],
            [
                '操作',
                'action',
                {
                    renderButtons(text, record) {
                        return [
                            {
                                name: '编辑',
                                onClick() {
                                    dispatch({
                                        type: 'demo/view',
                                        payload: { id: record.id },
                                    }).then(data => {
                                        editFormModal.setFormData({
                                            ...data,
                                        });
                                    });
                                    editFormModal.setVisible(true);
                                },
                            },
                            {
                                name: '删除',
                                popconfirm: {
                                    title: '是否确认删除？',
                                    confirm() {
                                        deleteRows.run([record.id]);
                                    },
                                },
                            },
                        ];
                    },
                },
            ],
        ]),
    ];

    // 新增
    const addFormModal = useFormModal({
        modal: {
            title: '新增',
            width: 900,
            onOk: params => {
                return dispatch({
                    type: 'demo/saveOrUpdate',
                    payload: {
                        type: 'save',
                        params,
                    },
                }).then(status => {
                    if (status) {
                        refresh();
                        message.success('新增成功');
                    }
                    return status;
                });
            },
        },
    });

    // 编辑
    const editFormModal = useFormModal({
        modal: {
            title: '编辑',
            width: 800,
            onOk: params => {
                return dispatch({
                    type: 'demo/saveOrUpdate',
                    payload: {
                        type: 'update',
                        params,
                        id: editFormModal.formData?.id,
                    },
                }).then(status => {
                    if (status) {
                        refresh();
                        message.success('新增成功');
                    }
                    return status;
                });
            },
        },
    });

    // 删除
    const {
        pagination: { current, pageSize, total },
    } = tableProps;
    const deleteRows = useDeleteRows(
        ids => {
            return dispatch({
                type: 'demo/deleteItems',
                payload: { ids },
            }).then(status => {
                status && message.success('删除成功');
                return status;
            });
        },
        {
            current: current || 1,
            pageSize: pageSize || 10,
            total: total || 0,
            formData: params[1],
            fetch: run,
        },
    );

    return (
        <Page ref={ref}>
            <VtxGrid titles={['名称']} gridweight={[1]} confirm={submit} clear={reset}>
                {getFieldDecorator('name')(<Input placeholder="请输入名称" />)}
            </VtxGrid>
            <Content top={48}>
                <TableWrap>
                    <VtxDatagrid
                        {...tableProps}
                        columns={columns}
                        onRefresh={refresh}
                        buttonGroup={
                            <ButtonWrap>
                                <Button icon="plus" onClick={() => addFormModal.setVisible(true)}>
                                    新增
                                </Button>
                                <Button
                                    icon="delete"
                                    disabled={selectedRowKeys.length == 0}
                                    onClick={() => deleteRows.model(selectedRowKeys)}
                                >
                                    删除
                                </Button>
                            </ButtonWrap>
                        }
                    />
                </TableWrap>
            </Content>
            {/*新增*/}
            <Add {...addFormModal} />
            <Edit {...editFormModal} />
        </Page>
    );
}

export default connect(({ demo }) => ({ demo }))(Form.create()(forwardRef(Demo)));
