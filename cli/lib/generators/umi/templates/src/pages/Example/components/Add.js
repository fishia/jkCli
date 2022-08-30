import React, { forwardRef, useEffect } from 'react';
import { VtxModal } from 'vtx-ui';
import { VtxFormLayout } from '@vtx/components';
import { Input, Form } from 'antd';

function Add({ modalProps, formData = {}, form, confirm }, ref) {
    const { getFieldDecorator } = form;

    useEffect(() => {
        if (!modalProps.visible && form) {
            form.resetFields();
        }
    }, [modalProps.visible]);

    const onOk = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            confirm && confirm(fieldsValue);
        });
    };

    return (
        <VtxModal {...modalProps} onOk={onOk}>
            <Form ref={ref}>
                <VtxFormLayout>
                    <VtxFormLayout.Row>
                        <VtxFormLayout.FormItem label="名称">
                            {getFieldDecorator('dictName', {
                                initialValue: formData.dictName,
                                rules: [{ required: true, message: '必填' }],
                            })(<Input placeholder="请输入名称" />)}
                        </VtxFormLayout.FormItem>
                        <VtxFormLayout.FormItem label="描述">
                            {getFieldDecorator('dictDesc', {
                                initialValue: formData.dictDesc,
                                rules: [{ required: true, message: '必填' }],
                            })(<Input placeholder="请输入描述" />)}
                        </VtxFormLayout.FormItem>
                    </VtxFormLayout.Row>
                </VtxFormLayout>
            </Form>
        </VtxModal>
    );
}

export default Form.create({ name: 'add' })(forwardRef(Add));
