import style from "./IaStream.module.scss";
import { useEffect, useState, useRef, RefObject } from "react";
import { clsx } from "@/lib/clx";
import { IHistoryChat } from "@/interfaces/historyChat.interfaces";
// @ts-ignore
import { SSE } from "sse";
import { postMessageHistoryChat } from "@/services/historyChat.services";
import { BsStop } from "react-icons/bs";
import useAutosizeTextArea from "@/hooks/useAutoSize";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function IaReStream({
  historyChat,
  setHistoryChat,
  loading,
  setLoading,
  handleScroll,
}: {
  historyChat: IHistoryChat;
  setHistoryChat: (historyChat: IHistoryChat) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  handleScroll: () => void;
}) {
  const [result, setResult] = useState<string>("");
  const resultRef = useRef<string>();
  const [errorResponse, setErrorResponse] = useState(false);
  const stopGenering = useRef(false);

  const handleStreamRespone = () => {
    try {
      let source = new SSE(`${apiUrl}/history_chats/ia/${historyChat._id}`);
      source.addEventListener("message", (e: any) => {
        if (e.data != "[DONE]" && !stopGenering.current) {
          let payload = JSON.parse(e.data);
          let text = payload.choices[0].delta.content ?? "";
          if (text != "\n") {
            resultRef.current = resultRef.current + text;
            setResult(resultRef.current!);
            // handleScroll()
          }
        } else {
          source.close();
          handleSaveResponse(resultRef.current!);
        }
      });
      source.stream();
    } catch (e) {
      setLoading(false);
      setResult("");
      setErrorResponse(true);
      console.log(e);
    }
  };
  const handleSaveResponse = async (responeseIa: string) => {
    const response = await postMessageHistoryChat(historyChat._id, {
      role: "assistant",
      content: responeseIa,
    });
    if (response.status === 200) {
      setHistoryChat(response.json.content);
    }
    stopGenering.current = false;
    setResult("");
    setLoading(false);
  };

  useEffect(() => {
    resultRef.current = result;
    if (
      result.trim().length === 0 &&
      historyChat.messages.at(-1)?.role === "user" &&
      loading
    ) {
      handleStreamRespone();
    }
  }, [result, historyChat]);

  return (
    <div className={clsx(style.assistent, `${!loading && style.noable}`)}>
      <div className={style.message}>
        <div className={style.user}>
          <span>IA</span> <span>Global S1</span>
        </div>
        <pre className={style.response}>
          <code>{result}</code>
        </pre>
      </div>
      <div className={style.reg}>
        <span onClick={() => (stopGenering.current = true)}>
          <BsStop />
          Stop generating
        </span>
      </div>
    </div>
  );
}
