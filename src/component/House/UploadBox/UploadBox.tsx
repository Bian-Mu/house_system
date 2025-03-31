import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Select, Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { FormInstance } from "antd/es/form";
import RichModal from "../RichText/RichText";
import "./UploadBox.css";

const { Option } = Select;

const UploadBox: React.FC = () => {
    const [form] = Form.useForm<FormInstance>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [code, setCode] = useState("");

    // 标的物类型选项
    const subjectMatterOptions = [
        { value: "住宅用地", label: "住宅用地" },
        { value: "商业用房", label: "商业用房" },
        { value: "工业用房", label: "工业用房" },
        { value: "其他用房", label: "其他用房" },
    ];

    // 资产类型选项
    const propertyOptions = [
        { value: "涉刑资产", label: "涉刑资产" },
        { value: "诉讼资产", label: "诉讼资产" },
        { value: "破产资产", label: "破产资产" },
        { value: "自行处置", label: "自行处置" },
    ];

    // 状态选项
    const statusOptions = [
        { value: "正在进行", label: "正在进行" },
        { value: "即将开始", label: "即将开始" },
        { value: "已结束", label: "已结束" },
        { value: "中止", label: "中止" },
        { value: "撤回", label: "撤回" },
    ];

    // 打开模态框
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 关闭模态框
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // 重置表单
        setFileList([]); // 清空已上传的文件
        setCode("");
    };

    // 提交表单
    const handleSubmit = async () => {
        console.log(code)
        try {
            const values = await form.validateFields(); // 校验表单
            console.log("表单数据:", values);
            console.log("上传的文件:", fileList);

            // 在这里编写上传逻辑，例如调用 API
            // await uploadData(values, fileList);

            message.success("上传成功！");
            handleCancel(); // 关闭模态框
        } catch (error) {
            console.error("表单校验失败:", error);
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

    //图片上传逻辑
    const customRequest = async ({ file, onSuccess, onError }: any) => {
        try {
            // 这里应该是你的实际上传逻辑，例如：
            // const formData = new FormData();
            // formData.append('file', file);
            // const response = await axios.post('/api/upload', formData);

            // 模拟上传成功
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
        <div id="upload-box">
            {/* 上传按钮 */}
            <Button type="primary" onClick={showModal}>
                上传房源
            </Button>

            {/* 模态框 */}
            <Modal
                title="上传房源信息"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                width={800}
            >
                <Form form={form} layout="vertical">
                    {/* 地址 - 单独一行 */}
                    <Form.Item
                        name="address"
                        label="地址（按照”xx省xx市xx区+详细地址“的格式，例如”四川省成都市金牛区xx小区第5单元302室“）"
                        rules={[{ required: true, message: "请输入地址！" }]}
                    >
                        <Input placeholder="请输入房源地址" />
                    </Form.Item>

                    <Row gutter={16}>
                        {/* 价格 */}
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

                        {/* 标的物类型 */}
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

                        {/* 资产类型 */}
                        <Col span={6}>
                            <Form.Item
                                name="property"
                                label="资产类型"
                                rules={[{ required: true, message: "请选择资产类型！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择资产类型">
                                    {propertyOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* 拍卖状态 */}
                        <Col span={6}>
                            <Form.Item
                                name="auction"
                                label="拍卖状态"
                                rules={[{ required: true, message: "请选择拍卖状态！" }]}
                                className="four-col-form-item"
                            >
                                <Select placeholder="请选择拍卖状态">
                                    {statusOptions.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>


                    {/* 图片上传 - 单独一行 */}
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

                    {/* 富文本上传 - 单独一行 */}
                    <Form.Item label="房源详情">
                        <RichModal content={code} setContent={setCode} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};


export default UploadBox;