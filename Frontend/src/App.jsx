import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './UserPanel/pages/LandingPage';
import './App.css';
import RoutesFile from './UserPanel/Routes/RoutesFile'; // Import the separate routes file
import Dashboard from './LocalGuidePannel/components/Dashboard'; // Import the Dashboard component
import LocalGuideRoutes from './LocalGuidePannel/routes/LocalGuideRoutes'; // Import local guide routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/local-guide/*" element={<Dashboard />}> {/* Local guide routes */}
          {LocalGuideRoutes()}
        </Route>
        <Route path="/*" element={<RoutesFile />} /> {/* All other routes */}
      </Routes>
    </Router>
  );
}

export default App;
