import React, { useEffect, useRef, useState } from 'react';
import { useMyContext } from './context';

import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

const StyledCom = styled.div`
    position: absolute; bottom: 70px; right: 0; background-color: white; border-radius: 10px; overflow: hidden; width: 350px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); transition: 0.4s all ; opacity: 0; pointer-events: none;

    &.active{opacity: 1; pointer-events: initial}
    
    .chat-support{
        .support-header{
            justify-content: space-between; 
            gap: 20px; 
            background-color: var(--primary-color); 
            color: white; 
            padding: 5px 10px; 
            font-weight: 700;
        }
    
        .chat-module-body{
            background: white;  
            
            &::before{
                content:""; 
                background: url('./images/chat-module-bg.svg'); 
                height: 100%; 
                width: 100%; 
                background-repeat: repeat; 
                position: absolute; 
                opacity: 0.07; 
                pointer-events: none;
            }

            .chat-items-holder{
               display: flex; 
    flex-direction: column; /* Stack messages from top to bottom */
    gap: 10px; 
    position: relative; 
    z-index: 9; 
    justify-items: flex-start; 
    height: 100%; 
    overflow-y: auto; 
    padding: 10px;

                .item{
                    max-width: 80%; /* Ensures it doesn't take up the full width */
                    padding: 10px 15px; 
                    font-size: 14px;
                    border-radius: 15px;
                }

                /* Chatbot message (left side) */
                .item.left{
                    align-self: flex-start; 
                    background: var(--primary-color); 
                    color: white; 
                    border-radius: 15px 15px 15px 0;
                }

                /* User message (right side) */
                .item.right{
                    align-self: flex-end; 
                    background: #ffffff; 
                    color: #1d1d1d; 
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
                    border-radius: 15px 15px 0 15px;
                }
            }

            /* Chatbot message (left side) */
.item.left {
    align-self: flex-start;
    background: var(--primary-color); /* or another color for the bot's messages */
    color: white;
    border-radius: 15px 15px 15px 0;
    max-width: 80%;
    padding: 10px 15px;
    font-size: 14px;
}

/* User message (right side) */
.item.right {
    align-self: flex-end;
    background: #ffffff; /* or another color for the user's messages */
    color: #1d1d1d;
    border-radius: 15px 15px 0 15px;
    max-width: 80%;
    padding: 10px 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

            .chat-module-screen{
                height: 350px; 
                position: relative;

                .scrollable{
                    height: 100%;
                }

                &.default-questions-screen{
                    .scrollable{
                        height: calc(100% - 41px);
                    }

                    .scrollable.default-q-answers-holder{
                        padding-top: 45px;
                    }

                    .support-button-holder{
                        justify-content: center; 
                        padding: 10px 15px;
                    }

                    .support-button{
                        text-align: right; 
                        color: var(--primary-color); 
                        font-weight: 700; 
                        font-size: 16px; 
                        cursor: pointer; 
                        text-decoration: underline;
                    }

                    .default-q-answers-holder{
                        position: relative;
                    }

                    .default-questions-holder .chat-items-holder .item{
                        cursor: pointer;
                    }
                }

                &.choose-chat{
                    .buttons-holder{
                        display: flex; 
                        flex-direction: column; 
                        justify-content: center; 
                        height: 100%; 
                        padding: 40px 40px 10px; 
                        gap: 20px;
                    }
                }

                &.ai-chat, &.live-chat{
                    .scrollable{
                        height: calc(100% - 61px); 
                        padding-top: 45px;
                    }
                }

                &.live-chat{
                    .form-holder{
                        display: grid; 
                        align-content: center; 
                        height: 100%; 
                        padding: 10px 20px; 
                        grid-gap: 10px;
                    }

                    .form-control{
                        border: 1px solid #ccc; 
                        height: 40px;
                    }
                }
            } 

            .back-button{
                --size: 30px ; 
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

        .write-message{
            padding:  10px; 
            background: #f7f7f7; 
            position: relative; 
            z-index: 9; 
            flex-wrap: nowrap; 
            border-top: 1px solid #ccc;
            
            .input-holder{
                width: 100%;
            }

            .input-holder .form-control{
                width: 100%; 
                font-size: 14px; 
                min-height: 40px; 
                border-radius: 50px; 
                background: #efefef; 
                border: 1px solid #ccc;
            }

            .send-message-button{
                --size: 40px; 
                background: var(--primary-color); 
                color: white; 
                align-items: center; 
                padding-bottom: 4px;
            }  
        }

        .bottom-tabs-nav-holder{
            padding: 10px; 
            background: #E5E3EE;
        }

        .bottom-tabs-nav{
            position: relative; 
            z-index: 9;  
            display: grid; 
            grid-template-columns: 1fr 1fr 1fr; 
            grid-gap: 10px;

            .nav-item .nav-link{
                color: var(--primary-color); 
                border-radius: 10px ; 
                text-align: center; 
                background: white; 
                font-size: 14px; 
                font-weight: 700;
            }

            .nav-item .nav-link.active{
                background: #9b3439; 
                color: white; 
                width: 100%;
            }
        }
    }
   ///////////////// ChatBot desing /////////////
.options-container {
    display: flex;
    flex-direction: column; /* Stack options vertically */
    gap: 10px; /* Add some space between options */
    margin-top: 10px;
    max-width: 80%; /* Ensure it doesn't take up full width */
    align-self: flex-start; /* Align container to the left */
}

.option-item {
    background-color: #f7f7f7; /* Light background color */
    color: #333; /* Dark text color */
    padding: 10px 15px;
    border-radius: 15px; /* Rounded corners */
    border: 1px solid #ddd; /* Light border for definition */
    cursor: pointer;
    text-align: center; /* Center text */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    /* Add shadow and change background color on hover */
    &:hover {
        background-color: #e0e0e0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Ensure full width of the container is used */
    width: 100%;
    box-sizing: border-box;
}



`;


function SupportChatModule() {
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
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        setAnswers([steps[0].question]);
    }, []);

    useEffect(() => {
        if (isFormCompleted) {
            setShowScreen('liveChat');
        }
    }, [isFormCompleted]);

    const handleOptionClick = (option) => {
        console.log('Option selected:', option);
        console.log('Current Step:', currentStep);
        console.log('Total Steps:', steps.length);

        // Add the user's answer
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { text: option, type: 'right' }
        ]);

        // Check if the current step is one step before the final step
        if (currentStep < steps.length - 2) {
            console.log('Advancing to the next step.');
            // Move to the next step
            setCurrentStep(prevStep => prevStep + 1);
        } else if (currentStep === steps.length - 2) {
            console.log('Final step logic executing one step early.');
            // Treat this step as the final step
            const finalMessage = steps[currentStep + 1].question;
            console.log('Final Message:', finalMessage);

            const messageExists = answers.some(answer => answer.text === finalMessage);
            console.log('Does final message already exist in answers?', messageExists);

            if (!messageExists) {
                console.log('Adding final message to answers.');
                setAnswers(prevAnswers => [
                    ...prevAnswers,
                    { text: finalMessage, type: 'left' }
                ]);

                console.log('Setting screen to "chooseChat" after 2 seconds.');
                timeoutRef.current = setTimeout(() => {
                    console.log('Executing setShowScreen("chooseChat").');
                    setShowScreen('chooseChat');
                }, 2000);
            } else {
                console.log('Final message already added, no need to set timeout.');
            }
        } else {
            console.log('Final step reached.');
            // If it's the actual final step, just move on
            setShowScreen('chooseChat');
        }
    };

    const openTawkChat = () => {
        setShowTawkChat(true);  // Show the Tawk.to chat
        setShowScreen('embeddedChat'); // Update the screen to show the embedded chat
    };
    const handleCustomerSupportClick = () => {
        setShowTawkChat(true);
        setShowScreen('embeddedChat'); // Ensure the screen updates to show the embedded chat
    };
    // Scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [answers]);
    useEffect(() => {
        if (currentStep < steps.length) {
            setAnswers(prevAnswers => [
                ...prevAnswers,
                { text: steps[currentStep].question, type: 'left' } // Add chatbot's question
            ]);
        }
    }, [currentStep]);



    useEffect(() => {
        if (currentStep > 0) {
            // Display the question for the current step automatically
            setAnswers(prevAnswers => [...prevAnswers, steps[currentStep].question]);
        }
    }, [currentStep]);

    const handleFormCompletion = () => {
        console.log('Form Completed');
        setIsFormCompleted(true);  // This will trigger the next screen
        setCurrentStep(0);         // Reset the current step for the questions flow
        setChatScreen('questionsScreen');  // Ensure chat screen is set to show questions
    };
    const renderStep = () => {
        // Ensure that the current step exists
        if (currentStep >= steps.length) {
            return null; // No more steps, so return nothing
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

        // If it's the final message, ensure it's only processed once in handleOptionClick
        return null;
    };

    const renderTawkChat = () => {
        if (showTawkChat) {  // Only render the iframe if showTawkChat is true
            return (
                <iframe
                    src="https://tawk.to/chat/66b9efe10cca4f8a7a74e58e/1i53522kv"  // Replace with your Tawk.to direct chat URL
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Tawk.to Live Chat"
                    allow="microphone; camera"
                ></iframe>
            );
        }
        return null;  // Don't render anything if showTawkChat is false
    };
    return (
        <StyledCom className='chat-support-module active'>
            <div className='chat-support questions-screen-active'>
                <div className='h-list support-header'>
                    <span>Let's Chat</span>
                    <div className="icon-rounded" onClick={() => setShowScreen('QuestionsAnsScreen')}>
                        X
                    </div>
                </div>
                <div className='chat-module-body'>
                    {showScreen === 'QuestionsAnsScreen' && !isFormCompleted && (
                        <div className='chat-module-screen default-questions-screen'>
                            {/* Default screen content here */}
                            <div className='scrollable default-questions-holder'>
                                {/* Your default questions can be placed here */}
                            </div>
                            <div className='h-list support-button-holder' data-gap="5">
                                <span>Live Chat With Us </span>
                                {/* <div className='support-button' onClick={() => setShowScreen('chooseChat')}>Chat...</div> */}
                                <div className='support-button' onClick={handleFormCompletion}>Chat...</div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'chooseChat' && (
                        <div className='chat-module-screen choose-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('QuestionsAnsScreen')}>
                                    {/* Replace with appropriate SVG or icon */}
                                </div>
                                <div className='buttons-holder'>
                                    <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('aiChat')}>Chat With AI</button>
                                    {/* <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('liveChatLogin')}>Customer Support</button> */}
                                    <button className='btn button-primary btn-c-rounded' onClick={openTawkChat}>Customer Support</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'embeddedChat' && (
                        <div className='chat-module-screen live-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                    {/* Replace with appropriate SVG or icon */}
                                </div>
                                {renderTawkChat()}  {/* Embed the Tawk.to chat here */}
                            </div>
                        </div>
                    )}
                    {showScreen === 'liveChatLogin' && (
                        <div className='chat-module-screen live-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                    {/* Replace with appropriate SVG or icon */}
                                </div>
                                <div className='form-holder'>
                                    <div className='fr-fr' data-gap="5">
                                        <div className="input-holder">
                                            <input className='form-control' type="text" placeholder='First Name' />
                                        </div>
                                        <div className="input-holder">
                                            <input className='form-control' type="text" placeholder='Last Name' />
                                        </div>
                                    </div>
                                    <div className="input-holder">
                                        <input className='form-control' type="text" placeholder='Phone Number' />
                                    </div>
                                    <div className="input-holder">
                                        <input className='form-control' type="text" placeholder='Email Address' />
                                    </div>
                                    <button className='btn button-primary btn-c-rounded' onClick={handleFormCompletion}>Continue</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showScreen === 'aiChat' && (
                        <div className='chat-module-screen ai-chat'>
                            <div className='scrollable'>
                                <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                    {/* Replace with appropriate SVG or icon */}
                                </div>
                                <div className='chat-items-holder'>
                                    {/* AI chat content here */}
                                </div>
                            </div>
                            <div className='h-list write-message' data-gap="10">
                                <div className="input-holder">
                                    <input type="text" placeholder='Write...' className="form-control" />
                                </div>
                                <div className='h-list icon-rounded send-message-button'>
                                    {/* Replace with appropriate SVG or icon */}
                                </div>
                            </div>
                        </div>
                    )}
                    {isFormCompleted && showScreen === 'liveChat' && chatScreen === 'questionsScreen' && (
                        <>
                            <div className='chat-module-screen live-chat'>
                                <div className='scrollable'>
                                    <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                        {/* Replace with appropriate SVG or icon */}
                                    </div>
                                    <div className='chat-items-holder'>
                                        {answers.map((answer, index) => (
                                            <div key={index} className={`item ${answer.type}`}>
                                                {answer.text}
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} /> {/* Reference to the bottom of the chat */}
                                    </div>
                                    {currentStep < steps.length && renderStep()}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </StyledCom>
    );
}

export default SupportChatModule;



// function SupportChatModule() {

//     const [showScreen, setShowScreen] = useState('QuestionsAnsScreen');
//     const [chatScreen, setChatScreen] = useState('questionsScreen');
//     const [answers, setAnswers] = useState([]);

//     const chatModulePopupClose = () => {
//         const chatModule = document.querySelector('.chat-support-module');

//         chatModule.classList.remove('active')
//     }

//     useEffect(() => {
//         const handleClick = () => {
//             setChatScreen('answersScreen');
//             setAnswers(prevAnswers => [
//                 ...prevAnswers,
//                 'Answer Should Be here'
//             ]);
//         };

//         const defaultQuestions = document.querySelectorAll('.default-questions-screen .chat-items-holder .item');
//         defaultQuestions.forEach(element => {
//             element.addEventListener('click', handleClick);
//         });

//         // Cleanup function to remove event listeners
//         return () => {
//             defaultQuestions.forEach(element => {
//                 element.removeEventListener('click', handleClick);
//             });
//         };
//     }, [chatScreen, answers]);



//   return (
//     <StyledCom className='chat-support-module active'>
//         <div className='chat-support questions-screen-active'>
//             <div className='h-list support-header'>
//                 <span>Let's Chat</span>
//                 <div className="icon-rounded" onClick={chatModulePopupClose}>
//                     X
//                 </div>
//             </div>
//             <div className='chat-module-body'>
//                 {showScreen == 'QuestionsAnsScreen'  ?
//                     <div className='chat-module-screen default-questions-screen'>
//                         {chatScreen == 'questionsScreen' ?
//                             <div className='scrollable default-questions-holder'>
//                                 <div className='chat-items-holder '>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                     <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 </div>
//                             </div>
//                             :null
//                         }
//                         {chatScreen == 'answersScreen' ?
//                             <div className='scrollable default-q-answers-holder'>
//                                 <div className='icon-rounded back-button default-q-answers-back' onClick={() => setChatScreen('questionsScreen')}>
//                                     <ReactSVG src='./images/back-arrow.svg' />
//                                 </div>
//                                 <div className='chat-items-holder default-q-answers'>
//                                     {answers.map((answer, index) => (
//                                         <div key={index} className='item'>{answer}</div>
//                                     ))}
//                                 </div>
//                             </div>
//                             :null
//                         }
//                         <div className='h-list support-button-holder' data-gap="5">
//                             <span>Live Chat With Us </span>
//                             <div className='support-button' onClick={() => setShowScreen('chooseChat')}>Chat...</div>
//                         </div>
//                     </div>
//                     : null
//                 }
//                 {showScreen == 'chooseChat'  ?
//                     <div className='chat-module-screen choose-chat'>
//                         <div className='scrollable'>
//                             <div className='icon-rounded back-button' onClick={() => setShowScreen('QuestionsAnsScreen')}>
//                                 <ReactSVG src='./images/back-arrow.svg' />
//                             </div>
//                             <div className='buttons-holder'>
//                                 <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('aiChat')}>Chat With AI</button>
//                                 <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('liveChatLogin')}>Customer Support</button>
//                             </div>
//                         </div>
//                     </div>
//                     : null
//                 }
//                 {showScreen == 'aiChat'  ?
//                     <div className='chat-module-screen ai-chat'>
//                         <div className='scrollable'>
//                             <div className='icon-rounded back-button ' onClick={() => setShowScreen('chooseChat')}>
//                                 <ReactSVG src='./images/back-arrow.svg' />
//                             </div>
//                             <div className='chat-items-holder'>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                             </div>
//                         </div>
//                         <div className='h-list write-message' data-gap="10">
//                             <div className="input-holder">
//                                 <input type="text" placeholder='Write...' className="form-control" />
//                             </div>
//                             <div className='h-list icon-rounded send-message-button'>
//                                 <ReactSVG src='./images/send-icon.svg' />
//                             </div>
//                         </div>
//                     </div>
//                     : null
//                 }
//                 {showScreen == 'liveChatLogin'  ?
//                     <div className='chat-module-screen live-chat'>
//                         <div className='scrollable'>
//                             <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
//                                 <ReactSVG src='./images/back-arrow.svg' />
//                             </div>
//                             <div className='form-holder'>
//                                 <div className='fr-fr' data-gap="5">
//                                     <div className="input-holder">
//                                         <input className='form-control' type="text" placeholder='First Name' />
//                                     </div>
//                                     <div className="input-holder">
//                                         <input className='form-control' type="text" placeholder='Last Name' />
//                                     </div>
//                                 </div>
//                                 <div className="input-holder">
//                                     <input className='form-control' type="text" placeholder='Phone Number' />
//                                 </div>
//                                 <div className="input-holder">
//                                     <input className='form-control' type="text" placeholder='Email Adress' />
//                                 </div>
//                                 <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('liveChat')}>Continue</button>
//                             </div>
//                         </div>
//                         <div className='h-list write-message' data-gap="10">
//                             <div className="input-holder">
//                                 <input type="text" placeholder='Write...' className="form-control" />
//                             </div>
//                             <div className='h-list icon-rounded send-message-button'>
//                                 <ReactSVG src='./images/send-icon.svg' />
//                             </div>
//                         </div>
//                     </div>
//                 : null
//                 }
//                 {showScreen == 'liveChat'  ?
//                     <div className='chat-module-screen live-chat'>
//                         <div className='scrollable'>
//                             <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
//                                 <ReactSVG src='./images/back-arrow.svg' />
//                             </div>
//                             <div className='chat-items-holder'>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                                 <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
//                             </div>
//                         </div>
//                         <div className='h-list write-message' data-gap="10">
//                             <div className="input-holder">
//                                 <input type="text" placeholder='Write...' className="form-control" />
//                             </div>
//                             <div className='h-list icon-rounded send-message-button'>
//                                 <ReactSVG src='./images/send-icon.svg' />
//                             </div>
//                         </div>
//                     </div>
//                 : null
//                 }
//             </div>

//         </div>
//     </StyledCom>
//   )
// }