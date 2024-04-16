import dataImages from "@/data/data-aboutUs/galery";
import Link from "next/link";
import { useState } from "react";

function Gallery() {
  const getImageSrc = (image: any) => {
    return image.src;
  };
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const lenght = dataImages.length - 1;
  return (
    <div className="">
      <div className="flex justify-between p-5">
        {" "}
        <div className=" w-1/2">
          {" "}
          <h2 className="text-4xl text-primary-darkTeal">Meet our teem</h2>{" "}
          <p className="text-xl">
            weweeweweeeeeeeeeeeeeeeeeeeeeeeewewe asdas dasd
            asdsfafasf....dddasddddddddddddddddd.....
            weweeweweeeeeeeeeeeeeeeeeeeeeeeewewe asdas dasd
            asdsfafasf....dddasddddddddddddddddd.....
            weweeweweeeeeeeeeeeeeeeeeeeeeeeewewe asdas dasd
            asdsfafasf....dddasddddddddddddddddd.....
          </p>
        </div>
        <div className=" w-1/2 flex justify-end items-end">
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

      <ul className="flex flex-row">
        {dataImages.map((item, index) => (
          <li
            key={index}
            className={` ${
              hoveredIndex === index ? "w-[35%]" : "w-[10%] filter grayscale" 
            } h-[400px] image-gallery rounded-xl overflow-hidden relative  mx-[5px] transition-all duration-500 ease-in-out shadow-lg `}
          >
            <div
              className={` ${
                hoveredIndex === index ? "w-full px-5 opacity-1" : "w-[0%] opacity-0 "
              } image_title m-1 absolute bottom-0 right-0 z-10 h-[15%] bg-black  flex-col flex overflow-hidden transition-all duration-500 ease-in-out`}
            >
              <p className="font-bold text-2xl">{item.profession}</p>
              <p className="text-white font-bold text-xl">{item.name}</p>
            </div>

            <Link
              href="#"
              onMouseEnter={() => {
                if (index !== hoveredIndex) setHoveredIndex(index);
              }}
              className={`w-[400px]  h-[400px] absolute transition-all duration-300 ease-in-out `}
            >
              <img
                src={getImageSrc(item.image)}
                alt={item.name}
                className="h-full bg-red-100 w-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gallery;
