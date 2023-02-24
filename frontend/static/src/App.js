import "./App.css";
import Cookies from "js-cookie";
import FullForm from "./components/FullForm.js";
import ChannelList from "./components/ChannelList";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      {
        //<FullForm />
      }
      {
        //<ChannelList />
      }
      <LoginForm />
    </div>
  );
}

export default App;
