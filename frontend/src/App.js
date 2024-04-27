import "./App.css";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="py-3">
        <HomeScreen />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
