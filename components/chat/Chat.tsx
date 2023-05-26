import style from "./Chat.module.scss";
import Request from "./request/Request";
import Response from "./response/Response";
import IaReStream from "./ia-stream/IaStream";
import React, { useRef } from "react";
import { clsx } from "@/lib/clx";
import { IHistoryChat } from "@/interfaces/historyChat.interfaces";
import { TfiReload } from "react-icons/tfi";
import { putRegenerateChat } from "@/services/historyChat.services";

export default function Chat({
  historyChat,
  setHistoryChat,
  loading,
  setLoading,
}: {
  historyChat: IHistoryChat;
  setHistoryChat: (chat: IHistoryChat) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}) {
  const container = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (container.current) {
      container.current.scrollTo({
        top: container.current.scrollHeight,
        behavior: "auto",
      });
    }
  };
  const handleRegenerateResponse = async () => {
    const response = await putRegenerateChat(
      historyChat._id,
      historyChat.messages
    );
    if (response.status === 200) {
      setLoading(true)
      setHistoryChat(response.json.content);
    }
  };

  return (
    <div className={style.chat}>
      <div className={clsx(style.reg, `${loading && style.noable}`)}>
        <span onClick={handleRegenerateResponse}>
          <TfiReload />
          Regenerate response
        </span>
      </div>
      <div
        ref={container}
        className={clsx(style.container, `${loading && style.loading}`)}
      >
        {historyChat.messages.map((item, index) => (
          <React.Fragment key={index}>
            {
              {
                user: <Request message={item.content} />,
                assistant: <Response message={item.content} />,
              }[item.role]
            }
          </React.Fragment>
        ))}
        <IaReStream
          historyChat={historyChat}
          setHistoryChat={setHistoryChat}
          loading={loading}
          setLoading={setLoading}
          handleScroll={handleScroll}
        />
      </div>
    </div>
  );
}
