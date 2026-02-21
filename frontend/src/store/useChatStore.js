import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    typingUsers: [], // Array of user IDs who are typing

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            const authUser = useAuthStore.getState().authUser;
            const filteredUsers = res.data.filter(user => user._id !== authUser?._id);
            set({ users: filteredUsers });

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    deleteMessage: async (messageId) => {
        const { messages } = get();
        try {
            await axiosInstance.delete(`/messages/delete/${messageId}`)
            set({ messages: messages.filter(message => message._id !== messageId) })
            toast.success("Message deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    sendTypingStatus: (isTyping) => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket || !socket.connected) return;

        if (isTyping) {
            socket.emit("typing", { receiverId: selectedUser._id });
        } else {
            socket.emit("stopTyping", { receiverId: selectedUser._id });
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentMesageFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSentMesageFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        });

        socket.on("messageDeleted", (messageId) => {
            set({
                messages: get().messages.filter((m) => m._id !== messageId),
            });
        });

        socket.on("userTyping", ({ senderId }) => {
            if (senderId !== selectedUser._id) return;
            set({ typingUsers: [...new Set([...get().typingUsers, senderId])] });
        });

        socket.on("userStoppedTyping", ({ senderId }) => {
            set({
                typingUsers: get().typingUsers.filter((id) => id !== senderId),
            });
        });
    },

    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("messageDeleted");
        socket.off("userTyping");
        socket.off("userStoppedTyping");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
