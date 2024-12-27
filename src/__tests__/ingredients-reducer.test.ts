import { ingredientsReducer, getIngredients } from '../services/slices'; // Импортируйте ваш редьюсер и асинхронное действие
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Brioche Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 150,
    price: 50,
    image: 'bun1.jpg',
    image_large: 'bun1_large.jpg',
    image_mobile: 'bun1_mobile.jpg'
  },
  {
    _id: '2',
    name: 'Beef Patty',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 0,
    calories: 200,
    price: 100,
    image: 'patty.jpg',
    image_large: 'patty_large.jpg',
    image_mobile: 'patty_mobile.jpg'
  }
];

describe('ingredientsReducer', () => {
  const initialState = {
    ingredients: [],
    isIngredientsLoading: true
  };

  it('должен устанавливать isIngredientsLoading в true при загрузке ингредиентов', () => {
    const action = getIngredients.pending('');
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isIngredientsLoading).toBe(true);
  });

  it('должен устанавливать isIngredientsLoading в false и обновлять ингредиенты при успешной загрузке', () => {
    const action = getIngredients.fulfilled(mockIngredients, '', undefined);
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
  });
});
