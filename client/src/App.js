import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Image from "./pages/image/Image";
import Login from "./pages/login/Login";
import Member from "./pages/member/Member";
import Payment from "./pages/payment/Payment";
import Register from "./pages/register/Register";
import Structure from "./pages/structure/Structure";
import Upload from "./pages/upload/Upload";
import {
  NoPageIfConnected,
  PrivateRole,
  PrivateRoute,
  UploadProvider,
} from "./utils/access";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Principale Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/image/:id" element={<Image />} />
          <Route
            path="/structure"
            element={
              <PrivateRoute>
                <Structure />
              </PrivateRoute>
            
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <UploadProvider>
                  <Upload />
                </UploadProvider>
              </PrivateRoute> 
            }
          />

          {/* Auth Routes */}
          <Route
            path="/register"
            element={
              <NoPageIfConnected>
                <Register />
              </NoPageIfConnected>
            }
          />
          <Route
            path="/login"
            element={
              <NoPageIfConnected>
                <Login />
              </NoPageIfConnected>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <PrivateRole role="1">
                  <Admin />
                </PrivateRole>
              </PrivateRoute>
            }
          />

          {/* Other routes */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/member/:id" element={<Member />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
