import React, { useState, useMemo, useEffect } from 'react';
import { Card, Divider, Pagination } from 'antd';
import "./HouseList.css"

const { Meta } = Card;

interface HouseCardShow {
    cover: string
    address: string
    price: number
    size: number
    houseID: number
    uploadTime: string
}

interface HouseCardProps {
    H: HouseCardShow
}

const HouseCard: React.FC<HouseCardProps> = ({ H }) => {
    const handleClick = () => {
        window.open(`/houseInfo?id=${H.houseID}`, '_blank');
    };

    return (
        <Card
            onClick={handleClick}
            hoverable
            className='single-card'
            cover={<img alt="example" src={H.cover} style={{ "height": "220px" }} />}
        >
            <Meta title={H.address} description={`实际面积：${H.size}平方米　　　价格：${H.price}万元`} />
        </Card>
    )
}

interface HouseListProps {
    list: HouseCardShow[]
    sort: string[]
}

const HouseList: React.FC<HouseListProps> = ({ list, sort }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const housesPerPage = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [sort, list]);

    const sortedList = useMemo(() => {
        if (!list) return [];

        const [sortBy, sortDirection] = sort;

        if (sortBy === 'default') {
            return [...list];
        }

        return [...list].sort((a, b) => {
            if (sortBy === 'price') {
                return sortDirection === 'up' ? a.price - b.price : b.price - a.price;
            } else if (sortBy === 'time') {
                return sortDirection === 'up'
                    ? a.uploadTime.localeCompare(b.uploadTime)
                    : b.uploadTime.localeCompare(a.uploadTime);
            }
            return 0;
        });
    }, [list, sort]);

    const totalHouses = sortedList.length;

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const renderHouseCards = () => {
        const startIndex = (currentPage - 1) * housesPerPage;
        const endIndex = startIndex + housesPerPage;
        return sortedList
            .slice(startIndex, endIndex)
            .map((house, _) => <HouseCard key={house.houseID} H={house} />);
    };

    if (!list || list.length === 0) {
        return (
            <div>
                <div id="no-house-cards">
                    暂无对应查询房源
                </div>
            </div>
        );
    }

    return (
        <div>
            <div id="house-cards">
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