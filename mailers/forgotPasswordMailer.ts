import previewEmail from "preview-email"
import { sendEmail, Message } from "../integrations/mailjet"
import { origin } from "utils/env"

type ResetPasswordMailer = {
  to: string
  token: string
}

const text = (token: string) => `Reset Your Password

https://${origin}/reset-password?token=${token}`

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const msg: Message = {
    from: "no-reply@anothernode.com",
    to,
    subject: "Your Password Reset Instructions",
    text: text(token),
  }

  return {
    async send() {
      if (process.env.APP_ENV === "production") {
        sendEmail(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
