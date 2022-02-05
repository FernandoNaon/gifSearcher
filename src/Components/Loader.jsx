import React from "react";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.LoaderContainer}>
      <img
        src="https://i.gifer.com/origin/36/36b34ff15081efd2aa73672be349c1d5_w200.gif"
        alt="loading"
      />
    </div>
  );
};

export default Loader;
