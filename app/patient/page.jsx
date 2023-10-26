"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const PatientForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    formState: { errors, isValid },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Patient added successfully");
        // router.refresh();
        router.push("/patient/patientList");
      } else {
        console.error("Error adding patient");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.dob ? "border-red-500" : ""
            }`}
            {...register("dob", { required: "Date of Birth is required" })}
          />
          {errors.dob && (
            <p className="text-red-500 text-xs italic">{errors.dob.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.gender ? "border-red-500" : ""
            }`}
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.contact ? "border-red-500" : ""
            }`}
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Please enter a valid 10-digit contact number",
              },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-xs italic">
              {errors.contact.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="address.street"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address?.street ? "border-red-500" : ""
            }`}
            {...register("address.street", { required: "Street is required" })}
          />
          {errors.address?.street && (
            <p className="text-red-500 text-xs italic">
              {errors.address.street.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="address.city"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address?.city ? "border-red-500" : ""
            }`}
            {...register("address.city", { required: "city is required" })}
          />
          {errors.address?.city && (
            <p className="text-red-500 text-xs italic">
              {errors.address.city.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="address.state"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address?.state ? "border-red-500" : ""
            }`}
            {...register("address.state", { required: "state is required" })}
          />
          {errors.address?.state && (
            <p className="text-red-500 text-xs italic">
              {errors.address.state.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="address.zip"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address?.zip ? "border-red-500" : ""
            }`}
            {...register("address.zip", { required: "zip is required" })}
          />
          {errors.address?.zip && (
            <p className="text-red-500 text-xs italic">
              {errors.address.zip.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="insuranceProvider"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Insurance Provider
          </label>
          <input
            type="text"
            id="insuranceProvider"
            name="insurance.provider"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.insurance?.provider ? "border-red-500" : ""
            }`}
            {...register("insurance.provider", {
              required: "insurance provider is required",
            })}
          />
          {errors.insurance?.provider && (
            <p className="text-red-500 text-xs italic">
              {errors.insurance.provider.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="policyNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Policy Number
          </label>
          <input
            type="text"
            id="policyNumber"
            name="insurance.policyNumber"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.insurance?.policyNumber ? "border-red-500" : ""
            }`}
            {...register("insurance.policyNumber", {
              required: "insurance policyNumber is required",
            })}
          />
          {errors.insurance?.policyNumber && (
            <p className="text-red-500 text-xs italic">
              {errors.insurance.policyNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="groupNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Group Number
          </label>
          <input
            type="text"
            id="groupNumber"
            name="insurance.groupNumber"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.insurance?.policyNumber ? "border-red-500" : ""
            }`}
            {...register("insurance.groupNumber", {
              required: "insurance groupNumber is required",
            })}
          />
          {errors.insurance?.groupNumber && (
            <p className="text-red-500 text-xs italic">
              {errors.insurance.groupNumber.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
