/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, TextareaAutosize, Alert } from "@mui/material";
import axiosBase from "../axiosConfig";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!title || !description) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      await axiosBase.post(
        "/questions",
        {
          title: title,
          description: description,
          tag: "user_defined", 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Redirect to the Home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error creating question:", error);
      setErrorMessage("Failed to create question. Please try again.");
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <section className="container mx-auto py-8 px-4 sm:px-8">
      {" "}
      {/* Added responsive padding */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Steps to write a good question
      </h1>
      <div className="text-center">
        <ul
          className="list-disc pl-5 inline-block text-left" 
        >
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-2">Ask a public question</h2>
        <Link to="/">
          <Button variant="text">Go to Question page</Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}
        <TextField
          label="Title"
          placeholder="Title (max 50 characters)"
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 50 }} 
        />
        <TextareaAutosize
          placeholder="Question Description (max 200 characters)"
          minRows={5}
          className="w-full mt-4 p-2 border border-black rounded" // Converted inline styles to Tailwind classes
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200} 
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 rounded-full" 
        >
          Post Your Question
        </Button>
      </form>
    </section>
  );
};

export default NewQuestion;
