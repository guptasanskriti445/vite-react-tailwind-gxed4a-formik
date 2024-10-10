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

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx,.txt,image/*', // Acceptable file types
  });

  return (
    <div className="max-w-lg mx-auto pb-3 bg-white shadow-md rounded-lg border border-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-center bg-blue-600 text-white p-4 rounded-t-lg">Notification Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit} // Formik's onSubmit method to handle form submission
      >
        {({ resetForm }) => (
          <Form className='px-6'>
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 mb-1">Title:</label>
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
              <label htmlFor="description" className="block text-gray-700 mb-1">Description:</label>
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
              <label className="block text-gray-700 mb-1">Upload Image</label>
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
                      <p className="text-gray-500">or</p>
                      <p className="text-gray-500">click to select files</p>
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
                className="bg-transparent border border-blue-700 text-blue-700 py-2 px-4 rounded-full hover:bg-blue-700 hover:text-white"
                onClick={() => handleClear(resetForm)}
              >
                Clear
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-800"
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationFlowbite;
