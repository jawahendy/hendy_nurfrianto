'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ourClientData, Skills, Skills2 } from '@/constants/data/Service';
import Autoplay from 'embla-carousel-autoplay';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Mobile = () => {
    const router = useRouter();
    return (
        <div className="grid sm:hidden grid-cols-3 grid-rows-9 gap-4 p-3 max-w-screen-2xl min-h-screen w-full overflow-y-auto max-h-screen">
            <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="row-span-2 col-span-3 bg-slate-600 rounded-2xl h-52 bg-white/20 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center"
            >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mb-2">
                    <Image src="/image/PP.jpg" alt="Hendy Nurfrianto" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div className="text-white font-bold text-lg">Hendy Nurfrianto</div>
                <div className="text-white text-xs opacity-80 px-5 text-center">I&apos;m a front end developer with 6 years of experience. and still more</div>
            </m.div>
            <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className="col-span-3 row-span-2 row-start-3 bg-slate-600 rounded-2xl mt-12 h-52 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-4 pt-4 pb-2"
            >
                <h2 className="text-2xl font-bold text-white text-center w-full z-10 mb-2">About Me</h2>
                <p className="text-white/80 text-sm text-center">I enjoy building interactive, user-friendly web experiences, mobile apps and I always eager to learn new technologies to improve my craft.</p>
            </m.div>
            <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className="col-span-3 row-span-2 row-start-5 bg-slate-600 rounded-2xl mt-24 h-52 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-2 py-4"
            >
                <h3 className="text-xl font-bold text-white mb-2 mt-3 text-center w-full z-10">Working Experiance</h3>
                {/* Client Carousel */}
                <div className="w-full flex-1 flex items-center justify-center">
                    {ourClientData.list.map((client) => (
                        <Carousel
                            key={client.id}
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                }),
                            ]}
                            opts={{
                                direction: 'ltr',
                                loop: true,
                            }}
                            className="w-full max-w-full px-2">
                            <CarouselContent>
                                {client.slides.map((slide) => (
                                    <CarouselItem key={slide.alt} className="flex flex-col items-center justify-center basis-1/3">
                                        <div className='h-[80px] aspect-video relative w-28 sm:w-40 max-w-full max-h-full' style={slide.style}>
                                            <Image
                                                src={slide.src}
                                                alt={slide.alt}
                                                fill
                                                sizes='(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 60vw'
                                                className='w-full h-full object-contain max-w-full max-h-full'
                                            />
                                        </div>
                                        <span className="text-xs text-white mt-2 text-center w-full truncate">{slide.alt}</span>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    ))}
                </div>
            </m.div>
            <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                onClick={() => router.push('/skill')}
                className="hover:cursor-pointer col-span-3 row-span-2 row-start-7 bg-slate-600 rounded-2xl mt-36 h-60 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-2 py-4"
            >
                {/* Arrow Up Right Icon */}
                <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                    <ArrowUpRight className='w-4 h-4 text-white' />
                </span>
                <h3 className="text-xl font-bold text-white mb-2 mt-3 text-center w-full z-10">Skills</h3>
                <div className="w-full flex flex-col items-center justify-center gap-y-2">
                    {Skills.list.map((client) => (
                        <Carousel
                            key={client.id}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            opts={{
                                loop: true,
                            }}
                            className="w-full max-w-full px-2">
                            <CarouselContent>
                                {client.slides.map((slide) => (
                                    <CarouselItem key={slide.alt} className="flex flex-col items-center justify-center basis-1/3">
                                        <div className='h-[40px] aspect-video relative w-24 sm:w-40 max-w-full max-h-full flex items-center justify-center' style={slide.style}>
                                            <Image
                                                src={slide.src}
                                                alt={slide.alt}
                                                fill
                                                sizes='(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 60vw'
                                                className='w-full h-full object-contain max-w-full max-h-full'
                                            />
                                        </div>
                                        <span className="mt-2 text-xs text-white font-semibold text-center w-full block break-words whitespace-normal">{slide.alt}</span>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    ))}
                    {Skills2.list.map((client) => (
                        <Carousel
                            key={client.id}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            opts={{
                                direction: 'ltr',
                                loop: true,
                            }}
                            className="w-full max-w-full px-2">
                            <CarouselContent>
                                {client.slides.map((slide) => (
                                    <CarouselItem key={slide.alt} className="flex flex-col items-center justify-center basis-1/3">
                                        <div className='h-[40px] aspect-video relative w-24 sm:w-40 max-w-full max-h-full flex items-center justify-center' style={slide.style}>
                                            <Image
                                                src={slide.src}
                                                alt={slide.alt}
                                                fill
                                                sizes='(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 60vw'
                                                className='w-full h-full object-contain max-w-full max-h-full'
                                            />
                                        </div>
                                        <span className="mt-2 text-xs text-white font-semibold text-center w-full block break-words whitespace-normal">{slide.alt}</span>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    ))}
                </div>
            </m.div>
            <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                className="row-start-9 col-span-3 row-span-2  rounded-2xl h-52 mt-56 flex items-center justify-center"
            >
                <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
                    {/* GitHub */}
                    <div 
                        onClick={() => window.open('https://github.com/jawahendy', '_blank')}
                        className="hover:cursor-pointer bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.5a5.07 5.07 0 0 0-.09-3.86S18.73 2.29 16 4a13.38 13.38 0 0 0-7 0C6.27 2.29 5.09 2.64 5.09 2.64A5.07 5.07 0 0 0 5 6.5a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    </div>
                    {/* LinkedIn */}
                    <div 
                        onClick={() => window.open('https://www.linkedin.com/in/hendy-nurfrianto-4977b0177/', '_blank')}
                        className="hover:cursor-pointer bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                        </svg>
                    </div>
                    <div
                         onClick={() => router.push('/portofolio')}
                        className="hover:cursor-pointer bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl  items-center justify-center text-white font-semibold relative">
                        {/* Arrow Up Right Icon */}
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <div className="flex flex-row items-center justify-center gap-2 mt-4 mb-2">
                            {/* Web Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {/* Mobile Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="18" r="1" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="w-full flex justify-center">
                            <span className="mt-1 mb-2 text-base font-bold text-white text-center block">Portofolio</span>
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-2">
                        {/* YouTube */}
                        <div 
                            onClick={() => window.open('https://www.youtube.com/@Bang_hen490', '_blank')}
                            className="hover:cursor-pointer bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                            <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                                <ArrowUpRight className='w-4 h-4 text-white' />
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.116C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.57A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.116C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.57a2.994 2.994 0 0 0 2.112-2.116C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </div>
                        {/* Hire me */}
                        <div
                            onClick={() => window.open('https://drive.google.com/drive/folders/1Y2T8prWNpxZ9nxEz6mHjsLIhL_2P1Feg?usp=sharing', '_blank')}
                            className="hover:cursor-pointer bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                            <button
                                className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-lg transition"
                                style={{ zIndex: 1 }}
                            >
                                Hire Me
                            </button>
                        </div>
                    </div>
                </div>
            </m.div>
        </div>
    );
};

export default Mobile;