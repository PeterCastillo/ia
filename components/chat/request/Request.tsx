import { TbReportMedical } from "react-icons/tb";
import { memo } from "react";
import style from "./Request.module.scss";

const Request = memo(
  ({
    message,
  }: {
    message: string;
  }) => {
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
      <div className={style.user}>
        <div className={style.message}>
          <div className={style.user}><span>P</span><span> Peter Castillo</span></div>
          <p>{message}</p>
          <div className={style.options}>
            <TbReportMedical onClick={handleCopy} className={style.edit} />
          </div>
        </div>
      </div>
    );
  }
);

Request.displayName = "Request";
export default Request;
