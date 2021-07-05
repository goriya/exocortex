import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetNotesInput
  extends Pick<Prisma.NoteFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetNotesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: notes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.note.count({ where }),
      query: (paginateArgs) => db.note.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      notes,
      nextPage,
      hasMore,
      count,
    }
  }
)
