import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbtn from "../../../Common/Iconbtn";
import { useState } from "react";
import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";

function Changeprofilepicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    console.log("i am clicked");
    console.log(token);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData));
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false); // Make sure to reset loading state on error
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="  flex p-6 w-[650px] items-center gap-x-3 justify-start rounded-md bg-richblack-700 ">
      <div>
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[55px] rounded-full object-cover"
        />
      </div>
      <div className=" flex flex-col ">
        <div>Change Profile Picture</div>
        <div className=" flex gap-x-3 ">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md bg-richblack-500 -py-1 px-5 font-semibold text-richblack-50"
          >
            Select
          </button>
          <Iconbtn
            text={loading ? "Uploading..." : "Upload"}
            onClick={handleFileUpload}
          >
            {" "}
            {!loading && <FiUpload className="text-lg text-richblack-900" />}
          </Iconbtn>
        </div>
      </div>
    </div>
  );
}

export default Changeprofilepicture;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Iconbtn from "../../../Common/Iconbtn";
// import { useState } from "react";
// import { useRef } from "react";
// import { FiUpload } from "react-icons/fi";
// import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";

// function Changeprofilepicture() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(null);

//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected file:", file); // Added console log
//     if (file) {
//       setImageFile(file);
//       previewFile(file);
//     }
//   };

//   const previewFile = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setPreviewSource(reader.result);
//     };
//   };

//   const handleFileUpload = async () => {
//     console.log("Upload button clicked");
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("displayPicture", imageFile);
//       console.log("Uploading formData:", formData); // Added console log
//       dispatch(updateDisplayPicture(token, formData));
//       setLoading(false);
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message);
//       setLoading(false); // Make sure to reset loading state on error
//     }
//   };

//   useEffect(() => {
//     if (imageFile) {
//       previewFile(imageFile);
//     }
//   }, [imageFile]);

//   console.log("Component rendering"); // Added console log

//   return (
//     <div className="  flex p-6 w-[650px] items-center gap-x-3 justify-start rounded-md bg-richblack-700 ">
//       <div>
//         <img
//           src={previewSource || user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[55px] rounded-full object-cover"
//         />
//       </div>
//       <div className=" flex flex-col ">
//         <div>Change Profile Picture</div>
//         <div className=" flex gap-x-3 ">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/png, image/gif, image/jpeg"
//           />
//           <button
//             onClick={handleClick}
//             disabled={loading}
//             className="cursor-pointer rounded-md bg-richblack-500 -py-1 px-5 font-semibold text-richblack-50"
//           >
//             Select
//           </button>
//           <Iconbtn
//             text={loading ? "Uploading..." : "Upload"}
//             onClick={handleFileUpload}
//           >
//             {" "}
//             {!loading && <FiUpload className="text-lg text-richblack-900" />}
//           </Iconbtn>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Changeprofilepicture;
