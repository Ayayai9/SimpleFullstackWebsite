import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header", () => {
    test("renders website title", () => {
        render(<Header />);
        expect(screen.getByText(/my website/i)).toBeInTheDocument();
    });

    test("has correct styles", () => {
        render(<Header />);
        const header = screen.getByRole("banner");
        expect(header).toHaveClass(
            "w-full",
            "bg-gray-900", // <-- match your component!
            "text-white",
            "text-center",
            "py-4",
            "fixed",
            "top-0",
            "left-0",
            "z-50",
            "flex",
            "justify-between",
            "items-center",
            "px-8",
            "shadow"
        );
    });
});