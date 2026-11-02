import type { Book } from "../lib/books";

type Props = {
	books: Book[];
	onToggle: (id: string) => void;
	onRemove: (id: string) => void;
};

export function BookList({ books, onToggle, onRemove }: Props) {
	if (!books.length) return <p>No books here yet.</p>;
	return (
		<ul>
			{books.map((b) => (
				<li key={b.id}>
					<label>
						<input
							type="checkbox"
							checked={b.read}
							onChange={() => onToggle(b.id)}
						/>
						{b.title}
						{b.author && ` by ${b.author}`}
					</label>
					<button
						type="button"
						onClick={() => onRemove(b.id)}
						aria-label={`Remove ${b.title}`}
					>
						Remove
					</button>
				</li>
			))}
		</ul>
	);
}
