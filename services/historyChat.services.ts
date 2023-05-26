import { IMessage } from "@/interfaces/historyChat.interfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const postFirstMessageHistoryChat = async (
  user_id: string,
  message: { role: "user" | "assitant"; content: string }
) => {
  try {
    const response = await fetch(`${apiUrl}/history_chats/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const status = response.status;
    const json = await response.json();
    if (!response.ok) {
      throw {
        name: "MyError",
        message: `${json.message}: ${json.content} - status:${response.status}`,
        status: response.status,
      };
    }
    return { json, status };
  } catch (error: any) {
    console.log(error.message);
    return { json: { content: null }, status: error.status || 500 };
  }
};

export const postMessageHistoryChat = async (
    history_chat_id: string,
    message: { role: "user" | "assistant"; content: string }
  ) => {
    try {
      const response = await fetch(`${apiUrl}/history_chats/${history_chat_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const status = response.status;
      const json = await response.json();
      if (!response.ok) {
        throw {
          name: "MyError",
          message: `${json.message}: ${json.content} - status:${response.status}`,
          status: response.status,
        };
      }
      return { json, status };
    } catch (error: any) {
      console.log(error.message);
      return { json: null, status: error.status || 500 };
    }
  };

export const getIaGlobalResponse = async (history_chat_id: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/history_chats/ia/${history_chat_id}`, { cache: 'no-store'}
    );
    const status = response.status;
    const json = await response.json();
    if (!response.ok) {
      throw {
        name: "MyError",
        message: `${json.message}: ${json.content} - status:${response.status}`,
        status: response.status,
      };
    }
    return { json, status };
  } catch (error: any) {
    console.log(error.message);
    return { json: null, status: error.status || 500 };
  }
};

export const putRegenerateChat = async (
  history_chat_id: string,
  messages: IMessage[] 
) => {
  try {
    const response = await fetch(`${apiUrl}/history_chats/regenerate/${history_chat_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
    const status = response.status;
    const json = await response.json();
    if (!response.ok) {
      throw {
        name: "MyError",
        message: `${json.message}: ${json.content} - status:${response.status}`,
        status: response.status,
      };
    }
    return { json, status };
  } catch (error: any) {
    console.log(error.message);
    return { json: null, status: error.status || 500 };
  }
};