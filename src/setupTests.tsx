import "@testing-library/jest-native/extend-expect";
import {View} from "react-native";

// Mock the Picker component
jest.mock("@react-native-picker/picker", () => {
    const MockPicker: React.FC<{ children?: React.ReactNode; selectedValue?: string; onValueChange: (value: string) => void; testID?: string }> = ({ children, selectedValue, onValueChange, testID }) => (
        <View testID={testID || "picker"}>
            <select
                value={selectedValue}
                onChange={(e) => onValueChange(e.target.value)}
            >
                {children}
            </select>
        </View>
    );

    const MockItem = ({ label, value }) => (
        <option value={value}>{label}</option>
    );

    return {
        Picker: MockPicker,
        Item: MockItem,
    };
});

// Mock Reanimated
jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");
    Reanimated.default.call = () => {
    };
    return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Silence console logs during tests
global.console = {
    ...console,
    // uncomment to ignore a specific log level
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    // warn: jest.fn(),
    // error: jest.fn(),
};