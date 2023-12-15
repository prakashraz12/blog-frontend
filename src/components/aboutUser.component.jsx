import React from "react";
import { Link } from "react-router-dom";
import { getFullDay } from "../utils/date-formater.utils";

const AboutUserSection = ({ bio, socail_links, joinAt, classname }) => {
  console.log(socail_links);
  return (
    <div className={`md:w-[90%] md:mt-7 ${classname}`}>
      <p className="text-xl leading-7">{bio?.length ? bio : ""}</p>

      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
        {socail_links &&
          Object?.keys(socail_links)?.map((key) => {
            let link = socail_links[key];
            return link ? (
              <Link to={link}  target="_blank">
               
                <i className={`fi fi-brands-${key}`}></i>
              </Link>
            ) : (
              ""
            );
          })}
      </div>
      <p className="text-xl leading-7 text-dark-grey">{getFullDay(joinAt)}</p>
    </div>
  );
};

export default AboutUserSection;
