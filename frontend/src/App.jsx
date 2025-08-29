import { Route, Routes } from "react-router-dom";
import TodoPage from "./TodoPage.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
function App() {
  return (
    <div className="h-screen overflow-scroll">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Todo" element={<TodoPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </div>
  );
}
export default App;
