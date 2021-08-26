import previewEmail from "preview-email"
import { sendEmail, Message } from "../integrations/mailjet"
import { origin } from "utils/env"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const resetUrl = `${origin}/reset-password?token=${token}`

  const msg: Message = {
    from: "no-reply@anothernode.com",
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        sendEmail(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
