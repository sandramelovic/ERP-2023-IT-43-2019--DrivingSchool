import React from "react";
import Hero from '../Hero/Hero';
import Program from '../Program/Program';
import Reasons from '../Reasons/Reasons';
import Plans from '../Plans/Plans';
import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';
import '../../App.css'
import { motion } from 'framer-motion'
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import { CometChat } from '@cometchat-pro/chat';
import config from '../../config';
import 'react-chat-widget/lib/styles.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import { message } from "antd";
import Success from "../Notifications/Success/Success";

const agentUID = config.agentUID;
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const limit = 30;

const Home = () => {

    const dispatch = useDispatch()
    const userFromLocalS = JSON.parse(localStorage.getItem('user'));
    const userId = userFromLocalS?.data.user.userId
    const { user, loading } = useSelector((state) => state.userDetails);
    const [salePrograms, setSalePrograms] = useState(false);
    const [notificationMessages, setNotificationMessages] = useState([]);

    let itemsNotToRemove = [];
    const keys = Object.keys(localStorage);

    const integerKeys = keys.filter(key => {
        const parsedKey = parseInt(key, 10);
        return Number.isInteger(parsedKey) && String(parsedKey) === key;
    });

    integerKeys.forEach(key => {
        const value = JSON.parse(localStorage.getItem(key));
        if (value != '' && Array.isArray(value)) {
            itemsNotToRemove.push(...value);
        }
    })

    useEffect(() => {
        integerKeys.forEach(key => {
            if (key == user.userId) {
                if (localStorage.getItem('updatedProducts')) {
                    let arrayOfUpdatesProducts = JSON.parse(localStorage.getItem('updatedProducts'));

                    arrayOfUpdatesProducts.forEach(item => {
                        const arrayOfUsersProductsForNotification = JSON.parse(localStorage.getItem(user.userId));

                        if (arrayOfUsersProductsForNotification.includes(item)) {
                            const message = `Program ${item} je sada na akciji!`;
                            setNotificationMessages((prevMessages) => [
                                ...prevMessages,
                                message,
                            ]);
                            setSalePrograms(true);
                            let updatedArrayOfUsersProductsForNotification = arrayOfUsersProductsForNotification.filter(newItem => newItem != item);
                            localStorage.setItem(user.userId, JSON.stringify(updatedArrayOfUsersProductsForNotification));
                            let indexToRemove = itemsNotToRemove.indexOf(item);

                            if (indexToRemove != -1) {
                                itemsNotToRemove.splice(indexToRemove, 1);
                            }

                            if (!itemsNotToRemove.includes(item)) {
                                let updatedArrayOfUpdatesProducts = arrayOfUpdatesProducts.filter(updatedItem => updatedItem != item);
                                arrayOfUpdatesProducts = updatedArrayOfUpdatesProducts;
                                localStorage.setItem('updatedProducts', JSON.stringify(arrayOfUpdatesProducts));
                            }
                        }
                    });
                }
            }
        });
        dispatch(getUserDetails(userFromLocalS?.data.user.userId, userFromLocalS?.token));
    }, [dispatch]);


    useEffect(() => {
        if (!loading && user) {

            addResponseMessage(`Dobrodšlao/la, ${user.username}!`);
            addResponseMessage('Da li te zanima nešto konkretno?');

            let uid = user.uid;
            if (user.uid !== null) {
                fetchAuthToken(user.uid)
                    .then(result => {
                        CometChat.login(result.authToken)
                            .then(user => {
                                createMessageListener();
                                fetchPreviousMessages();
                            })
                            .catch(error => {
                                console.log('Initialization failed with error:', error);
                            });
                    })
                    .catch(error => {
                        console.log('Initialization failed with error:', error);
                    });
            }



        }
    }, [user, loading]);

    const fetchPreviousMessages = () => {
        //   let uid = localStorage.getItem('cc-uid');
        const messagesRequest = new CometChat.MessagesRequestBuilder()
            .setUID(agentUID)
            .setLimit(limit)
            .build();

        messagesRequest
            .fetchPrevious()
            .then(messages => {
                console.log('Message list fetched:', messages);
                messages.forEach(message => {
                    if (message.receiverId !== agentUID) {
                        addResponseMessage(message.text);
                    } else {
                        addUserMessage(message.text);
                    }
                });
            })
            .catch(error => {
                console.log('Message fetching failed with error:', error);
            });
    };

    const createMessageListener = () => {
        CometChat.addMessageListener(
            CUSTOMER_MESSAGE_LISTENER_KEY,
            new CometChat.MessageListener({
                onTextMessageReceived: message => {
                    addResponseMessage(message.text);
                },
            })
        );


    };


    const fetchAuthToken = async uid => {
        const response = await fetch(`/api/auth?uid=${user.uid}`);
        const result = await response.json();
        return result;
    };



    const createUser = async () => {
        const response = await fetch(`/api/create?userId=${userId}&nameSurename=${user.nameSurename}&jmbg=${user.jmbg}&phoneNumber=${user.phoneNumber}&username=${user.username}`);
        const result = await response.json();
        return result;
    };

    const handleNewUserMessage = newMessage => {
        const textMessage = new CometChat.TextMessage(
            agentUID,
            newMessage,
            CometChat.RECEIVER_TYPE.USER
        );

        let uid = localStorage.getItem('cc-uid');

        if (user.uid === null) {
            // no uid, create user
            createUser().then(
                result => {
                    localStorage.setItem('cc-uid', result.uid);
                    // do login
                    CometChat.login(result.authToken).then(
                        user => {
                            CometChat.sendMessage(textMessage).then(
                                message => {
                                    console.log('Message sent successfully:', message);
                                },
                                error => {
                                    console.log('Message sending failed with error:', error);
                                }
                            );
                            // create listener
                            CometChat.addMessageListener(
                                CUSTOMER_MESSAGE_LISTENER_KEY,
                                new CometChat.MessageListener({
                                    onTextMessageReceived: message => {
                                        addResponseMessage(message.text);
                                    }
                                })
                            );
                        },
                        error => {
                            console.log('Initialization failed with error:', error);
                        }
                    );
                }
            );
        } else {
            // we have uid, do send
            CometChat.sendMessage(textMessage).then(
                message => {
                    console.log('Message sent successfully:', message);
                },
                error => {
                    console.log('Message sending failed with error:', error);
                }
            );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='App' id='Home'>
            <Hero />
            <Program />
            <Reasons />
            <Plans />
            <Testimonials />
            <Footer />
            {salePrograms && <Success notificationMessages={notificationMessages} />}
            <>
                {userFromLocalS !== 'undefined' && userFromLocalS != null && userFromLocalS.data?.user.role === 'User' && (
                    <>
                        <Widget
                            handleNewUserMessage={handleNewUserMessage}
                            title="Auto-škola uživo razgovor"
                            subtitle="Pitaj sve što te zanima! :)"
                        />
                    </>
                )}
            </>
        </motion.div>
    )
}

export default Home