interface requestJson {
    address: {
        province: number;
        city: number;
        district: number;
    };
    price: number[];
    size: number[];
    special: number[];
    room: number[];
    direction: number[];
    height: number[];
    renovation: number[];
    subjectmatter: number[];
}

function transformArrayToSearchJson(inputArray: number[][]): requestJson {
    let address = {
        province: -1,
        city: 1,
        district: 0,
    };
    if (inputArray.length !== 9) {
        throw new Error("输入数组必须是 9 行");
    }
    if (inputArray[0].length == 2) {
        address = {
            province: inputArray[0][0],
            city: inputArray[0][1],
            district: 1,
        };
    } else {
        address = {
            province: inputArray[0][0],
            city: inputArray[0][1],
            district: inputArray[0][2],
        };
    }



    const [
        price,
        size,
        special,
        room,
        direction,
        height,
        renovation,
        subjectmatter,
    ] = inputArray.slice(1);

    return {
        address,
        price,
        size,
        special,
        room,
        direction,
        height,
        renovation,
        subjectmatter,
    };
}

export default transformArrayToSearchJson;