

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ReactSVG } from 'react-svg';
import UserIdCard from '../components/server-dashboard/user-id-card';
import "../sass/server-dashboard.scss";
import axios from 'axios';

const socket = io('https://backend.dmv-gc.com');

function ServerDashboard() {
    const [activeTab, setActiveTab] = useState('support-chat');
    const [activeInnerTab, setActiveInnerTab] = useState('live-chat');
    const [activeChatId, setActiveChatId] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeChats, setActiveChats] = useState([]);
    const [supportBotChats, setSupportBotChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null); // Track selected chat
    const [selectedChatMessages, setSelectedChatMessages] = useState([]); 

    useEffect(() => {
        const fetchActiveChats = async () => {
            try {
                const response = await axios.get('https://backend.dmv-gc.com/api/active-chats');
                setActiveChats(response.data.map(chat => ({
                    chatId: chat._id,
                    name: chat.senderId,  // or any other identifier you want to display
                    message: chat.lastMessage,
                })));
            } catch (error) {
                console.error('Error fetching active chats:', error);
            }
        };

        fetchActiveChats();

        socket.emit('joinChat', 'admin-room');

        socket.on('receiveMessage', (data) => {
            const { chatId, senderId, senderRole, message, name } = data;

            if (senderRole !== 'admin') {
                setActiveChats((prevChats) => {
                    const existingChat = prevChats.find(chat => chat.chatId === chatId);
                    if (existingChat) {
                        return prevChats.map(chat =>
                            chat.chatId === chatId ? { ...chat, message, name } : chat
                        );
                    } else {
                        return [...prevChats, { chatId, name, message }];
                    }
                });

                if (chatId === activeChatId) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
            }
        });

        socket.on('chatHistory', (messages) => {
            setMessages(messages);
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('chatHistory');
        };
    }, [activeChatId]);

    const sendMessage = () => {
        if (message.trim()) {
            const chatId = activeChatId || 'admin-room';
            const newMessage = { chatId, senderId: 'admin-id', senderRole: 'admin', message };

            socket.emit('sendMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage(''); 
        }
    };

    const handleTabSelect = (key) => {
        setActiveTab(key);
    };

    const handleInnerTabSelect = (key) => {
        setActiveInnerTab(key);
    };

    const handleChatClick = (chatId) => {
        setActiveChatId(chatId);
        setMessages([]); 

        socket.emit('joinChat', chatId);

        const chat = activeChats.find(chat => chat.chatId === chatId);
        if (chat) {
            setMessages(prevMessages => [...prevMessages, { chatId: chat.chatId, sender: chat.name, message: chat.message }]);
        }
    };

    const handleSupportBoothClick = (chatId) => {
        const chat = supportBotChats.find(chat => chat._id === chatId);
        console.log('Selected Chat:', chat); // Debugging
        setSelectedChat(chat);
        setSelectedChatMessages(chat?.messages || []);
        console.log('Selected Chat Messages:', chat?.messages || []); // Debugging
    };

    useEffect(() => {
        if (activeTab === 'support-chat') {
            fetchSupportBotChats();
        }
    }, [activeTab]);

    const fetchSupportBotChats = async () => {
        try {
            const response = await fetch('https://backend.dmv-gc.com/api/chat/getboothistory');
            const data = await response.json();
            console.log(data, 'here are the data')
            setSupportBotChats(data);
        } catch (error) {
            console.error('Error fetching support bot chats:', error);
        }
    };

    return (
        <div className='s-dashboard-main'>
            <div className='content-holder-main'>
                <div className='nav-area-holder'>
                    <h3 className='main-title'>Dashboard</h3>
                    <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
                        <Tab eventKey="support-chat" title="Chat Support">
                            <Tabs activeKey={activeInnerTab} onSelect={handleInnerTabSelect}>
                                <Tab eventKey="support-bot" title="Support Bot">
                                    <div className='users-cards-list'>
                                        
                                    </div>
                                </Tab>
                                <Tab eventKey="live-chat" title="Live Chat">
                                    <div className='users-cards-list'>
                                        {activeChats.map((chat) => (
                                            <UserIdCard
                                                key={chat.chatId}
                                                name={chat.name}
                                                message={chat.message}
                                                chatId={chat.chatId}
                                                onClick={() => handleChatClick(chat.chatId)}
                                            />
                                        ))}
                                    </div>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="form-submitions" title="Forms">
                            <Tabs >
                                <Tab eventKey="chat-forms" title="Chat Forms">
                                    <div className='users-cards-list'>
                                        <UserIdCard key="3" name="Name" message="Message here" chatId="125" />
                                    </div>
                                </Tab>
                                <Tab eventKey="contact-forms" title="Contact Forms">
                                    <div className='users-cards-list'>
                                        <UserIdCard key="3" name="Name" message="Message here" chatId="125" />
                                    </div>
                                </Tab>
                            </Tabs>
                            
                        </Tab>

                        
                    </Tabs>
                </div>
                <div className='chat-screen-holder'>
                    {activeTab === 'support-chat' && activeInnerTab === 'live-chat' && activeChatId &&
                        <>
                            <div className='chat-list-holder chat-support'>
                                <div className='chat-list'>
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`item ${msg.senderRole === 'admin' ? '' : 'left'}`}>
                                            {msg.message}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='write-msg-holder'>
                                <div className='input-holder'>
                                    <input className='form-control' type='text' placeholder='Write Message...' value={message} onChange={(e) => setMessage(e.target.value)}  onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            }} />
                                </div>
                                <div className='h-list icon-rounded send-message-button' onClick={sendMessage}>
                                    <ReactSVG src='./images/send-icon.svg' />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ServerDashboard;
