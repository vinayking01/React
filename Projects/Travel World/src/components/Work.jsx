import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

function Work() {
  const [images, setImages] = useState([
    {
      url: "https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_1280.jpg",
      top: "50%",
      left: "50%",
      isActive: false,
    },
    {
      url: "	https://cdn.pixabay.com/photo/2021/11/08/23/29/nature-6780354_1280.jpg",
      top: "56%",
      left: "44%",
      isActive: false,
    },
    {
      url: "	https://cdn.pixabay.com/photo/2021/10/26/16/47/man-6744539_1280.jpg",
      top: "45%",
      left: "56%",
      isActive: false,
    },
    {
      url: "	https://cdn.pixabay.com/photo/2021/08/12/13/39/woman-6540891_1280.jpg",
      top: "60%",
      left: "53%",
      isActive: false,
    },
    {
      url: "		https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_1280.jpg",
      top: "43%",
      left: "40%",
      isActive: false,
    },
    {
      url: "	https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
      top: "65%",
      left: "55%",
      isActive: false,
    },
  ]);

  const { scrollYProgress } = useScroll();

  scrollYProgress.on("change", (data) => {
    function imagesShow(arr) {
      setImages((prev) =>
        prev.map((item, index) =>
          arr.indexOf(index) === -1
            ? { ...item, isActive: false }
            : { ...item, isActive: true }
        )
      );
    }
    switch (
      Math.floor(data * 100) //the *100 is to make it percent
    ) {
      case 0:
        imagesShow([]);
        break;
      case 1:
        imagesShow([0]);
        break;
      case 2:
        imagesShow([0, 1]);
        break;
      case 3:
        imagesShow([0, 1, 2]);
        break;
      case 4:
        imagesShow([0, 1, 2, 3]);
        break;
      case 6:
        imagesShow([0, 1, 2, 3, 4]);
        break;
      case 8:
        imagesShow([0, 1, 2, 3, 4, 5]);
        break;
    }
  });

  return (
    <div className="w-full mt-10">
      <div className="relative max-w-screen-xl mx-auto text-center ">
        <h1 className="text-[20vw] leading-none font-medium select-none">
          World Tour
        </h1>
        <div className="absolute top-0 w-full h-full">
          {images.map(
            (elem, index) =>
              elem.isActive && (
                <img
                  key={index}
                  className="absolute w-60 rounded-lg -translate-x-[50%] -translate-y-[50%]"
                  style={{ top: elem.top, left: elem.left }}
                  src={elem.url}
                  alt="work_images"
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Work;
