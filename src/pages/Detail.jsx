/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Avatar,
  TextareaAutosize,
  TextField,
  Alert,
} from "@mui/material";
import axiosBase from "../axiosConfig";
import { useSocket } from "../context/SocketContext"; // Import useSocket

const Detail = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [filteredAnswers, setFilteredAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket(); // Access the socket

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axiosBase.get(`/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestion(questionResponse.data.question);

        const answersResponse = await axiosBase.get(
          `/answers/${questionResponse.data.question.questionid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnswers(answersResponse.data.answers);
        setFilteredAnswers(answersResponse.data.answers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!socket || !question) return; // Only proceed if socket and question are available

    const handleNewAnswer = (answer) => {
      // Check if the answer belongs to the current question
      if (answer.questionid === question.questionid) {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        setFilteredAnswers((prevFilteredAnswers) => [
          ...prevFilteredAnswers,
          answer,
        ]);
      }
    };

    socket.on("newAnswer", handleNewAnswer);

    return () => {
      socket.off("newAnswer", handleNewAnswer);
    };
  }, [socket, question]); // Depend on socket and question

  const handlePostAnswer = async (e) => {
    e.preventDefault();

    if (!answerText) {
      setErrorMessage("Please enter your answer.");
      return;
    }

    try {
      await axiosBase.post(
        "/answers",
        {
          questionid: question.questionid,
          answer: answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnswerText("");
      setErrorMessage("");

      // No need to refresh all answers, the socket will handle the new answer
      // const answersResponse = await axiosBase.get(
      //   `/answers/${question.questionid}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      // setAnswers(answersResponse.data.answers);
      // setFilteredAnswers(answersResponse.data.answers);
    } catch (error) {
      console.error("Error posting answer:", error);
      setErrorMessage("Error Posting the Answer");
    }
  };

  const handleSearch = (e) => {
    setSearchUsername(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filtered = answers.filter((answer) =>
      answer.username.toLowerCase().includes(searchTerm)
    );
    setFilteredAnswers(filtered);
  };

  if (!question) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <section className="container mx-auto py-8 px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-2">Question</h2>
        <TextField
          label="Search by Username"
          variant="outlined"
          size="small"
          value={searchUsername}
          onChange={handleSearch}
          className="mt-2 sm:mt-0"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
      <p className="text-gray-700 mb-4">{question.description}</p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Answer From The Community</h2>
      <hr className="my-4" />

      {filteredAnswers.map((answer) => (
        <div key={answer.answerid} className="flex items-start mb-4">
          <div className="flex flex-col items-center mr-4">
            <Avatar sx={{ width: 32, height: 32, mb: 1 }} />
            <div className="text-xs font-medium">{answer.username}</div>
          </div>
          <p>{answer.answer}</p>
        </div>
      ))}

      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-2">Answer The Top Question</h2>
        <Link to="/">
          <Button variant="text">Go to Question page</Button>
        </Link>
      </div>

      <form onSubmit={handlePostAnswer} className="mt-8">
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}
        <TextareaAutosize
          placeholder="Your Answer..."
          minRows={5}
          className="w-full mt-4 p-2 border border-black rounded"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 rounded-full"
        >
          Post Your Answer
        </Button>
      </form>
    </section>
  );
};

export default Detail;
