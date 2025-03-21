import React, { useEffect, useState } from 'react';

const NewPageApp: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        // 从 URL 参数中获取数据
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            const parsedData = JSON.parse(decodeURIComponent(data));
            setMessage(parsedData.message);
        }
    }, []);

    return (
        <div>
            <h1>这是新标签页的内容</h1>
            <p>{message}</p>
        </div>
    );
};

export default NewPageApp;