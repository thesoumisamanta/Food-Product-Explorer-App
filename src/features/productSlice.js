import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchCategories,
    fetchProductByBarcode,
    fetchAllProducts,
    fetchProductsByCategory,
} from '../utils/api';

// Define all the product fetching actions (search, filter, barcode, etc.)
export const getProductsByName = createAsyncThunk('products/getProductsByName', async (name) => {
    const response = await fetchProducts(name);
    return response.products;
});

export const getProductByBarcode = createAsyncThunk('products/getProductByBarcode', async (barcode) => {
    const response = await fetchProductByBarcode(barcode);
    return [response.product]; // Wrap product in array to maintain structure
});

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
    const response = await fetchAllProducts();
    return response.products;
});

export const getCategories = createAsyncThunk('products/getCategories', async () => {
    const response = await fetchCategories();
    return response.tags;
});

export const getProductsByCategory = createAsyncThunk('products/getProductsByCategory', async (category) => {
    const response = await fetchProductsByCategory(category);
    return response.products;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        sortedProducts: [], // Keep a separate array for sorted products
        categories: [],
        loading: false, // Track loading status
    },
    reducers: {
        sortProducts(state, action) {
            const { sortBy } = action.payload;
            const sortedProducts = [...state.products]; // Clone the original products

            if (sortBy === 'name-asc') {
                sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
            } else if (sortBy === 'name-desc') {
                sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
            } else if (sortBy === 'nutrition-asc') {
                sortedProducts.sort((a, b) => (a.nutrition_grades || 'E').localeCompare(b.nutrition_grades || 'E'));
            } else if (sortBy === 'nutrition-desc') {
                sortedProducts.sort((a, b) => (b.nutrition_grades || 'E').localeCompare(a.nutrition_grades || 'E'));
            }

            state.sortedProducts = sortedProducts; // Update sortedProducts array
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsByName.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByName.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; // Sync sortedProducts with the fetched ones
            })
            .addCase(getProductByBarcode.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductByBarcode.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; // Sync sortedProducts with the fetched ones
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; // Sync sortedProducts with the fetched ones
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; // Sync sortedProducts with the fetched ones
            });
    },
});

export const { sortProducts } = productSlice.actions;
export default productSlice.reducer;
