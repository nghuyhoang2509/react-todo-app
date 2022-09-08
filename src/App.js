import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import { Provider } from "react-redux";
import store from "./store/index";
import Toast from "./components/Toast";

function App() {
  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <Provider store={store}>
        <Toast />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route exact element={<Login />} path="/login" />
              <Route exact element={<DashBoard />} path="/"></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
