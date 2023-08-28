import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context";
import MyPage from "./pages/Post";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import SubPlan from "./pages/SubPlan";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/subscription" element={<ProtectedRoute />}>
              <Route path="/subscription" element={<MyPage />} />
            </Route>
            <Route path="/sub-plan" element={<ProtectedRoute />}>
              <Route path="/sub-plan" element={<SubPlan />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
