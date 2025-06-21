'use client';

import Desktop from './Desktop';
import Mobile from './Mobile';


const HomePage = () => {
    return (
        <div className="min-h-screen w-full h-full flex items-center justify-center overflow-auto bg-cover bg-center" style={{ backgroundImage: 'url(/image/bg.jpg)' }}>
            {/* Desktop/Tablet Grid */}
            <Desktop />
            {/* Mobile Grid */}
            <Mobile />
        </div>
    );
};

export default HomePage;