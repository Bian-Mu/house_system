import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';

import "./HouseDetails.css"




import House from "./assets/image.png"
import tgl from "./assets/Login.png"
import { Divider } from 'antd';

const imageList = [
    House, tgl, House
]



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

        // // 可选：在组件卸载时恢复原来的 title
        // return () => {
        //     document.title = '房产';
        // };
    }, []);

    return (
        <div id="house-details">
            <div id='house-brief'>

                <PicStream imageList={imageList} />
                <div>
                    <h2>四川省成都市金牛区某个小区1幢1单元101室</h2>
                    <h3>定 价 ： xxx 万元</h3>
                </div>
            </div>
            <Divider />
            <div id='house-richtext'>
                这里是富文本框
            </div>
        </div>
    );
};

export default HouseDetails;