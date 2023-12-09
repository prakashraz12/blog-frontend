import React, { useEffect, useRef, useState } from "react";

const InputNavigationComponent = ({
  routes,
  defaultHidden = [],
  defaultActiveTabIndex = 0,
  children,
}) => {
  const activeTabRef = useRef();
  const tableRef = useRef();

  const [activeLink, setActiveLink] = useState(defaultActiveTabIndex);
  const handleNavigateToLink = (btn, index) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabRef.current.style.width = offsetWidth + "px";
    activeTabRef.current.style.left = offsetLeft + "px";
    setActiveLink(index);
  };

  useEffect(() => {
    handleNavigateToLink(tableRef.current, defaultActiveTabIndex);
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex  flex-nowrap overflow-x-auto">
        {routes.map((item, index) => {
          return (
            <button
              ref={index === defaultActiveTabIndex ? tableRef : null}
              key={index}
              onClick={(e) => handleNavigateToLink(e.target, index)}
              className={`p-4 px-5 capitalize ${
                activeLink === index ? "text-black" : "text-dark-grey"
              } ${defaultHidden.includes(item) ? "md:hidden" : ""}`}
            >
              {item}
            </button>
          );
        })}
        <hr ref={activeTabRef} className="absolute bottom-0 duration-300" />
      </div>
      
      {Array.isArray(children) ? children[activeLink] : children}
    </>
  );
};

export default InputNavigationComponent;
