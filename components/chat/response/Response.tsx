import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TbReportMedical } from "react-icons/tb";
import style from "./Response.module.scss";
import { memo } from "react";

const Response = memo(({ message }: { message: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        console.log('Texto copiado al portapapeles');
      })
      .catch((error) => {
        console.error('Error al copiar el texto:', error);
      });
  };
  return (
    <div className={style.assistent}>
      <div className={style.message}>
        <div className={style.user}>
          <span>IA</span> <span>Global S1</span>
        </div>
        <pre className={style.response}>
          <code className="language-python">{message}</code>
        </pre>
        <div className={style.options}>
          <TbReportMedical onClick={handleCopy} />
          <AiOutlineLike />
          <AiOutlineDislike />
        </div>
      </div>
    </div>
  );
});

Response.displayName = "Response";
export default Response;
