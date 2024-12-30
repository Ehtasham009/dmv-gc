import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReactSVG } from 'react-svg';
import UserIdCard from '../components/server-dashboard/user-id-card';
import BotIdCard from '../components/server-dashboard/bot-id-card';
import FormIdCard from '../components/server-dashboard/form-id-card';
import FormSubmitedData from '../components/form-submited-data';
import ChatFormSubmited from '../components/chat-form-submited';
import "../sass/server-dashboard.scss";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const socket = io('https://backend.dmv-gc.com');

function ServerDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('support-chat');
    const [chatActiveInnerTab, setChatActiveInnerTab] = useState('support-bot');
    const [formActiveInnerTab, setFormActiveInnerTab] = useState('chat-forms');
    const [activeChatId, setActiveChatId] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeChats, setActiveChats] = useState([]);
    const [supportBotChats, setSupportBotChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const [chatForms, setChatForms] = useState([]);
    const [selectedContactForm, setSelectedContactForm] = useState(null);
    const [contactForms, setContactForms] = useState([]);

    useEffect(() => {
        // Admin joins the 'admin-room' to listen for new chat events
        socket.emit('joinAdminRoom');
    
        socket.on('newChatCreated', (data) => {
            const { chatId, chatForm } = data;
            console.log(data, 'new chat created')
    
            // Admin joins the newly created chat
            socket.emit('joinAdminChat', chatId);
    
            // Add the new chat to the active chats list
            setActiveChats((prevChats) => [
                ...prevChats,
                { chatId: chatId, name: chatForm.firstName, message: '', createdAt: new Date() },
            ]);
        });
        const interval = setInterval(() => {
          }, 2000);
        return () => {

            socket.off('newChatCreated');
            clearInterval(interval)
        };
    }, []);
    // Consolidated socket event listeners
    useEffect(() => {
        const socketEvents = {
            newChatFormNotification: (data) => {
                toast.info(data.message, { position: 'top-right' })
                    fetchChatForms();
                    // alert(1)
            },
            newSupportBotNotification: (data) => {
                toast.info(data.message, { position: 'top-right' })
                    fetchSupportBotChats();
                    // alert(2)
            },
            newContactFormNotification: (data) => {
                toast.info(data.message, { position: 'top-right' });
                // Check if the user is on the "form-submissions" tab before fetching the contact forms
                    fetchContactForms();  // Call the function when the event is received
                    // alert(3)
            },
            newChatFormUserCreated: (data) => {
               fetchActiveChats();

            
            },
            receiveMessage: (data) =>  handleReceiveMessage(data),
            chatHistory: (messages) => setMessages(messages),
        };

        Object.entries(socketEvents).forEach(([event, handler]) => {
            socket.on(event, handler);
        });

        socket.emit('joinAdminRoom', 'admin-room');

        return () => {
            Object.keys(socketEvents).forEach(event => socket.off(event));
        };
    }, [activeChatId, activeTab]);

 

    // Handle received messages (avoid showing admin's own messages)
    const handleReceiveMessage = (data) => {
        const { chatId, senderId, senderRole, message, name, createdAt } = data;
    
        if (senderId === 'admin-id') return;
    
        if (senderRole !== 'admin') {
            toast.info(`New message from ${name}`, { position: 'top-right' });
            playAudio()

        }
    
        setActiveChats((prevChats) => {
            const existingChat = prevChats.find(chat => chat.chatId === chatId);

            if (existingChat) {
                return prevChats.map(chat =>
                    chat.chatId === chatId ? { ...chat, message, name, createdAt } : chat
                );
            } else {
                return [...prevChats, { chatId, name, message, createdAt }];
            }
        });
    
        if (chatId === activeChatId) {
            setMessages((prevMessages) => [...prevMessages, data]);
        }
    };

    const fetchChatForms = async () => {
        try {
            const { data } = await axios.get('https://backend.dmv-gc.com/api/chat/get-chat-forms');
            setChatForms(data);
        } catch (error) {
            console.error('Error fetching chat forms:', error);
        }
    };

    const fetchContactForms = async () => {
        try {
            const { data } = await axios.get('https://backend.dmv-gc.com/api/auth/get-contact-forms');
            setContactForms(data);
        } catch (error) {
            console.error('Error fetching contact forms:', error);
        }
    };

    const fetchSupportBotChats = async () => {
        try {
            const { data } = await axios.get('https://backend.dmv-gc.com/api/chat/getboothistory');
            console.log(data, 'support botchats')
            setSupportBotChats(data);
        } catch (error) {
            console.error('Error fetching support bot chats:', error);
        }
    };

    const fetchActiveChats = async () => {
        try {
            const { data } = await axios.get('https://backend.dmv-gc.com/api/active-chats');
            if (Array.isArray(data)) {
                setActiveChats(data.map(chat => ({
                    chatId: chat._id,
                    name: chat.name,
                    message: chat.lastMessage,
                    createdAt: chat.createdAt
                })));
                // document.querySelector('.notification-sound').play();
                
            } else {
                console.error('Expected an array but got:', data);
            }
            // setActiveChats(data.map(chat => ({
                //     chatId: chat._id,
                //     name: chat.name,
                //     message: chat.lastMessage,
                //     createdAt: chat.createdAt
                // })));
                
        } catch (error) {
            console.error('Error fetching active chats:', error);
        }
    };

    function playAudio(){
        document.querySelector('.notification-sound').play();
    }

    // Initial data fetch
    useEffect(() => {
        if (activeTab === 'form-submitions') {
            fetchChatForms();
            fetchContactForms();
        }
        if (activeTab === 'support-chat') {
            fetchSupportBotChats();
        }
    }, [activeTab]);

    useEffect(() => {
        fetchActiveChats();
    }, []);

    // Sending a message without re-emitting to admin
    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                chatId: activeChatId || 'admin-room',
                senderId: 'admin-id',
                senderRole: 'admin',
                message,
                createdAt: new Date().toISOString(), 
            };

            // Emit message to server
            socket.emit('sendMessage', newMessage);

            // Add the message to the admin's view
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            setMessage('');
        }
    };

    // Tab and chat handling functions
    const handleTabSelect = (key) => {
        setActiveTab(key);
    };

    const handleInnerTabSelect = (key) => {
        setChatActiveInnerTab(key);
    };
    const handleFormInnerTabSelect = (key) => {
        setFormActiveInnerTab(key);
    };

    const handleChatClick = (chatId) => {
        setActiveChatId(chatId);
        setMessages([]); // Clear previous messages
    
        // Emit joinAdminChat and wait for the acknowledgment
        socket.emit('joinAdminChat', chatId, (acknowledgment) => {
            if (acknowledgment === 'joined') {
                // Fetch chat history only after successful join
                socket.emit('getChatHistory', chatId);
            }
        });
    
        // Listen for chat history
        socket.on('chatHistory', (messages) => {
            setMessages(messages);
        });
    
        // Clean up the listener to avoid duplication
        return () => {
            socket.off('chatHistory');
        };
    };

    const formatDateTime = (date) => {
        const newDate = new Date(date);
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}, ${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    };
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/dashboard_login');
    }
    const VerticalDotsIcon = () => (
        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" >
            <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="currentColor"/>
            <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="currentColor"/>
            <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" fill="currentColor"/>
        </svg>
    );
    

    return (
        <div className='s-dashboard-main'>
            <div>
                <audio src="./videos/bell-notification.mp3" type="audio/mp3" className='notification-sound'></audio>
            </div>
            <div className='content-holder-main'>
                <div className='nav-area-holder'>
                    <div className='h-list main-title-holder' data-gap="10">
                        <h3 className='main-title'>Dashboard</h3>
                    <Dropdown>
                        <Dropdown.Toggle as="div" className="icon-rounded logout-button" >
                            <VerticalDotsIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className='btn' href="javascript:void(0)" onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
                        <Tab eventKey="support-chat" title="Chat Support">
                            <Tabs className='inner-tabs' activeKey={chatActiveInnerTab} onSelect={handleInnerTabSelect}>
                                <Tab eventKey="support-bot" title="Support Bot">
                                    <div className='users-cards-list'>
                                    {Array.isArray(supportBotChats) && supportBotChats.length > 0 && supportBotChats.map((chat, index) => {
    return (
        <BotIdCard key={chat._id} name={index + 1} date={chat?.timestamp} onClick={() => setSelectedChat(chat)} />
    );
})}
                                    </div>
                                </Tab>
                                <Tab eventKey="live-chat" title="Live Chat">
                                    <div className='users-cards-list'>
                                        {activeChats.length > 0 && activeChats.map((chat) => (
                                            <UserIdCard
                                                key={chat.chatId}
                                                name={chat.name}
                                                message={chat.message}
                                                chatId={chat.chatId}
                                                onClick={() => handleChatClick(chat.chatId)}
                                                date={chat.createdAt}
                                            />
                                        ))}
                                    </div>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="form-submitions" title="Forms">
                            <Tabs className='inner-tabs' activeKey={formActiveInnerTab} onSelect={handleFormInnerTabSelect}>
                                <Tab eventKey="chat-forms" title="Chat Forms">
                                    <div className='users-cards-list'>
                                    {Array.isArray(chatForms) && chatForms.length > 0 ? (
    chatForms.map((form, index) => (
        <FormIdCard key={form._id} nameId={form.firstName} date={form.createdAt} onClick={() => setSelectedForm(form)} />
    ))
) : (
    <p>No chat forms available</p>
)}
                                    </div>
                                </Tab>
                                <Tab eventKey="contact-forms" title="Contact Forms">
                                    <div className='users-cards-list'>
                                    {Array.isArray(contactForms) && contactForms.length > 0 && contactForms.map((form, index) => (
    <FormIdCard key={form._id} nameId={form.name} date={form.createdAt} onClick={() => setSelectedContactForm(form)} />
))}
                                        {/* {contactForms.length > 0 && contactForms.map((form, index) => (
                                            <FormIdCard key={form._id} nameId={form.name} date={form.createdAt} onClick={() => setSelectedContactForm(form)}/>
                                        ))} */}
                                    </div>
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </div>

                <div className='chat-screen-holder'>
                    {activeTab === 'support-chat' && chatActiveInnerTab === 'live-chat' && activeChatId && (
                        <>
                            <div className='chat-list-holder chat-support'>
                                <div className='chat-list'>
                                    {messages.length > 0 && messages.map((msg, index) => (
                                        <div key={index} className={`item ${msg.senderRole === 'admin' ? '' : 'left'}`}>
                                            {msg.message}
                                            <div className='message-date'>{formatDateTime(msg.createdAt)}</div>
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
                    )}

                    {activeTab === 'support-chat' && chatActiveInnerTab === 'support-bot' && selectedChat && (
                        <>
                            <div className='chat-list-holder chat-support'>
                                <div className='chat-list'>
                                    {selectedChat.messages.map((message) => (
                                        <div key={message._id} className={`item message ${message.type === 'left' ? 'left' : 'right'}`}>
                                            {message.text}
                                            {message?.answer}
                                            <div className='message-date'>{new Date(message.timestamp).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === 'form-submitions' && formActiveInnerTab === 'chat-forms' && selectedForm &&(
                            <ChatFormSubmited mainTitle="Chat Form Details" form={selectedForm} />
                    )}
                    {activeTab === 'form-submitions' && formActiveInnerTab === 'contact-forms' && selectedContactForm &&(
                            <FormSubmitedData mainTitle="Contact Form Details" form={selectedContactForm} />
                    )}

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ServerDashboard;