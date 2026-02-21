import React, { useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeleton/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/utils.js';
import { Trash2 } from 'lucide-react';


const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessage, deleteMessage, typingUsers } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessage();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])


  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} group`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            {message.senderId === authUser._id && (
              <button
                onClick={() => deleteMessage(message._id)}
                className="chat-footer opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-error"
                title="Delete message"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}

        {typingUsers.includes(selectedUser._id) && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
              </div>
            </div>
            <div className="chat-bubble bg-transparent p-0 flex items-center gap-1">
              <span className="loading loading-dots loading-xs"></span>
              <span className="text-xs italic opacity-70">{selectedUser.fullName} is typing...</span>
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
