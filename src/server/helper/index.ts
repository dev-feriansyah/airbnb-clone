import { appRouter } from '@/server/api/root'
import superjson from 'superjson'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { prisma } from '@/server/db'

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
    transformer: superjson,
  })
