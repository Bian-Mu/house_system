import React, { useEffect, useState } from 'react';
import {
    Table,
    Input,
    InputNumber,
    Select,
    Button,
    Popconfirm,
    Form,
    Space,
    message,
    Pagination,
    Divider,
} from 'antd';
import "./Customer.css"
import { API_BASE_URL } from '../../constants';
const { Option } = Select;

const pinyinCompare = (a: string, b: string) => {
    return a.localeCompare(b, 'zh-CN');
};

function generateId() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

interface DataType {
    key: React.Key;
    customer_id: string;
    name: string;
    phone: string;
    gender: '男' | '女';
    address: string;
    price: string;
    other: string;
}


// 可编辑单元格组件
const EditableCell: React.FC<{
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'gender';
    record: DataType;
    index: number;
    children: React.ReactNode;
}> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
        const inputNode = inputType === 'number' ? <InputNumber /> :
            inputType === 'gender' ? (
                <Select>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                </Select>
            ) : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `请输入${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

interface CustomerProps {
    level: 0 | 1
}

const Customer: React.FC<CustomerProps> = ({ level }) => {
    const [form] = Form.useForm<DataType>();
    const [data, setData] = useState<DataType[]>([]);
    const [editingKey, setEditingKey] = useState<React.Key>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 15;

    useEffect(() => {
        document.title = '客户详情';
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未找到认证token');
            }

            const response = await fetch(level ? `${API_BASE_URL}/admin/customer/list` : `${API_BASE_URL}/customer/list`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const rawData = await response.json()
            // console.log(rawData)
            const processedData = [...rawData.results]
                .sort((a, b) => pinyinCompare(a.name, b.name))
                .map((item, index) => ({
                    ...item,
                    key: index.toString()
                }));

            setData(processedData);
        } catch (error) {
            message.error('获取数据失败');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const isEditing = (record: DataType) => record.key === editingKey;

    const edit = (record: DataType) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = async (key: React.Key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1 && !newData[index].customer_id) {
            newData.splice(index, 1);
            setData(newData);
        }
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];

                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('未找到认证token');
                    }
                    if (!item.customer_id) {
                        // 新增数据
                        item.customer_id = generateId()
                        const updatedItem = { ...item, ...row };
                        const { key, ...dataToSend } = updatedItem;
                        const response = await fetch(`${API_BASE_URL}/customer/create`, {
                            method: "POST",
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(dataToSend)
                        });
                        if (response.ok) {
                            message.success('添加成功');
                        }

                    } else {
                        // 更新数据
                        const updatedItem = { ...item, ...row };
                        const { key, ...dataToSend } = updatedItem;
                        const response = await fetch(`${API_BASE_URL}/admin/customer/update/${item.customer_id}`, {
                            method: "PUT",
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(dataToSend)
                        });
                        if (response.ok) {
                            message.success('更新成功');
                        }
                    }
                    const updatedItem = { ...item, ...row };
                    newData.splice(index, 1, updatedItem);
                    setData(newData);
                    setEditingKey('');
                } catch (error) {
                    console.error('Error saving data:', error);
                    message.error('保存失败');
                }
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (key: React.Key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
            const item = newData[index];
            try {
                if (item.customer_id) {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('未找到认证token');
                    }
                    const response = await fetch(`${API_BASE_URL}/admin/customer/delete/${item.customer_id}`, {
                        method: "DELETE",
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    console.log(item)
                    if (response.ok) {
                        newData.splice(index, 1);
                        setData(newData);
                        message.success('删除成功');
                    }
                }


            } catch (error) {
                console.error('Error deleting data:', error);
                message.error('删除失败');
            }
        }
    };

    const handleAdd = () => {
        const newKey = Date.now().toString();
        const newRecord: DataType = {
            key: newKey,
            customer_id: '',
            name: '',
            phone: '',
            gender: '男',
            address: '',
            price: "0",
            other: ''
        };

        setData([...data, newRecord]);
        edit(newRecord);
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '5%',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            editable: true,
            width: '10%',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            editable: true,
            width: '5%',
        },
        {
            title: '意向地址',
            dataIndex: 'address',
            key: 'address',
            editable: true,
            width: '15%',
        },
        {
            title: '期望价格',
            dataIndex: 'price',
            key: 'price',
            editable: true,
            width: '5%',
            render: (price: number) => `${price.toLocaleString()}万元`,
        },
        {
            title: '其他',
            dataIndex: 'other',
            key: 'other',
            editable: true,
            width: '25%',
        },
        level ? {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button type="link" onClick={() => save(record.key)}>
                            保存
                        </Button>
                        <Button type="link" onClick={() => cancel(record.key)}>
                            取消
                        </Button>
                    </Space>
                ) : (
                    <Space>
                        <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            编辑
                        </Button>
                        <Popconfirm title="确定要删除吗?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="link" disabled={editingKey !== ''}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        } : {}
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'string' :
                    col.dataIndex === 'gender' ? 'gender' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    // 分页处理
    const paginatedData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div style={{ padding: 24 }}>
            {(!level) ? <Button
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
                disabled={editingKey !== ''}
            >
                新增客户
            </Button> : null}
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={paginatedData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    loading={loading}
                />
            </Form>
            <Divider />
            <Pagination
                align='center'
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={(page: number) => setCurrentPage(page)}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    );
};

export default Customer;