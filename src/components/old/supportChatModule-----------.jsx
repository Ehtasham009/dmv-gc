import React, { useEffect, useRef, useState } from 'react';
import { useMyContext } from './context';

import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

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
            background-color: var(--primary-color);
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

                .item {
                    max-width: 80%; /* Ensures it doesn't take up the full width */
                    padding: 10px 15px;
                    font-size: 14px;
                    border-radius: 15px;
                    word-wrap: break-word; /* Ensure long words break correctly */
                }

                /* Bot's question (left side) */
                .item.left {
                   align-self: flex-start;
                   background: #ff4b4b;  /* Red background for bot's questions */
                   color: white;
                   border-radius: 15px 15px 15px 0;
                   padding: 10px 15px;
                }

                /* User's answer (right side) */
                .item.right {
                    align-self: flex-end;
                    background: #ffffff;  /* White background for user's answers */
                    color: #1d1d1d;
                    border-radius: 15px 15px 0 15px;
                    padding: 10px 15px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
                        color: var(--primary-color);
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

                &.ai-chat, &.live-chat {
                    .scrollable {
                        height: calc(100% - 61px);
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
                }
            }

            .back-button {
                --size: 30px;
                color: #fff;
                padding-right: 4px;
                padding-bottom: 4px;
                background: var(--primary-color);
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

    // Options styling
    .options-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        max-width: 80%;
        align-self: flex-start;
        z-index: 10; /* Make sure it's above other elements */
    }

    .option-item {
        background-color: #f7f7f7;
        color: #333;
        padding: 10px 15px;
        border-radius: 15px;
        border: 1px solid #ddd;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        width: 100%;
        box-sizing: border-box;

        &:hover {
            background-color: #e0e0e0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    }
`;

function SupportChatModule({ isActive, onClose }) {
    const [showScreen, setShowScreen] = useState('QuestionsAnsScreen');
    const [chatScreen, setChatScreen] = useState('questionsScreen');
    const [showTawkChat, setShowTawkChat] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const chatEndRef = useRef(null);
    let timeoutRef = useRef(null);

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

    // Display the first question when the chat module becomes active
    useEffect(() => {
        if (isActive && showScreen === 'QuestionsAnsScreen' && answers.length === 0) {
            // Show the initial question when the chat becomes active
            setAnswers([{ text: steps[0].question, type: 'left' }]); // Bot question on the left
            setCurrentStep(0); // Start from the first step
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

    const handleOptionClick = (option) => {
        // Add the user's answer on the right
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { text: option, type: 'right' }
        ]);

        if (currentStep < steps.length - 2) {
            setCurrentStep(prevStep => prevStep + 1);
            // Add the bot's next question on the left
            setAnswers(prevAnswers => [
                ...prevAnswers,
                { text: steps[currentStep + 1].question, type: 'left' } // Bot question on the left
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
            }
        } else {
            setShowScreen('chooseChat');
        }
    };

    const handleFormCompletion = () => {
        setIsFormCompleted(true);
        setCurrentStep(0);
        setChatScreen('questionsScreen');
    };

    const openTawkChat = () => {
        setShowTawkChat(true);
        setShowScreen('embeddedChat');
    };

    const renderStep = () => {
        if (currentStep >= steps.length) {
            return null;
        }

        const step = steps[currentStep];

        if (step.inputType === "options") {
            return (
                <div className='options-container'>
                    {step.options.map((option, index) => (
                        <div key={index} className='option-item' onClick={() => handleOptionClick(option)}>
                            {option}
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
                                e.target.value = ''; // Clear input after submission
                            }
                        }} />
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderTawkChat = () => {
        if (showTawkChat) {
            return (
                <iframe
                    src="https://tawk.to/chat/66b9efe10cca4f8a7a74e58e/1i53522kv"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Live Chat"
                    allow="microphone; camera"
                ></iframe>
            );
        }
        return null;
    };

    return (
        <StyledCom className={`chat-support-module ${isActive ? 'active' : ''}`}>
            <div className='chat-support questions-screen-active'>
                <div className='h-list support-header'>
                    <span>Let's Chat</span>
                    <div className="icon-rounded" onClick={onClose}>
                        X
                    </div>
                </div>
                <div className='chat-module-body'>
                    {isActive && showScreen === 'QuestionsAnsScreen' && !isFormCompleted && (
                       <div className='chat-module-screen default-questions-screen'>
                       <div className='chat-module-screen live-chat'>
                           <div className='scrollable'>
                               <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                               </div>
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
                       </div>
                       <div className='h-list support-button-holder' data-gap="5">
                           <span>Live Chat With Us </span>
                           <div className='support-button' onClick={openTawkChat}>Chat...</div>
                       </div>
                   </div>
                   
                    )}
                    {showScreen === 'chooseChat' && (
                        <div className='chat-module-screen choose-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('QuestionsAnsScreen')}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                                </div>
                                <div className='buttons-holder'>
                                    <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('aiChat')}>Chat With AI</button>
                                    <button className='btn button-primary btn-c-rounded' onClick={openTawkChat}>Customer Support</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'embeddedChat' && (
                        <div className='chat-module-screen live-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                                </div>
                                {renderTawkChat()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StyledCom>
    );
}

export default SupportChatModule;