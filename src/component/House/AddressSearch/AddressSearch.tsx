import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

interface AddressSearchProps {
    onEnter: Function
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onEnter }) => {

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onEnter((e.target as HTMLInputElement).value);
    };


    return (
        <Space direction="vertical" size="large" style={{ marginTop: 15 }}>
            <Space.Compact size="large">
                <Input addonBefore={<SearchOutlined />} placeholder="按地址查询" onPressEnter={handlePressEnter} />
            </Space.Compact>
        </Space>
    )


}



export default AddressSearch;