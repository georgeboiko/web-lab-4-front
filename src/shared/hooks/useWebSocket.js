import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url) => {
    const [lastMessage, setLastMessage] = useState(null);
    const ws = useRef(null);
    const reconnectTimeout = useRef(null);

    useEffect(() => {
        const connect = () => {
            const wsUrl = url;
            
            ws.current = new WebSocket(wsUrl);

            ws.current.onopen = () => {
                console.log('WebSocket connected');
                if (reconnectTimeout.current) {
                    clearTimeout(reconnectTimeout.current);
                }
            };

            ws.current.onmessage = (event) => {
                setLastMessage(event);
            };

            ws.current.onclose = (event) => {
                console.log('WebSocket disconnected');
                
                reconnectTimeout.current = setTimeout(() => {
                    console.log('Reconnecting WebSocket...');
                    connect();
                }, 100);
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, []);

    return { lastMessage };
};