import React, { useState } from "react";
import Product from "./Product";
import { motion } from "framer-motion";
import india from "../assets/india.mp4";
import europe from "../assets/europe.mp4";
import russia from "../assets/russia.mp4";
import yahoo from "../assets/yahoo.mp4";
import rainfall from "../assets/rainfall.mp4";

function Products() {
  var products = [
    {
      title: "India",
      description:
        "A vibrant country known for its rich history, diverse culture, and iconic landmarks like Ayodhya, the Taj Mahal. Explore bustling cities, serene beaches, majestic mountains, and ancient temples while savoring flavorful cuisine.",
      live: true,
      case: false,
    },
    {
      title: "Europe",
      description:
       "A continent of timeless beauty, offering a blend of historical charm and modern allure. Discover picturesque cities, iconic landmarks like the Eiffel Tower, stunning landscapes, and a variety of cultures across 44 countries.",
      live: true,
      case: false,
    },
    {
      title: "Russia",
      description:
        "The largest country in the world, spanning Europe and Asia, known for its architectural wonders like the Kremlin and St. Basil's Cathedral. Experience its vast landscapes, rich cultural heritage, and famed Trans-Siberian Railway.",
      live: true,
      case: false,
    },
    {
      title: " Yahoo! Partner",
      description:
        "We enhanced the New York Fashion Week, by creating a fully digital AR fashion experience for Yahoo and Maisie Wilen, featuring holographic 3D models and an integrated web shop.",
      live: true,
      case: true,
    },
    {
      title: "Rainfall",
      description:
        "We crafted a website for Rainfall Ventures, developing prototypes and custom code that ultimately allows their team to update content regularly and with ease.",
      live: true,
      case: true,
    },
  ];

  const [pos, setPos] = useState(0);
  const mover = (val) => {
    setPos(val * 23);
  };

  return (
    <div className="mt-32 relative">
      {products.map((val, index) => (
        <Product key={index} val={val} mover={mover} count={index} />
      ))}
      <div className="absolute top-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ y: pos, x: "-50%" }}
          animate={{ y: pos + `rem` }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.6 }}
          className="window absolute w-[32rem] h-[23rem] left-[44%] rounded-3xl overflow-hidden"
        >
          <motion.div
            animate={{ y: -pos + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full"
          >
            <video
              className="absolute object-cover rounded-3xl"
              autoPlay
              muted
              loop
              src={india}
            ></video>
          </motion.div>
          <motion.div
            animate={{ y: -pos + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full"
          >
            <video
              className="absolute object-cover rounded-3xl"
              autoPlay
              muted
              loop
              src={russia}
            ></video>
          </motion.div>
          <motion.div
            animate={{ y: -pos + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full"
          >
            <video
              className="absolute object-cover rounded-3xl"
              autoPlay
              muted
              loop
              src={europe}
            ></video>
          </motion.div>
          <motion.div
            animate={{ y: -pos + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full"
          >
            <video
              className="absolute object-cover rounded-3xl"
              autoPlay
              muted
              loop
              src={yahoo}
            ></video>
          </motion.div>
          <motion.div
            animate={{ y: -pos + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full"
          >
            <video
              className="absolute object-cover rounded-3xl"
              autoPlay
              muted
              loop
              src={rainfall}
            ></video>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Products;
