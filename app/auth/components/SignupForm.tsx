import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="grid grid-cols-5 bg-gray-500">
      <div className="col-span-5 col-start-3">Create an account</div>
      <Form
        className="col-start-3 col-end-4 px-8 pt-6 pb-8 mb-4"
        shadow-md
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Email"
          name="email"
          label="Email"
        />
        <LabeledTextField
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <LabeledTextField
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          name="accessCode"
          label="Access Code"
          placeholder="Access Code"
          type="password"
        />
      </Form>
    </div>
  )
}

export default SignupForm
