import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../service/api/userApi";
import AnimationWrapper from "../../components/animation/animation.wrapper";
import Loader from "../../components/loader.component";
import AboutUserSection from "../../components/aboutUser.component";
import InputNavigationComponent from "../../components/inputNavigation.component";
import BlogPostComponent from "../../components/blogPost.component";
import GetBlogsById from "../../utils/getBlogsById";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const auth = useSelector((state) => state.auth.sessionId);
  const { id } = JSON.parse(auth);

  const [pageState, setPageState] = useState("blog");
  const [userData, setUserData] = useState({});
  const { id: profileId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetUserQuery(id);

  useEffect(() => {
    if (isSuccess && data.code === 200) {
      setUserData(data?.data);
    }
  }, [isSuccess, data]);

  return (
    <AnimationWrapper>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <>
          <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
            <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-1 border-gray md:sticky md:top-[100px] md:py-10">
              <img
                src={userData?.personal_info?.profile_img}
                alt="profile_image"
                className="w-48 h-48 bg-gray rounded-full md:w-32 md:h-32"
              />
              <h1 className="text-2xl font-medium">
                @{userData?.personal_info?.username}
              </h1>
              <p className="text-xl capitalize h-6">
                {userData?.personal_info?.fullname}
              </p>
              <p>
                {userData?.account_info?.total_posts?.toLocaleString()}Blogs -{" "}
                {userData?.account_info?.total_reads} -Reads
              </p>

              {id === userData._id && (
                <div className="flex gap-4 mt-2">
                  <Link
                    to="/settings/edit-profile"
                    className="btn-light rounded-md"
                  >
                    Edit Profile
                  </Link>
                </div>
              )}
              <AboutUserSection
                classname={"hidden md:block"}
                bio={userData?.personal_info?.bio}
                joinAt={userData?.joinedAt}
                socail_links={userData?.social_links}
              />
            </div>
            <div className="max-md:mt-12 w-full">
              <InputNavigationComponent
                routes={["Blogs", "About"]}
                defaultActiveTabIndex={0}
                defaultHidden={"About"}
              >
                <>
                  {userData?.blogs?.map((item, index) => (
                    <AnimationWrapper key={index}>
                      <GetBlogsById
                        id={item}
                        author={{
                          username: userData?.personal_info?.username,
                          fullname: userData?.personal_info?.fullname,
                          profile_img: userData?.personal_info?.profile_img,
                        }}
                      />
                    </AnimationWrapper>
                  ))}
                </>
                {/* {blogs?.length !== 0 && !isMoreData && (
                  <NoDataMessage message={"No More Blogs Published."} />
                )} */}
                <AboutUserSection
                  bio={userData?.personal_info?.bio}
                  joinAt={userData?.joinedAt}
                  socail_links={userData?.social_links}
                />
              </InputNavigationComponent>
            </div>
          </section>
        </>
      ) : null}
    </AnimationWrapper>
  );
};

export default UserProfilePage;
