import "@progress/kendo-theme-default/dist/all.css";
import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            name: "Gabriel",
            id: 1,
            avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
        };
        this.bot = { id: 0 };
        this.state = {
            messages: [
                {
                    author: this.bot,
                    suggestedActions: [
                        {
                            type: 'reply',
                            value: 'What is CPF?'
                        }, {
                            type: 'reply',
                            value: 'Thanks, but this is boring.'
                        }
                    ],
                    timestamp: new Date(),
                    text: "Hello, I am connected to Microsoft azure now!"
                }
            ]
        };
    }

    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        axios.post(`https://WebSightCPFBot.azurewebsites.net/api/messages`,event.message)
        .then(res=>{
          botResponce.text = res['data'];
          console.log(botResponce.text)
        }
        )
        botResponce.author = this.bot;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    botResponce
                ]
            }));
        }, 1000);
    };

    countReplayLength = (question) => {
        let length = question.length;
        let answer = question + " contains exactly " + length + " symbols.";
        return answer;
    }

    render() {
        return (
            <div>
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={400}>
                </Chat>
            </div>
        );
    }
}

export default App;