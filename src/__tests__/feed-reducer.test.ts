import { feedsReducer, getFeeds } from '../services/slices'; // Импортируйте ваш редьюсер и асинхронное действие
import { TOrder } from '@utils-types';

describe('Feeds Reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isOrdersLoading: true
  };
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Order 1',
      createdAt: '',
      updatedAt: '',
      number: 1
    },
    {
      _id: '2',
      ingredients: [],
      status: 'pending',
      name: 'Order 2',
      createdAt: '',
      updatedAt: '',
      number: 2
    }
  ];

  it('должен устанавливать isOrdersLoading в true при загрузке заказов', () => {
    const action = getFeeds.pending('');

    const newState = feedsReducer(initialState, action);

    expect(newState.isOrdersLoading).toBe(true);
  });

  it('должен обновлять состояние при успешном получении заказов', () => {
    const action = getFeeds.fulfilled(
      { success: true, orders: mockOrders, total: 2, totalToday: 1 },
      '',
      undefined
    ); // Создаем действие fulfilled

    const newState = feedsReducer(initialState, action);

    expect(newState.isOrdersLoading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toBe(2);
    expect(newState.totalToday).toBe(1);
  });
});
