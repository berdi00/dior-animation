import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

// const variants = {
// 	visible: {
// 		width: '80%',
// 	},
// 	invisible: {
// 		width: '100%',
// 		transition: {
// 			duration: 0.8,
// 			ease: 'easeInOut',
// 		},
// 	},
// };

const SingleViewContainer = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-2.5 w-full h-full'>
			<ImageItem src='https://images.unsplash.com/photo-1581182800629-7d90925ad072?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
			<ImageItem src='https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
		</div>
	);
};

const ImageItem = ({ src }: { src: string }) => {
	const ref = useRef(null);
	// Trigger when half of the element is visible
	// const isInView = useInView(ref, {
	// 	margin: '-50% 0px -50% 0px', // Triggers when 50% of image is in view
	// });

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'start start'], // play with this
	});

	const rawSize = useTransform(scrollYProgress, [0, 1], ['85%', '100%']);
	const smoothSize = useSpring(rawSize, {
		stiffness: 100,
		damping: 20,
	});
	return (
		<div className='relative h-screen w-full flex justify-center items-center' ref={ref}>
			<motion.div
				style={{
					height: smoothSize,
					width: smoothSize,
				}}
			>
				<img src={src} alt='image' className='object-cover w-full h-full' />
			</motion.div>
			<div className='absolute inset-0 flex items-center justify-center'>
				<p className='text-white text-xl drop-shadow-lg font-semibold'>Beautiful Title</p>
			</div>
		</div>
	);
};

export default SingleViewContainer;
