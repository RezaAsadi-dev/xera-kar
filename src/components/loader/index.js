import { Circles
} from "react-loader-spinner";

import React from "react";
import style from "./style.module.scss"

function Loader() {
  return (
    <div className={style.loaderContainer}>
      <Circles 
        visible={true}
        height="100"
        width="100"
        color="#261f9a"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName={style.boldLines}
      />
    </div>
  );                    
}

export default Loader;
