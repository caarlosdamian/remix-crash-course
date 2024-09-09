import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { NewNote } from '~/components/NewNote';
import NoteList from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

const NotesPage = () => {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export async function loader({ request }: LoaderFunctionArgs) {
  const existingNotes = await getStoredNotes();
  if (!existingNotes || existingNotes.length === 0) {
    throw json(
      { message: 'you dont have any notes' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
    // throw new Response()
  }

  return json(existingNotes);
}

// none GET request
export const action = async ({ request }: ActionFunctionArgs) => {
  // if post request is made
  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content'),
  // }

  const noteData = Object.fromEntries(formData) as {
    title: string;
    content: string;
    id: string;
  };
  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters' };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  // await new Promise((resolved)=> setTimeout(()=>resolved),3000)
  return redirect('/notes');
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </main>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Error </title>
      </head>
      <body>
        <main className="error">
          <div id="h1">Error</div>
        </main>
      </body>
    </html>
  );
};

export default NotesPage;
