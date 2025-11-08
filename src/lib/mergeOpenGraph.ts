import type { Metadata } from 'next';

export const SITEURL = 'https://hendy-nurfrianto.vercel.app';

export const defaultOpenGraph: Metadata['openGraph'] = {
title: 'Hendy Nurfrianto',
	description:
    'Welcome to my portfolio! I am Hendy Nurfrianto, a passionate Software Engineer with expertise in creating dynamic and responsive web applications and mobile app. Explore my skills to see how I can help bring your ideas to life.',
	images: [
		{
			url: SITEURL + '/meta/PP.jpg',
		},
	],
	siteName: 'Hendy Nurfrianto CV',
	type: 'website',
};

export const mergeOpenGraph = (
	og?: Metadata['openGraph'] & { image?: string }
): Metadata['openGraph'] => {
	return {
		...defaultOpenGraph,
		images: og?.image
			? [
				{
					url: SITEURL + og.image,
				},
			]
			: defaultOpenGraph.images,
		...og,
	};
};
