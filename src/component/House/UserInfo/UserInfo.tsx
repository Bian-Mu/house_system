import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import "./UserInfo.css";

interface UserData {
    username: string;
    phone: string;
}

const UserInfo = () => {
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState<UserData>({ username: "", phone: "" });
    const [changePwdVisible, setChangePwdVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();


    const onClick = async () => {
        setUserData({ username: localStorage.getItem('username') as string, phone: localStorage.getItem('phone') as string })
        setVisible(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('phone');
        setVisible(false);
        message.success('已退出登录');
        window.location.reload(); // 刷新页面以更新登录状态
    };

    const handleChangePassword = async (values: { newUsername: string; newPassword: string }) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('未找到认证token');

            const phone = localStorage.getItem("phone");
            if (!phone) throw new Error('未找到用户手机号');

            const response = await fetch('https://swyacgknewea.sealoshzh.site/user/update', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: values.newUsername,
                    password: values.newPassword
                })
            });

            if (response.ok) {
                messageApi.success('修改成功');
                setChangePwdVisible(false);
                setVisible(false);
                localStorage.setItem('username', values.newUsername);
                form.resetFields();
            } else {
                const data = await response.json();
                messageApi.error(data.message);
            }
        } catch (err) {
            console.error('Error changing password:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Button onClick={onClick} id="user-info-button">
                查看登录状态
            </Button>

            <Modal
                title="用户信息"
                open={visible}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="changePwd" onClick={() => setChangePwdVisible(true)}>
                        修改用户名/密码
                    </Button>,
                    <Button key="logout" type="primary" danger onClick={handleLogout}>
                        退出登录
                    </Button>
                ]}
                className="user-info-modal"
            >
                <div style={{ marginBottom: 16 }}>
                    <p>用户名: {userData.username}</p>
                    <p>手机号: {userData.phone}</p>
                </div>
            </Modal>

            <Modal
                title="修改密码"
                open={changePwdVisible}
                onCancel={() => {
                    setChangePwdVisible(false);
                    form.resetFields();
                }}
                footer={null}
                className="user-info-modal"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        label="新用户名"
                        name="newUsername"
                        rules={[
                            { required: true, message: '请输入新用户名' },
                            { min: 4, message: '用户名至少2个字符' },
                            { max: 16, message: '用户名最多8个字符' },
                        ]}
                    >
                        <Input placeholder="请输入新用户名" />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[
                            { required: true, message: '请输入新密码' },
                            { min: 6, message: '密码至少6个字符' },
                            { max: 20, message: '密码最多20个字符' },
                        ]}
                    >
                        <Input.Password placeholder="请输入新密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserInfo;