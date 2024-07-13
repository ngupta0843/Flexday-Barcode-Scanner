import React, { createContext, useState, useContext } from 'react';

const ConversationsContext = createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);

    const value = { conversations, setConversations };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
};
