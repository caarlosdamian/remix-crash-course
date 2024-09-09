import { LoaderFunctionArgs } from '@remix-run/node';
import { json, Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';

import styles from '~/styles/note-details.css';

export async function loader({ params }: LoaderFunctionArgs) {
  const notes = await getStoredNotes();
  const note = notes.find((item) => item.id === params.noteId);

  if (!note) {
    throw json({ message: 'not found' });
  }
  return note;
}

export default function NoteDetailsPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
