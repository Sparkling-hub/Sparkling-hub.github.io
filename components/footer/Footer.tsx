

import Link from 'next/link';
import React from 'react';


const Footer: React.FC = () => {


	return (
		<footer className='mt-36'>
			<div className='
							content-section 
							bg-color-primary-dark 
							relative
							text-white 
							flex-col 
							items-center 
							justify-center							
							-mt-36'>

				<section className="flex items-center w-full justify-center relative before:w-full before:absolute before:-top-calc  custom-3xl" id="maps">
					<div className="max-w-[2200px] w-full items-center  justify-center flex relative">
						<div className="content-section max-w-screen-2xl w-full px-5 relative flex items-start justify-center flex-col justify-center z-10">
							<div className="flex items-center whitespace-normal w-full py-0  xl:px-40">
								<div className="flex justify-center flex-col w-full my-12">
									<div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-[10%] gap-[0%] pb-5'>
										<div className='lg:block right-[50px] right-[-40px] lg:right-0  col-span-1 p-4 lg:order-3 '>
											<div className='relative lg:text-right font-normal text-3xl lg:text-5xl  lg:pb-10'>Get in touch</div>
											<div className='lg:text-right text-xl lg:text-2xl'>info@sparkling.co.com</div>
											<div className='lg:text-right text-xl lg:text-2xl'>+41 (0)91 752 0707 </div>

											<a className='lg:float-right' title="LinkedIn" href="https://www.linkedin.com/company/sparkling-company">
												<img className="w-8 h-8 lg:w-16 lg:h-16 inline-block my-4" src="/img/footer/linkedIn_icon.svg" alt="linkedIn_icon"></img>

											</a>

										</div>
										<div className='col-span-1 p-4 lg:order-1'>

											<div className='relative hidden lg:block font-normal text-2xl lg:text-5xl pb-10'>Sparkling</div>
											<div className='relative hidden lg:block mb-16 lg:text-2xl text-2xl '>Sparkling is an industry expert specialised in delivering top-tier Software Development solutions. Through its range of services, Sparkling focusses in providing reliable and tangible value to businesses, aiding in their development efforts.</div>

											<div className='font-normal pb-1 text-3xl lg:text-5xl lg:pb-2'>Privacy</div>
											<div className=' text-xl lg:text-2xl'>Privacy Policy</div>
											<div className='lg:text-2xl text-xl '>Cookie Policy</div>
										</div>
										<div className='col-span-1 p-4 lg:order-2 lg:mx-auto'>
											<div className='relative font-normal text-5xl font-normal mb-1 lg:text-5xl lg:pb-10'>Links</div>
											<ul className='relative text-left flex-col w-full  text-2xl lg:text-2xl '>

												<li>
													<Link className="no-underline py-4" href="/">Home</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/about">About Us</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/team-augmentation">Team Augmentation</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/software-development">Software Development</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/consulting">It Consultancy</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/startup">Startup</Link>
												</li>
												<li>
													<Link className="no-underline py-4" href="/careers">Careers</Link>
												</li>
												<li className='lg:hidden'>
													<Link className="no-underline py-4" href="/contact">Get in touch</Link>
												</li>
											</ul>
										</div>
									
									</div>


									<div className='text-center absolute bottom-1 left-1/4 w-1/2 m-auto pt-[150px] lg:pt-[0px]  px-1/2 lg:px-0 lg:pb-[0px] text-lg font-semibold lg:text-2xl '> &copy; 2024 Sparkling. ALL RIGHT RESERVED </div>

					
								</div>
							
							</div>
						
						</div>
						<img className="absolute bottom-0 right-0  h-auto sm:h-[95%]" src="/img/footer/S.png" alt="f_logo"></img>
					</div>
					
				</section>
			</div>
		</footer>

		// 	<div

		//   className={`content-section mx-auto xl:px-40 custom-3xl z-20`}
		// >
		//   <nav className='flex justify-between px-20 py-4 min-w-[900px] text-center '>
		//     <Link href="/" className='h-full w-[20%]' title="Back to Home " >
		//       <img className="w-full"  src='/img/navbar/logo2.png' alt="Logo" />
		//     </Link>
		//     <ul className='flex justify-between py-4 whitespace-nowrap'>



		//       <li>
		//         <Link className="no-underline p-4" href="/about">About Us</Link>
		//       </li>          
		//       <li>
		//         <Link className="no-underline p-4" href="/startup">Start Up</Link>
		//       </li>
		//       <li>
		//         <Link className="no-underline p-4" href="/careers">Careers</Link>
		//       </li>
		//       <li>
		//         <Link className="no-underline p-4" href="/faq">FAQ</Link>
		//       </li>


		//     </ul>
		//   </nav>
		// </div>
	);
};

export default Footer;