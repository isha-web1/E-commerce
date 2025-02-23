import { createSlice } from '@reduxjs/toolkit'




// Define the initial state using that type
const initialState  = {
  products : [] as any,
  selectedItems : 0,
  totalPrice : 0,
  tax : 0,
  taxRate : 0.1,
  grandTotal : 0

}

export const cartSlice = createSlice({
  name: 'cart',
 
  initialState,
  reducers: {
    addToCart : (state, action ) =>{
     const isExist = state.products.find((product : any) => product.id === action.payload.id)
     if (!isExist) {
      state.products.push({ ...action.payload, quantity: 1 });
    }
    state.selectedItems = selectSelectedItems(state);
    }
   
  },
})

export const selectSelectedItems = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return Number(total + product.quantity);
  }, 0);

export const { addToCart } = cartSlice.actions


export default cartSlice.reducer