import React from "react";
import { Button, Grid2 as Grid, Container, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import LogoSmall from "../../../assets/logo-small.svg?react";
import { MessagesTemplatesContainer } from "./message-templates.styles";

const MessageTemplates: React.FC<{
  submitTemplate: (template: string) => void;
}> = ({ submitTemplate }) => {
  const templates = [
    "Give me a code snippet to iterate through 5 reasons why I should hire Gian Marco",
    "Create a form to understand which cheese am I, according to my personality",
    "Give a list 6 numbers that will make sure I win the lottery",
    "Design a dating app for introverted houseplants",
  ];

  const theme = useTheme();

  const handleTemplateClick = (template: string) => {
    submitTemplate(template);
  };

  return (
    <MessagesTemplatesContainer>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: theme.spacing(6),
          }}
        >
          <LogoSmall height={theme.spacing(5)} width={theme.spacing(5)} />
        </Box>
        <Grid container spacing={2}>
          {templates.map((template, index) => (
            <Grid size={[6, 6, 3]} key={index}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleTemplateClick(template)}
                sx={{
                  textTransform: "none",
                  height: "100%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  padding: 2,
                }}
              >
                {template}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MessagesTemplatesContainer>
  );
};

export default MessageTemplates;
