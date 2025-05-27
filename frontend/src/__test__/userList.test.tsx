import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/UserList";
import { UserProvider } from "../context/UserContext";

// Mock the userApi module
jest.mock("../services/api", () => ({
    userApi: {
        getAllUsers: jest.fn(),
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        updateUser: jest.fn(),
    },
}));

const mockUsers = [
    { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", age: 25 },
    { id: 2, firstName: "Bob", lastName: "Jones", email: "bob@example.com", age: 30 },
];

// Helper to render with UserProvider
function renderWithProvider(ui: React.ReactElement) {
    return render(<UserProvider>{ui}</UserProvider>);
}

describe("UserList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders users from API", async () => {
        const { userApi } = require("../services/api");
        userApi.getAllUsers.mockResolvedValueOnce(mockUsers);

        renderWithProvider(<UserList />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for users to be rendered
        await waitFor(() => {
            expect(screen.getByText("Alice Smith")).toBeInTheDocument();
            expect(screen.getByText("Bob Jones")).toBeInTheDocument();
        });
    });

    test("shows error if fetching users fails", async () => {
        const { userApi } = require("../services/api");
        userApi.getAllUsers.mockRejectedValueOnce(new Error("API error"));

        renderWithProvider(<UserList />);
        await waitFor(() => {
            expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
        });
    });

    test("can create a new user", async () => {
        const { userApi } = require("../services/api");
        userApi.getAllUsers.mockResolvedValueOnce([]); // Initial load
        userApi.createUser.mockResolvedValueOnce({});
        userApi.getAllUsers.mockResolvedValueOnce([
            { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", age: 22 },
        ]); // After creation

        renderWithProvider(<UserList />);
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "Charlie" } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Brown" } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "charlie@example.com" } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: "22" } });

        fireEvent.click(screen.getByRole("button", { name: /create user/i }));

        await waitFor(() => {
            expect(userApi.createUser).toHaveBeenCalled();
            expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
        });
    });

    test("shows error if creating user fails", async () => {
        const { userApi } = require("../services/api");
        userApi.getAllUsers.mockResolvedValueOnce([]);
        userApi.createUser.mockRejectedValueOnce(new Error("API error"));

        renderWithProvider(<UserList />);
        await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "User" } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: "20" } });

        fireEvent.click(screen.getByRole("button", { name: /create user/i }));

        await waitFor(() => {
            expect(screen.getByText(/failed to create user/i)).toBeInTheDocument();
        });
    });
});