

interface Result {
    basic: {
        address: {
            distinct: number;
            details: string;
        }
        height: number;
        price: number;
        renovation: number;
        specail: number;
        subjectmatter: number;
        size: number;
        room: number;
        direction: number;
        uploadTime: string;
    };
    images: string[];
    richText: string;
}


//特色
const specialOptions = [
    { value: "1", label: "可贷款" },
    { value: "2", label: "全程服务" },
    { value: "3", label: "特价房" },
    { value: "4", label: "地铁房" },
    { value: "5", label: "其他（无以上特色）" },
];


// 户型
const roomOptions = [
    { value: "1", label: "一室" },
    { value: "2", label: "二室" },
    { value: "3", label: "三室" },
    { value: "4", label: "四室" },
    { value: "5", label: "四室以上" },
];

// 房屋朝向
const directionOptions = [
    { value: "1", label: "南" },
    { value: "2", label: "北" },
    { value: "3", label: "东" },
    { value: "4", label: "西" },

    { value: "5", label: "东南" },
    { value: "6", label: "东北" },
    { value: "7", label: "西北" },
    { value: "8", label: "西南" },

    { value: "9", label: "东西" },
    { value: "10", label: "南北" },
];

// 楼层
const heightOptions = [
    { value: "1", label: "低楼层" },
    { value: "2", label: "中楼层" },
    { value: "3", label: "高楼层" },
];

// 装修程度
const renovationOptions = [
    { value: "1", label: "毛坯" },
    { value: "2", label: "普通装修" },
    { value: "3", label: "精装修" },
    { value: "4", label: "其他" },
];



// 标的物类型选项
const subjectMatterOptions = [
    { value: "1", label: "住宅用地" },
    { value: "2", label: "工业用房" },
    { value: "3", label: "商业用房" },
    { value: "4", label: "其他用房" },
];



export default function reverseValuesToLabels(result: Result): Result {
    const findLabel = (options: Array<{ value: string, label: string }>, value: number): string => {
        const option = options.find(opt => opt.value === value.toString());
        return option ? option.label : value.toString();
    };

    const newResult = JSON.parse(JSON.stringify(result));

    newResult.basic.height = findLabel(heightOptions, result.basic.height);
    newResult.basic.renovation = findLabel(renovationOptions, result.basic.renovation);
    newResult.basic.specail = findLabel(specialOptions, result.basic.specail);
    newResult.basic.subjectmatter = findLabel(subjectMatterOptions, result.basic.subjectmatter);
    newResult.basic.room = findLabel(roomOptions, result.basic.room);
    newResult.basic.direction = findLabel(directionOptions, result.basic.direction);

    return newResult;
}
