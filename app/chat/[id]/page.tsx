import DinamicChat from "@/components/modules/dinamicChat/DinamicChat";
import { getChat } from "@/services/chat.services";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const chat = await getChat(id);
  return (
    <DinamicChat
      user={{
        _id: "646ee1e7c3fefcd38abfd81b",
        name: "Peter Jack Castillo",
        mail: "peterjackcc@gmail.com",
        password: "peter2002",
      }}
      currentChat={chat.json.content}
    />
  );
}
