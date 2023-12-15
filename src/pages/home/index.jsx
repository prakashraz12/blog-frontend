import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import AnimationWrapper from "../../components/animation/animation.wrapper";
import InputNavigationComponent from "../../components/inputNavigation.component";
import {
  useGetBlogsQuery,
  useGetTrendingBlogsQuery,
  useGetBlogsByCategoeyMutation,
  useGetBlogsMutation,
} from "../../service/api/blogApi.service";
import BlogPostComponent from "../../components/blogPost.component";
import TrendingBlogsComponent from "../../components/minimal-blogs.component";
import { blogCategories } from "../../config/constant";
import Loader from "../../components/loader.component";
import NoDataMessage from "../../components/noDataMessage.component";
import { NoDataMessageStatus, NoTrendingBlogsMessage } from "../../constant";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [categorieblogs, setCategoriedblogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageState, setPageState] = useState("home");
  const [blogMode, setBlogMode] = useState("blog");
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isMoreData, setIsMoreData] = useState(true);
  const [searchValue, setSearchValue] = useState(null);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [getBlogs, { data, isloading, isError, error, isSuccess }] =
    useGetBlogsMutation();

  const [tags, { data: categorisedData, isSuccess: isCategoryDataLoaded }] =
    useGetBlogsByCategoeyMutation();
  const {
    data: trendingBlogsArray,
    isSuccess: trendingBlogsIsSucess,
    isLoading: isTrendingBlogLoading,
    refetch: refetchTrendingBlogs,
  } = useGetTrendingBlogsQuery();

  const fetchBlogsByCategory = useCallback(
    async (clickedCategory) => {
      const response = await tags({ tags: clickedCategory });
      if (response.data && response.data.code === 200) {
        setCategoriedblogs((categorieblogs) => [
          ...categorieblogs,
          ...response.data.data,
        ]);

        if (response.data.data.length === 0) {
          setHasMoreData(false);
          setIsMoreData(false);
        }
      }
    },
    [pageState, setPageState]
  );

  const handlefetchBlogByCategories = (category) => {
    const clickedCategory = category.toLowerCase();
    if (pageState === clickedCategory) {
      setPageState("home");
      setBlogMode("blog");
      return;
    } else {
      setCategoriedblogs([]);
      setPageState(clickedCategory);
      setBlogMode("category");
      fetchBlogsByCategory(clickedCategory);
    }
  };

  useEffect(() => {
    if (trendingBlogsIsSucess && trendingBlogsArray.code === 200) {
      setTrendingBlogs(trendingBlogsArray.data);
    }
  }, [trendingBlogsIsSucess, trendingBlogsArray]);

  useEffect(() => {
    if (isSuccess && data.code === 200) {
      if (pageState === "home") {
        setBlogs((blogs) => [...blogs, ...data?.data]);
      }
      if (data.data.length === 0) {
        setHasMoreData(false);
        setIsMoreData(false);
      }
    }
  }, [isSuccess, data, pageState]);

  const fetchBlogs = useCallback(async () => {
    await getBlogs({ page: page, searchValue: searchValue });
  }, [page, pageState, setPage, setPageState, searchValue, setSearchValue]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, pageState, searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchBar = (e) => {
    e.preventDefault();
    setSearchKeywords(e.target.value);
  };

  console.log(blogs);
  return (
    <>
      <Navbar
        searchKeywords={searchKeywords}
        handleSearch={handleSearchBar}
        isSearchBoxOpen={isSearchBoxOpen}
        setIsSearchBoxOpen={setIsSearchBoxOpen}
      />
      <AnimationWrapper>
        <div>
          <section
            className={`h-cover flex justify-center gap-10 ${
              searchKeywords.length > 0 && "blur-3xl fixed"
            }`}
          >
            <div className="w-full">
              <InputNavigationComponent
                routes={[pageState, "trending"]}
                defaultHidden={["trending"]}
              >
                <InfiniteScroll
                  dataLength={
                    pageState === "home"
                      ? blogs?.length
                      : categorieblogs?.length
                  }
                  next={loadMore}
                  hasMore={hasMoreData}
                  loader={isloading && <Loader />}
                >
                  {isloading ? (
                    <Loader />
                  ) : (
                    <>
                      {pageState === "home" ? (
                        <>
                          {blogs?.length === 0 ? (
                            <NoDataMessage message={NoDataMessageStatus} />
                          ) : (
                            <>
                              {blogs?.map((item, index) => (
                                <AnimationWrapper
                                  key={index}
                                  transation={{ duration: 0.2, delay: 1 * 1 }}
                                >
                                  <BlogPostComponent
                                    banner={item.banner}
                                    activity={item.activity}
                                    tags={item.tags}
                                    des={item.des}
                                    title={item.title}
                                    id={item.blog_id}
                                    authorFullname={
                                      item.author.personal_info.fullname
                                    }
                                    authorProfileImage={
                                      item.author.personal_info.profile_img
                                    }
                                    authorUserName={
                                      item.author.personal_info.username
                                    }
                                    publishedAt={item.publishedAt}
                                  />
                                </AnimationWrapper>
                              ))}
                              {blogs?.length !== 0 && !isMoreData && (
                                <NoDataMessage
                                  message={"No More Blogs Published."}
                                />
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {categorieblogs.length > 0 ? (
                            <>
                              {categorieblogs.map((item, index) => (
                                <AnimationWrapper
                                  key={index}
                                  transation={{ duration: 0.2, delay: 1 * 1 }}
                                >
                                  <BlogPostComponent item={item} />
                                </AnimationWrapper>
                              ))}
                              {isMoreData && <Loader />}
                            </>
                          ) : (
                            <NoDataMessage
                              message={"No More Blogs Published."}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </InfiniteScroll>

                <>
                  {isTrendingBlogLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {trendingBlogs.length === 0 ? (
                        <NoDataMessage message={NoTrendingBlogsMessage} />
                      ) : (
                        trendingBlogs.length > 0 &&
                        trendingBlogs.map((item, index) => (
                          <AnimationWrapper
                            key={index}
                            transation={{ duration: 1, delay: 1 * 1 }}
                          >
                            <TrendingBlogsComponent item={item} i={index} />
                          </AnimationWrapper>
                        ))
                      )}
                    </>
                  )}
                </>
              </InputNavigationComponent>
            </div>
            <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
              <div className=" flex flex-col gap-10">
                <div>
                  <h1 className="font-medium text-xl mb-8">
                    Stories from all interests.
                  </h1>

                  <div className="flex gap-3 flex-wrap">
                    {blogCategories.map((item, index) => (
                      <button
                        className={`tag ${
                          pageState === item.toLowerCase() &&
                          "bg-black text-white"
                        }`}
                        key={index}
                        onClick={() => {
                          handlefetchBlogByCategories(item);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h1 className="font-medium text-xl mb-8">
                    Trending <i className="fi fi-rr-arrow-trend-up"></i>
                  </h1>

                  {isTrendingBlogLoading ? (
                    <Loader />
                  ) : (
                    trendingBlogs.length > 0 &&
                    trendingBlogs.map((item, index) => (
                      <AnimationWrapper
                        key={index}
                        transation={{ duration: 1, delay: 1 * 1 }}
                      >
                        <TrendingBlogsComponent item={item} i={index} />
                      </AnimationWrapper>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default HomePage;
