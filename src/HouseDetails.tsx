import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';
import "./HouseDetails.css"
import House from "./assets/image.png"
import tgl from "./assets/Login.png"
import { Divider } from 'antd';
import UploadBox from './component/House/UploadBox/UploadBox';

import signal from "./assets/signal.jpg"
import DeleteButton from './component/House/DeleteButton/DeleteButton';
// const imageList = [
//     House, tgl, House
// ]


interface Result {
    basic: {
        address: {
            distinct: number;
            details: string;
        }
        price: number;
        size: number;
        room: number;
        direction: number;
        uploadTime: string;
    };
    images: string[];
    richText: string;
}


const HouseDetails: React.FC = () => {
    const [HouseID, setHouseID] = useState<number>(0);
    const [Data, setData] = useState<Result>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = '房源详情';
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('id');
        if (data) {
            setHouseID(parseInt(data));
            fetchHouseDetails();
        }
    }, [HouseID]);

    const fetchHouseDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('未找到认证token');

            const response = await fetch(`https://m1.apifoxmock.com/m1/6122515-5814159-default/house/info/${HouseID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`  // 添加Authorization头
                },
            });

            const data = await response.json();

            // if (data.success) {
            setData(data.results);
            // }
        } catch (err) {
            console.error('请求失败:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>加载中...</div>;
    }

    if (Data) {
        return (
            <div className='details-page'>
                <div id="signal">
                    <img src={signal} />
                    <div id='button-box'>
                        <DeleteButton type={HouseID} />
                        <div id="reupload-box">
                            <UploadBox name='修改' type={HouseID} />
                        </div>

                    </div>
                </div>
                <div id="house-details">
                    <div id='house-brief'>
                        <PicStream imageList={Data.images} />
                        <div>
                            <h2>{Data.basic.address.details}</h2>
                            <h3>定 价 ： {Data.basic.price} 万元</h3>
                        </div>
                    </div>
                    <Divider />
                    <div id='house-richtext'>
                        <iframe
                            src={Data.richText}
                            title="Rich Text Content"
                            style={{ width: '100%', height: '500px', border: 'none' }}
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>

            </div>

        );
    }
};

export default HouseDetails;