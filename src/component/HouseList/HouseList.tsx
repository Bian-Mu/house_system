import React, { useState } from 'react';
import { Card, Divider, Pagination } from 'antd';

import House from "../../assets/image.png"
import "./HouseList.css"

const { Meta } = Card;

interface HouseCardShow {
    HouseCover: string
    HouseAdress: string
    HousePrice: number
}

interface HouseCardProps {
    H: HouseCardShow
}

const houseTest: HouseCardShow = {
    HouseCover: House,
    HouseAdress: "成都市xxx区xx街道xx小区1幢1单元302室",
    HousePrice: 123
}


const HouseCard: React.FC<HouseCardProps> = ({ H }) => (
    <Card
        hoverable
        className='single-card'
        cover={<img alt="example" src={H.HouseCover} />}
    >
        <Meta title={H.HouseAdress} description={"当前标定价格：" + H.HousePrice + "万元"} />
    </Card>
);



const HouseList = () => {
    let totalHouses = 50;
    const housesPerPage = 9;

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const renderHouseCards = () => {
        const startIndex = (currentPage - 1) * housesPerPage;
        const endIndex = startIndex + housesPerPage;
        const housesToRender = Array.from({ length: totalHouses })
            .slice(startIndex, endIndex)
            .map((_, index) => <HouseCard key={startIndex + index} H={houseTest} />);

        return housesToRender;
    };

    return (
        <div>
            <div id="house-cards" >
                {renderHouseCards()}
            </div>
            <Divider />
            <div id='page-convert'>
                <Pagination
                    current={currentPage}
                    total={totalHouses}
                    pageSize={housesPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>

        </div>
    );
};

export default HouseList;
