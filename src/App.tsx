import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SingleViewContainer from './components/SingleViewContainer';

const variants = {
	initial: {
		width: '1200px',
	},
	visible: {
		width: '1200px',
		transition: { duration: 1.5, delay: 0.6 },
	},
	partlyVisible: {
		width: '400px',
	},
};

const imagesVariants = {
	visible: {
		transform: `translateY(0%)`,
		width: '400px',
		opacity: 1,
		transition: { duration: 1.5, delay: 0.5 },
	},
	invisible: {
		transform: `translateY(100%)`,
		width: '200px',
		opacity: 0,
		transition: { duration: 1 },
	},
};

function App() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		margin: '-10% 0px -10% 0px', // Triggers when 50% of image is in view
	});

	useEffect(() => {
		console.log('Element is in view: ', isInView);
	}, [isInView]);

	return (
		<div>
			<div className='w-full h-[130vh]'>
				<div className='sticky top-0 inset-0 w-full h-[100vh] flex items-center gap-2.5 justify-center'>
					<Image direction='left' isInview={isInView} />
					<motion.div
						className='relative h-[600px]'
						animate={isInView ? 'partlyVisible' : 'visible'}
						initial='initial'
						transition={{ type: 'spring', stiffness: 100, damping: 20 }}
						variants={variants}
					>
						<img
							src='https://images.unsplash.com/photo-1556942040-df93bd3bdd19?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='portrait of woman'
							className='relative w-full h-full object-cover'
						/>
					</motion.div>
					<Image direction='right' isInview={isInView} />
				</div>
				<div className='h-full w-full mt-5' ref={ref}></div>
			</div>
			<SingleViewContainer />
		</div>
	);
}

function Image({ isInview, direction }: { isInview: boolean; direction: 'left' | 'right' }) {
	return (
		<motion.div
			className='relative w-[200px] h-[600px] bg-sky-300'
			initial='invisible'
			animate={isInview ? 'visible' : 'invisible'}
			variants={imagesVariants}
		>
			<img
				src={
					direction === 'left'
						? `https://images.unsplash.com/photo-1597143722151-6c041d7b2901?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
						: 'https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				}
				alt='nature'
				className='w-full h-full object-cover'
			/>
		</motion.div>
	);
}

export default App;
