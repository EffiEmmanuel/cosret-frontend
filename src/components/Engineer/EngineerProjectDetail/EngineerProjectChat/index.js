import Chat from "@/components/ProjectChat/Chat";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaPlaneDeparture } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { EngineerContext } from "../../EngineerDashboard";

// SOCKET.IO CONFIG
const socket = io.connect(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}`);
// const socket = io.connect("https://www.corset-backend.vercel.app");

export default function EngineerProjectChat(props) {
  const { engineer } = useContext(EngineerContext);

  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");

  //   Ref to prevent useEffect from running twice
  const dataFetchRef = useRef(false);

  //   Load all messages from this chat room
  async function getMessages() {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/messages/${props?.project?.chatRoom}/get-messages`
      )
      .then((res) => {
        console.log("MESSAGES:", res.data);
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  // Connect to Web Socket here to enable chat functionality
  function joinChatRoom() {
    socket.emit("join-room", `${props?.project?.chatRoom}`);
    console.log("CHATROOM:", props?.project);
  }
  // Use websocket to send message
  function sendMessage() {
    if (!newMessage.replace(/\s/g, "").length) {
      toast.info("Message box cannot contain only whitespaces");
      return;
    } else {
      socket.emit("send-message", {
        text: newMessage,
        chatRoom: props?.project?.chatRoom,
        sender: engineer._id,
        modelType: "Engineer",
      });
      setMessages((message) => [
        ...message,
        {
          message: newMessage,
          chatRoom: props?.project?.chatRoom,
          sender: engineer,
          modelType: "Engineer",
        },
      ]);
      console.log("SEND MESSAGE:", messages);
      //   Reset input field
      setNewMessage("");
    }
  }

  useEffect(() => {
    getMessages();
    joinChatRoom();
  }, []);

  async function updateMessages(data) {
    setMessages((message) => [
      ...message,
      {
        _id: data._id,
        message: data.message,
        sender: {
          _id: data.sender._id,
          firstName: data.sender.firstName,
          lastName: data.sender.lastName,
          email: data.sender.email,
        },
      },
    ]);
    return;
  }

  //   Listen to changes on socket server
  useEffect(() => {
    socket.on("receive-message", async (data) => {
      if (dataFetchRef.current) return;
      dataFetchRef.current = true;
      updateMessages(data);
    });
  },[socket]);

  return (
    <>
      {/* OVERVIEW */}
      <ToastContainer />
      <div className="border-[.5px] p-7 h-[90vh] max-w-lg lg:max-w-2xl relative rounded-lg">
        <div className="border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold">
            {props?.project?.owner?.firstName} {props?.project?.owner?.lastName}
          </h1>
          <div className="flex gap-1">
            <div className="h-[5px] w-[5px] my-auto bg-green-400 rounded-full"></div>
            <p className="text-xs my-auto mt-[1.5px]">Active now</p>
          </div>
          {/* <div className="flex gap-1">
            <div className="h-[5px] w-[5px] my-auto bg-gray-400 rounded-full"></div>
            <p className="text-xs my-auto mt-[1.5px]">Offline</p>
          </div> */}
        </div>

        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          {/* CHAT */}
          <Chat
            isEngineer={true}
            role={engineer}
            messages={messages}
            project={props?.project}
          />

          <form
            className="absolute bottom-4 left-0 right-0 mx-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex h-12 align-middle border-[.5px] px-4">
              <input
                type="text"
                name="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full h-full border-gray-400  px-8 text-black text-sm rounded-lg rounded-bl-lg focus:outline-none"
              />
              <button type="submit" onClick={sendMessage}>
                <FaPaperPlane className="text-lg my-auto self-center" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
