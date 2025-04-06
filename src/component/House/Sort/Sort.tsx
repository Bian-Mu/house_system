import React from 'react';
import { Select, Space } from 'antd';
import "./Sort.css"
import UploadBox from '../UploadBox/UploadBox';



interface SortProps {
    onWayChange: (value: string) => void;
    onUpDownChange: (value: string) => void;
}

const Sort: React.FC<SortProps> = ({ onWayChange, onUpDownChange }) => (
    <Space wrap>
        <Select
            className='sort-item'
            defaultValue="default"
            style={{ width: 120 }}
            onChange={onWayChange}
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
            onChange={onUpDownChange}
            options={[
                { value: 'default', label: '默认' },
                { value: 'down', label: '降序' },
                { value: 'up', label: '升序' },
            ]}
        />
        <div id='upload-box'>
            <UploadBox name='上传' type={0} />
        </div>

    </Space>
);

export default Sort;