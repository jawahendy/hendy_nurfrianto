'use client';

import React, { memo, useMemo } from 'react';
import AutoScroll, { AutoScrollOptionsType } from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/lib/utils';

type Slide = { content: React.ReactNode };

type MarqueeProps = {
  slides: Slide[];
  direction?: 'forward' | 'backward';
  className?: string;
  autoScrollOptions?: AutoScrollOptionsType;
};

const Marquee = memo(
	({ slides, direction, autoScrollOptions, className }: MarqueeProps) => {
		const [emblaRef] = useEmblaCarousel({ loop: true }, [
			AutoScroll({
				playOnInit: true,
				active: true,
				startDelay: 0,
				stopOnMouseEnter: false,
				stopOnInteraction: false,
				direction,
				...autoScrollOptions,
			}),
		]);

		const duplicateSlides = useMemo<Slide[]>(
			() =>
				Array(3)
					.fill([...slides])
					.flat(),
			[slides]
		);

		const content = useMemo(
			() => (
				<div
					className='overflow-hidden'
					ref={ emblaRef }>
					<div className={ cn('flex touch-pinch-zoom touch-pan-y', className) }>
						{ duplicateSlides.map((detail, index) => (
							<div
								className='min-w-0 flex flex-none items-center select-none'
								style={ {
									transform: 'translate3d(0, 0, 0)',
								} }
								key={ index }
							>
								{ detail.content }
							</div>
						)) }
					</div>
				</div>
			),
			[emblaRef, className, duplicateSlides]
		);

		return content;
	}
);

Marquee.displayName = 'Marquee';

export default Marquee;
