import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import "./Login.css"
import { useEffect } from 'react';
import { API_BASE_URL } from '../../constants';


type FieldType = {
    phone: string;
    password: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
        if (values.phone === "admin") {
            const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
                method: "POST",
                body: JSON.stringify({ password: values.password })
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('phone', "admin");
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', "admin");
                window.location.href = "/admin"
            }
        } else {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            // console.log('响应数据:', response.data); // 查看返回的数据结构

            // console.log(response.json())
            if (response.ok) {
                const data = await response.json()
                // console.log(data.result)
                localStorage.setItem('phone', data.results.user.phone);
                localStorage.setItem('token', data.results.token);
                localStorage.setItem('username', data.results.user.username);
                window.location.href = '/';
            } else {
                const data = await response.json()
                alert(`Login failed:${data.message}`);
            }
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function Login() {
    useEffect(() => {
        document.title = '四川金信诺-用户登陆';
    }, []);
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

                    <Form.Item label={null} className='login-button'>
                        <Button type="primary" onClick={() => window.location.href = '/register'} className='login-button'>
                            注册
                        </Button>

                        <Button type="primary" htmlType="submit" className='login-button'>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
