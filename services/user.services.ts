const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getChatsByUserService = async (user_id: string) => {
  try {
    const response = await fetch(`${apiUrl}/users/chats/${user_id}`);
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
    return { json: { content: [] }, status: error.status || 500 };
  }
};
