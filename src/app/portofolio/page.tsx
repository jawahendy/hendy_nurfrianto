'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ourPortofolio } from '@/constants/data/Service';
import { m } from 'framer-motion';

function getRandomMotion() {
    const x = Math.floor(Math.random() * 120) - 60;
    const y = Math.floor(Math.random() * 120) - 60;
    const opacity = Math.random() * 0.5 + 0.3;
    return { x, y, opacity };
}

const Portofolio = () => {
    const router = useRouter();

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
                                PORTOFOLIO
                            </h1>
                        </div>
                    </div>
                    <div className="mt-3 w-full h-1 bg-white rounded-full" />
                </div>
                {/* Portofolio Cards */}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                    {ourPortofolio.list[0].slides.map((item, idx) => {
                        const random = getRandomMotion();
                        return (
                            <m.div
                                key={item.alt}
                                initial={random}
                                animate={{ x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.1 * idx, ease: 'easeOut' }}
                                className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl flex flex-col items-center p-4 transition hover:scale-105 relative"
                                style={{ minHeight: 320 }}
                            >
                                <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden">
                                    {item.type === 'mobile' ? (
                                        <div className="absolute inset-0 bg-black flex items-center justify-center rounded-xl">
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="rounded-xl object-scale-down"
                                                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="rounded-xl object-cover"
                                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                                        />
                                    )}
                                </div>
                                <div className="w-full flex flex-col items-center mb-4">
                                    <h2 className="text-lg font-bold text-white text-center mb-2">{item.alt}</h2>
                                    <div className="flex flex-wrap justify-self-start gap-2">
                                        {item.tech && item.tech.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 rounded-full bg-white/20 text-xs text-white border border-white/30 backdrop-blur-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {item.link && (
                                    <button
                                        className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/40 transition p-2 rounded-full flex items-center justify-center gap-1"
                                        onClick={() => window.open(item.link, '_blank')}
                                        aria-label="Open Link"
                                    >
                                        <span className="text-xs text-white font-semibold">Go to</span>
                                        {/* Arrow Right Icon */}
                                        <svg className='text-white' width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                )}
                            </m.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Portofolio;