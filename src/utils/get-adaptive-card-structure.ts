// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCardStructure = (card: any) => {
  try {
    const argumentsStr = card?.function?.arguments;

    if (!argumentsStr) {
      console.error("card.function.arguments is undefined or null.");
      return null;
    }

    let parsedArguments;
    try {
      parsedArguments = JSON.parse(argumentsStr);
    } catch (parseError) {
      console.error(
        "Failed to parse card.function.arguments as JSON:",
        parseError
      );
      return null;
    }

    let body = [];

    if (
      parsedArguments &&
      parsedArguments.body &&
      Array.isArray(parsedArguments.body)
    ) {
      body = parsedArguments.body
        .map((item: unknown, index: number) => {
          if (typeof item === "string") {
            const trimmedItem = item.trim();

            // Case 1: Item is a JSON string
            if (trimmedItem.startsWith("{") && trimmedItem.endsWith("}")) {
              try {
                const parsedItem = JSON.parse(trimmedItem);
                return parsedItem;
              } catch (parseError) {
                console.error(
                  `Error parsing JSON string at index ${index}:`,
                  parseError
                );
                return null;
              }
            }

            // Case 2: Item has a prefix like "Input.ChoiceSet:"
            else if (trimmedItem.startsWith("Input.ChoiceSet:")) {
              const jsonPart = trimmedItem
                .substring("Input.ChoiceSet:".length)
                .trim();
              try {
                const parsedItem = JSON.parse(jsonPart);
                // Ensure the type is correctly set
                parsedItem.type = "Input.ChoiceSet";
                return parsedItem;
              } catch (parseError) {
                console.error(
                  `Error parsing Input.ChoiceSet JSON at index ${index}:`,
                  parseError
                );
                return null;
              }
            }

            // Case 3: Plain text string
            else {
              return {
                type: "TextBlock",
                text: item,
              };
            }
          }
          // Case 4: Item is already an object
          else if (typeof item === "object") {
            return item;
          }
          // Case 5: Unexpected item type
          else {
            console.error(
              `Unexpected item type at index ${index}:`,
              typeof item
            );
            return null;
          }
        })
        .filter((item: unknown) => item !== null); // Remove any null entries due to parse errors
    }
    // Alternative Scenario: parsedArguments is an array
    else if (Array.isArray(parsedArguments)) {
      body = parsedArguments
        .map((item: unknown, index: number) => {
          if (typeof item === "string") {
            const trimmedItem = item.trim();

            // Case 1: Item is a JSON string
            if (trimmedItem.startsWith("{") && trimmedItem.endsWith("}")) {
              try {
                const parsedItem = JSON.parse(trimmedItem);
                return parsedItem;
              } catch (parseError) {
                console.error(
                  `Error parsing JSON string at index ${index}:`,
                  parseError
                );
                return null;
              }
            }

            // Case 2: Plain text string
            else {
              return {
                type: "TextBlock",
                text: item,
              };
            }
          }
          // Case 3: Item is already an object
          else if (typeof item === "object") {
            return item;
          }
          // Case 4: Unexpected item type
          else {
            console.error(
              `Unexpected item type at index ${index}:`,
              typeof item
            );
            return null;
          }
        })
        .filter((item: unknown) => item !== null);
    }
    // Unsupported Structure
    else {
      console.error(
        "parsedArguments is neither an array nor an object with a body array."
      );
      return null;
    }

    if (body.length === 0) {
      console.warn("Parsed body is an empty array.");
    }

    return {
      type: "AdaptiveCard",
      version: "1.3",
      body,
    };
  } catch (error) {
    console.error("Unexpected error in getCardStructure:", error);
    return null;
  }
};
