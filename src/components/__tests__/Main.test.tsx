import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as api from "../../api/api"
import App from "../../../App"

jest.mock("../../api/api");

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe("App Page", () => {
    beforeEach(() => {
        AsyncStorage.clear();
        jest.clearAllMocks();

        const cardList = [
            {
                set: "Set1",
                number: "001",
                name: "Card 2",
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

    //   fit("renders cards and allows sorting", async () => {
    //     render(<App />);

    //     // Wait for loading state
    //     await waitFor(() => {
    //       expect(screen.getByText(/Loading cards.../i)).toBeTruthy();
    //     })

    //     // Wait for cards to load
    //     //         await waitFor(() => {
    //     //           expect(screen.getByText("Card 1")).toBeTruthy();
    //     //           expect(screen.getByText("Card 2")).toBeTruthy();
    //     //         });
    //   });

    //   it("displays loading and error states", async () => {
    //     const errorMessage = "Error: An error occurred";
    //     jest.spyOn(api, "searchCards").mockRejectedValue(new Error(errorMessage));
    //     render(<CardList cardList={cardList}/>);

    //     expect(screen.getByText(/Loading cards.../i)).toBeTruthy();

    //     await waitFor(() => {
    //       expect(screen.getByText(errorMessage)).toBeTruthy();
    //     });
    //   });
});
