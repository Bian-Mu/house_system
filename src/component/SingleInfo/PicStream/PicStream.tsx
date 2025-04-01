import React from 'react';
import { Carousel } from 'antd';
import "./PicStream.css"

import House from "../../../assets/image.png"
import tgl from "../../../assets/Login.png"



const imageList = [
    House, tgl, House
]


const PicStream: React.FC = () => {


    return (
        <Carousel autoplay dots dotPosition='bottom' className='PicStreamBox'>
            {imageList.map((img, index) => (
                <div key={index}>
                    <img src={img} alt={`图片${index + 1}`} style={{ width: "100%" }} />
                </div>
            ))}
        </Carousel>
    );
};

export default PicStream;