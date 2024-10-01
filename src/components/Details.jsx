import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

const Details = () => {
  const initialValues = {
    productName: '',
    productImage: null,
    price: '',
    availableDate: '',
    categories: '',
    description: '',
    stock: '',
    isFeatured: false,
    status: 'active',
    tags: [],
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
    availableDate: Yup.date().required('Available date is required'),
    categories: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    stock: Yup.number().required('Stock is required').min(0, 'Stock cannot be negative'),
    status: Yup.string().required('Status is required'),
    tags: Yup.array().min(1, 'At least one tag is required'),
  });

  const onSubmit = (values) => {
    console.log('Form data:', values);
  };

  const handleDrop = (acceptedFiles, setFieldValue) => {
    // Set the file in Formik's state
    setFieldValue('productImage', acceptedFiles[0]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 border-b-2 border-gray-300 pb-3">
          Add New Product
        </h2>
        <p className="text-gray-600 text-sm italic">
          Fill out the form to add a new product to the inventory.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="w-full max-w-lg">
            {/* Product Name and Price */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <Field
                  name="productName"
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Product Name"
                />
                <ErrorMessage name="productName" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <Field
                  name="price"
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Price ($)"
                />
                <ErrorMessage name="price" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Available Date and Stock */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="availableDate">
                  Available Date
                </label>
                <Field
                  name="availableDate"
                  type="date"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <ErrorMessage name="availableDate" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="stock">
                  Stock
                </label>
                <Field
                  name="stock"
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Stock Quantity"
                />
                <ErrorMessage name="stock" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Product Image (Drag-and-Drop) */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productImage">
                  Product Image
                </label>

                <Dropzone setFieldValue={setFieldValue} />

                <ErrorMessage name="productImage" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="categories">
                  Categories
                </label>
                <Field
                  as="select"
                  name="categories"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select a Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                </Field>
                <ErrorMessage name="categories" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Product Description"
                />
                <ErrorMessage name="description" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Status and Tags */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status</span>
                <label className="block mb-3">
                  <Field type="radio" name="status" value="active" className="mr-2" />
                  Active
                </label>
                <label>
                  <Field type="radio" name="status" value="inactive" className="mr-2" />
                  Inactive
                </label>
                <ErrorMessage name="status" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Tags</span>
                <label className="block mb-3">
                  <Field type="checkbox" name="tags" value="new" className="mr-2" />
                  New
                </label>
                <label>
                  <Field type="checkbox" name="tags" value="sale" className="mr-2" />
                  Sale
                </label>
                <ErrorMessage name="tags" component="p" className="text-red-500 text-xs italic" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Drag-and-Drop Component
const Dropzone = ({ setFieldValue }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      handleDrop(acceptedFiles, setFieldValue);
    },
  });

  return (
    <div {...getRootProps({ className: 'border-2 border-dashed border-gray-300 rounded-md p-4 text-center' })}>
      <input {...getInputProps()} />
      <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
      <p className="text-gray-600 text-xs italic">Only image files are accepted</p>
    </div>
  );
};

export default Details;
