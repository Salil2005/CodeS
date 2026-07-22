import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Problem from "./pages/Problem";
import ProblemDetail from "./pages/ProblemDetail";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;
  
  return (
    <>
      <Routes>

      <Route path="/" element={!isSignedIn ? <Home /> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to={"/"} />} />
      <Route
        path="/problems"
        element={
          !isLoaded ? <div>Loading...</div> :
          isSignedIn ? <Problem /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/problem/:id"
        element={isSignedIn ? <ProblemDetail /> : <Navigate to="/" replace />}
      />
      </Routes>
      <Toaster toastOptions={{duration : 3000}}/>
    </>
  );
}

export default App;
