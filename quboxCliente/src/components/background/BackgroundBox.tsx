import style from "./BackgroundBox.module.css";
import imageqb from "../../assets/qboxLogo.png";

export const BackgroundBox = () => {
  return (
    <section>
      <div className={style.area}>
        <ul className={style.circles}>
          {[...Array(10)].map((_, index) => (
            <li key={index}>
              <img src={imageqb} alt="img" className={style.grayImage} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
