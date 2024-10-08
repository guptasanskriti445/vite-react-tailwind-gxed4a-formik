import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  // Handle clear form
  const handleClear = (resetForm) => {
    setFile(null);
    resetForm();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Notification Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ resetForm }) => (
          <Form>
            {/* Title Field */}
            <div className="mb-4">
              <Field name="title">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    className="mt-1"
                  />
                )}
              </Field>
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    className="mt-1"
                  />
                )}
              </Field>
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* File Upload Field */}
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700">Upload File</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.doc,.docx,.txt" // Acceptable file types
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                onChange={handleFileChange}
              />
            </div>

            {/* Submit and Clear Buttons */}
            <div className="flex justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mr-2"
              >
                Send
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => handleClear(resetForm)}
              >
                Clear
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationForm;
