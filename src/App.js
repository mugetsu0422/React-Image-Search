import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function SearchBar({ searchText, setSearchText, searchClicked }) {
  return (
    <>
      <div className="searchField">
        <label htmlFor="iname"></label>
        <input type="text" id="iname" name="iname" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <Button onClick={searchClicked}>Search</Button>
      </div>
    </>
  );
}

function Gallery({ imageURLs }) {
  return (
    <>
      <div className="gallery">
        {imageURLs.map((val, idx) => {
          return <img key={idx} src={val} alt={''} className="img"></img>;
        })}
      </div>
    </>
  );
}

function ImageSearch() {
  const [searchText, setSearchText] = useState('')
  const [finalSearchText, setFinalSearchText] = useState('')
  const [imageURLs, setImageURLs] = useState([]);
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [page, setPage] = useState(1)
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)

  async function loadImages(search, page) {
    const key = 'kZvumdGEtWnKotZ_OWWwcNNCHIapi7kCOQsoTISm4sc'
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${key}&query=${search}&per_page=12&page=${page}`
    );
    const imageResult = await res.json();
    const newImageURLs = imageResult.results.map((image) => image.urls.small)
    setImageURLs(imageURLs.concat(newImageURLs));
  }

  function onScroll() {
    const scrollTop = document.documentElement.scrollTop
    const pageHeight = document.documentElement.clientHeight

    if (scrollTop + pageHeight >= document.documentElement.scrollHeight) {
      setHasReachedBottom(true);
    } else {
      setHasReachedBottom(false);
    }
  }

  useEffect(() => {
    setIsImagesLoaded(false)
    loadImages(finalSearchText, page).then(() => {
      setIsImagesLoaded(true)
    });
  }, [finalSearchText, page]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (hasReachedBottom) {
    setPage(page + 1)
    setHasReachedBottom(false);
  }

  function searchClicked() {
    setFinalSearchText(searchText)
  }

  return (
    <>
      <SearchBar searchText={searchText} setSearchText={setSearchText} searchClicked={searchClicked}></SearchBar>
      <div className="loading-section">
        <Spinner style={{visibility: isImagesLoaded ? 'hidden': 'visible'}} className="loading" animation="border" variant="primary" />
      </div>
      <Gallery imageURLs={imageURLs}></Gallery>
    </>
  );
}

export default ImageSearch;
