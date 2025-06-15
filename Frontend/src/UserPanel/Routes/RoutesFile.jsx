import { Route, Routes } from "react-router-dom";
import Destination from '../pages/Destination';
import CityDetail from '../pages/CityDetail';
import Hotel from '../pages/Hotel';
import Payment from '../pages/Payment';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Authentication from '../pages/Authentication';
import Feedback from '../pages/Feedback';

const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/user/destinations" element={<Destination />} /> {/* Destinations page route */}
      <Route path="/user/about" element={<About />} /> {/* About page route */}
      <Route path="/user/contact" element={<Contact />} /> {/* Contact page route */}
      <Route path="/user/hotels" element={<Hotel />} /> {/* Hotels page route */}
      <Route path="/city/:city/spot/:spotId" element={<CityDetail />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/auth" element={<Authentication />} /> {/* Authentication route */}
    </Routes>
  );
};

export default RoutesFile;