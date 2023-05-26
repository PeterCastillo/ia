import { clsx } from "@/lib/clx";
import { BsChatLeft } from "react-icons/bs";
import { TbPencilMinus } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { useState, memo, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { deleteChat, putNewTitleChat } from "@/services/chat.services";
import style from "./Item.module.scss";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ItemSideBar = memo(
  ({ chat_id, title }: { chat_id: string; title: string }) => {
    const [editablaName, setEditableName] = useState(title);
    const [editable, setEditable] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const f = useSearchParams();

    const handleEdit = async () => {
      const response = await putNewTitleChat(chat_id, editablaName);
      if (response.status === 200) {
        setEditable(false);
        router.refresh();
      }
    };

    const handleDelete = async () => {
      const response = await deleteChat(chat_id);
      if (response.status === 200) {
        router.refresh();
        router.push("/");
      }
    };

    // useEffect(() => {
    //     localStorage.clear();
    // }, [pathname]);

    return (
      <li
        key={chat_id}
        className={clsx(
          style.item,
          `${(pathname.includes(chat_id))&& style.active}`
        )}
      >
        <Link href={`/chat/${chat_id}`}>
          <span className={style.icon}>
            <BsChatLeft />
          </span>
          {pathname.includes(chat_id) && editable && (
            <input
              value={editablaName}
              onChange={(e) => setEditableName(e.currentTarget.value)}
              type="text"
              autoFocus
            />
          )}
          <span className={clsx(style.title, `${editable && style.unable}`)}>
            {title}
          </span>
          <div
            className={clsx(
              style.modify,
              `${!pathname.includes(chat_id) && style.unable}`
            )}
          >
            <TbPencilMinus
              className={`${(editable || deletable) && style.unable}`}
              onClick={() => {
                setEditable(true);
                setEditableName(title);
              }}
            />
            <FiTrash2
              className={`${(editable || deletable) && style.unable}`}
              onClick={() => {
                setDeletable(true);
              }}
            />
            <AiOutlineCheck
              onClick={() => (editable ? handleEdit() : handleDelete())}
              className={`${!editable && !deletable && style.unable}`}
            />
            <AiOutlineClose
              onClick={() => {
                setEditable(false);
                setDeletable(false);
              }}
              className={`${!editable && !deletable && style.unable}`}
            />
          </div>
        </Link>
      </li>
    );
  }
);

ItemSideBar.displayName = "ItemSideBar";

export default ItemSideBar;
