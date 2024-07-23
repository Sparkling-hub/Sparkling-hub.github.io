import dataImages from "@/data/data-aboutUs/galery";
import Link from "next/link";
import { useState } from "react";

function Gallery() {
  const getImageSrc = (image: any) => {
    return image.src;
  };
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const lenght = dataImages.length - 1;
  const rows = Math.ceil(dataImages.length / 7);
  return (
    <div>
      <div className="flex flex-col justify-between">
        {" "}
        <div className="w-full">
          {" "}
        
          <p className="text-xl my-9">
          At the heart of our success is a dedicated group of professionals who bring vision, expertise, and innovation to every project. Our diverse team of Software Engineers, Project Managers, and C-level executives work tirelessly in harmony to deliver outstanding results. With a passion for excellence and a commitment to pushing boundaries, they transform concepts into cutting-edge solutions that drive our company forward. Meet the team at Sparkling Co.          </p>
        </div>
        <div className=" w-full flex justify-end items-end lg:block hidden">
          {" "}
          <button
            className={`rounded-full ${
              hoveredIndex === 0 ? "bg-gray-400" : "bg-primary-dark"
            }  w-8 h-8 text-white text-xl font-bold m-4`}
            onClick={() => {
              if (hoveredIndex != 0) setHoveredIndex(hoveredIndex - 1);
            }}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => {
              if (hoveredIndex < lenght) setHoveredIndex(hoveredIndex + 1);
            }}
            className={`rounded-full ${
              hoveredIndex === lenght ? "bg-gray-400" : "bg-primary-dark"
            } w-8 h-8 text-white text-xl font-bold m-4`}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="">
      {[...Array(rows)].map((_, rowIndex) => (
        <div className="flex flex-col lg:flex-row  items-center " key={'rows'+ rowIndex}>
      {dataImages
            .slice(rowIndex * 6 , rowIndex * 6 + 6)
            .map((item, index) => (
              
          <div
            key={ index + rowIndex * 6}
            className={` ${
              hoveredIndex ===  index + rowIndex * 6 ? "xl:w-[39%] lg:w-[45%] lg:w-[80%] w-[100%] max-w-[400px]" : "lg:w-[16%] w-[100%] max-w-[400px]" 
            }  lg:h-[400px]  image-gallery rounded-xl  lg:overflow-hidden relative  lg:m-[5px]  m-8 transition-all duration-500 ease-in-out lg:shadow-custom `}
          >
                
            <div
              className={` ${
                hoveredIndex ===  index + rowIndex * 6? " opacity-1" : "lg:opacity-0 "  
              } image_title my-1 block absolute px-4 flex lg:items-center   top-[345px] lg:top-[324px] lg:shadow-custom  right-0 z-10 h-[18%]  w-full  max-w-[400px] flex flex-row-reverse lg:flex-row overflow-hidden transition-all duration-500 ease-in-out justify-between`}
            >
              <div className="flex-col flex text-nowrap text-white lg:flex hidden  justify-center ">
              <p className="font-bold text-2xl lg:text-xl xl:text-2xl">{item.profession}</p>
              <p className="font-bold text-xl lg:text-lg  xl:text-xl">{item.name}</p>
              </div>
              <Link  target="_blank"  className="left-0  hidden items-center lg:flex  w-14 h-14 transform transition-transform duration-500  hover:scale-[1.06]" 
              
 href={item.linkedin}>
     <img src="/img/about/linkedIn_icon.png" className={` w-full h-full `} alt="" />
            </Link>
            <Link  target="_blank"  className="left-0   items-center lg:hidden flex  w-14 h-14 transform transition-transform duration-500 hover:scale-[1.06]" 
              
              href={item.linkedin}>
                  <img src="/img/about/linkedIn_icon_green.png" className={` w-full h-full `} alt="" />
                         </Link>
            </div>

            <button
           
              onMouseEnter={() => {
                if ( index + rowIndex * 6 !== hoveredIndex) setHoveredIndex( index + rowIndex * 6);
              }}
              className={`w-fill-available shadow-custom rounded-xl   lg:w-[400px] h-[420px] lg:absolute transition-all duration-300 ease-in-out cursor-default`}
            >
              <img
              
                src={getImageSrc(item.image)}
                alt={item.name}
                className={`h-full bg-red-100 w-full relative  rounded-xl transition-all duration-500 ease-in-out ${hoveredIndex ===  index + rowIndex * 6 ? "right-0 " : "lg:right-[25%] lg:grayscale" }`}
              />
              
            </button>
            <div className="flex-col flex text-nowrap text-black leading-10 py-2 mt-1">
              <p className="font-black text-2xl">{item.profession}</p>
              <p className="font-bold py-1 text-xl">{item.name}</p>
              </div>
          </div>
        ))}</div> ))}
      </div>
    </div>
  );
}

export default Gallery;
