import style from "./Loader.module.scss";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { BsFillPersonFill, BsSend, BsThreeDots } from "react-icons/bs";
import StaticContent from "../static-content/StacicContent";
import { RxHamburgerMenu } from "react-icons/rx";

export const Loader = ({ show }: { show: boolean }) => {
  return (
    <div className={style.container}>
      <div className={style.responsive}>
        <RxHamburgerMenu />
        <span>IA-Global S1</span>
        <div>
          <AiOutlinePlus />
        </div>
      </div>
      <div className={style.sidebar}>
        <div className={style.newchat}>
          <span>
            <AiOutlinePlus />
          </span>
          <span>New Chat</span>
        </div>
        <div className={style.chats}>
          <div className={style.ldsspinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
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
      </div>
      <div className={style.content}>
        <div className={style.chat}>
          <StaticContent />
        </div>
        <div className={style.botton}>
          <div className={style.input}>
            <div className={style.inputbtn}>
              <textarea autoFocus></textarea>
              <BsSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
