import Link from 'next/link';
import React from 'react';

const Button: React.FC = () => {
	return (
		<Link href ='' className='no-underline text-white py-3 px-8 bg-gradient-to-r from-teal-900 to-teal-300 rounded-3xl'>Get in touch</Link>
	);
};

export default Button;