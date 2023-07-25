import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { helperCurrency } from '@/utils/number'

const getDistance = (distanceInMeters: number) => {
  return distanceInMeters / 1000 >= 1
    ? `${distanceInMeters / 1000} kilometers away`
    : `${distanceInMeters} meters away`
}

const getAvailableDate = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const startMonth = months[start.getMonth()]
  const startDay = start.getDate()
  const endMonth = months[end.getMonth()]
  const endDay = end.getDate()

  let formattedDateRange = `${startMonth} ${startDay}`

  if (startMonth !== endMonth) {
    formattedDateRange += ` - ${endMonth} ${endDay}`
  } else if (startDay !== endDay) {
    formattedDateRange += ` - ${endDay}`
  }

  return formattedDateRange
}

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const rooms = await ctx.prisma.room.findMany()

    return rooms.map((room) => {
      const distance = getDistance(room.distanceInMeters)

      const availableDate = getAvailableDate(
        room.availableStartDate,
        room.availableEndDate
      )

      return {
        id: room.id,
        city: room.city,
        country: room.country,
        distance,
        availableDate: availableDate,
        price: helperCurrency({ price: room.price }),
        priceUnit: room.priceUnit,
        imageUrl: room.imageUrl,
      }
    })
  }),
})
