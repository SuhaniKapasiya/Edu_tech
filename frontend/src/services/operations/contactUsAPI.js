import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactusEndpoint } from "../apis";

export const contactUs = async (data) => {
  const toastId = toast.loading("Loading...");

  try {
    // console.log("Printing contact us data frontend => ", data);
    console.log("calling api put wali");
    const res = await apiConnector(
      "PUT",
      "http://localhost:4000/api/v1/reach/contact",
      {
        data,
      }
    );
    if (!res?.data?.success) {
      throw new Error("Could not send contact us data");
    }
    console.log(res);
    toast.success("Message sent...")
  } catch (error) {
    console.log("contact us API ERROR....", error);
    toast.error(error.message);
    return error.response?.data;
  }
  toast.dismiss(toastId);
  // return;
};
