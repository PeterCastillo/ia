"use client";
import { useState, useCallback, useEffect } from "react";
import { BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineStar, AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { clsx } from "@/lib/clx";
import { IChat } from "@/interfaces/chat.interfaces";
import React from "react";
import style from "./SideBar.module.scss";
import Link from "next/link";
import ItemSideBar from "./item/Item";

const SideBar = ({ userChats }: { userChats: IChat[]; }) => {
  const [show, setShow] = useState(false);

  return (
    <header className={style.container}>
      <div className={style.responsive}>
        <RxHamburgerMenu onClick={() => setShow(!show)} />
        <span>Global S1</span>
        <Link href={"/"}>
          <AiOutlinePlus />
        </Link>
      </div>
      <div className={clsx(style.heedercontainer, `${show && style.show}`)}>
        <nav className={style.header}>
          <Link href={"/"} className={style.newchat}>
            <span>
              <AiOutlinePlus />
            </span>
            <span>New Chat</span>
          </Link>
          <ul>
            {userChats.map((item, index) => (
              // <React.Fragment key={item.date}>
              //   <li className={style.date}>{item.date}</li>
              //   {item.topics.map((item) => (
              <ItemSideBar
                key={item._id}
                chat_id={item._id}
                title={item.title}
              />
              //   ))}
              // </React.Fragment>
            ))}
          </ul>
          <div className={style.user}>
            <div className={style.info}>
              <span>
                <AiOutlineStar />
              </span>
              <span>
                IA-Global S1 Options
              </span>
              <span className={style.new}>NEW</span>
            </div>
            <div className={style.info}>
              <span>
                <BsFillPersonFill />
              </span>
              <span>
                Peter Castillo
              </span>
              <span>
                <BsThreeDots />
              </span>
            </div>
          </div>
        </nav>
        <div className={style.shadow} onClick={() => setShow(false)}>
          <AiOutlineClose
            className={style.close}
            onClick={() => setShow(false)}
          />
        </div>
      </div>
    </header>
  );
};
export default SideBar;
