// import toast from "react-hot-toast";
// import { studentEndpoints } from "../apis";
// import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { resetCart } from "../../slices/cartSlice";

// const {
//   COURSE_PAYMENT_API,
//   COURSE_VERIFY_API,
//   SEND_PAYMENT_SUCCESS_EMAIL_API,
// } = studentEndpoints;
// // const dispatch = useDispatch();
// // const navigate = useNavigate();

// function loadScript(src) {
//   console.log("script loading");
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       // console.log("script loaded");
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);

//     if (resolve) {
//       console.log("script loded");
//     }
//   });
// }

// export async function buyCourse(
//   token,
//   courses,
//   userDetails,
//   navigate,
//   dispatch
// ) {
//   console.log("calling buycourse");
//   const toastId = toast.loading("Loading..");
//   try {
//     console.log("trying");
//     // validations
//     const src = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     console.log("src is", src);

//     if (!src) {
//       console.log("script load failed");
//       toast.error("RazorPay SDK failed to load");
//       return;
//     }

//     console.log("script loaded");
//     console.log(token);

//     console.log("before course payment api call");
//     const orderResponse = await apiConnector(
//       "POST",
//       COURSE_PAYMENT_API,
//       { courses },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message);
//     }
//     console.log("PRINTING orderResponse", orderResponse);

//     // options creaiton
//     // const options = {
//     //   key: "rzp_test_4ROi8Mb4oLvvu6",
//     //   currency: orderResponse.data.message.currency,
//     //   amount: `${orderResponse.data.message.amount}`,
//     //   order_id: orderResponse.data.message.id,
//     //   name: "StudyNotion",
//     //   description: "Thank You for Purchasing the Course",
//     //   image: rzpLogo,
//     //   prefil: {
//     //     name: `${userDetails.firstName}`,
//     //     email: userDetails.email,
//     //   },
//     //   handler: function (response) {
//     //     //send successful wala mail
//     //     sendPaymentSuccessEmail(
//     //       response,
//     //       orderResponse.data.message.amount,
//     //       token
//     //     );
//     //     //verifyPayment
//     //     verifyPayment({ ...response, courses }, token, navigate, dispatch);
//     //   },
//     //   // handler: function (response) {
//     //   //   // successfull mail bhej do
//     //   //   sendPaymentSuccessEmail(response, orderResponse.data.amount, token);
//     //   //   // varify payment kar lo
//     //   //   verifyPayment({ ...response, courses }, token, navigate, dispatch);
//     //   // },
//     // };
//     //options
//     const options = {
//       key: process.env.RAZORPAY_KEY,
//       currency: orderResponse.data.message.currency,
//       amount: `${orderResponse.data.message.amount}`,
//       order_id: orderResponse.data.message.id,
//       name: "StudyNotion",
//       description: "Thank You for Purchasing the Course",
//       image: rzpLogo,
//       prefill: {
//         name: `${userDetails.firstName}`,
//         email: userDetails.email,
//       },
//       handler: function (response) {
//         //send successful wala mail
//         sendPaymentSuccessEmail(
//           response,
//           orderResponse.data.message.amount,
//           token
//         );
//         //verifyPayment
//         verifyPayment({ ...response, courses }, token, navigate, dispatch);
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     paymentObject.on("payment.failed", function (response) {
//       toast.error("oops, payment failed");
//       console.log(response.error);
//     });

//     console.log("Options ---------- ", options);
//   } catch (error) {
//     console.log(error)
//     console.log("PAYMENT API ERROR.....", error);
//     toast.error("Could not make Payment");
//   }
//   toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//   try {
//     console.log("inside send verification mail function");
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         orderId: response.razorpay_order_id,
//         paymentId: response.razorpay_payment_id,
//         amount,
//       },
//       { Authorization: `Bearer ${token}` }
//     );
//   } catch (error) {
//     console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//   }
// }

// async function verifyPayment(bodyData, token, navigate, dispatch) {
//   const toastId = toast.loading("Verifying Payment....");
//   dispatch(setPaymentLoading(true));
//   try {
//     const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
//       Authorization: `Bearer ${token}`,
//     });

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }
//     toast.success("Payment Successful, You are added to the course");

//     navigate("/dashboard/enrolled-courses");
//     dispatch(resetCart());
//   } catch (error) {
//     console.log("PAYMENT VERIFY ERROR....", error);
//     toast.error("Could not verify Payment");
//   }
//   toast.dismiss(toastId);
//   dispatch(setPaymentLoading(false));
// }

import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading..");
  try {
    const scriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!scriptLoaded) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
    });
  } catch (error) {
    console.log(error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful, You are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
