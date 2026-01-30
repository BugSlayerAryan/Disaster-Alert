import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import MyFile from "./pages/MyFile.jsx";
import PublicFileView from "./pages/PublicFileView.jsx";
import Subscription from "./pages/Subscription.jsx";
import Transactions from "./pages/Transactions.jsx";
import UploadDisaster from "./pages/UploadDisaster.jsx";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <Admin />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* <Route
          path="/my-files"
          element={
            <>
              <SignedIn>
                <MyFile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        /> */}
        <Route
          path="/upload-disaster-data"
          element={
            <>
              <SignedIn>
                <UploadDisaster />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        {/* <Route
          path="/subscription"
          element={
            <>
              <SignedIn>
                <Subscription />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              <SignedIn>
                <Transactions />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        /> */}
        <Route path="/*" element={<RedirectToSignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
