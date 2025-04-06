// 上传JSON数据
export const uploadJsonData = async (jsonData: any, type: number) => {
    const urlNew = 'https://m1.apifoxmock.com/m1/6122515-5814159-default/house/create/info'
    const urlModify = `https://m1.apifoxmock.com/m1/6122515-5814159-default/house/update/info/${type}`
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('未找到认证token');

        const response = await fetch(type == 0 ? urlNew : urlModify, {
            method: type == 0 ? 'POST' : "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('JSON数据上传失败');
        }
        console.log('JSON数据上传成功');
        const data = await response.json();
        if (type == 0) {
            return data.houseID;
        } else {
            return 0;
        }

    } catch (error) {
        console.error('上传JSON数据时出错:', error);
        throw error;
    }
};

// 上传图片
export const uploadImages = async (images: any[], type: number, newID: number) => {
    const urlNew = `https://m1.apifoxmock.com/m1/6122515-5814159-default/house/create/image/${newID}`
    const urlModify = `https://m1.apifoxmock.com/m1/6122515-5814159-default/house/update/image/${type}`

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('未找到认证token');

        const formData = new FormData();
        images.forEach((file) => {
            formData.append('images', file.originFileObj);
        });

        const response = await fetch(type == 0 ? urlNew : urlModify, {
            method: type == 0 ? 'POST' : "PUT",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('图片上传失败');
        }

        console.log('图片上传成功');
    } catch (error) {
        console.error('上传图片时出错:', error);
        throw error;
    }
};

// 上传富文本内容（作为HTML文件上传）
export const uploadRichText = async (htmlContent: string, type: number, newID: number) => {
    const urlNew = `https://m1.apifoxmock.com/m1/6122515-5814159-default/house/create/richtext/${newID}`
    const urlModify = `https://m1.apifoxmock.com/m1/6122515-5814159-default/house/update/richtext/${type}`

    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('未找到认证token');


        const blob = new Blob([htmlContent], { type: 'text/html' });

        const formData = new FormData();
        formData.append('richText', blob, `${type == 0 ? newID : type}.html`);


        const response = await fetch(type == 0 ? urlNew : urlModify, {
            method: type == 0 ? 'POST' : "PUT",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('富文本内容上传失败');
        }

        console.log('富文本内容上传成功');
    } catch (error) {
        console.error('上传富文本内容时出错:', error);
        throw error;
    }
};