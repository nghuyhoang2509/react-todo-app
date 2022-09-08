import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import StoreProvider from "./store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact element={<Login />} path="/login" />
            <Route
              exact
              element={
                <StoreProvider>
                  <DashBoard />
                </StoreProvider>
              }
              path="/"
            ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
