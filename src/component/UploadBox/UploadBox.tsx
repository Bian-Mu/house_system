import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { FormInstance } from "antd/es/form";

const UploadBox: React.FC = () => {
    const [form] = Form.useForm<FormInstance>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // 打开模态框
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 关闭模态框
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // 重置表单
        setFileList([]); // 清空已上传的文件
    };

    // 提交表单
    const handleSubmit = async () => {
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
            >
                <Form form={form} layout="vertical">
                    {/* 地址 */}
                    <Form.Item
                        name="address"
                        label="地址"
                        rules={[{ required: true, message: "请输入地址！" }]}
                    >
                        <Input placeholder="请输入房源地址" />
                    </Form.Item>

                    {/* 价格 */}
                    <Form.Item
                        name="price"
                        label="价格"
                        rules={[{ required: true, message: "请输入价格！" }]}
                    >
                        <Input type="number" placeholder="请输入房源价格" />
                    </Form.Item>

                    {/* 状态 */}
                    <Form.Item
                        name="status"
                        label="状态"
                        rules={[{ required: true, message: "请输入状态！" }]}
                    >
                        <Input placeholder="请输入房源状态" />
                    </Form.Item>

                    {/* 图片上传 */}
                    <Form.Item label="图片上传">
                        <Upload
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            fileList={fileList}
                            multiple
                            maxCount={9}
                        >
                            <Button icon={<UploadOutlined />}>选择图片（最多 9 张）</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UploadBox;