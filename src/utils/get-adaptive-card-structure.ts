//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DJson from 'dirty-json'

export const getCardStructure = (card: {cardData: string} | null | string): string | null => {
  if (!card) return null
  if (typeof card === "string") {
    try {
      return DJson.parse(card);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  return DJson.parse((card?.cardData))
};
