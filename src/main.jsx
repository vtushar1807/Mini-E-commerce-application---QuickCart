import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'


import { ProductSliceReducer } from './ReduxStore/productReducer.js'
import { SkipSliceReducer } from './ReduxStore/skipReducer.js'
import { CartSliceReducer } from './ReduxStore/cartReducer.js'
import { ProductDetailSliceReducer } from './ReduxStore/productDetailReducer.js'


const store = configureStore({
  reducer:{
    productRed:ProductSliceReducer.reducer,
    skipRed:SkipSliceReducer.reducer,
    cartRed:CartSliceReducer.reducer,
    productDetailRed:ProductDetailSliceReducer.reducer
  }
})


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>

)
