import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getNote from "app/notes/queries/getNote"
import deleteNote from "app/notes/mutations/deleteNote"

export const Note = () => {
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [deleteNoteMutation] = useMutation(deleteNote)
  const [note] = useQuery(getNote, { id: noteId })

  return (
    <>
      <Head>
        <title>Note {note.id}</title>
      </Head>

      <div>
        <h1>Note {note.id}</h1>
        <pre>{JSON.stringify(note, null, 2)}</pre>

        <Link href={Routes.EditNotePage({ noteId: note.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteNoteMutation({ id: note.id })
              router.push(Routes.NotesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowNotePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.NotesPage()}>
          <a>Notes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Note />
      </Suspense>
    </div>
  )
}

ShowNotePage.authenticate = true
ShowNotePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowNotePage
