import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [filter, setFilter] = useState('');
  const { onFilterChange } = props;
  const inputSearchRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      // to ensure that the prev filter value is same to current value so send request 
      // to avoid calling sever each time user types a letter
      if (filter === inputSearchRef.current.value) {
        const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
        fetch('https://react-4f22e.firebaseio.com/ingredients.json' + query).then(
          response => { return response.json() }
        ).then(responseData => {
          const loadedData = [];
          for (const key in responseData) {
            loadedData.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
          }
          onFilterChange(loadedData)
        })
      }
    }, 500)
    // clean up Hook as using timer will create bunch of timer every time change one of useEffect dependience.
    return () => {
      clearTimeout(timer);
    }

  }, [filter, onFilterChange, inputSearchRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filter}
            ref={inputSearchRef}
            onChange={event => setFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
