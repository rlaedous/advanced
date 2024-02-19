import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
