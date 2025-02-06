/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axiosBase from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar, TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket(); // Access the socket and connection status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axiosBase.get("/users/check", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (userResponse.data.username) {
          setUsername(userResponse.data.username);
        } else {
          console.error("Could not get username");
        }

        const questionsResponse = await axiosBase.get("/questions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setQuestions(questionsResponse.data.questions);
        setFilteredQuestions(questionsResponse.data.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

  useEffect(() => {
    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);

  useEffect(() => {
    if (!socket) return; // Don't proceed if socket is not initialized

    const handleNewQuestion = (question) => {
      // Update the questions state when a new question is received
      setQuestions((prevQuestions) => [question, ...prevQuestions]);
      setFilteredQuestions((prevFilteredQuestions) => [
        question,
        ...prevFilteredQuestions,
      ]); // Update filtered questions as well
    };

    socket.on("newQuestion", handleNewQuestion);

    return () => {
      socket.off("newQuestion", handleNewQuestion); // Clean up the event listener
    };
  }, [socket]); // Depend on the socket

  return (
    <section className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Link to="/new-question">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px", marginRight: "16px" }}
            >
              Ask Question
            </Button>
          </Link>
          <TextField
            label="Search by Title"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "16px" }}
          />
        </div>
        <div className="text-xl font-semibold">Welcome: {username}</div>
      </div>
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="border rounded-md p-4">
            <hr className="mb-2" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <Avatar sx={{ width: 32, height: 32, mb: 1 }} />
                <div className="text-xs font-medium">{question.username}</div>
              </div>
              <div className="text-lg">{question.title}</div>
              <ArrowForwardIosIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleQuestionClick(question.id)}
              />
            </div>
            <hr className="mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
