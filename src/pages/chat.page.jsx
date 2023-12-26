// ChatComponent.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server URL

const ChatComponent = () => {
 
  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        <h3>Notifications</h3>
        {notifications.map((notification, index) => (
          <p key={index}>{`${notification.title}: ${notification.body}`}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
