import { useEffect, useState } from "react";
import "./App.css";
import JobPosting from "./components/JobPosting";

// eslint-disable-next-line
const ITEMS_PER_PAGE = 6;
const API = "https://hacker-news.firebaseio.com/v0";

function App() {
  // eslint-disable-next-line
  const [items, setItems] = useState([]);

  const [itemids, setItemids] = useState(null);

  const [fetchinformation, setFetchinformation] = useState(false);

  const [currentpage, setCurrentpage] = useState(0);

  const fetchitems = async (page) => {
    setCurrentpage(page);
    setFetchinformation(true);

    let itemslist = itemids;
    if (itemslist === null) {
      const response = await fetch(`${API}/jobstories.json`);
      itemslist = await response.json();

      setItemids(itemslist);
    }

    const itemIDsPerPage = itemslist.slice(
      page*ITEMS_PER_PAGE, 
      page*ITEMS_PER_PAGE+ ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIDsPerPage.map((itemId) =>
        fetch(`${API}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    console.log(itemsForPage);

    setItems([...items, ...itemsForPage]);
    setFetchinformation(false);
  };

  useEffect(() => {
    if (currentpage === 0) {
      fetchitems(currentpage);
    }
  }, []);

  return (
    <div className="app">
      <h1 className="title">Hacker News Job Board</h1>
      {itemids === null || items.length < 1 ? (
        <div className="loading">Loading.....</div>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => {
              return <JobPosting {...item} />;
            })}
          </div>
          <button
            className="load-more-button"
            onClick={()=>fetchitems(currentpage + 1)}
            disabled={fetchinformation}
          >
            {fetchinformation?"Loading...":"Load more Jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
