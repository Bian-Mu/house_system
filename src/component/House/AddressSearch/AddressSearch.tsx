import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';


const AddressSearch: React.FC = () => (
    <Space direction="vertical" size="large">
        <Space.Compact size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="按地址查询" />
        </Space.Compact>
    </Space>
);

export default AddressSearch;