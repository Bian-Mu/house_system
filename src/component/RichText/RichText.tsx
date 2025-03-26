import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichText: React.FC<EditorProps> = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    );
};

const RichModal: React.FC = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>富文本编辑器</h1>
            <RichText value={content} onChange={handleContentChange} />
            <div style={{ marginTop: '20px' }}>
                <h2>预览:</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default RichModal;