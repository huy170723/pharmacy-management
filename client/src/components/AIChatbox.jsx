import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

const AIChatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Chào bạn! Tôi là Trợ lý Dược sĩ AI. Tôi có thể giúp gì cho bạn?",
            sender: 'ai'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const text = input.trim();
        setMessages(prev => [...prev, { text, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await api.post('/chat', { message: text });
            const reply = res?.data?.reply?.trim();

            setMessages(prev => [
                ...prev,
                {
                    text: reply || 'AI chưa thể trả lời, bạn thử lại nhé!',
                    sender: 'ai'
                }
            ]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev,
                {
                    text: 'Không kết nối được AI. Vui lòng kiểm tra backend.',
                    sender: 'ai'
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={styles.container}>
            {/* ===== NÚT TRÒN + CHỮ HỖ TRỢ ===== */}
            {!isOpen && (
                <div style={styles.fabWrapper} onClick={() => setIsOpen(true)}>
                    <div style={styles.fabCircle}>💊</div>
                    <div style={styles.fabText}>Hỗ trợ</div>
                </div>
            )}

            {/* ===== CHAT WINDOW ===== */}
            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={styles.onlineStatus}></div>
                            <b>Trợ lý Dược sĩ AI</b>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
                    </div>

                    <div style={styles.body}>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={m.sender === 'user'
                                    ? styles.userMsgWrapper
                                    : styles.aiMsgWrapper}
                            >
                                <div style={m.sender === 'user' ? styles.userMsg : styles.aiMsg}>
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div style={styles.aiMsgWrapper}>
                                <div style={styles.aiMsg}>Dược sĩ đang trả lời…</div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div style={styles.footer}>
                        <input
                            style={styles.input}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Hỏi về thuốc, liều dùng, sức khỏe…"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            style={{ ...styles.sendBtn, opacity: isLoading ? 0.6 : 1 }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ================= STYLES ================= */

const styles = {
    container: {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
    },

    /* ==== FAB SUPPORT ==== */
    fabWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
    },
    fabCircle: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#1250dc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '28px',
        boxShadow: '0 6px 20px rgba(18, 80, 220, 0.45)'
    },
    fabText: {
        marginTop: '6px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#1250dc'
    },

    /* ==== CHAT WINDOW ==== */
    chatWindow: {
        width: '350px',
        height: '480px',
        background: '#fff',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        overflow: 'hidden'
    },
    header: {
        padding: '15px',
        background: '#1250dc',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    onlineStatus: {
        width: '10px',
        height: '10px',
        background: '#4ade80',
        borderRadius: '50%',
        border: '2px solid #fff'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '18px'
    },
    body: {
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        background: '#f8f9fa'
    },
    userMsgWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '8px'
    },
    aiMsgWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '8px'
    },
    userMsg: {
        maxWidth: '80%',
        background: '#1250dc',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '15px 15px 2px 15px',
        fontSize: '14px'
    },
    aiMsg: {
        maxWidth: '80%',
        background: '#fff',
        color: '#333',
        padding: '10px 14px',
        borderRadius: '15px 15px 15px 2px',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    footer: {
        padding: '15px',
        display: 'flex',
        gap: '10px',
        borderTop: '1px solid #eee'
    },
    input: {
        flex: 1,
        padding: '10px 15px',
        borderRadius: '25px',
        border: '1px solid #ddd',
        outline: 'none'
    },
    sendBtn: {
        background: '#1250dc',
        color: '#fff',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        cursor: 'pointer'
    }
};

export default AIChatbox;
