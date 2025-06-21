'use client';

import Image from 'next/image';

const HomePage = () => {
	return (
        <div className="min-h-screen w-full h-full flex items-center justify-center overflow-auto">
            {/* Desktop/Tablet Grid */}
            <div className="hidden sm:grid grid-cols-7 grid-rows-7 gap-3 p-5 flex-1 max-w-screen-2xl h-full min-h-screen">
                <div className="col-span-4 row-span-2 col-start-2 row-start-1 bg-slate-600 rounded-2xl">1</div>
                <div className="row-span-2 col-start-1 row-start-1 bg-slate-600 rounded-2xl relative overflow-hidden">
                  <Image src="/image/PP.jpg" alt="Profile Picture" fill style={{objectFit:'cover'}} />
                </div>
                <div className="col-span-4 row-span-2 col-start-1 row-start-3 bg-slate-600 rounded-2xl">3</div>
                <div className="col-start-6 row-start-1 bg-slate-600 rounded-2xl">4</div>
                <div className="col-start-7 row-start-1 bg-slate-600 rounded-2xl">5</div>
                <div className="col-start-7 row-start-2 bg-slate-600 rounded-2xl">6</div>
                <div className="col-start-6 row-start-2 bg-slate-600 rounded-2xl">7</div>
                <div className="row-span-2 col-start-5 row-start-3 bg-slate-600 rounded-2xl">8</div>
                <div className="row-span-2 col-start-6 row-start-3 bg-slate-600 rounded-2xl">9</div>
                <div className="row-span-2 col-start-7 row-start-3 bg-slate-600 rounded-2xl">10</div>
                <div className="col-span-3 row-span-3 row-start-5 bg-slate-600 rounded-2xl">11</div>
                <div className="col-span-4 row-span-3 col-start-4 row-start-5 bg-slate-600 rounded-2xl">12</div>
            </div>
            {/* Mobile Grid */}
            <div className="grid sm:hidden grid-cols-3 grid-rows-9 gap-4 p-3 max-w-screen-2xl min-h-screen w-full overflow-y-auto max-h-screen">
                <div className="row-span-2 col-span-3 bg-slate-600 rounded-2xl h-52">1</div>
                <div className="col-span-3 row-span-2 row-start-3 bg-slate-600 rounded-2xl mt-12 h-52">2</div>
                <div className="col-span-3 row-span-2 row-start-5 bg-slate-600 rounded-2xl mt-24 h-52">3</div>
                <div className="col-span-3 row-span-2 row-start-7 bg-slate-600 rounded-2xl mt-36 h-52">4</div>
                <div className="row-start-9 col-span-3 row-span-2 bg-slate-600 rounded-2xl h-52 mt-48">5</div>
            </div>
        </div>
	);
};

export default HomePage;