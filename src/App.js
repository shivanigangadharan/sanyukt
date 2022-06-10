import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
