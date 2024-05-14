import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Requirementfield({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  return (
    <div>
      <label
        htmlFor={name}
        className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <input
        type="text"
        id={name}
        placeholder="Enter Benifite of the Course"
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
      />
      <button
        type="button"
        onClick={handleAddRequirement}
        className="font-semibold ml-2 mt-3 text-yellow-50"
      >
        Add
      </button>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs ml-4 text-pure-greys-300"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{label} is required</span>}
    </div>
  );
}

export default Requirementfield;
