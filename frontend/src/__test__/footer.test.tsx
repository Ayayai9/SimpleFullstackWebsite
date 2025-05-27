import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

describe("Footer", () => {
    test("renders footer text", () => {
        render(<Footer />);
        expect(screen.getByText(/my website\. all rights reserved\./i)).toBeInTheDocument();
    });

    test("has correct styles", () => {
        render(<Footer />);
        const footer = screen.getByRole("contentinfo");
        expect(footer).toHaveClass("w-full", "bg-gray-900", "text-white", "text-center", "py-4", "fixed", "bottom-0", "left-0", "z-50");
    });
});