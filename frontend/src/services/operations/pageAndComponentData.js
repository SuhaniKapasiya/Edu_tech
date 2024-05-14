import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (catagoryId) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    console.log("Printing category frontend => ", catagoryId);
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { catagoryId: catagoryId }
    );

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data");
    }
    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
