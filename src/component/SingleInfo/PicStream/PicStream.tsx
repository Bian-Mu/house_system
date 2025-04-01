import React from 'react';
import { Carousel } from 'antd';
import "./PicStream.css"

interface PicStreamProps {
    imageList: string[]
}

const PicStream: React.FC<PicStreamProps> = ({ imageList }) => {


    return (
        <Carousel autoplay dots dotPosition='bottom' className='PicStreamBox'>
            {imageList.map((img, index) => (
                <div key={index}>
                    <img src={img} alt={`图片${index + 1}`} style={{ width: "450px", height: "290px" }} />
                </div>
            ))}
        </Carousel>
    );
};

export default PicStream;