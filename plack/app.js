// ===================== ВИХІДНІ ДАНІ =====================
const products = [
  { id: 1, title: 'Ноутбук Apple MacBook Air M2', price: 46000, category: 'Laptops', inStock: 5, rating: 4.9 },
  { id: 2, title: 'Смартфон Samsung Galaxy S24', price: 34000, category: 'Smartphones', inStock: 0, rating: 4.7 },
  { id: 3, title: 'Навушники Sony WH-1000XM5', price: 15500, category: 'Audio', inStock: 12, rating: 4.8 },
  { id: 4, title: 'Монітор Dell UltraSharp 27"', price: 21000, category: 'Monitors', inStock: 3, rating: 4.6 },
  { id: 5, title: 'Клавіатура Keychron K2 Pro', price: 4200, category: 'Accessories', inStock: 8, rating: 4.9 },
  { id: 6, title: 'Смартфон Apple iPhone 15', price: 38000, category: 'Smartphones', inStock: 4, rating: 4.8 }
];

const initialCart = [
  { productId: 1, quantity: 1, selectedColor: 'Space Gray' },
  { productId: 3, quantity: 2, selectedColor: 'Black' }
];

// ===================== ЗАВДАННЯ 1 =====================

// 1.1 Картка товару (деструктуризація + шаблонні рядки)
const formatProductCard = (product) => {
  const { title, price, category, rating, inStock } = product;
  const stock = inStock === 0 ? '❌ Немає в наявності' : `${inStock} шт.`;
  return `📦 [${category}] ${title} | Ціна: ${price} грн | Рейтинг: ⭐ ${rating} | В наявності: ${stock}`;
};

// 1.2 Неявне повернення об'єкта
const createQuickOrder = (userId, productId, discountPercent = 0) => ({
  orderId: Date.now(),
  userId,
  productId,
  discountPercent,
  createdAt: new Date()
});

// ===================== ЗАВДАННЯ 2 =====================

// 2.1 Додавання товару (Spread)
const addToCart = (cart, newItem) => [...cart, newItem];

// 2.2 Оновлення кількості (map + копія об'єкта)
const updateQuantity = (cart, productId, newQty) =>
  cart.map((item) =>
    item.productId === productId ? { ...item, quantity: newQty } : item
  );

// 2.3 Видалення товару (filter)
const removeFromCart = (cart, productId) =>
  cart.filter((item) => item.productId !== productId);

// ===================== ЗАВДАННЯ 3 =====================

// 3.1 Фільтрація за категорією та наявністю
const filterAvailableByCategory = (productsList, categoryName) =>
  productsList.filter(
    ({ category, inStock }) => category === categoryName && inStock > 0
  );

// 3.2 Повна вартість кошика (reduce + find)
const calculateCartTotal = (cart, productsList) =>
  cart.reduce((total, { productId, quantity }) => {
    const product = productsList.find(({ id }) => id === productId);
    return product ? total + product.price * quantity : total;
  }, 0);

// 3.3 Генерація HTML-розмітки (симуляція JSX)
const renderProductList = (productsList) =>
  productsList.map(
    ({ id, title, price }) => `<div class="product-card" data-id="${id}">
   <h3>${title}</h3>
   <span class="price">${price} грн</span>
   <button class="btn-buy">Купити</button>
</div>`
  );

// ===================== ЗАВДАННЯ 4 =====================

// 4.1 Групування за категоріями (reduce)
const groupProductsByCategory = (productsList) =>
  productsList.reduce(
    (acc, { category, title }) => ({
      ...acc,
      [category]: [...(acc[category] || []), title]
    }),
    {}
  );

// ===================== ТЕСТУВАННЯ РОБОТИ =====================
console.log('=== ТЕСТ 1: Картка товару ===');
console.log(formatProductCard(products[0]));
console.log(formatProductCard(products[1]));

console.log('\n=== ТЕСТ 2: Імутабельність кошика ===');
const cartStep1 = addToCart(initialCart, { productId: 5, quantity: 1, selectedColor: 'White' });
const cartStep2 = updateQuantity(cartStep1, 1, 3);
const cartStep3 = removeFromCart(cartStep2, 3);

console.log('Початковий кошик (не повинен змінитись!):', initialCart);
console.log('Фінальний кошик:', cartStep3);

console.log('\n=== ТЕСТ 3: Аналітика та підсумки ===');
console.log('Доступні смартфони:', filterAvailableByCategory(products, 'Smartphones'));
console.log('Загальна вартість кошика:', calculateCartTotal(cartStep3, products), 'грн');

console.log('\n=== ТЕСТ 4: Групування за категоріями ===');
console.log(groupProductsByCategory(products));

// Додатково: перевірка 1.2 та 3.3
console.log('\n=== ДОДАТКОВО: createQuickOrder та renderProductList ===');
console.log(createQuickOrder(101, 1, 10));
console.log(renderProductList(products.slice(0, 1))[0]);