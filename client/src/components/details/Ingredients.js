import React, { useState } from "react";
import {
  Box,
  CardMedia,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";

const Ingredients = ({ productInfo, ingredients }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const displayedIngredients = showMore ? ingredients : ingredients.slice(0, 5);

  return (
    <Box>
      {productInfo && (
        <>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CardMedia
              component="img"
              image={productInfo?.image_url}
              alt={productInfo.product_name}
              sx={{
                height: "300px",
                maxWidth: "400px",
                width: "auto",
                borderRadius: "20px",
              }}
            />
            <List>
              {displayedIngredients.map((ingredient) => (
                <ListItemButton key={ingredient.label}>
                  <ListItemIcon sx={{ mr: -2 }}>
                    {ingredient.isHealthy ? (
                      <CheckCircleOutline color="success" />
                    ) : (
                      <HighlightOff color="error" />
                    )}
                  </ListItemIcon>
                  <Typography variant="body1">{ingredient.label}</Typography>
                </ListItemButton>
              ))}
              <Button onClick={handleToggle} sx={{ mt: 2 }}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Ingredients;
