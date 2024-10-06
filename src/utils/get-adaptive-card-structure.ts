export const getCardsStructure = (card: {body: string}| null | string): unknown[] | null => {
  if (!card) return null
  if (typeof card === "string") {
    try {
      return JSON.parse(card);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  return JSON.parse((card?.body))
};
