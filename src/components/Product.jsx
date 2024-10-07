import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { WiCloudUp } from "react-icons/wi";
import { MdKeyboardArrowDown } from "react-icons/md"; // Import dropdown icon
import Datepicker from "react-tailwindcss-datepicker"; // Import Datepicker
import Select from 'react-tailwindcss-select'; // Import the Select component

const Product = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState({ startDate: null, endDate: null }); // State to manage the selected date
  const [fileError, setFileError] = useState('');

  // Product types options
  const productTypes = [
    { value: '', label: 'Select Product Type' },
    { value: 'grease', label: 'Grease' },
    { value: 'engine_oil', label: 'Engine Oil' },
    { value: 'gears_transmission', label: 'Gears and Transmission' },
    { value: 'specially_fluids', label: 'Specially Fluids' },
  ];

  // Fuel options for the multi-select dropdown
  const fuelOptions = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'cng', label: 'CNG' },
    { value: 'electric', label: 'Electric' },
  ];

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const droppedFile = acceptedFiles[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setFileError('');
    } else {
      setFileError('Only image files are accepted.');
    }
  }, []);

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const formik = useFormik({
    initialValues: {
      productName: '',
      price: '',
      productType: '', // Add productType to initial values
      date: '', // Add date to initial values
      fuelTypes: [], // Add fuelTypes to initial values
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
      productType: Yup.string().required('Product Type is required'), // Product type validation
      date: Yup.date().required('Date is required'), // Date validation
      fuelTypes: Yup.array().min(1, 'At least one fuel type is required'), // Fuel type validation
    }),
    onSubmit: (values, { resetForm }) => {
      console.log({ ...values, file, date: date.startDate }); // Log the selected date
      resetForm(); // Reset the form fields
      setFile(null); // Clear the uploaded file
      setDate({ startDate: null, endDate: null }); // Clear the selected date
    },
  });

  // Function to handle select all option
  const handleSelectAll = () => {
    if (formik.values.fuelTypes.length === fuelOptions.length) {
      formik.setFieldValue('fuelTypes', []); // Clear all selections
    } else {
      formik.setFieldValue('fuelTypes', fuelOptions.map(option => option.value)); // Select all options
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        
        {/* Drag and Drop File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-300 p-6 mb-4 text-center rounded-md flex flex-col items-center justify-center ${
            isDragActive ? 'border-green-600' : 'border-gray-300'
          }`}
          aria-label="File upload area"
        >
          <input {...getInputProps()} />
          <WiCloudUp className="text-gray-500 mb-2 h-20 w-20" />

          {file ? (
            <p className="text-green-600">File uploaded: {file.name}</p>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Drag and drop a file here</p>
              <p className="text-gray-500">or</p>
              <span
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="mt-2 text-blue-600 cursor-pointer underline"
              >
                Click to select a file
              </span>
            </>
          )}
          {fileError && <div className="text-red-500 mt-2">{fileError}</div>}
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
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            type="number"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

        {/* Product Type Dropdown */}
        <div className="mb-4 relative">
          <label htmlFor="productType" className="block text-gray-700">
            Product Type
          </label>
          <div className="relative">
            <select
              id="productType"
              name="productType"
              className={`w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.errors.productType && formik.touched.productType ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productType}
              style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }} // Hide default dropdown arrow
              aria-label="Select Product Type"
            >
              {productTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" /> {/* Dropdown icon */}
          </div>
          {formik.errors.productType && formik.touched.productType && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.productType}</div>
          )}
        </div>

        {/* Multi-Select Fuel Types */}
        {/* <div className="mb-4">
          <label htmlFor="fuelTypes" className="block text-gray-700">
            Fuel Types
          </label>
          <Select
            id="fuelTypes"
            isMulti
            options={fuelOptions}
            value={fuelOptions.filter(option => formik.values.fuelTypes.includes(option.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(option => option.value);
              formik.setFieldValue('fuelTypes', selectedValues);
            }}
            onMenuOpen={handleSelectAll}
            className={`mb-2 ${
              formik.errors.fuelTypes && formik.touched.fuelTypes ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Select Fuel Types"
            aria-label="Select Fuel Types"
          />
          <div>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-blue-600 underline"
            >
              {formik.values.fuelTypes.length === fuelOptions.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          {formik.errors.fuelTypes && formik.touched.fuelTypes && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.fuelTypes}</div>
          )}
        </div> */}

        {/* Date Picker */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <Datepicker
            value={date}
            onChange={setDate}
            inputClassName={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            displayFormat="DD/MM/YYYY"
            placeholder="Select date"
          />
          {formik.errors.date && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setFile(null);
              setDate({ startDate: null, endDate: null });
              setFileError(''); // Reset file error
              formik.setFieldValue('fuelTypes', []); // Reset fuel types
            }}
            className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
