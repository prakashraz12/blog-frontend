import React, { useState } from "react";
import { blogCategories } from "../config/constant";
import { useDispatch } from "react-redux";
import { updateRecentActivity } from "../service/slices/userActivitySlice";
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  handleBlogSelect,
  selectedCategory,
  handleSave,
}) => {
  const modalClasses = isOpen ? "" : "hidden";
  const overlayClasses = isOpen ? "" : "hidden";

  return (
    <>
      <div
        className={`fixed inset-0  bg-grey opacity-50 ${overlayClasses}`}
        onClick={onClose}
      ></div>

      <div className="p-3">
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-auto bg-white p-6 rounded-md shadow-lg ${modalClasses}`}
        >
          {/* Modal content */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl">{title}</h1>

            <button>
              <i className="fi fi-sr-cross-circle text-xl"></i>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {blogCategories?.map((item, index) => (
              <button
                className={`${
                  selectedCategory.includes(item) ? "bg-twitter" : "bg-grey"
                } pb-1 pt-1 pl-3 pr-4 flex items-center rounded-full ${
                  selectedCategory.includes(item) ? "text-white" : "text-dark"
                } `}
                key={index}
                onClick={() => {
                  handleBlogSelect(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          {selectedCategory.length >= 5 && (
            <div className="flex justify-end w-full mt-2">
              <button
                className=" bg-twitter p-1 Pb-1 pl-3 pr-3 text-white rounded-full"
                onClick={handleSave}
                disabled={selectedCategory < 5}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CategoryInputContainer = ({setIsUserActivityOpen}) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBlogSelect = (blog) => {
    if (!selectedCategory.includes(blog)) {
      setSelectedCategory((prevCategory) => [...prevCategory, blog]);
    } else {
      setSelectedCategory((prevCategory) =>
        prevCategory.filter((item) => item !== blog)
      );
    }
  };

  const handleSave = () => {
    if (selectedCategory.length >= 5) {
      selectedCategory.forEach((category) => {
        dispatch(updateRecentActivity({ activity: category }));
        setIsUserActivityOpen(false);
      });
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        onClick={openModal}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleBlogSelect={handleBlogSelect}
        title="Select your preference"
        selectedCategory={selectedCategory}
        handleSave={handleSave}
      ></Modal>
    </div>
  );
};

export default CategoryInputContainer;
