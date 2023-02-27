import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import FullForm from "./components/FullForm.js";
import ChannelList from "./components/ChannelList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MessagesForm from "./components/MessagesForm";

function App() {
  const [render, setRender] = useState("d");
  var current_user;

  return (
    <div className="App">
      {render === "a" && (
        <LoginForm
          current_user={current_user}
          render={render}
          setRender={setRender}
        />
      )}
      {render === "b" && (
        <RegistrationForm render={render} setRender={setRender} />
      )}
      {render === "c" && (
        <>
          <FullForm render={render} setRender={setRender} /> <ChannelList />
        </>
      )}
      {render === "d" && (
        <MessagesForm
          render={render}
          setRender={setRender}
          current_user={current_user}
        />
      )}
    </div>
  );
}

export default App;
