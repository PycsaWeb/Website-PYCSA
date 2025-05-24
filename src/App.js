import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Terms from './components/TermsOfService';
import Privacy from './components/PrivacyPolicy';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/About"
          element={<About />}
        />
        <Route
          path="/Contact"
          element={<Contact />}
        />
        <Route
          path="/blog"
          element={<Blog />}
        />
        <Route
          path="/blog/:postId"
          element={<BlogPostDetail />}
        />
        <Route
          path="/terms"
          element={<Terms />}
        />
        <Route
          path="/privacy"
          element={<Privacy />}
        />
        <Route
          path="/Admin"
          element={<Admin />}
        />
      </Routes>
    </Router>
  );
}
