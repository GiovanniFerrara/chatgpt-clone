// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCardStructure = (card: any) => {
  return {
      type: "AdaptiveCard",
      version: "1.3",
      body: card?.body,
    };
};
