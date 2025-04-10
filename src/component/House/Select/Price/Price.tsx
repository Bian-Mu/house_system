import React, { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Price.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['100以内', '100到300', '300到500', '500到1000', '1000以上'];

interface PriceProps {
    setReturnValue: Function
}

const Price: React.FC<PriceProps> = ({ setReturnValue }) => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
        const codes = list.map(option => {
            const index = plainOptions.indexOf(option);
            return index + 1;
        });
        codes.length > 0 ? setReturnValue(codes) : setReturnValue([]);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        const isCheckedAll = e.target.checked;
        setCheckedList(isCheckedAll ? plainOptions : []);
        isCheckedAll ? setReturnValue([1, 2, 3, 4, 5]) : setReturnValue([]);
    };

    return (
        <div id="Price-select">
            <span className='select-type'>价格（万元）</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Price;