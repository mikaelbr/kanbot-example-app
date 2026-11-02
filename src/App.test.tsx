import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

async function add(title: string) {
	await userEvent.type(screen.getByLabelText("Title"), title);
	await userEvent.click(screen.getByRole("button", { name: "Add" }));
}

describe("App", () => {
	test("adds a book and keeps it after reload", async () => {
		const { unmount } = render(<App />);
		await add("Dune");
		expect(screen.getByText("Dune")).toBeInTheDocument();
		unmount();
		render(<App />);
		expect(screen.getByText("Dune")).toBeInTheDocument();
	});

	test("shows an error for an empty title", async () => {
		render(<App />);
		await userEvent.click(screen.getByRole("button", { name: "Add" }));
		expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
	});

	test("filters unread books", async () => {
		render(<App />);
		await add("Dune");
		await userEvent.click(screen.getByRole("checkbox"));
		await userEvent.click(screen.getByRole("button", { name: "unread" }));
		expect(screen.getByText("No books here yet.")).toBeInTheDocument();
	});
});
