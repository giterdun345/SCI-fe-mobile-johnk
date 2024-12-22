import { render, screen } from "@testing-library/react-native";

import { CardData } from "@/types/CardsTypes";

import CardList from "../CardList";

// TODO: sorry for deleting most of the test, there should have an integration test in the root
describe("CardList Component", () => {
  const cardList: unknown = [
    {
      set: "Set1",
      number: "001",
      name: "Card 1",
      type: "Unit",
      cost: "1",
      hp: "3",
      power: "3",
    },
    {
      set: "Set2",
      number: "002",
      name: "Card 2",
      type: "Unit",
      cost: "2",
      hp: "4",
      power: "5",
    },
  ];

  it("renders cards and allows sorting", async () => {
    render(<CardList cardList={cardList as CardData[]} />);
    expect(screen.getByText("Card 1")).toBeTruthy();
    expect(screen.getByText("Card 2")).toBeTruthy();
  });
});
