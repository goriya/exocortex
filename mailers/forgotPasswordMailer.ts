import previewEmail from "preview-email"
import { sendEmail, Message } from "../integrations/mailjet"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
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
      console.log("NODE_ENV", process.env.NODE_ENV)
      if (process.env.NODE_ENV === "production") {
        sendEmail(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
