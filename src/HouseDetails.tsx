import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';
import "./HouseDetails.css"
import House from "./assets/image.png"
import tgl from "./assets/Login.png"
import { Divider } from 'antd';
import { data } from 'react-router';
import UploadBox from './component/House/UploadBox/UploadBox';

import signal from "./assets/signal.jpg"
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

interface IResponseData {
    success: boolean;
    results: Result;
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
            const response = await fetch(`https://m1.apifoxmock.com/m1/6122515-5814159-default/house/idSearch?id=${HouseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const json: IResponseData = await response.json();

            if (json.success) {
                setData(json.results);
            }
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
            <>
                <div id="signal">
                    <img src={signal} />
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
                        {Data.richText}
                    </div>
                </div>
                <div id='button-box'>
                    {/* <DeleteButton type={HouseID}/> */}
                    <UploadBox name='修改' type={HouseID} />
                </div>
            </>

        );
    }
};

export default HouseDetails;