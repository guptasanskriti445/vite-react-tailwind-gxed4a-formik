import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { WiCloudUp } from "react-icons/wi";

const NotificationForm = () => {
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
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (file) {
      formData.append('file', file);
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
  };

  // Handle clear form
  const handleClear = (resetForm) => {
    setFile(null);
    resetForm();
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
        onSubmit={onSubmit}
      >
        {({ resetForm }) => (
          <Form className='px-6'>
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 mb-1">Title:</label>
              <Field name="title">
                {({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& input': {
                          height: '20px', // Set the height of the input field
                          padding: '5px 10px', // Adjust padding
                        },
                      },
                    }}
                    className="rounded-md" // Adding rounded corners
                    placeholder='Enter title'
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
                  <TextField
                    {...field}
                    placeholder="Enter description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& textarea': {
                          height: '20px', // Set the height of the textarea
                          padding: '5px 10px', // Adjust padding
                        },
                      },
                    }}
                    className="rounded-md" // Adding rounded corners
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
              <Button
                type="button"
                variant="outlined" // Using outlined style
                color="primary"     // Primary color outline
                onClick={() => handleClear(resetForm)}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                className='bg-blue-700'
              >
                Send
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationForm;
