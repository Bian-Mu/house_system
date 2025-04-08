import React, { useEffect, useState } from 'react';
import PicStream from './component/SingleInfo/PicStream/PicStream';
import "./HouseDetails.css"
import { Divider } from 'antd';
import UploadBox from './component/House/UploadBox/UploadBox';

import signal from "./assets/signal.jpg"
import DeleteButton from './component/House/DeleteButton/DeleteButton';
import HtmlView from './component/House/HtmlView/HtmlView';
import { API_BASE_URL } from './constants';
import reverseValuesToLabels from './utils/reverse';


interface Result {
    basic: {
        address: {
            distinct: number;
            details: string;
        }
        height: number | string;
        price: number;
        renovation: number | string;
        special: number | string;
        subjectmatter: number | string;
        size: number;
        room: number | string;
        direction: number | string;
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
            if (HouseID) {
                fetchHouseDetails();
            }

        }
    }, [HouseID]);

    const fetchHouseDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('未找到认证token');

            const response = await fetch(`${API_BASE_URL}/house/info/${HouseID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`  // 添加Authorization头
                },
            });

            const data = await response.json();

            setData(reverseValuesToLabels(data.results));
            console.log(Data)
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
                    <p>基础信息</p>
                    <div id='house-basic'>
                        <span className='basic-info-span-title'>楼层：</span>
                        <span className='basic-info-span'>{Data.basic.height}</span>
                        <span className='basic-info-span-title'>户型：</span>
                        <span className='basic-info-span'>{Data.basic.room}</span>
                        <span className='basic-info-span-title'>类型：</span>
                        <span className='basic-info-span'>{Data.basic.subjectmatter}</span>
                        <span className='basic-info-span-title'>面积：</span>
                        <span className='basic-info-span'>{Data.basic.size} 平方米</span>
                        <span className='basic-info-span-title'>装修：</span>
                        <span className='basic-info-span'>{Data.basic.renovation}</span>
                        <span className='basic-info-span-title'>特色：</span>
                        <span className='basic-info-span'>{Data.basic.special}</span>
                    </div>
                    <Divider />
                    <p>房屋详情</p>
                    <div id='house-richtext'>
                        <HtmlView url={Data.richText} />
                    </div>
                </div>

            </div>

        );
    }
};

export default HouseDetails;