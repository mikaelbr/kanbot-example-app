export type Book = { id: string; title: string; author: string; read: boolean };

export type Filter = "all" | "unread" | "read";

export function addBook(books: Book[], title: string, author: string): Book[] {
	const t = title.trim();
	if (!t) throw new Error("Title is required");
	return [
		...books,
		{ id: crypto.randomUUID(), title: t, author: author.trim(), read: false },
	];
}

export function toggleRead(books: Book[], id: string): Book[] {
	return books.map((b) => (b.id === id ? { ...b, read: !b.read } : b));
}

export function removeBook(books: Book[], id: string): Book[] {
	return books.filter((b) => b.id !== id);
}

export function filterBooks(books: Book[], filter: Filter): Book[] {
	if (filter === "all") return books;
	return books.filter((b) => b.read === (filter === "read"));
}
