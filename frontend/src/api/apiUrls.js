const BASE_URL = 'http://localhost:8000/api'

const API_URLS = {
    LOGIN: `${BASE_URL}/login`,
    CREATE_ACCOUNT: `${BASE_URL}/create-account`,
    LOGOUT: `${BASE_URL}/logout`,
    FETCH_USER: `${BASE_URL}/get-user`,
    PRODUCTS: 'https://fakestoreapi.com/products',
    CATEGORIES: 'https://fakestoreapi.com/products/categories',
    CATEGORY_ITEMS: 'https://fakestoreapi.com/products/category',
    CARTS: 'https://fakestoreapi.com/carts'
};

export default API_URLS;