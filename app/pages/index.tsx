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
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-gray-900">Exocortex</span>
          <span className="block text-red-600">collect your thoughts</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white-600 bg-gray-900 hover:bg-gray-100"
            >
              <Link href={Routes.SignupPage()}>
                <center>
                  {" "}
                  <a className=" text-red-600 p-2 w-32 rounded-full hover:textColor-red-700">
                    <strong>
                      <center>sign up</center>
                    </strong>
                  </a>
                </center>
              </Link>
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white-600 bg-red-600 hover:bg-gray-100"
            >
              <>
                <Link href={Routes.LoginPage()}>
                  <center>
                    {" "}
                    <a className=" text-gray-900 p-2 w-32 rounded-full hover:textColor-red-700">
                      <strong>
                        <center>login</center>
                      </strong>
                    </a>
                  </center>
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
