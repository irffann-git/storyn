import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer />

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);