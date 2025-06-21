'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ourClientData, Skills, Skills2 } from '@/constants/data/Service';
import Autoplay from 'embla-carousel-autoplay';


const Mobile = () => {
    return (
        <div className="grid sm:hidden grid-cols-3 grid-rows-9 gap-4 p-3 max-w-screen-2xl min-h-screen w-full overflow-y-auto max-h-screen">
            <div className="row-span-2 col-span-3 bg-slate-600 rounded-2xl h-52 bg-white/20 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mb-2">
                    <Image src="/image/PP.jpg" alt="Hendy Nurfrianto" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div className="text-white font-bold text-lg">Hendy Nurfrianto</div>
                <div className="text-white text-xs opacity-80 px-5 text-center">I&apos;m a front end developer with 6 years of experience. and still more</div>
            </div>
            <div className="col-span-3 row-span-2 row-start-3 bg-slate-600 rounded-2xl mt-12 h-52 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-4 pt-4 pb-2">
                {/* Arrow Up Right Icon */}
                <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                    {/* Replace with your ArrowUpRight icon import */}
                    <ArrowUpRight className='w-4 h-4 text-white' />
                </span>
                <h2 className="text-2xl font-bold text-white text-center w-full z-10 mb-2">About Me</h2>
                <p className="text-white/80 text-sm text-center">I enjoy building interactive, user-friendly web experiences, mobile apps and I always eager to learn new technologies to improve my craft.</p>
            </div>
            <div className="col-span-3 row-span-2 row-start-5 bg-slate-600 rounded-2xl mt-24 h-52 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-2 py-4">
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
            </div>
            <div className="col-span-3 row-span-2 row-start-7 bg-slate-600 rounded-2xl mt-36 h-60 bg-white/20 backdrop-blur-md border border-white/30 relative flex flex-col items-center justify-center px-2 py-4">
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
            </div>
            <div className="row-start-9 col-span-3 row-span-2  rounded-2xl h-52 mt-56 flex items-center justify-center">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
                    {/* GitHub */}
                    <div className="bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.5a5.07 5.07 0 0 0-.09-3.86S18.73 2.29 16 4a13.38 13.38 0 0 0-7 0C6.27 2.29 5.09 2.64 5.09 2.64A5.07 5.07 0 0 0 5 6.5a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    </div>
                    {/* LinkedIn */}
                    <div className="bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                        </svg>
                    </div>
                    {/* YouTube */}
                    <div className="bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.116C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.57A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.116C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.57a2.994 2.994 0 0 0 2.112-2.116C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                    {/* Instagram */}
                    <div className="bg-slate-600 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white font-semibold relative">
                        <span className="absolute top-1 right-1 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-center">
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mobile;