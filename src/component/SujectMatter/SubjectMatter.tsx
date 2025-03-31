import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

import "./SubjectMatter.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['住宅用地', '商业用房', '工业用房', '其他用房'];

interface SubjectMatterProps {
    setReturnValue: Function
}

const SubjectMatter: React.FC<SubjectMatterProps> = ({ setReturnValue }) => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
        const codes = list.map(option => {
            const index = plainOptions.indexOf(option);
            return index + 1; // 住宅用地=1, 商业用房=2, 工业用房=3, 其他用房=4
        });
        codes.length > 0 ? setReturnValue(codes) : setReturnValue([]);
        // console.log(codes.length > 0 ? codes.join(',') : '0');
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        const isCheckedAll = e.target.checked;
        setCheckedList(isCheckedAll ? plainOptions : []);
        isCheckedAll ? setReturnValue([1, 2, 3, 4]) : setReturnValue([]);
        // console.log(isCheckedAll ? '1,2,3,4' : '0');
    };

    return (
        <div id="subjectmatter-select">
            <span className='select-type'>标的物类型</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default SubjectMatter;