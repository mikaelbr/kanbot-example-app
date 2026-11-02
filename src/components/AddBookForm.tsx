import { type FormEvent, useState } from "react";

type Props = { onAdd: (title: string, author: string) => void };

export function AddBookForm({ onAdd }: Props) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [error, setError] = useState("");

	function submit(e: FormEvent) {
		e.preventDefault();
		if (!title.trim()) return setError("Title is required");
		onAdd(title, author);
		setTitle("");
		setAuthor("");
		setError("");
	}

	return (
		<form onSubmit={submit} noValidate>
			<label>
				Title
				<input value={title} onChange={(e) => setTitle(e.target.value)} />
			</label>
			<label>
				Author
				<input value={author} onChange={(e) => setAuthor(e.target.value)} />
			</label>
			<button type="submit">Add</button>
			{error && <p role="alert">{error}</p>}
		</form>
	);
}
