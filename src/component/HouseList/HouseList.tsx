import React, { useState } from 'react';
import { Card, Divider, Pagination } from 'antd';

import House from "../../assets/image.png"
import "./HouseList.css"

const { Meta } = Card;

const HouseCard: React.FC = () => (
    <Card
        hoverable
        className='single-card'
        cover={<img alt="example" src={House} />}
    >
        <Meta title="xx市xx区xxx街道" description="售价:xx万元" />
    </Card>
);



const HouseList = () => {
    let totalHouses = 50;
    const housesPerPage = 12;

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const renderHouseCards = () => {
        const startIndex = (currentPage - 1) * housesPerPage;
        const endIndex = startIndex + housesPerPage;
        const housesToRender = Array.from({ length: totalHouses })
            .slice(startIndex, endIndex)
            .map((_, index) => <HouseCard key={startIndex + index} />);

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
