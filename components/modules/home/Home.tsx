"use client";
import { IChat } from "@/interfaces/chat.interfaces";
import { IHistoryChat } from "@/interfaces/historyChat.interfaces";
import { useState } from "react";
import style from "./Home.module.scss";
import Chat from "@/components/chat/Chat";
import StaticContent from "@/components/static-content/StacicContent";
import Input from "@/components/input/Input";

export default function HomePage({
  user,
}: {
  user: { _id: string; name: string; mail: string; password: string };
}) {
  const [historyChat, setHistoryChat] = useState<IHistoryChat>({
    _id: "",
    chat_id: "",
    messages: [],
  });
  const [loading, setLoading] = useState(false);

  const handleNewMessage = async (chat: IHistoryChat) => {
    setHistoryChat(chat);
  };

  return (
    <div className={style.contenedor}>
      <div className={style.chat}>
        {historyChat._id ? (
          <Chat
            historyChat={historyChat}
            setHistoryChat={setHistoryChat}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <StaticContent />
        )}
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
}
