import React, { useState, useEffect } from 'react';

interface HtmlViewProps {
    url: string;
    className?: string;
}

const HtmlView: React.FC<HtmlViewProps> = ({ url, className }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHtml = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const content = await response.text();
                setHtmlContent(content);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load content');
                console.error('Error fetching HTML:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHtml();
    }, [url]);

    if (loading) {
        return <div className={className}>Loading content...</div>;
    }

    if (error) {
        return <div className={className}>Error: {error}</div>;
    }

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default HtmlView;