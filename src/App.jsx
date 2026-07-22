import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import { PortfolioProvider } from './context/PortfolioContext';
import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <PortfolioProvider>
      <HashRouter>
        <CustomCursor />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </HashRouter>
    </PortfolioProvider>
  );
}

export default App;
