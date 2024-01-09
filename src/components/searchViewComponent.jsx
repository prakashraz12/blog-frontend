import React, { useCallback, useEffect, useState } from "react";
import { useSearchApiMutation } from "../service/api/blogApi.service";
import { Link } from "react-router-dom";
import Loader from "./loader.component";
import NoDataMessage from "./noDataMessage.component";

const SearchViewComponent = ({ searchKeyWords }) => {
  const [updatedData, setUpdatedData] = useState([]);
  const [searchApi, { data, isLoading, isError, isSuccess }] =
    useSearchApiMutation();

  const fetchSearchApi = useCallback(async () => {
    await searchApi({ searchValue: searchKeyWords.toLowerCase() });
  }, [searchKeyWords]);

  useEffect(() => {
    fetchSearchApi();
  }, [searchKeyWords]);

  useEffect(() => {
    if (isSuccess && data.success) {
      setUpdatedData(data.data);
    }
  }, [isSuccess, data]);

  return (
    <div className="w-[500px]   absolute  mt-2 rounded bg-grey p-2 min-h-full -z-50">
      <div className="flex justify-end p-3">
        <button>
          <i className="fi fi-br-cross"></i>
        </button>
      </div>
      <div>
        <p className="text-xl">Showing results for "{searchKeyWords}.."</p>
        <br />
      </div>

      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        updatedData.map((item, index) => (
          <div className="p-2" key={index}>
            <Link
              to={"/blogs/id"}
              className="flex  rounded-sm gap-8 items-center  mb-3 pb-2"
            >
              <div className="w-full p-4">
                <div className="flex gap-2 items-center mb-6 ">
                  <img
                    src={item.author.personal_info.profile_img}
                    alt="profile_img"
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="line-clamp-1">
                    {item.author.personal_info.fullname} @{" "}
                    {item.author.personal_info.username}
                  </p>
                </div>
                <h1 className="blog-title">{item.title}</h1>
              </div>
              <div className="h-28 aspect-square bg-grey">
                <img
                  src={item.banner}
                  alt="banner_img"
                  className="w-full h-full aspect-square object-cover rounded-md"
                />
              </div>
            </Link>
          </div>
        ))
      ) : null}
      {updatedData.length === 0 && (
        <div>
          <NoDataMessage message={"No Blogs Found"} />
        </div>
      )}
    </div>
  );
};

export default SearchViewComponent;
