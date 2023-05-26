"use client";
import style from "./DinamicChat.module.scss";
import { useState } from "react";
import Chat from "@/components/chat/Chat";
import Input from "@/components/input/Input";
import { IHistoryChat } from "@/interfaces/historyChat.interfaces";

const DinamicChat = ({
  user,
  currentChat,
}: {
  user: { _id: string; name: string; mail: string; password: string };
  currentChat: IHistoryChat;
}) => {
  const [historyChat, setHistoryChat] = useState<IHistoryChat>(currentChat);
  const [loading, setLoading] = useState(false);

  const handleNewMessage = async (newChat: IHistoryChat) => {
    setHistoryChat(newChat);
  };

  return (
    <div className={style.contenedor}>
      <div className={style.chat}>
        <Chat
          historyChat={historyChat}
          setHistoryChat={setHistoryChat}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <div className={style.botton}>
        <div className={style.input}>
          <Input
            history_chat_id={historyChat._id}
            handleNewMessage={handleNewMessage}
            user={user}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default DinamicChat;
