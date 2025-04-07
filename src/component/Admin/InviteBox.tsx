import React, { useState } from 'react';
import { Input, message } from 'antd';
import { API_BASE_URL } from '../../constants';

interface InviteBoxProps {
    initialValue?: string;
}

const InviteBox: React.FC<InviteBoxProps> = ({
    initialValue = '',
}) => {
    const [value, setValue] = useState<string>(initialValue);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setValue(newValue);
    };

    const handleBlur = async () => {
        if (value === initialValue || !value.trim()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('未找到认证token');
            }

            const response = await fetch(`${API_BASE_URL}/admin/invite_code`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ invite_code: value })
            })

            if (response.ok) {
                alert(`更新成功！当前邀请码为${value}`);
                message.success('值已保存');
            }
        } catch (error) {
            message.error('更新失败');
            console.error('API Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Input
            value={value}
            onChange={handleChange}
            onPressEnter={handleBlur}
            placeholder="设置新邀请码"
            maxLength={6}
            minLength={6}
            disabled={loading}
        />
    );
};


export default InviteBox;