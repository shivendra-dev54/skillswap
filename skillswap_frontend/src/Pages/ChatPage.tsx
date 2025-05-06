import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

const socket = io("http://localhost:64000");

interface ChatPageProps{
    isLoggedIn: boolean
}

const ChatPage = ({isLoggedIn}: ChatPageProps) => {
    const { username } = useParams<{ username: string }>(); // Username of the other user
    const [messages, setMessages] = useState<{ sender: string; message: string; time: string }[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const navigate = useNavigate();



    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);



    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch("http://localhost:64000/api/auth/current", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch user data");
                const data = await res.json();
                setCurrentUser(data.username);
            } catch (err) {
                console.error("Error fetching current user:", err);
                navigate("/"); // Redirect to login if fetching fails
            }
        };

        fetchCurrentUser();
    }, [navigate]);


    // Fetch chat history once currentUser and username are available
    useEffect(() => {
        const fetchChatHistory = async () => {
            if (!currentUser || !username) return;
            try {
                const res = await fetch("http://localhost:64000/api/chat/get_chats", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify({ other_user: username }),
                });

                if (!res.ok) throw new Error("Failed to fetch chat history");
                const data = await res.json();

                // console.log("Previous chat history:", data.chats);
                
                const messagesOnly = data.chats.map((chat: { sender: string; message: string; timestamp: string }) => ({
                    message: chat.message,
                    sender: chat.sender,
                    time: chat.timestamp,
                  }));
                  setMessages(messagesOnly);
                  
                  

            } catch (err) {
                console.error("Error fetching chat history:", err);
            }
        };

        fetchChatHistory();
    }, [currentUser, username, navigate]);



    useEffect(() => {
        if (currentUser && username) {
            socket.emit("join", { userId: currentUser });
        }

        socket.on("receivedMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("receivedMessage");
        };
    }, [currentUser, username]);



    const handleSendMessage = () => {
        if (!newMessage.trim() || !currentUser || !username) return;

        const message = {
            sender: currentUser,
            receiver: username,
            message: newMessage,
            time: new Date().toISOString(),
        };

        socket.emit("sendMessage", {
            sender: message.sender,
            receiver: message.receiver,
            message: message.message,
        });

        setMessages((prevMessages) => [...prevMessages, message]);
        // console.log(message);
        setNewMessage("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-950 text-white rounded-lg shadow-lg space-y-8 mt-6">
            <h1 className="text-3xl font-bold mb-4">Chat with {username}</h1>

            <div className="space-y-4 mb-6" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === currentUser ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`bg-slate-800 p-3 rounded-lg text-white max-w-xs ${msg.sender === currentUser ? "bg-blue-600" : "bg-gray-600"
                                }`}
                        >
                            <p>{msg.message}</p>
                            <small className="text-xs text-gray-400">{new Date(msg.time).toLocaleTimeString()}</small>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="p-2 bg-slate-800 border border-slate-700 rounded text-white w-full"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
