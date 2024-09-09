import { Link } from '@remix-run/react';
import styles from './NoteList.css';

function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <Link key={note.id} to={`/notes/${note.id}`} className="note">
          <li >
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
