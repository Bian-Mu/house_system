import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import type { FormProps } from 'antd';


interface RegisterFormValues {
    username: string;
    phone: string;
    password: string;
    invite_code: string;
}

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        document.title = '注册';

    }, []);

    const onFinish: FormProps<RegisterFormValues>['onFinish'] = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('https://swyacgknewea.sealoshzh.site/auth/register', {
                method: "POST",
                body: JSON.stringify(values)
            }
            );
            const data = await response.json()
            if (response.ok) {
                form.resetFields();
                messageApi.success('注册成功');
            } else {
                messageApi.error(data.message);
            }
        } catch (error) {
            console.error('注册错误:', error);
            messageApi.error('注册过程中发生错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>用户注册</h2>
                <Form<RegisterFormValues>
                    form={form}
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { min: 4, message: '用户名至少2个字符' },
                            { max: 16, message: '用户名最多8个字符' },
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
                        ]}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { min: 6, message: '密码至少6个字符' },
                            { max: 20, message: '密码最多20个字符' },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        label="邀请码"
                        name="invite_code"
                        rules={[
                            { required: true },
                            { message: '联系管理员获取邀请码' },
                        ]}
                    >
                        <Input placeholder="请输入邀请码" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>

    );
};

export default Register;