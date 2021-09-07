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
    return Home
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="grid grid-cols-5 bg-gray-500">
      <div className="col-span-5 col-start-3">
        <strong>Exocortex</strong>
      </div>
      <div className="col-span-5 col-start-3">Store and organize your thoughts</div>
      <div className="col-span-5 col-start-3">
        <button className="px-8 py-4 mx-auto my-6 font-bold text-gray-800 transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:scale-105">
          <Link href={Routes.SignupPage()}>
            <a>
              {" "}
              <a className="w-32 p-2 text-gray-900 rounded-full hover:textColor-red-700">
                <strong>sign up</strong>
              </a>
            </a>
          </Link>
        </button>
        <button className="px-8 py-4 mx-auto my-6 font-bold text-gray-800 transition duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:scale-105">
          <Link href={Routes.LoginPage()}>
            <a>
              {" "}
              <a className="w-32 p-2 text-gray-900 rounded-full hover:textColor-red-700">
                <strong>login</strong>
              </a>
            </a>
          </Link>
        </button>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
