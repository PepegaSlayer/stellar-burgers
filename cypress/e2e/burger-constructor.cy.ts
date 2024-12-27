const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjI4Y2RlNzUwODY0MDAxZDM3MjMyMCIsImlhdCI6MTczNDUyODkyOSwiZXhwIjoxNzM0NTMwMTI5fQ.gGXjgcZXZupH0Ku2Bku6qaY3Dc6yvieOHQqLRYeKWOE';
const refreshToken =
  'ff7975c3edf57b3535d488c1a188ef800d0be60cd63a707aedfb8874c314235f47a9f0853a380af9';

describe('Конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/'); // Замените на URL вашего приложения
  });

  it('Загрузка ингредиентов', () => {
    cy.wait('@getIngredients');
    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('Выбор булки', () => {
    cy.contains('Краторная булка N-200i') // Находим элемент с текстом
      .closest('li') // Находим ближайший родительский элемент <li>
      .find('button') // Находим кнопку внутри этого <li>
      .click(); // Кликаем на кнопку
    cy.contains('Выберите булки').should('not.exist');
  });

  it('Выбор ингридиента', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .find('button')
      .click();
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('Выбор нескольких ингридиентов', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .find('button')
      .click();
    cy.contains('Соус Spicy-X').closest('li').find('button').click();
    cy.get('.pI008xZIIooxWwNA5NJT').should('have.length.greaterThan', 1);
  });

  it('Открытие и закрытие модалки ингридиента', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('.Z7mUFPBZScxutAKTLKHN').click(); // Кнопка крестик
    cy.contains('Ingredient Details').should('not.exist');
  });

  it('Открытие и закрытие модалки ингредиента (оверлей)', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('.RuQycGaRTQNbnIEC5d3Y').then(($overlay) => {
      const overlay = $overlay[0];
      overlay.click(); // Кликаем на оверлей через JavaScript
    });
    cy.contains('Ingredient Details').should('not.exist');
  });
});

describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'orderBurger'
    );
    cy.setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    cy.visit('/'); // Замените на URL вашего приложения
  });

  it('Сбор бургера и его заказ', () => {
    cy.wait('@getUser');

    //Сбор бургера
    cy.contains('Краторная булка N-200i').closest('li').find('button').click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .find('button')
      .click();
    cy.contains('Соус Spicy-X').closest('li').find('button').click();

    cy.contains('Оформить заказ').click();

    const modalContent = cy.get('.kymTVSFEObODAY4TavAl');
    modalContent.should('be.visible');
    modalContent.should('contain.text', '555');

    //закрытие модалки
    cy.get('.Z7mUFPBZScxutAKTLKHN').click();
    modalContent.should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
