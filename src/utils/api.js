const BASE_URL = 'https://world.openfoodfacts.org';

export const fetchProducts = async (name) => {
    const response = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${name}&json=true`);
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories.json`);
    return response.json();
};

export const fetchProductByBarcode = async (barcode) => {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    return response.json();
};

export const fetchAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=&json=true`);
    return response.json();
};

export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/category/${category}.json`);
    return response.json();
};
