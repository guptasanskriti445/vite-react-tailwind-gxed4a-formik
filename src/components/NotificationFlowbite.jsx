import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { WiCloudUp } from "react-icons/wi";

const NotificationFlowbite = () => {
  const [file, setFile] = useState(null);

  // Initial values for Formik
  const initialValues = {
    title: '',
    description: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (file) {
      formData.append('file', file);
    }

    // Simulate form submission (you can replace this with actual submission logic)
    console.log('Form submitted:', {
      title: values.title,
      description: values.description,
      file: file ? file.name : 'No file selected',
    });

    // Reset the form after submission
    resetForm();
    setFile(null); // Clear the selected file
  };

  // Handle file drop and selection
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  // Clear the form
  const handleClear = (resetForm) => {
    resetForm();
    setFile(null);
  };

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx,.txt,image/*', // Acceptable file types
  });

  return (
    <div className='bg-white'>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg border flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 p-0"> {/* Set padding to 0 */}
          <img
            src="https://via.placeholder.com/400" // Replace with your image URL
            alt="Placeholder"
            className="w-full h-full object-cover rounded-l-lg" // Use h-full to cover full div
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 text-left text-blue-600 p-4 rounded-lg">Notification Form</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ resetForm }) => (
              <Form className='px-6'>
                {/* Title Field */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 mb-1 font-medium">Title:</label>
                  <Field name="title">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter title"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 mb-1 font-medium">Description:</label>
                  <Field name="description">
                    {({ field }) => (
                      <textarea
                        {...field}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter description"
                        rows={3}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* File Upload Field with Drag and Drop */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1 font-medium">Upload Image</label>
                  <div
                    {...getRootProps({ className: 'border-dashed border-2 border-gray-300 rounded-md p-4 text-center' })}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <WiCloudUp className="text-4xl mb-2" />
                      {isDragActive ? (
                        <p className="text-gray-500">Drop the files here...</p>
                      ) : (
                        <>
                          <p className="text-gray-500">Drag & drop some files here</p>
                          <p className="text-gray-500">or click to select files</p>
                        </>
                      )}
                    </div>
                  </div>
                  {file && (
                    <div className="mt-2 text-gray-600">
                      Selected File: {file.name}
                    </div>
                  )}
                </div>

                {/* Submit and Clear Buttons - Right Aligned */}
                <div className="flex justify-end space-x-2 mt-6">
                  {/* Clear Button */}
                  <button
                    type="button"
                    className="bg-transparent border border-blue-700 text-blue-700 py-2 px-5 rounded-xl shadow-md font-medium" // Added px-2 and shadow
                    onClick={() => handleClear(resetForm)}
                  >
                    Clear
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-5 rounded-xl shadow-md hover:bg-blue-800 font-medium" // Added px-2 and shadow
                  >
                    Send
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NotificationFlowbite;
