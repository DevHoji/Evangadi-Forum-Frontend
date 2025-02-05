import React, { useState, useEffect } from "react";
import axiosBase from "../axiosConfig"; // Import your Axios instance
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { Button, Avatar, TextField } from "@mui/material"; // Import Material-UI components
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]); // New state for filtered questions
  const [username, setUsername] = useState(""); // State to store the username
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch questions and user data on component mount
    const fetchData = async () => {
      try {
        // Get user info
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

        // Get all questions
        const questionsResponse = await axiosBase.get("/questions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setQuestions(questionsResponse.data.questions);
        setFilteredQuestions(questionsResponse.data.questions); // Initialize filtered questions with all questions
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately (e.g., redirect to login)
      }
    };

    fetchData();
  }, []);

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

  // useEffect to trigger handleSearch when searchTerm changes
  useEffect(() => {
    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]); // This effect runs whenever searchTerm or questions changes

  return (
    <section className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* Ask Question Button */}
          <Link to="/new-question">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px", marginRight: "16px" }}
            >
              Ask Question
            </Button>
          </Link>

          {/* Search Input */}
          <TextField
            label="Search by Title"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "16px" }} //Add some top margin to align better
          />
        </div>

        {/* Welcome Message */}
        <div className="text-xl font-semibold">Welcome: {username}</div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.map(
          (
            question // Map over filteredQuestions instead of questions
          ) => (
            <div key={question.id} className="border rounded-md p-4">
              <hr className="mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <Avatar sx={{ width: 32, height: 32, mb: 1 }} />
                  <div className="text-xs font-medium">
                    {question.username}
                  </div>{" "}
                  {/* Display the username */}
                </div>
                <div className="text-lg">{question.title}</div>
                <ArrowForwardIosIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuestionClick(question.id)}
                />
              </div>
              <hr className="mt-2" />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Home;
