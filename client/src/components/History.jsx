import React from "react";
import { Box, Typography } from "@mui/material";

import { useConversations } from "../ConversationsContext";

const History = () => {
  const { conversations } = useConversations();
  console.log(conversations);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: 3,
        margin: 3,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        History
      </Typography>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          padding: 2,
          borderRadius: 3,
          backgroundColor: "background.component",
        }}
      >
        {conversations?.map((conv, idx) => (
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
    </Box>
  );
};

export default History;
