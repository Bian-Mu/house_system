import "./RichText.css";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichModalProps {
    content: string
    setContent: Function
}

const RichModal: React.FC<RichModalProps> = ({ content, setContent }) => {
    const myColors = [
        "white",
        "grey",
        "blue",
        "green",
        "red",
        "yellow",
        "purple"
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: myColors }],
            [{ background: myColors }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "list",
        "link",
        "color",
        "image",
        "background",
        "align"
    ];


    const handleProcedureContentChange = (content: any) => {
        setContent(content);
    };
    return (
        <>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleProcedureContentChange}
            />
        </>
    );
}

export default RichModal;