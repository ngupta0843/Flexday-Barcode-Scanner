import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: 40, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Insights with Every Scan
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Your gateway to detailed product information at the tip of your
          scanner.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/signup")}
        >
          Explore Now
        </Button>
      </Container>

      <Container maxWidth="lg" style={{ marginTop: 40 }}>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={feature.image}
                  title="Image title"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

const features = [
  {
    title: "Customized LLM",
    description:
      "Tailored language models that learn from your queries to provide relevant and personalized responses.",
    image: "add image url here",
  },
  {
    title: "Barcode Scanner",
    description:
      "Instantly retrieve detailed information about products simply by scanning barcodes.",
    image: "add image url here",
  },
  {
    title: "User-Centric Design",
    description:
      "Designed with user experience in mind, ensuring easy navigation and intuitive functionality.",
    image: "add image url here",
  },
];

export default Home;
