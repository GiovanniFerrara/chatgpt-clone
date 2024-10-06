import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Home: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sessionStorage.setItem("openai-token", apiKey);
    navigate("/dashboard");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Ferrara-GPT
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your Open API keys to start using the app.
        </Typography>

        <Typography sx={{ marginTop: 1 }} variant="body2" color="#ccc">
          This won't be stored on any server. It will be kept in your browser's
          session storage.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            fullWidth
            label="API Key"
            variant="outlined"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Let's go!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
