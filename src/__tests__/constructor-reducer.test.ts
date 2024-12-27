const mockBun = {
  _id: 'bun1',
  name: 'Brioche Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 30,
  calories: 150,
  price: 50,
  image: 'bun1.jpg',
  image_mobile: 'bun1_mobile.jpg',
  image_large: 'bun1_large.jpg'
};

const mockIngredient = {
  _id: 'ingredient1',
  name: 'Beef Patty',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 0,
  calories: 200,
  price: 100,
  image: 'patty.jpg',
  image_mobile: 'patty_mobile.jpg',
  image_large: 'patty_large.jpg',
  id: 'unique-ingredient1'
};

const mockOrder = {
  _id: 'order1',
  status: 'pending',
  name: 'Order 1',
  createdAt: '2024-12-19T12:00:00Z',
  updatedAt: '2024-12-19T14:00:00Z',
  number: 1,
  ingredients: ['bun1', 'ingredient1']
};

import {
  ConstructorReducer,
  setBun,
  addIngredient,
  removeIngredient,
  closeModal
} from '../services/slices/constructor.slice';
import { TIngredient, TConstructorIngredient, TOrder } from '../utils/types';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IConstructorData {
  constructorItems: IConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

describe('Constructor Slice Test', () => {
  const initialState: IConstructorData = {
    constructorItems: {
      bun: null,
      ingredients: [] as TConstructorIngredient[]
    },
    orderRequest: false,
    orderModalData: null
  };

  it('Проверка вернуть initialState', () => {
    expect(ConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('Проверка добавления булки', () => {
    const newState = ConstructorReducer(initialState, setBun(mockBun));
    expect(newState.constructorItems.bun).toEqual(mockBun);
  });

  it('Проверка добавления ингредиента', () => {
    const newState = ConstructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(newState.constructorItems.ingredients).toEqual([mockIngredient]);
  });

  it('Проверка удаления ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockIngredient]
      }
    };
    const newState = ConstructorReducer(
      stateWithIngredients,
      removeIngredient(mockIngredient)
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });
});
