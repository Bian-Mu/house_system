import React from 'react';
import { Card } from 'antd';

import House from "../../assets/image.png"
const { Meta } = Card;

const HouseCard: React.FC = () => (
    <Card
        hoverable
        style={{ width: 200 }}
        cover={<img alt="example" src={House} />}
    >
        <Meta title="xx市xx区xxx街道" description="售价:xx万元" />
    </Card>
);

export default HouseCard;