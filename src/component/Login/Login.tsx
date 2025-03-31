import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import "./Login.css"

import axios from "axios"


type FieldType = {
    phone?: string;
    password?: string;
    // remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
        const response = await axios.post('https://m1.apifoxmock.com/m1/6122515-5814159-default/auth/login', values);

        console.log('完整响应:', response); // 查看整个响应
        console.log('响应数据:', response.data); // 查看返回的数据结构


        if (response.data.success) {
            // localStorage.setItem('phone', response.data.phone);
            // localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function Login() {
    return (
        <div className='whole-login-page'>

            <div className='Login'>

                <Form
                    className='Login-Form'
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p>登 入 系 统</p>
                    <Form.Item<FieldType>
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input placeholder='手机号码：' className='login-input' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='密码：' className='login-input' />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
