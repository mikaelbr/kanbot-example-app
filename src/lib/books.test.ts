import { addBook, filterBooks, removeBook, toggleRead } from "./books";

describe("books", () => {
	test("adds a trimmed, unread book", () => {
		const [book] = addBook([], "  Dune ", " Frank Herbert ");
		expect(book).toMatchObject({
			title: "Dune",
			author: "Frank Herbert",
			read: false,
		});
	});

	test("rejects an empty title", () => {
		expect(() => addBook([], "  ", "x")).toThrow("Title is required");
	});

	test("toggles and removes by id", () => {
		const books = addBook([], "Dune", "");
		const id = books[0].id;
		expect(toggleRead(books, id)[0].read).toBe(true);
		expect(removeBook(books, id)).toEqual([]);
	});

	test("filters by read state", () => {
		const books = toggleRead(addBook(addBook([], "A", ""), "B", ""), "nope");
		const read = toggleRead(books, books[0].id);
		expect(filterBooks(read, "read").map((b) => b.title)).toEqual(["A"]);
		expect(filterBooks(read, "unread").map((b) => b.title)).toEqual(["B"]);
		expect(filterBooks(read, "all")).toHaveLength(2);
	});
});
