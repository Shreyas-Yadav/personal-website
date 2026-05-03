import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { ProgressBar } from './components/layout/ProgressBar';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { FeaturedProjects } from './components/sections/FeaturedProject';
import { MagneticGallery } from './components/sections/MagneticGallery';
import { TechStats } from './components/sections/TechStats';
import { Experience } from './components/sections/Experience';
import { Resume } from './components/sections/Resume';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { featuredProjects } from './data/projects';
import './styles/globals.css';
import './styles/animations.css';

function App() {
    return (
        <CursorProvider>
            <ProgressBar />
            <div className="noise" />
            <CustomCursor />
            <Navigation />

            <Hero />

            <Experience />
            <Resume />

            <FeaturedProjects projects={featuredProjects} />

            <MagneticGallery />
            <TechStats />

            <About />
            <Contact />
            <Footer />
        </CursorProvider>
    );
}

export default App;
