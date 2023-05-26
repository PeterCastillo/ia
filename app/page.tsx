import HomePage from "@/components/modules/home/Home";
import { getChatsByUserService } from "@/services/user.services";

export default async function Home() {
  return (
    <HomePage
      user={{
        _id: "646ee1e7c3fefcd38abfd81b",
        name: "Peter Jack Castillo",
        mail: "peterjackcc@gmail.com",
        password: "peter2002",
      }}
    />
  );
}
