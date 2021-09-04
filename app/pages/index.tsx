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
    <div className="bg-blue-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-gray-900">Exocortex</span>
          <span className="block text-red-600">collect your thoughts</span>
        </h2>
        <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-red-600 border border-transparent rounded-md text-white-600 hover:bg-gray-100"
            >
              <Link href={Routes.SignupPage()}>
                <a>
                  {" "}
                  <a className="w-32 p-2 text-gray-900 rounded-full hover:textColor-red-700">
                    <strong>sign up</strong>
                  </a>
                </a>
              </Link>
            </a>
          </div>
          <div className="inline-flex ml-3 rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-red-600 border border-transparent rounded-md text-white-600 hover:bg-gray-100"
            >
              <>
                <Link href={Routes.LoginPage()}>
                  <a>
                    {" "}
                    <a className="w-32 p-2 text-gray-900 rounded-full hover:textColor-red-700">
                      <strong>login</strong>
                    </a>
                  </a>
                </Link>
              </>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
