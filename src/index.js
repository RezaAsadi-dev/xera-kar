import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./style.css";
import * as serviceWorker from "./serviceWorker";

import { SoftUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NextUIProvider } from "@nextui-org/react";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NextUIProvider>
      <SoftUIControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SoftUIControllerProvider>
    </NextUIProvider>
  </BrowserRouter>
);

// ReactDOM.render(
//   <BrowserRouter>
//     <NextUIProvider>
//       <SoftUIControllerProvider>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </SoftUIControllerProvider>
//     </NextUIProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

serviceWorker.register();
