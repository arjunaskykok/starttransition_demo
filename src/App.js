import {useState, useEffect, useTransition} from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [isPending, startTransition] = useTransition();
  const [search_text, setSearchText] = useState("");
  const [search_result, setSearchResult] = useState();

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (search_text==="") {
      setSearchResult(null);
    } else {
      const rows = Array.from(Array(5000), (_, index) => {
        return (
              <div key={index}>
                <img src={logo} className="App-logo" alt="logo" />
                <div>{index + 1}. {search_text}</div>
              </div>
          );
      });
      const list = <div>{rows}</div>;
      startTransition(() => {
        setSearchResult(list);
      });
    }
  }, [search_text]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="SearchEngine">
          <div className="SearchInput">
            <input type="text" value={search_text} onChange={handleChange} />
          </div>
          <div className="SearchResult">
            {isPending && <div><br /><span>Loading...</span></div>}
            {!isPending && search_result}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
