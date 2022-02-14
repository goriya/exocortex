-- AlterIndex
ALTER INDEX "Session_handle_key" RENAME TO "Session.handle_unique";

-- AlterIndex
ALTER INDEX "Token_hashedToken_type_key" RENAME TO "Token.hashedToken_type_unique";

-- AlterIndex
ALTER INDEX "User_email_key" RENAME TO "User.email_unique";
