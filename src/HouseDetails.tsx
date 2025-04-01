import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';


const HouseDetails: React.FC = () => {
    const [HouseID, setHouseID] = useState<number | null>(null);


    useEffect(() => {
        // 从 URL 参数中获取数据
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('houseid');
        if (data) {
            setHouseID(parseInt(data));
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
            <div id="house-details">
                {HouseID ? (
                    <div>
                        <p>当前房产ID: {HouseID}</p>
                    </div>
                ) : (
                    <p>未找到房产信息</p>
                )}
                <PicStream />
            </div>
        </div>
    );
};

export default HouseDetails;