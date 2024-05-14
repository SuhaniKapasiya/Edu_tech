import React from "react";
import { useSelector } from "react-redux";
import Rendercartcoure from "./Rendercartcoure";
import Rendertotalammount from "./Rendertotalammount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  console.log(total)
  return (
    <div className=" flex flex-col ml-[5rem] p-6 w-[60rem]  gap-x-3 justify-around rounded-md">
      <div className=" mb-5  font-medium text-2xl  ml-[3rem]">{totalItems} item in your cart</div>
      {total > 0 ? (
        <div className=" flex justify-around  ">
          <Rendercartcoure />
          <Rendertotalammount />
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
