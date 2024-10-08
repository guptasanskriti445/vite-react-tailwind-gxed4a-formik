import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const ProductForm = () => {
  // Initial values for Formik
  const initialValues = {
    productName: '',
    description: '',
    price: '',
    category: '',
    releaseDate: null,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    releaseDate: Yup.date().nullable().required('Release date is required'),
  });

  // Handle form submission
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Details Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Product Name Field */}
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700">Product Name</label>
              <Field
                name="productName"
                type="text"
                placeholder="Enter product name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="productName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter product description"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Price Field */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">Price</label>
              <Field
                name="price"
                type="number"
                placeholder="Enter price"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Category Field */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">Category</label>
              <Field
                name="category"
                type="text"
                placeholder="Enter product category"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Release Date Field using MUI Date Picker */}
            <div className="mb-4">
              <label htmlFor="releaseDate" className="block text-gray-700">Release Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={values.releaseDate}
                  onChange={(date) => setFieldValue('releaseDate', dayjs(date))}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth   // Add fullWidth here
                      className="w-full"  // Optional: Tailwind class for full width
                    />
                  )}
                />
              </LocalizationProvider>
              <ErrorMessage name="releaseDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
