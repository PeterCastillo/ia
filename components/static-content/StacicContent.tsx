import { BsSun } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiAlertLine } from "react-icons/ri";
import style from "./StaticContent.module.scss";

const StaticContent = () => {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div>
          <BsSun />
          <span>Examples</span>
        </div>
        <p>Explain quantum computing in simple terms</p>
        <p>Got any creative ideas for a 10 year old’s birthday?</p>
        <p>How do I make an HTTP request in Javascript?</p>
      </div>
      <div className={style.item}>
        <div>
          <AiOutlineThunderbolt />
          <span>Examples</span>
        </div>
        <p>Remembers what user said earlier in the conversation</p>
        <p>Allows user to provide follow-up corrections</p>
        <p>Trained to decline inappropriate requests</p>
      </div>
      <div className={style.item}>
        <div>
          <RiAlertLine />
          <span>Examples</span>
        </div>
        <p>May occasionally generate incorrect information</p>
        <p>May occasionally produce harmful instructions or biased content</p>
        <p>Limited knowledge of world and events after 2021</p>
      </div>
    </div>
  );
};

export default StaticContent;
