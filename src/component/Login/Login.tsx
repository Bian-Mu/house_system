import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import "./login.css"

import axios from "axios"


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', values);
        if (response.data.success) {

            localStorage.setItem('username', response.data.username);
            localStorage.setItem('token', response.data.token);
            window.location.href = '/home';
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
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='用户名：' className='login-input' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='密码：' className='login-input' />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
