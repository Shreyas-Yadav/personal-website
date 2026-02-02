import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { ProgressBar } from './components/layout/ProgressBar';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { FeaturedProject } from './components/sections/FeaturedProject';
import { MagneticGallery } from './components/sections/MagneticGallery';
import { TechStats } from './components/sections/TechStats';
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

            {/* Featured Projects */}
            {featuredProjects.map((project, index) => (
                <FeaturedProject
                    key={project.id}
                    project={project}
                    isFirst={index === 0}
                />
            ))}

            <MagneticGallery />
            <TechStats />
            <About />
            <Contact />
            <Footer />
        </CursorProvider>
    );
}

export default App;
