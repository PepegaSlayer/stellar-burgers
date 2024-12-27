import store, { RootState } from '../services/store';
import {
  ingredientsReducer,
  ConstructorReducer,
  feedsReducer,
  UserReducer
} from '../services/slices';
describe('rootReducer', () => {
  it('должен корректно объединять редьюсеры', () => {
    const state: RootState = store.getState();

    // Проверяем, что все редьюсеры существуют
    expect(state).toHaveProperty('ingredientsReducer');
    expect(state).toHaveProperty('feedsReducer');
    expect(state).toHaveProperty('UserReducer');
    expect(state).toHaveProperty('ConstructorReducer'); // Верно, если исправите название

    // Проверяем начальные состояния
    expect(state.ingredientsReducer).toEqual(
      ingredientsReducer(undefined, { type: 'unknown' })
    );
    expect(state.feedsReducer).toEqual(
      feedsReducer(undefined, { type: 'unknown' })
    );
    expect(state.UserReducer).toEqual(
      UserReducer(undefined, { type: 'unknown' })
    );
    expect(state.ConstructorReducer).toEqual(
      ConstructorReducer(undefined, { type: 'unknown' })
    );
  });
});
