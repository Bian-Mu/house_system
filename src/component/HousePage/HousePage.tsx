import House from "../../assets/image.png"

interface HousePageProps {
    HouseID: string
}

const HousePage: React.FC<HousePageProps> = ({ HouseID }) => {
    //get inform




    return (
        <div>
            <div className="housepage-pic">
                <img src={House} />

            </div>
            <div className="housepage-details">
                {HouseID}
            </div>
        </div>
    )
}


export default HousePage