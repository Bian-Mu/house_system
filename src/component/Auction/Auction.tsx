import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Auction.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['正在进行', '即将开始', '已结束', '中止', '撤回'];

const Auction: React.FC = () => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    return (
        <div id="auction-select">
            <span className='select-type'>拍卖状态</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Auction;