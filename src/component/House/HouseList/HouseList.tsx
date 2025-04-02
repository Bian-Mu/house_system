import React, { useState } from 'react';
import { Card, Divider, Pagination } from 'antd';

import "./HouseList.css"

const { Meta } = Card;

interface HouseCardShow {
    cover: string
    address: string
    price: number
    size: number
    id: number
    uploadTime: string
}

interface HouseCardProps {
    H: HouseCardShow
}

const HouseCard: React.FC<HouseCardProps> = ({ H }) => {
    const handleClick = () => {
        window.open(`/houseInfo?id=${H.id}`, '_blank');
    };

    return (
        <Card
            onClick={handleClick}
            hoverable
            className='single-card'
            cover={<img alt="example" src={H.cover} />}
        >
            <Meta title={H.address} description={`实际面积：${H.size}平方米　　　　价格：${H.price}万元`} />
        </Card>
    )
}


interface HouseListProps {
    list: HouseCardShow[]
}

const HouseList: React.FC<HouseListProps> = ({ list }) => {
    let totalHouses = list.length;
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
            .map((_, index) => <HouseCard key={startIndex + index} H={list[startIndex + index]} />);

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
