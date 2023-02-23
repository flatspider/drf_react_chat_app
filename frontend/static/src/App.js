import "./App.css";
import Cookies from "js-cookie";
import FullForm from "./components/FullForm.js";
import ChannelList from "./components/ChannelList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FullForm />
        <ChannelList />
      </header>
    </div>
  );
}

export default App;
