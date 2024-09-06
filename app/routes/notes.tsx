import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { NewNote } from '~/components/NewNote';
import NoteList from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

const NotesPage = () => {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes}/>
    </main>
  );
};

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const existingNotes = await getStoredNotes();
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
  const noteData = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect('/notes');
};

export default NotesPage;
