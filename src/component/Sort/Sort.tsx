import React from 'react';
import { Select, Space } from 'antd';
import "./Sort.css"


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const Sort: React.FC = () => (
    <Space wrap>
        <Select
            className='sort-item'
            defaultValue="default"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: 'default', label: '默认排序' },
                { value: 'price', label: '价格排序' },
                { value: 'time', label: '时间排序' },
            ]}
        />
        <Select
            className='sort-item'
            defaultValue="default"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
                { value: 'default', label: '默认' },
                { value: 'down', label: '降序' },
                { value: 'up', label: '升序' },
            ]}
        />
    </Space>
);

export default Sort;