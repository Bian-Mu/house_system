import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Select, Col, Row, Cascader } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { FormInstance } from "antd/es/form";
import RichModal from "../RichText/RichText";
import "./UploadBox.css";
import { uploadJsonData, uploadImages, uploadRichText } from "../../../utils/upload";

const { Option } = Select;

import area from "../../../assets/newArea.json"


interface Option {
    value: number;
    label: string;
    children?: Option[];
}

const options: Option[] = area as Option[]

interface UploadBoxProps {
    name: string
    type: number
}

const UploadBox: React.FC<UploadBoxProps> = ({ name, type }) => {
    const [form] = Form.useForm<FormInstance>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [code, setCode] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    //特色
    const specialOptions = [
        { value: "1", label: "一拍" },
        { value: "2", label: "二拍" },
        { value: "3", label: "变卖" },
        { value: "4", label: "特价" },
        { value: "5", label: "其他（无以上特色）" },
    ];



    const roomOptions = [
        { value: "1", label: "一室一厅" },
        { value: "2", label: "一室一厅一卫" },
        { value: "3", label: "两室一厅一卫" },
        { value: "4", label: "两室两厅一卫" },
        { value: "5", label: "两室两厅两卫" },
        { value: "6", label: "三室一厅一卫" },
        { value: "7", label: "三室一厅两卫" },
        { value: "8", label: "三室两厅两卫" },
        { value: "9", label: "四室两厅一卫" },
        { value: "10", label: "四室两厅两卫" },
        { value: "11", label: "其他" }]

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
    // const heightOptions = [
    //     { value: "1", label: "低楼层" },
    //     { value: "2", label: "中楼层" },
    //     { value: "3", label: "高楼层" },
    // ];

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


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // 重置表单
        setFileList([]); // 清空已上传的文件
        setCode("");
    };


    const handleSubmit = async () => {
        try {

            const initialvalues = await form.validateFields(); // 校验表单
            var values = Object.fromEntries(
                Object.entries(initialvalues).map(([key, value]) => {
                    if (key === 'address' && value.distinct && Array.isArray(value.distinct)) {
                        // 处理address.distinct，取数组最后一个值
                        return [key, {
                            ...value,
                            distinct: value.distinct[value.distinct.length - 1]
                        }];
                    }
                    if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
                        return [key, parseFloat(value)];
                    }
                    return [key, value];
                })
            );
            // console.log("表单数据:", values);
            // console.log("上传的文件:", fileList);
            // console.log(code);


            // 1. 首先上传JSON数据
            const IfNewID: number = await uploadJsonData(values, type);

            if (IfNewID == -1) {
                messageApi.open({
                    type: "error",
                    content: "上传有误或者重复"
                })
            } else {
                // 2. 然后上传图片
                await uploadImages(fileList, type, IfNewID as number);

                // 3. 最后上传富文本内容
                await uploadRichText(code, type, IfNewID as number);
                messageApi.success("上传成功")
            }

            handleCancel(); // 关闭模态框
        } catch (error) {
            console.error("上传过程中出错:", error);
            message.error({ content: `上传失败: ${error}`, key: 'uploadStatus' });
        }
    };

    // 图片上传前的处理
    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("只能上传图片文件！");
        }
        return isImage ? true : Upload.LIST_IGNORE;
    };

    // 图片上传状态变化
    const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList);
    };

    const customRequest = async ({ file, onSuccess, onError }: any) => {
        try {
            setTimeout(() => {
                onSuccess(null, file);
                message.success(`${file.name} 文件上传成功`);
            }, 1000);
        } catch (err) {
            onError(err);
            message.error(`${file.name} 文件上传失败`);
        }
    };



    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal}>
                {name}房源
            </Button>

            <Modal
                title="设置房源信息"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                width={800}
            >

                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                // normalize={(value) => value ? value[2] : null}
                                name={['address', 'distinct']}
                                label="地区编码"
                                rules={[{ required: true, message: "请输入地址！" }]}
                            >
                                <Cascader options={options} size='large' id="area-select" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['address', 'details']}
                                label="详细地址"
                                rules={[{ required: true, message: "请输入地址！" }]}
                            >
                                <Input placeholder="请输入详细地址" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="price"
                                label="价格（万元）"
                                rules={[{ required: true, message: "请输入价格！" }]}
                                className="four-col-form-item"
                            >
                                <Input type="number" placeholder="请输入房源价格" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="size"
                                label="房屋面积（平方米）"
                                rules={[{ required: true, message: "请输入房屋面积！" }]}
                                className="four-col-form-item"
                            >
                                <Input type="number" placeholder="请输入房屋面积" />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                name="special"
                                label="特色"
                                rules={[{ required: true, message: "请选择特色！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择特色">
                                    {specialOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                name="room"
                                label="户型"
                                rules={[{ required: true, message: "请选择户型！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择户型">
                                    {roomOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={16}>

                        <Col span={6}>
                            <Form.Item
                                name="direction"
                                label="房屋朝向"
                                rules={[{ required: true, message: "请选择房屋朝向！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择房屋朝向">
                                    {directionOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                name="height"
                                label="楼层"
                                rules={[{ required: true, message: "请输入楼层！" }]}
                                className="four-col-form-item"
                            >
                                <Input type="number" placeholder="请输入楼层" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="totalHeight"
                                label="总楼层"
                                rules={[{ required: true, message: "请输入总楼层！" }]}
                                className="four-col-form-item"
                            >
                                <Input type="number" placeholder="请输入总楼层" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="renovation"
                                label="装修程度"
                                rules={[{ required: true, message: "请选择装修程度！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择装修程度">
                                    {renovationOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="subjectmatter"
                                label="标的物类型"
                                rules={[{ required: true, message: "请选择标的物类型！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择标的物类型">
                                    {subjectMatterOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="相关图片（最多9张）">
                        <Upload
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            fileList={fileList}
                            multiple
                            maxCount={9}
                            listType="picture-card"
                            customRequest={customRequest}
                        >
                            {fileList.length >= 9 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>上传图片</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="房源详情">
                        <RichModal content={code} setContent={setCode} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default UploadBox;