import { Button } from "antd"
import React from "react"

interface DeleteButtonProps {
    type: number
}

const handleClick = async (type: number) => {
    try {
        const response = await fetch(`https://m1.apifoxmock.com/m1/6122515-5814159-default/house/delete/${type}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('删除失败');
        }
        window.close()
    } catch (err) {
        console.error('请求失败:', err);
    }
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ type }) => {
    return (
        <div>
            <Button type="primary" onClick={() => handleClick(type)}>
                删除房源
            </Button>
        </div>

    )
}

export default DeleteButton;