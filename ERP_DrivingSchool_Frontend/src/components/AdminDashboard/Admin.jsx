import React, { Component, Fragment } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import MDSpinner from 'react-md-spinner';
import config from '../../config';
import CustomerList from './CustomerList';
import ChatBox from './ChatBox';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "./Sidebar";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const agentUID = config.agentUID;
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener';
const limit = 30;

class Agent extends Component {
  state = {
    customers: [],
    selectedCustomer: '',
    chat: [],
    chatIsLoading: false,
    customerIsLoading: true,
    text: '',
  };

  componentDidMount() {
    this.fetchAuthToken(agentUID).then(
      (authToken) => {
        console.log('auth token fetched', authToken);
        CometChat.login(authToken)
          .then((user) => {
            console.log('Login successfully:', { user });
            this.fetchUsers().then((result) => {
              console.log(result);
              this.setState({
                customers: result,
                customerIsLoading: false,
              });
            });

            CometChat.addMessageListener(
              AGENT_MESSAGE_LISTENER_KEY,
              new CometChat.MessageListener({
                onTextMessageReceived: (message) => {
                  this.setState((prevState) => {
                    const { customers, selectedCustomer, chat } = prevState;
                    console.log('Incoming Message Log', { message });
                    if (selectedCustomer === message.sender.uid) {
                      chat.push(message);
                    } else {
                      const aRegisteredCustomer = customers.filter(
                        (customer) => customer.uid === message.sender.uid
                      );
                      if (!aRegisteredCustomer.length) {
                        customers.push(message.sender);
                      }
                    }
                    return { chat, customers };
                  });
                },
              })
            );
          })
          .catch((error) => {
            console.log('Initialization failed with error:', error);
          });
      },
      (error) => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

 /* componentWillUnmount(){
    CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY);
    CometChat.logout();
  }*/

  fetchAuthToken = async (uid) => {
    const response = await fetch(`/api/auth?uid=${uid}`);
    const result = await response.json();
    return result.authToken;
  };

  fetchUsers = async () => {
    const response = await fetch('/api/users');
    console.log(response);
    const result = await response.json();
    return result;
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value, // Update the 'text' state with the input field value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const message = this.state.text;

    if (!message || !message.trim()) {
      return;
    }

    const textMessage = new CometChat.TextMessage(
      this.state.selectedCustomer,
      message,
      CometChat.RECEIVER_TYPE.USER,
      CometChat.MESSAGE_TYPE.TEXT
    );

    console.log(textMessage);

    CometChat.sendMessage(textMessage)
      .then(
        (sentMessage) => {
          console.log('Message sent successfully:', sentMessage);
          this.setState((prevState) => ({
            chat: [...prevState.chat, sentMessage],
            text: '', // Clear the input field by resetting the `text` state
          }));
        },
        (error) => {
          console.log('Message sending failed with error:', error);
        }
      );
  };

  selectCustomer = (uid) => {
    this.setState(
      {
        selectedCustomer: uid,
      },
      () => {
        this.fetchPreviousMessage(uid);
      }
    );
  };

  fetchPreviousMessage = (uid) => {
        console.log(uid)

    this.setState(
      {
        chat: [],
        chatIsLoading: true,
      },
      () => {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(uid)
          .setLimit(limit)
          .build();

        messagesRequest
          .fetchPrevious()
          .then(
            (messages) => {
              console.log('Message list fetched:', messages);
              this.setState({
                chat: messages,
                chatIsLoading: false,
              });
            },
            (error) => {
              console.log('Message fetching failed with error:', error);
            }
          );
      }
    );
  };

  render() {
    const { customerIsLoading, chatIsLoading } = this.state;

    return (
      <>
        <Header />
        <Fragment>
          <div className="dashboard" style={{ marginTop: '8.1rem' }}>
            <SideBar />
            <div className="chatListContainer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 h-100pr border rounded">
                    <div className="row">
                      <div className="col-lg-4 col-xs-12 bg-light" style={{ height: 658 }}>
                        <div className="row p-3">
                          <h2>Korisnici</h2>
                        </div>
                        <div
                          className="row ml-0 mr-0 h-75 bg-white border rounded"
                          style={{ height: '100%', overflow: 'auto' }}
                        >
                          {customerIsLoading ? (
                            <LoadingSpinner />
                          ) : (
                            <CustomerList
                              customers={this.state.customers}
                              selectedCustomer={this.state.selectedCustomer}
                              selectCustomer={this.selectCustomer}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-lg-8 col-xs-12 bg-light" style={{ height: 658 }}>
                        <div className="row p-3 bg-white">
                          <h2>Ćaskanje</h2>
                        </div>
                        <div className="row pt-5 bg-white" style={{ height: 530, overflow: 'auto' }}>
                          {chatIsLoading ? (
                            <LoadingSpinner />
                          ) : (
                            <ChatBox chat={this.state.chat} />
                          )}
                        </div>
                        <div className="row bg-light" style={{ bottom: 0, width: '100%' }}>
                          <form className="row m-0 p-0 w-100" onSubmit={this.handleSubmit}>
                            <div className="col-9 m-0 p-1">
                              <input
                                id="text"
                                className="mw-100 border rounded form-control"
                                type="text"
                                name="text"
                                ref="message"
                                placeholder="Type a message..."
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="col-3 m-0 p-1">
                              <button
                                className="btn btn-outline-secondary rounded border w-100"
                                title="Send"
                                style={{ paddingRight: 16 }}
                              >
                                Send
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        <div style={{ marginTop: '51rem' }}>
          <Footer />
        </div>
      </>
    );
  }
}

export default Agent;
