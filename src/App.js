import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function SearchBar({ searchText, setSearchText, searchClicked }) {
  return (
    <>
      <div className="searchField">
        <label htmlFor="iname"></label>
        <input type="text" id="iname" name="iname" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <button onClick={searchClicked}>Search</button>
      </div>
    </>
  );
}

function Gallery({ imageURLs }) {
  return (
    <>
      {imageURLs.map((val, idx) => {
        return <img key={idx} src={val} alt={''} width={300}></img>;
      })}
    </>
  );
}

function ImageSearch() {
  const [searchText, setSearchText] = useState('')
  const [finalSearchText, setFinalSearchText] = useState('')
  const [imageURLs, setImageURLs] = useState([]);

  async function loadImages(search) {
    const key = 'kZvumdGEtWnKotZ_OWWwcNNCHIapi7kCOQsoTISm4sc'
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${key}&query=${search}&per_page=100`
    );
    const imageResult = await res.json();
    setImageURLs(imageResult.results.map((image) => image.urls.small));
  }
  
  useEffect(() => {
    loadImages(finalSearchText);
  }, [finalSearchText]);

  function searchClicked() {
    setFinalSearchText(searchText)
  }

  return (
    <>
      <SearchBar searchText={searchText} setSearchText={setSearchText} searchClicked={searchClicked}></SearchBar>
      <Gallery imageURLs={imageURLs}></Gallery>
    </>
  );
}

export default ImageSearch;
