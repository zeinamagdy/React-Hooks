import React, { useState, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const baseURL = 'https://react-4f22e.firebaseio.com/ingredients.json';

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      header: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false);
      return response.json()
    })
      .then(responseData => setIngredients(prevIngredients =>
        [...prevIngredients, { id: responseData.name, ...ingredient }]
      )).catch(err => {
        console.log('error', err.message)
        setError('Something went wrong!');
      })
  }

  const removegredientHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://react-4f22e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      setIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
    }).catch(err => {
      console.log('error', err.message)
      setError('Something went wrong!');
    })
  }

  const filterIngredientsHandler = useCallback(filterdData => {
    setIngredients(filterdData)
  }, [])

  const closeErrorModel = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={closeErrorModel}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search
          ingredients={ingredients}
          onFilterChange={filterIngredientsHandler}
        />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removegredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
