import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';
import "./HouseDetails.css"
import House from "./assets/image.png"
import tgl from "./assets/Login.png"
import { Divider } from 'antd';

const imageList = [
    House, tgl, House
]

interface IResponseData {
    success: boolean;
    results?: any;
}

const HouseDetails: React.FC = () => {
    const [HouseID, setHouseID] = useState<number | null>(null);
    const [Data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('houseid');
        if (data) {
            setHouseID(parseInt(data));
        }
    }, []);

    useEffect(() => {
        document.title = '房源详情';
    }, []);

    useEffect(() => {
        if (HouseID !== null) {
            fetchHouseDetails();
        }
    }, [HouseID]);

    const fetchHouseDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch('你的后端API地址', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: HouseID
                })
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