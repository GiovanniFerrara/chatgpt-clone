import { useEffect, useMemo, useRef } from "react";
import { Action, AdaptiveCard, HostConfig } from "adaptivecards";
import { Box, useTheme } from "@mui/material";
import { toast } from "react-toastify";

const AdaptiveCardRenderer = ({ cardPayload }: { cardPayload: unknown }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const hostConfig = useMemo(() => {
    return new HostConfig({
      spacing: {
        small: 3,
        default: 8,
        medium: 20,
        large: 30,
        extraLarge: 40,
        padding: 10,
      },
      separator: {
        lineThickness: 1,
        lineColor: theme.palette.divider,
      },
      supportsInteractivity: true,
      fontTypes: {
        default: {
          fontFamily: "Noto Sans, sans-serif",
          fontSizes: {
            small: 12,
            default: 14,
            medium: 17,
            large: 21,
            extraLarge: 26,
          },
          fontWeights: {
            lighter: 200,
            default: 400,
            bolder: 600,
          },
        },
        monospace: {
          fontFamily: "'Courier New', Courier, monospace",
          fontSizes: {
            small: 12,
            default: 14,
            medium: 17,
            large: 21,
            extraLarge: 26,
          },
          fontWeights: {
            lighter: 200,
            default: 400,
            bolder: 600,
          },
        },
      },
      containerStyles: {
        default: {
          backgroundColor: theme.palette.background.paper,
          foregroundColors: {
            default: {
              default: theme.palette.text.primary,
              subtle: theme.palette.text.secondary,
            },
            accent: {
              default: theme.palette.primary.main,
              subtle: theme.palette.primary.main,
            },
            attention: {
              default: theme.palette.error.main,
              subtle: theme.palette.error.light,
            },
            good: {
              default: theme.palette.success.main,
              subtle: theme.palette.success.light,
            },
            warning: {
              default: theme.palette.warning.main,
              subtle: theme.palette.warning.light,
            },
          },
        },
      },
    });
  }, [theme]);

  useEffect(() => {
    if (cardRef.current) {
      const adaptiveCard = new AdaptiveCard();
      adaptiveCard.hostConfig = hostConfig;
      console.log(cardPayload);
      adaptiveCard.parse(cardPayload);

      adaptiveCard.onExecuteAction = (action: Action) => {
        console.log("I wish I had the time to handle this", action);
        toast.info("Great, this has been saved to our imaginary servers", {
          autoClose: 5000,
          theme: "light",
        });
      };

      const renderedCard = adaptiveCard.render();
      cardRef.current.innerHTML = "";
      cardRef.current.appendChild(renderedCard);
    }
  }, [cardPayload, hostConfig, theme]);

  return <Box sx={{ marginBottom: 3 }} ref={cardRef}></Box>;
};

export default AdaptiveCardRenderer;
