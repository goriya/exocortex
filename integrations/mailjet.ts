export type Message = {
  from: string
  to: string
  subject: string
  html: string
}

export const sendEmail = async (msg: Message) => {
  const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  )
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: msg.from,
          Name: "",
        },
        To: [
          {
            Email: msg.to,
            Name: "",
          },
        ],
        Subject: msg.subject,
        TextPart: "",
        HTMLPart: msg.html,
      },
    ],
  })
  request
    .then((result: { body: any }) => {
      console.log("result.body", result.body)
    })
    .catch((err: { statusCode: any }) => {
      console.log("err.statusCode", err.statusCode)
    })
  return true
}
