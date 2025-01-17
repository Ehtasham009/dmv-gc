import React, { useEffect, useRef, useState } from 'react';
import { useMyContext } from './context';

import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { io } from 'socket.io-client';
import axios from 'axios';
const socket = io('https://api.dmv-gc.com/');
const StyledCom = styled.div`
    position: absolute;
    bottom: 70px;
    right: 0;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    width: 350px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    transition: 0.4s all;
    opacity: 0;
    pointer-events: none;

    &.active {
        opacity: 1;
        pointer-events: initial;
    }

    .chat-support {
        .support-header {
            justify-content: space-between;
            gap: 20px;
            background-color: var(--secondary-color);
            color: white;
            padding: 5px 10px;
            font-weight: 700;
        }

        .chat-module-body {
            background: white;
            position: relative;

            &::before {
                content: "";
                background: url('./images/chat-module-bg.svg');
                height: 100%;
                width: 100%;
                background-repeat: repeat;
                position: absolute;
                opacity: 0.07;
                pointer-events: none;
            }

            .chat-items-holder {
                display: flex;
                flex-direction: column;
                gap: 10px;
                position: relative;
                z-index: 9;
                justify-items: flex-start;
                // height: calc(100% - 60px); /* Adjusted height to account for footer */
                overflow-y: auto; /* Enable scrolling */
                padding: 10px;
                flex-grow: 1;

                .item {
                    max-width: 80%;
                    padding: 10px 15px;
                    font-size: 14px;
                    border-radius: 15px;
                }
                .item {
                    align-self: flex-end;
                    background: #ffffff;
                    color: #1d1d1d;
                    border-radius: 15px 15px 0 15px;
                    padding: 10px 15px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .item.left {
                   align-self: flex-start;
                   background: #ff4b4b;  /* Red background for bot's questions */
                   color: white;
                   border-radius: 15px 15px 15px 0;
                   padding: 10px 15px;
                }
            }

            .chat-module-screen {
                height: 350px;
                position: relative;

                .scrollable {
                    height: 100%;
                    overflow-y: auto; /* Ensure scrolling works */
                }

                &.default-questions-screen {
                    .scrollable {
                        height: calc(100% - 41px);
                    }

                    .support-button-holder {
                        justify-content: center;
                        padding: 10px 15px;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        background: #fff; /* To differentiate the footer area */
                    }

                    .support-button {
                        text-align: right;
                        color: var(--secondary-color);
                        font-weight: 700;
                        font-size: 16px;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }

                &.choose-chat {
                    .buttons-holder {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        height: 100%;
                        padding: 40px 40px 10px;
                        gap: 20px;
                    }
                }

                &.ai-chat{
                    .scrollable {
                        height: calc(100% - 40px);
                        padding-top: 45px;
                    }
                }

                &.live-chat {
                    .form-holder {
                        display: grid;
                        align-content: center;
                        height: 100%;
                        padding: 10px 20px;
                        grid-gap: 10px;
                    }

                    .form-control {
                        border: 1px solid #ccc;
                        height: 40px;
                    }
                    .scrollable {
                        height: 100%;
                        overflow: hidden;
                        padding-top: 45px;
                    }
                }
            }

            .back-button {
                --size: 30px;
                color: #fff;
                padding-right: 4px;
                padding-bottom: 4px;
                background: var(--secondary-color);
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 15;
            }
        }

        .write-message {
            padding: 10px;
            background: #f7f7f7;
            position: relative;
            z-index: 9;
            flex-wrap: nowrap;
            border-top: 1px solid #ccc;

            .input-holder {
                width: 100%;
            }

            .input-holder .form-control {
                width: 100%;
                font-size: 14px;
                min-height: 40px;
                border-radius: 50px;
                background: #efefef;
                border: 1px solid #ccc;
            }

            .send-message-button {
                --size: 40px;
                background: var(--primary-color);
                color: white;
                align-items: center;
                padding-bottom: 4px;
            }
        }

        .bottom-tabs-nav-holder {
            padding: 10px;
            background: #E5E3EE;
        }

        .bottom-tabs-nav {
            position: relative;
            z-index: 9;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 10px;

            .nav-item .nav-link {
                color: var(--primary-color);
                border-radius: 10px;
                text-align: center;
                background: white;
                font-size: 14px;
                font-weight: 700;
            }

            .nav-item .nav-link.active {
                background: #9b3439;
                color: white;
                width: 100%;
            }
        }
    }

    .options-container{
        padding: top: 0;
    }
    .option-item.item {
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center; 
        gap: 20px;
        background: #dc3535 !important;

        &:hover {
            background-color: #e0e0e0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        svg{transform: rotate(180deg)}
    }

}

.chat-module-screen {
    display: flex;
    flex-direction: column;
    height: 100vh; /* or the height of your chat window */
}

.chat-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 10px;
}

.write-message {
    display: flex;
    padding: 10px;
    background-color: #f9f9f9;
}
`;

function SupportChatModule({ isActive, onClose }) {
    const [showScreen, setShowScreen] = useState('QuestionsAnsScreen');
    const [chatScreen, setChatScreen] = useState('questionsScreen');
    const [showTawkChat, setShowTawkChat] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const chatEndRef = useRef(null);
    let timeoutRef = useRef(null);
    const chatListRef = useRef(null);

    // Chat states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState('');
     // Check if user info is already stored in localStorage (i.e. form was previously submitted)
     useEffect(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            const { firstName, lastName, phoneNumber, email } = JSON.parse(savedUserInfo);
            setFirstName(firstName);
            setLastName(lastName);
            setPhoneNumber(phoneNumber);
            setEmail(email);
            setChatId(email); // Create unique chatId from email
            joinChat(email); // Join chat based on email
        }
    }, []);

    const joinChat = (email) => {
        socket.emit('joinChat', email); // Join the chat room using the chatId
        socket.on('chatHistory', (messages) => {
            setMessages(messages); // Load chat history
        });
    };


    const steps = [
        {
            question: "Hi 👋 Welcome to DMV General Contracting Group LLC chat, where innovation meets expertise, and construction is elevated to an art form. How can I assist you today?",
            options: ["Service info"],
            inputType: "options",
        },
        {
            question: "Great! Tell us what service are you interested in?",
            inputType: "text",
        },
        {
            question: "What is the scale of your project?",
            options: ["Small repair", "Partial remodel", "Full renovation"],
            inputType: "options",
        },
        {
            question: "We work in the DMV area (DC, Maryland, Virginia). Is your project here?",
            options: ["Yes", "No"],
            inputType: "options",
            redirectOnNo: true,
            redirectMessage: "We currently serve only the DMV area, but we'll keep you posted when we expand! Please provide us your information to join the waitlist:",
        },
        {
            question: "We offer free in-home consultations, with Monday and Tuesday as our preferred day. Schedule for next Monday/Tuesday?",
            options: ["Yes, Monday works", "Yes, Tuesday works", "Contact to coordinate"],
            inputType: "options",
        },
        {
            question: "Please share your name and phone number.",
            inputType: "text",
        },
        {
            question: "Could you also provide your email address?",
            inputType: "text",
        },
        {
            question: "Thank you! We’ve received your info. Our team will contact you soon.",
            inputType: "end",
        },
    ];

    useEffect(() => {
        if (isActive && showScreen === 'QuestionsAnsScreen' && answers.length === 0) {
            setAnswers([{ text: steps[0].question, type: 'left' }]);
            setCurrentStep(0);
        }
    }, [isActive, showScreen]);

    useEffect(() => {
        if (isFormCompleted) {
            setShowScreen('liveChat');
        }
    }, [isFormCompleted]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [answers]);

    useEffect(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            const { firstName, lastName, phoneNumber, email } = JSON.parse(savedUserInfo);
            setFirstName(firstName);
            setLastName(lastName);
            setPhoneNumber(phoneNumber);
            setEmail(email);
            setShowChat(true);
        }
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            if (data.senderId !== 'user-id') {
                setMessages((prevMessages) => [...prevMessages, data]);
                setTimeout(() => {
                    document.querySelector('.notification-sound').play()
                    document.querySelector('.chat-support-button').classList.add('new-message');
                }, 2000);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (showChat) {
            socket.emit('joinChat', chatId);

            socket.on('chatHistory', (messages) => {
                setMessages(messages);
            });
        }

        return () => {
            socket.off('chatHistory');
        };
    }, [showChat]);


    const handleOptionClick = async (option) => {
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { text: option, type: 'right' }
        ]);

        const updatedAnswers = [
            ...answers,
            { question: steps[currentStep].question, answer: option }
        ];

        if (currentStep < steps.length - 2) {
            setCurrentStep(prevStep => prevStep + 1);
            setAnswers(prevAnswers => [
                ...prevAnswers,
                { text: steps[currentStep + 1].question, type: 'left' }
            ]);
        } else if (currentStep === steps.length - 2) {
            const finalMessage = steps[currentStep + 1].question;
            if (!answers.some(answer => answer.text === finalMessage)) {
                setAnswers(prevAnswers => [
                    ...prevAnswers,
                    { text: finalMessage, type: 'left' }
                ]);
                timeoutRef.current = setTimeout(() => {
                    setShowScreen('chooseChat');
                }, 2000);
                try {
                    const response = await fetch('https://api.dmv-gc.com/api/chat/saveboothistory', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ messages: updatedAnswers }),
                    });
    
                    const data = await response.json();
                    console.log(data.msg);
    
                    timeoutRef.current = setTimeout(() => {
                        setShowScreen('chooseChat');
                    }, 2000);
                } catch (error) {
                    console.error('Error saving chat history:', error);
                }   
            }
        } else {
            setShowScreen('chooseChat');
        }
    };
    const handleContinue = async () => {
        if (firstName && lastName && phoneNumber && email) {
            try {
                const response = await axios.post('https://api.dmv-gc.com/api/chat/save-chat-form', {
                    firstName,
                    lastName,
                    phoneNumber,
                    email
                });
    
                if (response.status === 200) {
                    const { chatId } = response.data; // Get the generated chatId from the backend response
                    const userInfo = { firstName, lastName, phoneNumber, email, chatId }; // Store chatId with user info
                    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Store in localStorage
                    joinChat(chatId); // Join chat with the chatId
                    setShowChat(true);
                } else {
                    alert('Error saving chat form information.');
                }
            } catch (error) {
                console.error('Error saving chat form information:', error);
                alert('Server error. Please try again later.');
            }
        } else {
            alert('Please fill in all the fields.');
        }
    };
   

    const sendMessage = () => {
        const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        const chatId = savedUserInfo?.chatId;
    
        if (message.trim() && chatId) {
            const userName = `${savedUserInfo.firstName} ${savedUserInfo.lastName}`;
            socket.emit('sendMessage', { chatId, senderId: 'user-id', senderRole: 'user', message, name: userName });
            setMessages((prevMessages) => [...prevMessages, { chatId, senderId: 'user-id', senderRole: 'user', message, name: userName }]);
            setMessage('');
        }
    };
    if(showScreen == 'liveChatLogin'){
        document.querySelector('.chat-support-button').classList.remove('new-message');
    }


    const renderStep = () => {
        if (currentStep >= steps.length) {
            return null;
        }

        const step = steps[currentStep];

        if (step.inputType === "options") {
            return (
                <div className='options-container chat-items-holder'>
                    {step.options.map((option, index) => (
                        <div key={index} className='option-item item left' onClick={() => handleOptionClick(option)}>
                            {option}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ))}
                </div>
            );
        } else if (step.inputType === "text") {
            return (
                <div className='h-list write-message' data-gap="10">
                    <div className="input-holder">
                        <input type="text" placeholder='Write...' className="form-control" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleOptionClick(e.target.value);
                                e.target.value = '';
                            }
                        }} />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <StyledCom className={`chat-support-module ${isActive ? 'active' : ''}`}>
            
            <div className='chat-support questions-screen-active'>
                <div className='h-list support-header'>
                    {showScreen === 'liveChatLogin' ? 
                        <div className='cursor-pointer' onClick={() => setShowScreen('chooseChat')}>
                            <ReactSVG src='./images/back-arrow.svg' />
                        </div>
                    : null

                    }
                    {
                        showScreen === 'QuestionsAnsScreen' ? <span>Support Bot</span> : null ||
                        showScreen === 'chooseChat' ? <span>Choose Chat</span> : null ||
                        showScreen === 'liveChatLogin' ? <span>live Chat</span> : null
                    }
                    
                    <div className="icon-rounded" onClick={onClose}>
                        X
                    </div>
                </div>
                <div className='chat-module-body'>
                    {isActive && showScreen === 'QuestionsAnsScreen' && !isFormCompleted && (
                        <div className='chat-module-screen default-questions-screen'>
                            <div className='scrollable'>
                                <div className='chat-items-holder'>
                                    {answers.map((answer, index) => (
                                        <div key={index} className={`item ${answer.type}`}>
                                            {answer.text}
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                                {renderStep()}
                            </div>
                            <div className='h-list support-button-holder' data-gap="5">
                                <span>Live Chat With Us </span>
                                <div className='support-button' onClick={() => setShowScreen('chooseChat')}>Chat...</div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'chooseChat' && (
                        <div className='chat-module-screen choose-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('QuestionsAnsScreen')}>
                                    <ReactSVG src='./images/back-arrow.svg' />
                                </div>
                                <div className='buttons-holder'>
                                    <button className='btn button-secondary btn-c-rounded' onClick={() => setShowScreen('liveChatLogin')}>Customer Support</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'liveChatLogin' && (
                        <div className='chat-module-screen live-chat'>
                            {showChat ? (
                                <>
                                    <div className='chat-items-holder' ref={chatListRef}>
                                        {messages.map((msg, index) => (
                                            <div key={index} className={`item ${msg.senderRole === 'user' ? '' : 'left'}`}>
                                                {msg.message}
                                            </div>
                                            
                                        ))}
                                    </div>
                                    <div className='h-list write-message' data-gap="10">
                                        <div className="input-holder">
                                            <input type="text" placeholder='Write message' className="form-control" value={message} onChange={(e) => setMessage(e.target.value)}  onKeyDown={(e) => {
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
                            ) : (
                                <div className='scrollable'>
                                    <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                        <ReactSVG src='./images/back-arrow.svg' />
                                    </div>
                                    <div className='form-holder'>
                                        <div className='fr-fr' data-gap="5">
                                            <div className="input-holder">
                                                <input className='form-control' type="text" required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="input-holder">
                                                <input className='form-control' type="text" required placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="input-holder">
                                            <input className='form-control' type="text" required placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                        <div className="input-holder">
                                            <input className='form-control' type="text" required placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <button className='btn button-secondary btn-c-rounded' onClick={handleContinue}>Continue</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </StyledCom>
    );
}

export default SupportChatModule;