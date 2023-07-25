import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/atoms'
import { cva } from 'class-variance-authority'
import { type IconName } from '@/components/atoms/Icon'
import { useState } from 'react'
import { type RouterOutputs, api } from '@/utils/api'

const HomeHeader = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center">
        <Link href="/" className="py-4">
          <Image
            src="/logo-small.png"
            width={32}
            height={32}
            alt="logo"
            className="lg:hidden"
          />
          <Image
            src="/logo.png"
            width={120}
            height={64}
            alt="logo"
            className="hidden lg:block"
          />
        </Link>
      </div>
    </header>
  )
}

const HomeFooter = () => {
  return (
    <footer className="sticky bottom-0 border-t bg-white">
      <div className="container flex items-center py-2">
        <p className="text-xs">
          @ 2023 this is cloned site from ·airbnb· by{' '}
          <Link href="https://github.com/dev-feriansyah" className="underline">
            💻 dev-feriansyah
          </Link>
        </p>
      </div>
    </footer>
  )
}

const HomeFilter = () => {
  const [fitlerActiveId, setFitlerActiveId] = useState('tiny-homes')

  const filterVariants = cva(
    'inline-flex flex-col items-center py-3 transition-all',
    {
      variants: {
        variant: {
          default:
            'text-muted-foreground hover:text-primary hover:border-b-2 hover:border-slate-900',
          active: 'border-b-2 border-slate-900 text-primary',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  )

  const filterItems = [
    { name: 'Tiny homes', icon: 'tv-2' as IconName, id: 'tiny-homes' },
    { name: 'Camping', icon: 'tent' as IconName, id: 'camping' },
  ]

  const onChangeFilter = (id: string) => {
    setFitlerActiveId(id)
  }

  return (
    <section className="py-2">
      <div className="flex  gap-x-8">
        {filterItems.map((filterItem) => (
          <button
            className={filterVariants({
              variant: `${
                fitlerActiveId === filterItem.id ? 'active' : 'default'
              }`,
            })}
            key={filterItem.id}
            onClick={() => onChangeFilter(filterItem.id)}
          >
            <Icon name={filterItem.icon} className="mb-1" />
            <span className="text-xs font-semibold">{filterItem.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

type Room = RouterOutputs['rooms']['getAll'][number]
const HomeRoomCard = ({ room }: { room: Room }) => {
  return (
    <Link href="#">
      <div className="relative mb-2 h-72 w-full">
        <Image
          src={room.imageUrl}
          fill
          alt="Tiny Homes"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-1 text-xs text-primary">
        <h5 className="font-semibold capitalize">
          {room.city}, {room.country}
        </h5>
        <span className="text-muted-foreground">{room.distance}</span>
        <span className="capitalize text-muted-foreground">
          {room.availableDate}
        </span>
        <span className="mt-1 font-semibold">
          {room.price} <span>{room.priceUnit}</span>
        </span>
      </div>
    </Link>
  )
}

const HomeRoomCards = () => {
  const { data: rooms, isLoading } = api.rooms.getAll.useQuery()

  if (isLoading) return <div>Loading...</div>
  if (!rooms) return <div>Something went wrong</div>

  return (
    <>
      {rooms.map((room) => (
        <HomeRoomCard key={room.id} room={room} />
      ))}
    </>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <HomeHeader />
      <main className="container flex-grow">
        <HomeFilter />
        <section className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <HomeRoomCards />
        </section>
      </main>
      <HomeFooter />
    </div>
  )
}
