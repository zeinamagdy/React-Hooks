import React, { useState, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const baseURL = 'https://react-4f22e.firebaseio.com/ingredients.json';
  
  const addIngredientHandler = ingredient => {
    fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      header: { 'Content-Type': 'application/json' }
    }).then(response => { return response.json() })
      .then(responseData => setIngredients(prevIngredients =>
        [...prevIngredients, { id: responseData.name, ...ingredient }]
      ));

  }
  const removegredientHandler = ingredientId => {
    setIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
  }
  const filterIngredientsHandler = useCallback(filterdData => {
    setIngredients(filterdData)
  }, [])
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search ingredients={ingredients} onFilterChange={filterIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removegredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
