/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { AppContext } from "../../../../AppContext/AppContext";

const OptionsBar = () => {
  const {
    searchDataValue,
    activeFilter,
    setActiveFilter,
    filteredData,
    setFilteredData,
    smallSearchBox,
    setSmallSearchBox,
    setSearchDataValue,
  } = useContext(AppContext);
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);

  // const { category } = props;
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Prevent flickering
    }
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 500); // Delay helps prevent accidental closing
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navigate = useNavigate();

  const options = {
    SALE: {
      header1: "",
      options1: [],
      header2: "",
      options2: [],
      header3: "",
      options3: [],
    },
    OFFERS: {
      header1: "By Discount",
      options1: ["Upto 10% off", "Upto 20% off", "Upto 30% off"],
      header2: "By Trendy Offers",
      options2: ["Buy 2 Get 1", "Upto 25% off", "Under ₹4500"],
      header3: "By Color",
      options3: ["Exotic black", "Light pink", "Glamorous yellow"],
    },
    OCCASIONS: {
      header1: "By Occasion",
      options1: [
        "Haldi",
        "Sangeet",
        "Summer Collection",
        "Wedding",
        "reception",
        "Festive",
        "party",
      ],
      header2: "By Category",
      options2: [
        "Floral",
        "Paestal",
        "Sequince",
        "Printed",
        "Mansoor Silk",
        "Chinia Silk",
      ],
      header3: "By Colour",
      options3: [
        "Light Blue",
        "Orange Fill",
        "Artistic Silver",
        "Dark Brown",
        "Pretty Magenta",
        "Golden",
      ],
    },
    TYPE: {
      header1: "Type",
      options1: [],
      header2: "Material",
      options2: [],
      header3: "Discount",
      options3: [],
    },
    "NEW ARRIVALS": {
      header1: "Latest Stock",
      options1: ["New Arrivals", "By rating", "Festive Options"],
      header2: "By Colour",
      options2: ["red colour", "premium blue", "festive green"],
      header3: "By Discount",
      options3: ["Upto 10% off", "Upto 20% off", "Upto 30% off"],
    },
    OTHERS: {
      header1: "By Rating",
      options1: [],
      header2: "By Material",
      options2: [],
      header3: "By Colour",
      options3: [],
    },
  };

  return (
    <div>
      {typeof window !== "undefined" && window.innerWidth > 1000 ? (
        <nav className="relative w-full dark  shadow-md border-t border-gray-300">
          <div className="flex justify-center darktxt items-center px-3 py-4">
            <ul className="flex  gap-x-24 lg:text-[1.75vmin] ">
              {["OFFERS", "OCCASIONS", "TYPE", "NEW ARRIVALS", "OTHERS"].map(
                (menu, index) => (
                  <li
                    key={index}
                    className="relative group cursor-pointer "
                    onMouseEnter={() => handleMouseEnter(menu)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="hover:underline lighttxt text-md font-Montserrat underline-offset-5 font-medium">
                      {menu}
                    </span>

                    {/* Full-width dropdown */}
                    {openMenu === menu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed  ${
                          screen.width <= 1919 ? "top-[258px]" : "top-[297px]"
                        } left-0 w-screen bg-[#ede4da] shadow-lg border border-gray-200 z-50`}
                        onMouseEnter={() => handleMouseEnter(menu)} // Keep it open
                        onMouseLeave={handleMouseLeave} // Close only if mouse leaves
                      >
                        <div>
                          <ul className="font-Montserrat p-6 gap-y-4 gapx-x-8 flex justify-evenly items-center text-lg font-medium">
                            <div className="flex-col gap-y-8">
                              <li className="p-1 text-sm font-bold">
                                {options[menu].header1}
                              </li>
                              {options[menu].options1.map((option, index) => (
                                <li
                                  key={index}
                                  className="p-1 mt-2 hover:underline text-xs"
                                >
                                  {option}
                                </li>
                              ))}
                            </div>
                            <div className="flex-col gap-y-8">
                              <li className="p-1 text-sm font-bold">
                                {options[menu].header2}
                              </li>
                              {options[menu].options2.map((option, index) => (
                                <li
                                  key={index}
                                  className="p-1 mt-2 hover:underline text-xs"
                                >
                                  {option}
                                </li>
                              ))}
                            </div>

                            <div className="flex-col gap-y-8">
                              <li className="p-1 text-sm font-bold">
                                {options[menu].header3}
                              </li>
                              {options[menu].options3.map((option, index) => (
                                <li
                                  key={index}
                                  className="p-1 mt-2 hover:underline text-xs"
                                >
                                  {option}
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <div className="border-b border-gray-300 flex flex-col justify-center items-center w-full flex-wrap pb-4 darktxt font-lato">
          <Search className="mt-[2vmin]" />

          {smallSearchBox ? (
            <div className="w-[80%] border-[1px] border-[#d5d5d5]">
              {searchDataValue.length > 0 ? (
                searchDataValue.slice(0, 4).map((item, index) => (
                  <div className="border-b-[1px] p-2">
                    <p
                      onClick={() => {
                        setActiveFilter(true);
                        setFilteredData([item]);
                        navigate("/products");
                        setSmallSearchBox(false);
                        setSearchDataValue("");
                      }}
                    >
                      {item.sname}
                    </p>
                  </div>
                ))
              ) : (
                <p>No results found...</p>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionsBar;
