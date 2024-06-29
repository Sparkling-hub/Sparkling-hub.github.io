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
      <div className="flex flex-col justify-between p-[5px]">
        {" "}
        <div className="w-full">
          {" "}
          <h2 className="text-4xl text-primary-darkTeal">Meet our teem</h2>{" "}
          <p className="text-xl my-5">
          At the heart of our success is a dedicated group of professionals who bring vision, expertise, and innovation to every project. Our diverse team of Software Engineers, Project Managers, and C-level executives work tirelessly in harmony to deliver outstanding results. With a passion for excellence and a commitment to pushing boundaries, they transform concepts into cutting-edge solutions that drive our company forward. Meet the team at Sparkling Co.          </p>
        </div>
        <div className=" w-full flex justify-end items-end">
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
        <div className="flex flex-row" key={'rows'+ rowIndex}>
      {dataImages
            .slice(rowIndex * 6 , rowIndex * 6 + 6)
            .map((item, index) => (
              
          <div
            key={ index + rowIndex * 6}
            className={` ${
              hoveredIndex ===  index + rowIndex * 6 ? "xl:w-[39%] lg:w-[59%] sm:w-[75%] w-full" : "sm:w-[16%] filter grayscale" 
            } h-[400px] image-gallery rounded-xl overflow-hidden relative  m-[5px] transition-all duration-500 ease-in-out shadow-lg `}
          >
                
            <div
              className={` ${
                hoveredIndex ===  index + rowIndex * 6? " px-4 opacity-1" : "opacity-0 " 
              } image_title my-1 absolute bottom-0 right-0 z-10 h-[15%] bg-black  w-full flex overflow-hidden transition-all duration-500 ease-in-out justify-between `}
            >
              <div className=" flex-col flex text-nowrap text-white ">
              <p className="font-bold text-2xl">{item.profession}</p>
              <p className="font-bold text-xl">{item.name}</p>
              </div>
              <Link  target="_blank"  className="left-0 flex items-center w-15 h-15 transform transition-transform duration-500 hover:scale-[1.06]" 
 href={item.linkedin}>
     <img src="/img/about/linkedIn_icon.png" className="w-full h-full" alt="" />
            </Link>
            </div>

            <button
           
              onMouseEnter={() => {
                if ( index + rowIndex * 6 !== hoveredIndex) setHoveredIndex( index + rowIndex * 6);
              }}
              className={`w-[400px]  h-[420px] absolute transition-all duration-300 ease-in-out cursor-default`}
            >
              <img
              
                src={getImageSrc(item.image)}
                alt={item.name}
                className={`h-full bg-red-100 w-full relative  transition-all duration-500 ease-in-out ${hoveredIndex ===  index + rowIndex * 6 ? "right-0" : "lg:right-[25%] right-[35%]" }`}
              />
            </button>
          
          </div>
        ))}</div> ))}
      </div>
    </div>
  );
}

export default Gallery;
