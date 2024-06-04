import dataImages from "@/data/data-aboutUs/galery";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
function Gallery() {
  const getImageSrc = (image: any) => {
    return image.src;
  };
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const lenght = dataImages.length - 1;
  const rows = Math.ceil(dataImages.length / 7);
  return (
    <div className="">
      <div className="flex flex-col justify-between p-[5px]">
        {" "}
        <div className=" w-full">
          {" "}
          <h2 className="text-4xl text-primary-darkTeal">Meet our teem</h2>{" "}
          <p className="text-xl my-5">
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed accumsan quam, interdum rutrum est. Curabitur vitae facilisis neque, in iaculis turpis. Duis vitae erat vel leo cursus sollicitudin id vel nulla. Aliquam ornare nec sem quis tempus. Integer a fermentum libero. Pellentesque purus est, cursus id consectetur ut, sagittis eu leo. Phasellus condimentum feugiat vulputate. Ut molestie nibh efficitur odio sagittis efficitur.

Curabitur sodales ex velit, vel fringilla risus ultrices sed. Quisque laoreet suscipit mollis. Suspendisse ullamcorper odio nec lacus ornare, ut molestie neque malesuada. Cras interdum auctor rutrum. Praesent ac condimentum mauris. Aliquam imperdiet turpis vitae orci hendrerit, bibendum facilisis dolor feugiat. Vestibulum lacinia suscipit porttitor. Aenean viverra tempor eros, ac volutpat sem fermentum a. Ut non consequat tortor, vitae posuere erat. Donec vulputate ipsum et efficitur rutrum. Nunc ac velit mi. Sed vitae erat convallis, accumsan massa id, facilisis lorem.
          </p>
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

      <ul className="">
      {[...Array(rows)].map((_, rowIndex) => (
        <div className="flex flex-row">
      {dataImages
            .slice(rowIndex * 7, rowIndex * 7 + 7)
            .map((item, index) => (
              
          <li
            key={ index + rowIndex * 7}
            className={` ${
              hoveredIndex ===  index + rowIndex * 7 ? "w-[35%]" : "w-[14%] filter grayscale" 
            } h-[400px] image-gallery rounded-xl overflow-hidden relative  m-[5px] transition-all duration-500 ease-in-out shadow-lg `}
          >
                
            <div
              className={` ${
                hoveredIndex ===  index + rowIndex * 7 ? " px-4 opacity-1" : "opacity-0 " 
              } image_title my-1 absolute bottom-0 right-0 z-10 h-[15%] bg-black  w-full flex overflow-hidden transition-all duration-500 ease-in-out justify-between `}
            >
              <div className=" flex-col flex text-nowrap text-white ">
              <p className="font-bold text-2xl">{item.profession}</p>
              <p className="font-bold text-xl">{item.name}</p>
              </div>
              <Link  target="_blank" className="left-0 flex items-center bg-primary-lightTeal my-auto w-9 h-9 rounded-full" href={item.linkedin}>
        <p className="m-auto text-2xl font-extrabold  text-white">in</p>
            </Link>
            </div>

            <button
           
              onMouseEnter={() => {
                if ( index + rowIndex * 7 !== hoveredIndex) setHoveredIndex( index + rowIndex * 7);
              }}
              className={`w-[400px]  h-[420px] absolute transition-all duration-300 ease-in-out cursor-default`}
            >
              <img
              
                src={getImageSrc(item.image)}
                alt={item.name}
                className={`h-full bg-red-100 w-full relative  transition-all duration-500 ease-in-out ${hoveredIndex ===  index + rowIndex * 7 ? "right-0" : "right-[25%]" }`}
              />
            </button>
          
          </li>
        ))}</div> ))}
      </ul>
    </div>
  );
}

export default Gallery;
