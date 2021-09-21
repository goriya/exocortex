import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <a className="grid justify-items-center bg-white-900">
        <Link href={Routes.SignupPage()}>
          <a className="px-20 py-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            <center>Sign Up</center>
          </a>
        </Link>

        <Link href={Routes.LoginPage()}>
          <a className="px-20 py-5 font-bold text-white bg-red-500 rounded hover:bg-red-700">
            <center>Login</center>
          </a>
        </Link>
      </a>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="bg-green-600">
      <a className="content-center h-40 text-5xl">
        <center>Exocortex</center>
      </a>
      <a className="content-center h-40 text-2xl">
        <center>Collect and organize your thoughts</center>
      </a>
      <Suspense fallback="Loading">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
