import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="px-4 py-12 mx-auto bg-blue-900 max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <Form
        className="px-8 pt-6 pb-8 mb-4 bg-red-600"
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          name="email"
          label="Email"
          placeholder="Email"
        />
        <LabeledTextField
          className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>
      <div>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-5 text-base font-medium bg-gray-900 border border-transparent rounded-md text-white-600 hover:bg-gray-100"
        >
          <Link href={Routes.ForgotPasswordPage()}>
            <a className="w-32 p-2 text-red-600 rounded-full hover:textColor-red-700">
              Forgot your password?
            </a>
          </Link>
        </a>

        <div className="inline-flex items-center justify-center px-8 py-8 text-base font-medium bg-red-600 border border-transparent rounded-md text-white-600 hover:bg-gray-100">
          <a className="w-32 p-2 text-gray-900 rounded-full hover:textColor-red-700">
            <h1>
              <Link href={Routes.SignupPage()}>Sign Up here</Link>
            </h1>
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
