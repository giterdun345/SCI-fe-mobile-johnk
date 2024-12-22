import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";

import { fetchCatalog } from "../../api/api";
import Dropdown from "../Dropdown";

jest.mock("../../api/api", () => ({
  fetchCatalog: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockedFetchCatalog = fetchCatalog as jest.MockedFunction<
  typeof fetchCatalog
>;

describe("Dropdown Component", () => {
  const mockOnSelect = jest.fn();
  const mockOptions = ["HP1", "HP2", "HP3"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state initially", async () => {
    mockedFetchCatalog.mockImplementation(() => new Promise(() => { }));
    render(<Dropdown onSelect={mockOnSelect} />);
    const loadingIndicator = screen.getByAccessibilityHint("loading");
    expect(loadingIndicator).toBeTruthy();
  });

  it("displays error alert when API fails", async () => {
    const expectedErrorMessage = "An error occurred";
    mockedFetchCatalog.mockRejectedValueOnce(new Error(expectedErrorMessage));
    const { findByText } = render(<Dropdown onSelect={mockOnSelect} />);
    const errorMessage = await findByText(`Error: ${expectedErrorMessage}`); // TODO: maybe not hard code Error:
    expect(errorMessage).toBeTruthy();
  });

  it("renders options and handles selection", async () => {
    mockedFetchCatalog.mockResolvedValueOnce({
      data: mockOptions, object: "catalog",
      uri: "https://api.swu-db.com/catalog/hps",
      total_values: 3
    });
    render(<Dropdown onSelect={mockOnSelect} />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeFalsy();
    });

    const picker = screen.getByTestId("picker");
    fireEvent(picker, "valueChange", "HP1");
    expect(mockOnSelect).toHaveBeenCalledWith("HP1");
  });
});
