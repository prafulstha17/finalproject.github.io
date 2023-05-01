import React, { useState, useEffect } from 'react';
import { auth } from '../../confg/firebase';
import './Message.css';

function Message() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    function handleClick() {
        const chatBox = document.querySelector('.chat-box');
        chatBox.classList.toggle('scale');
        chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
    }

    function handleSubmit(event) {
        event.preventDefault();

        const inputField = document.querySelector('#chat-input');
        const messageText = inputField.value;

        if (messageText.trim() !== '') {
            const chatLogs = document.querySelector('.chat-logs');
            const message = document.createElement('div');
            message.className = 'chat self';
            message.innerHTML = messageText;
            chatLogs.appendChild(message);
            inputField.value = '';
        }
    }

    return (
        <>
            {user ? (
                <div id="body">
                    <div id="chat-circle" class="btn sticky-bottom" onClick={handleClick}>
                        <div id="chat-overlay"></div>
                        <i class="fa-solid fa-comment fa-flip-horizontal fa-2xl fa-camera" id='my-btn'></i>
                    </div>
                    <div class="chat-box">
                        <div class="chat-box-header">
                            FlexiTalk
                            <span class="chat-box-toggle">
                                <i class="fa-solid fa-xmark" onClick={handleClick}></i>
                            </span>
                        </div>
                        <div class="chat-box-body">
                            <div class="chat-box-overlay"></div>
                            <div class="chat-logs"></div>
                        </div>
                        <div class="chat-input">
                            <form onSubmit={handleSubmit}>
                                <input type="text" id="chat-input" placeholder="Send a message..." />
                                <button type="submit" class="chat-submit" id="chat-submit">
                                    <i class="material-icons">send</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : ('')}
        </>
    );
}

export default Message;
