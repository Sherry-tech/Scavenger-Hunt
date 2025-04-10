import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LogInPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Hunts from "./pages/Hunts";
import CreateNewHunt from "./pages/CreateNewHunt";
import ViewHunt from "./components/hunt/ViewHunt";
import Submission from "./pages/Submission";
import Experience from "./pages/Experience";
import ViewExperiencePage from "./components/experiences/ViewExperiencePage";
import Clue from "./pages/Clue";
import AccountManagement from "./pages/AccountManagement";
import Location from "./pages/Location";
import ViewLocationPage from "./components/locations/ViewLocationPage";
import Feedback from "./pages/Feedback";
import Notification from "./pages/Notification";

import PrivateRoute from "./components/common/PrivateRoute";
import AuthListener from "./components/common/AuthListener";

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Change document title and meta description based on route
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Login Page";
        metaDescription = "Welcome to the Login Page";
        break;
      case "/dashboard":
        title = "Dashboard";
        metaDescription = "Welcome to the Dashboard";
        break;
      case "/hunt":
        title = "Hunt";
        metaDescription = "Welcome to the Hunt";
        break;
      case "/submission":
        title = "Submission";
        metaDescription = "Welcome to the Submission";
        break;
      case "/experience":
        title = "Experience";
        metaDescription = "Experience";
        break;
      case "/location":
        title = "Location";
        metaDescription = "Location";
        break;
      case "/clues":
        title = "Clues";
        metaDescription = "Clues";
        break;
      // Add more cases for other routes as needed
      default:
        title = "Default Title";
        metaDescription = "Default Description";
    }

    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description tag
    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <AuthListener>
      <Routes>
        <Route path="/" element={<LogInPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/hunt" element={<PrivateRoute element={Hunts} />} />
        <Route path="/view-hunt/:id" element={<PrivateRoute element={ViewHunt} />} />
        <Route path="/submission" element={<PrivateRoute element={Submission} />} />
        <Route path="/experience" element={<PrivateRoute element={Experience} />} />
        <Route
          path="/view-experience/:id"
          element={<PrivateRoute element={ViewExperiencePage} />}
        />
        <Route path="/clues" element={<PrivateRoute element={Clue} />} />
        <Route
          path="/account-management"
          element={<PrivateRoute element={AccountManagement} />}
        />
        <Route path="/create-new-hunt" element={<PrivateRoute element={CreateNewHunt} />} />
        <Route path="/location" element={<PrivateRoute element={Location} />} />
        <Route
          path="/view-location/:id"
          element={<PrivateRoute element={ViewLocationPage} />}
        />
        <Route path="/feedback" element={<PrivateRoute element={Feedback} />} />
        <Route path="/notifications" element={<PrivateRoute element={Notification} />} />
      </Routes>
    </AuthListener>
  );
}

export default App;
