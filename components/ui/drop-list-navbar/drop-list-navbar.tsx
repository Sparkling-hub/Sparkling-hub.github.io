import React, { useState, useEffect, useRef } from 'react';
import IDropList from '../../../interface/IDropList';
import Link from 'next/link';
import ButtonCircle from "../circle-button-black";

const DisabledSelect: React.FC<IDropList> = ({ name, DataLink, mobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='items-center flex'>
      {mobileMenuOpen ? (
        <div className="block text-base font-semibold leading-6 text-gray-900 w-full flex-col"  >
          <button className='w-full flex justify-between text-xl items-center' onClick={handleClick}>
            <span className='text-start w-full'>{name}</span>
          <div className="block w-5 top-1/2 z-30 transform leading-0 ">
            <span aria-hidden="true" className={`block absolute h-[2px] w-[14px] bg-gray-500 transform transition duration-300 ease-in-out ${isDropdownOpen ? 'rotate-0' : ' rotate-90'}`}></span>
            <span aria-hidden="true" className={`block absolute h-[2px] w-[14px] bg-gray-500 transform transition duration-300 ease-in-out ${isDropdownOpen ? '-rotate-0' : ' -rotate-180'}`}></span>
          </div>
          </button>
          {mobileMenuOpen && isDropdownOpen && (
            <ul className='flex-col flex z-10'>
              {DataLink.map((service, index) => (

                <Link key={service.id} className="p-3 m-2 transform transition-transform hover:scale-110" href={service.href}>
                  {service.text}
                </Link>
              ))}
            </ul>

          )}
        </div>
      ) : (  <div className={`no-underline relative   ${mobileMenuOpen ? "w-full" : ""}`} 
      >

        <span className="block items-center w-fit items-center flex justify-between text-base font-semibold leading-6 text-gray-900 w-full">
         <button ref={dropdownRef} onClick={!mobileMenuOpen ? handleClick : undefined}
      onMouseEnter={!mobileMenuOpen ? handleMouseEnter : undefined}
      onMouseLeave={!mobileMenuOpen ? handleMouseLeave : undefined}>{name}</button> 
         <ButtonCircle isDropdownOpen={isDropdownOpen} />
         {isDropdownOpen && (

            <button
              className="absolute left-[-130%] px-16 top-[40%] py-[40%] before:border-t-0"
              onMouseEnter={handleMouseEnter}
            >
              <div className="left-4 bg-white p-2 border-solid w-auto rounded-lg
                    before:border-transparent
                    border-gray-100
                    border-[1px]
                    drop-shadow-[0_3px_4px_rgba(0,0,0,0.23)]
                    before:border-b-white before:border-r-[18px] 
                    before:border-b-[18px]
                    before:absolute
                    before:left-[41%]
                    before:border-l-[18px]
                    before:drop-shadow-[0_-3px_3px_rgba(0,0,0,0.0.1)]
                    before:top-[-15px]
                    safari-specific"
              >
                {DataLink.map((service, index) => (
                  <Link key={service.id} className="p-3 m-2 transform transition-transform hover:scale-110 " href={service.href}>
                    {service.text}
                  </Link>
                ))}
              </div>
            </button>
          )}

        </span>
        </div>
      )
      }



    </div>


  )
};

export default DisabledSelect;
