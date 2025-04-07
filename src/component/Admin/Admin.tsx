import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Popconfirm,
    Space,
    message,
    Pagination,
    Divider,
    Spin
} from 'antd';
import axios from 'axios';

interface User {
    key: React.Key;
    username: string;
    phone: string;
}

const Admin: React.FC = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 20;

    useEffect(() => {
        document.title = "管理员页面";
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未找到认证token');
            }

            const response = await fetch("https://m1.apifoxmock.com/m1/6122515-5814159-default/admin/list", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            const formattedData = data.results.map((user: any) => ({
                ...user,
                key: user.phone
            }));
            setUserList(formattedData);
        } catch (error) {
            console.error("获取用户列表出错:", error);
            message.error('获取用户列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (key: React.Key) => {
        setDeleteLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未找到认证token');
            }

            const userToDelete = userList.find(user => user.key === key);
            if (!userToDelete) {
                throw new Error('未找到要删除的用户');
            }

            const response = await fetch(`https://m1.apifoxmock.com/m1/6122515-5814159-default/admin/delete/user/${userToDelete.phone}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: "DELETE"
            });
            if (response.ok) {
                setUserList(prev => prev.filter(user => user.key !== key));

                if (paginatedData.length === 1 && currentPage > 1) {
                    setCurrentPage(prev => prev - 1);
                }

                message.success('删除成功');
            }


        } catch (error) {
            console.error('删除用户出错:', error);
            message.error('删除失败');
        } finally {
            setDeleteLoading(false);
        }
    };

    const columns = [
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
            width: "40%"
        },
        {
            title: "手机号",
            dataIndex: "phone",
            key: "phone",
            width: "40%"
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (_: any, record: User) => (
                <Space>
                    <Popconfirm
                        title="确定要删除该用户吗?"
                        onConfirm={() => handleDelete(record.key)}
                        okButtonProps={{ loading: deleteLoading }}
                    >
                        <Button type="link" danger>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const paginatedData = userList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div style={{ padding: 24 }}>
            <Spin spinning={loading}>
                <Table
                    bordered
                    dataSource={paginatedData}
                    columns={columns}
                    pagination={false}
                    rowKey="key"
                />
                <Divider />
                <Pagination
                    align='center'
                    current={currentPage}
                    pageSize={pageSize}
                    total={userList.length}
                    onChange={(page: number) => setCurrentPage(page)}
                    style={{ marginTop: 16, textAlign: "center" }}
                    showSizeChanger={false}
                    showTotal={(total) => `共 ${total} 条`}
                />
            </Spin>
        </div>
    );
};

export default Admin;