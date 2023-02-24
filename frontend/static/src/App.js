import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import FullForm from "./components/FullForm.js";
import ChannelList from "./components/ChannelList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [render, setRender] = useState("a");

  return (
    <div className="App">
      {render === "a" && <LoginForm render={render} setRender={setRender} />}
      {render === "b" && (
        <RegistrationForm render={render} setRender={setRender} />
      )}
      {render === "c" && (
        <>
          <FullForm render={render} setRender={setRender} /> <ChannelList />
        </>
      )}
    </div>
  );
}

export default App;
