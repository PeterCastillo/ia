import { BsSend } from "react-icons/bs";
import { useState, useRef } from "react";
import style from "./Input.module.scss";
import useAutosizeTextArea from "@/hooks/useAutoSize";
import { IHistoryChat } from "@/interfaces/historyChat.interfaces";
import {
  postFirstMessageHistoryChat,
  postMessageHistoryChat,
} from "@/services/historyChat.services";
import { useRouter } from "next/navigation";

const Input = ({
  history_chat_id,
  handleNewMessage,
  user,
  setLoading,
  loading,
}: {
  history_chat_id: string;
  handleNewMessage: (date: IHistoryChat) => void;
  user: { _id: string; name: string; mail: string; password: string };
  setLoading: (state: boolean) => void;
  loading: boolean;
}) => {
  const [userMessage, setUserMessage] = useState<{
    role: "user";
    content: string;
  }>({
    role: "user",
    content: "",
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useAutosizeTextArea(textAreaRef.current, userMessage.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setUserMessage({
      ...userMessage,
      content: value,
    });
  };

  const postMessage = async () => {
    if (userMessage.content.trim().length === 0 || loading) {
      return;
    }
    setLoading(true);
    const response = history_chat_id
      ? await postMessageHistoryChat(history_chat_id, userMessage)
      : await postFirstMessageHistoryChat(user._id, userMessage);
    if (response.status === 200 || response.status === 201) {
      if (!history_chat_id) {
        router.refresh();
      }
      handleNewMessage(response.json.content);
      setUserMessage({
        ...userMessage,
        content: "",
      });
      return;
    }
    setLoading(false);
  };

  return (
    <div className={style.input}>
      <textarea
        onChange={handleChange}
        placeholder="Send a Message"
        ref={textAreaRef}
        value={userMessage.content}
        autoFocus
      ></textarea>
      <BsSend
        onClick={postMessage}
        className={`${
          userMessage.content.trim().length > 0 && !loading && style.able
        }`}
      />
    </div>
  );
};

export default Input;
