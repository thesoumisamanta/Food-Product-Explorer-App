import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchCategories,
    fetchProductByBarcode,
    fetchAllProducts,
    fetchProductsByCategory,
} from '../utils/api';


export const getProductsByName = createAsyncThunk('products/getProductsByName', async (name) => {
    const response = await fetchProducts(name);
    return response.products;
});


export const getProductDetailsByBarcode = createAsyncThunk(
    'products/getProductDetailsByBarcode',
    async (barcode) => {
        const response = await fetchProductByBarcode(barcode);
        if (response.status === 0) {
            throw new Error('Product not found');
        }
        return response.product;
    }
);

export const getProductByBarcode = createAsyncThunk('products/getProductByBarcode', async (barcode) => {
    const response = await fetchProductByBarcode(barcode);
    return [response.product]; 
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
        sortedProducts: [], 
        categories: [],
        loading: false, 
        productDetails: null, 
    },
    reducers: {
        sortProducts(state, action) {
            const { sortBy } = action.payload;
            const sortedProducts = [...state.products]; 

            if (sortBy === 'name-asc') {
                sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
            } else if (sortBy === 'name-desc') {
                sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
            } else if (sortBy === 'nutrition-asc') {
                sortedProducts.sort((a, b) => (a.nutrition_grades || 'E').localeCompare(b.nutrition_grades || 'E'));
            } else if (sortBy === 'nutrition-desc') {
                sortedProducts.sort((a, b) => (b.nutrition_grades || 'E').localeCompare(a.nutrition_grades || 'E'));
            }

            state.sortedProducts = sortedProducts; 
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
                state.sortedProducts = action.payload; 
            })
            .addCase(getProductByBarcode.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductByBarcode.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; 
            })
            .addCase(getProductDetailsByBarcode.pending, (state) => {
                state.loading = true; 
            })
            .addCase(getProductDetailsByBarcode.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload; 
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.sortedProducts = action.payload; 
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
                state.sortedProducts = action.payload; 
            });
    },
});

export const { sortProducts } = productSlice.actions;
export default productSlice.reducer;
