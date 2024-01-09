import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import  {Outlet} from "react-router-dom"

const MainLayout = ({setIsSearchActive}) => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const handleSearchBar = (e) => {
    e.preventDefault();
    setSearchKeywords(e.target.value);
  };
useEffect(()=>{
if(searchKeywords.length >0){
  setIsSearchActive(true)
}else{
  setIsSearchActive(false)
}
},[searchKeywords])
  return (
    <>
     <Navbar
        searchKeywords={searchKeywords}
        handleSearch={handleSearchBar}
        isSearchBoxOpen={isSearchBoxOpen}
        setIsSearchBoxOpen={setIsSearchBoxOpen}
      />
      <Outlet/>
    </>
  )
}

export default MainLayout
