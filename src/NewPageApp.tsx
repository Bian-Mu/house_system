import React, { useEffect, useState } from 'react';
import HousePage from './component/HousePage/HousePage';
import RichModal from './component/RichText/RichText';

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

    useEffect(() => {
        // 设置标签页的 title
        document.title = 'xxx详情';

        // 可选：在组件卸载时恢复原来的 title
        return () => {
            document.title = '房产';
        };
    }, []);

    return (
        <div>
            <h1>这是新标签页的内容</h1>
            <HousePage HouseID='dasefasef' />
            <RichModal />
        </div>
    );
};

export default NewPageApp;