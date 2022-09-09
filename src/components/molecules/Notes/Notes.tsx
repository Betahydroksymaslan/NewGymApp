import { NotesWrapper } from "./Notes.style";
import Note from "components/atoms/Note/Note";

type NoteTypes = {
  notes: { message: string; date: number; id: string }[];
  pathSuffix: string;
};

const Notes = ({ notes, pathSuffix }: NoteTypes) => {
  const renderNotes = notes.map((item) => (
    <Note note={item} pathSuffix={pathSuffix} key={item.id} />
  ));

  return (
    <NotesWrapper>
      {renderNotes}
    </NotesWrapper>
  );
};

export default Notes;
