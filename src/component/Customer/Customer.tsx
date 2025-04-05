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

const { Option } = Select;

// 定义数据类型
interface DataType {
    key: React.Key;
    name: string;
    phone: string;
    gender: '男' | '女';
    address: string;
    price: number;
    other: string;
}

// 初始数据
const initialData: DataType[] = [
    {
        key: '1',
        name: '张三',
        phone: '13800138000',
        gender: '男',
        address: '北京市朝阳区',
        price: 50,
        other: '急需购房'
    },
    {
        key: '2',
        name: '李四',
        phone: '13900139000',
        gender: '女',
        address: '上海市浦东新区',
        price: 60,
        other: '学区房优先'
    },
    // 可以添加更多初始数据...
];

// 定义可编辑单元格的props类型
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'gender';
    record: DataType;
    index: number;
    children: React.ReactNode;
}

// 可编辑单元格组件
const EditableCell: React.FC<EditableCellProps> = ({
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

const Customer: React.FC = () => {
    const [form] = Form.useForm<DataType>();
    const [data, setData] = useState<DataType[]>(initialData);
    const [editingKey, setEditingKey] = useState<React.Key>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 15;

    useEffect(() => {
        document.title = '客户详情';
    }, []);

    const isEditing = (record: DataType) => record.key === editingKey;

    const edit = (record: DataType) => {
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
                message.success('保存成功');
            } else {
                message.error('保存失败');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key: React.Key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
            newData.splice(index, 1);
            setData(newData);
            message.success('删除成功');
        }
    };

    const handleAdd = () => {
        const newKey = Date.now().toString();
        const newRecord: DataType = {
            key: newKey,
            name: '',
            phone: '',
            gender: '男',
            address: '',
            price: 0,
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
        {
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
                        <Button type="link" onClick={cancel}>
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
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'number' :
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
            <Button
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
                disabled={editingKey !== ''}
            >
                新增客户
            </Button>
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