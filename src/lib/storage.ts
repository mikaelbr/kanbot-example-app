import type { Book } from "./books";

const KEY = "reading-list";

export function loadBooks(): Book[] {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? "[]");
	} catch {
		return [];
	}
}

export function saveBooks(books: Book[]) {
	localStorage.setItem(KEY, JSON.stringify(books));
}
