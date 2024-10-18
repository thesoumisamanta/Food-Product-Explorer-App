# Food Explorer App

## Overview

The **Food Explorer App** is a React application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API. This app includes features such as a wishlist, cart functionality, and barcode search.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Features](#features)
- [License](#license)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: For state management.
- **React Router**: For routing within the app.
- **TailwindCSS**: For styling the application.
- **OpenFoodFacts API**: To fetch food product data.
- **gh-pages**: For deploying the app on GitHub Pages.

## Installation

To get started with the Food Explorer App, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   cd <repository-name>

# Install Dependencies: Install the required libraries using npm:
npm install

# Install Additional Packages: Install the gh-pages package for deployment:
npm install gh-pages --save-dev

# Set Up Redux: 
Create a Redux store to manage application state. Add necessary slices for handling products, cart, and wishlist.

# Configure Routing: 
Set up routing using React Router for navigation between the Home, Product Details, Cart, and Wishlist pages.

# Integrate TailwindCSS: 
Follow the TailwindCSS installation guide to configure your project with Tailwind.

# Connect to OpenFoodFacts API: 
Use the API to fetch product data and handle user searches, filters, and barcode lookups.

# To run the application locally, use the following command:
npm start

# This will start the development server and open the app in your default web browser at http://localhost:3000.