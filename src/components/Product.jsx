import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { WiCloudUp } from "react-icons/wi";
import { AiOutlineCalendar } from "react-icons/ai"; // Import calendar icon
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the date picker

const Product = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null); // State for date

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const droppedFile = acceptedFiles[0];
    setFile(droppedFile);
  }, []);

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Adjust file types as needed
    multiple: false,
  });

  const formik = useFormik({
    initialValues: {
      productName: '',
      price: '',
      date: null, // Initial value for the date
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
      date: Yup.date().required('Date is required'), // Date validation
    }),
    onSubmit: (values, { resetForm }) => {
      console.log({ ...values, file });
      resetForm(); // Reset the form fields
      setFile(null); // Clear the uploaded file
      setDate(null); // Clear the date
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        
        {/* Drag and Drop File Upload using react-dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-300 p-6 mb-4 text-center rounded-md flex flex-col items-center justify-center ${
            isDragActive ? 'border-green-600' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {/* Styled Cloud Upload Icon */}
          <WiCloudUp className="text-gray-500 mb-2 h-20 w-20" />

          {file ? (
            <p className="text-green-600">File uploaded: {file.name}</p>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Drag and drop a file here</p>
              <p className="text-gray-500">or</p>
              {/* Change button to link */}
              <span
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="mt-2 text-indigo-600 cursor-pointer underline"
              >
                Click to select a file
              </span>
            </>
          )}
        </div>

        {/* Product Name Field */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              formik.errors.productName && formik.touched.productName ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productName}
          />
          {formik.errors.productName && formik.touched.productName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.productName}</div>
          )}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="text" // Change type to text to remove increment/decrement buttons
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              formik.errors.price && formik.touched.price ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.errors.price && formik.touched.price && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
          )}
        </div>

        {/* Date Field with Calendar Icon */}
        <div className="mb-4 relative">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <div className="relative">
            <DatePicker
              id="date"
              name="date"
              selected={date} // Set the selected date
              onChange={(date) => {
                setDate(date);
                formik.setFieldValue('date', date); // Update Formik value
              }}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.errors.date && formik.touched.date ? 'border-red-500' : 'border-gray-300'
              }`}
              dateFormat="yyyy/MM/dd" // Date format
              placeholderText="Select a date" // Placeholder text
            />
            <AiOutlineCalendar className="absolute right-3 top-2 text-gray-500 h-5 w-5" /> {/* Calendar icon */}
          </div>
          {formik.errors.date && formik.touched.date && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
          )}
        </div>

        {/* Buttons for Submit and Clear */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={() => {
              formik.resetForm(); // Reset the form fields
              setFile(null); // Clear the uploaded file
              setDate(null); // Clear the date
            }}
            className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
