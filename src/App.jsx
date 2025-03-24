import React, { useState } from 'react';
import  key  from "../env.js";

const App = () => {

  const [page, setPage] = useState(1);
  const [serachData, setSearchData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const submitHandler = async (e) => {
    try{
      e.preventDefault();

      setPage(() => 1);
      setSearchData(() => []);

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;

      const res = await fetch(url);
      const data = await res.json();

      const results = data.results;

      setPage((prev) => prev+1);
      setSearchData(results);

    }
    catch(err){
      console.log(err);
    }
  };

  const handleClick = async () => {
    try{

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;

      const res = await fetch(url);
      const data = await res.json();

      const results = data.results;

      setPage((prev) => prev+1);
      setSearchData((prev) => [...prev, ...results]);

    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      
      <div class="me">
          Created By Jitendriya Meher
      </div>

      <h1>
          Image Search Engine
      </h1>

      <form id="search-form" onSubmit={submitHandler}>

          <input type="text" id="searchbox" placeholder="Search anything here..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
           />

          <button>
              Search
          </button>

      </form>

      <div id="search-result"> 

        {
          serachData.map((item, index) => (
            <a href={item.links.html} target='_blank' key={index}>
              <img src={item.urls.small} alt="" />
            </a>
          ))
        }       

      </div>

      {serachData.length !== 0 && <button id="show-more-btn" onClick={handleClick}>
          Show More
      </button>}
      
    </>
  )
}

export default App