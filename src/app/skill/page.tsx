'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Skills as Skills1 , Skills2 } from '@/constants/data/Service';
import { m } from 'framer-motion';

const getRandomDirection = () => {
    // Returns a random initial offset for x and y
    const directions = [
        { x: -80, y: 0 },
        { x: 80, y: 0 },
        { x: 0, y: -80 },
        { x: 0, y: 80 },
        { x: -60, y: -60 },
        { x: 60, y: 60 },
        { x: -60, y: 60 },
        { x: 60, y: -60 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
};

const Skills = () => {
    const router = useRouter();

    const allskills = Skills1.list[0].slides.concat(
        Skills2.list.flatMap(client => client.slides)
    );

    return (
        <div className="min-h-screen w-full h-full flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/image/bg.jpg)' }}>
            <div className="m-5 relative w-full flex-grow rounded-2xl p-6 md:p-10 flex flex-col justify-start items-stretch
                bg-white/10 backdrop-blur-md border border-white/30 shadow-lg"
                style={{ minHeight: 'calc(100vh - 2.5rem)' }} // 2.5rem = m-5 top+bottom
            >
                <div className="absolute left-6 top-6 right-6 w-auto">
                    <div className="flex items-center gap-3">
                        {/* Glassmorph card for arrow button */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-full">
                            <button
                                className="p-2 rounded-full hover:bg-white/20 transition"
                                onClick={() => router.push('/')}
                                aria-label="Back"
                            >
                                {/* Arrow Left Icon */}
                                <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                SKILLS
                            </h1>
                        </div>
                    </div>
                    <div className="mt-3 w-full h-1 bg-white rounded-full" />
                </div>
                {/* Skills grid below underline */}
                <div className="pt-[72px] md:pt-[80px] flex flex-col items-center w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full">
                        {allskills.map((slide, idx) => {
                            const { x, y } = getRandomDirection();
                            return (
                                <m.div
                                    key={`${slide.alt}-${idx}`}
                                    initial={{ opacity: 0, x, y }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1 + (idx * 0.04),
                                        ease: 'easeOut'
                                    }}
                                    className="flex flex-col items-center justify-between bg-white/5 rounded-xl p-3 md:p-4 h-full min-h-[140px] md:min-h-[160px]"
                                >
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt}
                                        style={slide.style}
                                        className="object-contain max-h-16 md:max-h-20 w-auto mb-2"
                                        width={96}
                                        height={96}
                                        unoptimized={true}
                                    />
                                    <span className="text-center text-white text-xs md:text-sm font-medium mt-2 break-words">
                                        {slide.alt}
                                    </span>
                                </m.div>
                            );
                        })}
                    </div>
                </div>
                {/* ...other content if needed... */}
            </div>
        </div>
    );
};

export default Skills;