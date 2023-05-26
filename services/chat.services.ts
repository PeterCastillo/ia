const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getChat = async (chat_id: string) => {
  try {
    const response = await fetch(`${apiUrl}/chats/${chat_id}`, { cache: 'no-store' && "no-cache"});
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
    return { json: null, status: error.status ?? 500 };
  }
};

export const putNewTitleChat = async (chat_id: string, new_title: string) => {
  try {
    const response = await fetch(`${apiUrl}/chats/${chat_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_title: new_title }),
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

export const deleteChat = async (chat_id: string) => {
  try {
    const response = await fetch(`${apiUrl}/chats/${chat_id}`, {
      method: "DELETE",
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
