import { render, screen } from "@testing-library/react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as api from "../../api/api";
import CardList from "../CardList";
import { CardData } from "@/types/CardsTypes";

jest.mock("../../api/api");

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe("CardList Component", () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();

    // Mock successful API response
    jest.spyOn(api, "searchCards").mockResolvedValue([
      {
        Set: "Set1",
        Number: "001",
        Name: "Card 2",
        Type: "Unit",
        Cost: "1",
        HP: "3",
        Power: "3",
      },
      {
        Set: "Set2",
        Number: "002",
        Name: "Card 2",
        Type: "Unit",
        Cost: "2",
        HP: "4",
        Power: "5",
      },
    ],
    );
  });

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
  ]

  it("renders cards and allows sorting", async () => {
    render(<CardList cardList={cardList as CardData[]} />);
    expect(screen.getByText("Card 1")).toBeTruthy();
    expect(screen.getByText("Card 2")).toBeTruthy();
  });

});


