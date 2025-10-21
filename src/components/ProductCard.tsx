import React, { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/feature/cartSlice";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/feature/auth/authSlice";

const ProductCart = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleShowModal = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleAddToCart = (product: any) => {
    // Assuming 'user' is an object that contains email when logged in
    // and is null/undefined or an object without email when not.
    if (user && user.email) {
      // 1. User is logged in: Dispatch the Redux action
      dispatch(addToCart(product));

      // 2. Show success notification
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${product.name} added to your cart`, // Assumes product has a 'name' property
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // 1. User is NOT logged in: Show login prompt
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        // 2. Check if the user clicked 'Login now!'
        if (result.isConfirmed) {
          // 3. Navigate to the login page, passing current location for redirect
          navigate('/login', { state: { from: location } });;
        }
      });
    }
  };
  return (
    <div className="relative">
      {showModal && (
        <Modal
          product={selectedProduct}
          onClose={handleCloseModal}
          handleAddToCart={() => {}}
        />
      )}

      <div
        onClick={() => handleShowModal(product)}
        className="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
          <p className="text-lg font-bold text-red-600 mb-4">{product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
