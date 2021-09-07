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
    <div className="grid grid-cols-7 bg-gray-500">
      <Form
        className="col-start-4 col-end-6"
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
      <Link href={Routes.ForgotPasswordPage()}>
        <a className="col-start-5 col-end-6">Forgot your password?</a>
      </Link>
      <a className="col-start-5 col-end-6">
        <h1>
          <Link href={Routes.SignupPage()}>Sign Up here</Link>
        </h1>
      </a>
    </div>
  )
}

export default LoginForm
