'use client';

import Desktop from './Desktop';

const HomePage = () => {
    return (
        <div className="min-h-screen w-full h-full flex items-center justify-center overflow-auto bg-cover bg-center" style={{ backgroundImage: 'url(/image/bg.jpg)' }}>
            {/* Desktop/Tablet Grid */}
            <Desktop />
            {/* Mobile Grid */}
            <div className="grid sm:hidden grid-cols-3 grid-rows-9 gap-4 p-3 max-w-screen-2xl min-h-screen w-full overflow-y-auto max-h-screen">
                <div className="row-span-2 col-span-3 bg-slate-600 rounded-2xl h-52 bg-white/20 backdrop-blur-md border border-white/30">1</div>
                <div className="col-span-3 row-span-2 row-start-3 bg-slate-600 rounded-2xl mt-12 h-52 bg-white/20 backdrop-blur-md border border-white/30">2</div>
                <div className="col-span-3 row-span-2 row-start-5 bg-slate-600 rounded-2xl mt-24 h-52 bg-white/20 backdrop-blur-md border border-white/30">3</div>
                <div className="col-span-3 row-span-2 row-start-7 bg-slate-600 rounded-2xl mt-36 h-52 bg-white/20 backdrop-blur-md border border-white/30">4</div>
                <div className="row-start-9 col-span-3 row-span-2 bg-slate-600 rounded-2xl h-52 mt-48 bg-white/20 backdrop-blur-md border border-white/30">5</div>
            </div>
        </div>
    );
};

export default HomePage;