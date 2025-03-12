const BASE_URL = 'https://commerce-nest-backend.vercel.app'

const API_URLS = {
    LOGIN: `${BASE_URL}/api/login`,
    CREATE_ACCOUNT: `${BASE_URL}/api/create-account`,
    LOGOUT: `${BASE_URL}/api/logout`,
    FETCH_USER: `${BASE_URL}/api/get-user`,
    PRODUCTS: 'https://fakestoreapi.com/products',
    CATEGORIES: 'https://fakestoreapi.com/products/categories',
    CATEGORY_ITEMS: 'https://fakestoreapi.com/products/category',
    CARTS: 'https://fakestoreapi.com/carts'
};

export default API_URLS;