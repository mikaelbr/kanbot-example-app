import { useEffect, useState } from "react";
import { AddBookForm } from "./components/AddBookForm";
import { BookList } from "./components/BookList";
import {
	addBook,
	type Filter,
	filterBooks,
	removeBook,
	toggleRead,
} from "./lib/books";
import { loadBooks, saveBooks } from "./lib/storage";

const FILTERS: Filter[] = ["all", "unread", "read"];

export function App() {
	const [books, setBooks] = useState(loadBooks);
	const [filter, setFilter] = useState<Filter>("all");

	useEffect(() => saveBooks(books), [books]);

	return (
		<main>
			<h1>Reading list</h1>
			<AddBookForm onAdd={(t, a) => setBooks((bs) => addBook(bs, t, a))} />
			<fieldset>
				<legend>Show</legend>
				{FILTERS.map((f) => (
					<button
						key={f}
						type="button"
						aria-pressed={filter === f}
						onClick={() => setFilter(f)}
					>
						{f}
					</button>
				))}
			</fieldset>
			<BookList
				books={filterBooks(books, filter)}
				onToggle={(id) => setBooks((bs) => toggleRead(bs, id))}
				onRemove={(id) => setBooks((bs) => removeBook(bs, id))}
			/>
		</main>
	);
}
