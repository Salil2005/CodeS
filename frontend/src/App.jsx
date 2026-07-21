import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";

import Problem from "./pages/Problem";
import { Toaster } from "react-hot-toast";

function App() {
  const {isSignedIn} = useUser() ; // User already loged in or not
  return (
    <>
      <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/problems" element={isSignedIn ? <Problem /> : <Navigate to={"/"}/>} />
      </Routes>
      <Toaster toastOptions={{duration : 3000}}/>
    </>
  );
}

export default App;