

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
	href: string;
	text: string;
}

const Button: React.FC<ButtonProps> = ({ href, text }) => {

	return (
		<Link className="no-underline relative text-white py-3 px-8 	bg-color-primary-dark  rounded-full z-10  hover:bg-teal-700" href={href} >{text}</Link>
	);
};

export default Button;
