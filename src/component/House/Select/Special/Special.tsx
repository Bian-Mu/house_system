import React, { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Special.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['可贷款', '全程服务', '特价房', '地铁房', '其他'];

interface SpecialProps {
    setReturnValue: Function
}

const Special: React.FC<SpecialProps> = ({ setReturnValue }) => {
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
        <div id="Special-select">
            <span className='select-type'>特色</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Special;