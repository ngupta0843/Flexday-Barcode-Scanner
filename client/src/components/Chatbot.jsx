import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";

import { fetchData, sendQuestion } from "../routes/Routes";
import { useConversations } from "../ConversationsContext";

const Chatbot = () => {
  const { conversations, setConversations } = useConversations();
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setQuestion(e.target.value);
    if (e.keyCode === 13) {
      setQuestion(e.target.value);
    }
  };

  const handleClick = async () => {
    setConversations((prev) => [
      ...prev,
      { question, answer: "Waiting for response..." },
    ]);
    try {
      const response = await sendQuestion({ question });
      const data = await fetchData();
      setConversations((prev) =>
        prev.map((conv) =>
          conv.question === question
            ? { ...conv, answer: data.data.answer }
            : conv
        )
      );
    } catch (error) {
      console.error(error);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.question === question
            ? { ...conv, answer: "Something went wrong. Please try again." }
            : conv
        )
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 5,
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: 3,
        maxHeight: 800,
      }}
    >
      <Typography variant="h6">Chat Bot</Typography>
      <Scrollbars style={{ height: 200 }}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            padding: 2,
            minHeight: 300,
            maxHeight: "20vh",
            borderRadius: 3,
            backgroundColor: "background.component",
          }}
        >
          {conversations.map((conv, idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Q: {conv.question}
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "grey",
                  margin: "2vh",
                  borderRadius: "2vh",
                  padding: "2vh",
                }}
              >
                A: {conv.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Scrollbars>
      <TextField
        label="Your Question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Send
      </Button>
    </Box>
  );
};

export default Chatbot;
