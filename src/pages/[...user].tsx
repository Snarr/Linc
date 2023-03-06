import { useRouter } from 'next/router'
import { Prisma, PrismaClient } from '@prisma/client'
import { links, profiles } from '.prisma/client'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const userHandle = query.user as string
  
  const prisma = new PrismaClient()
  const token = req.headers.AUTHORIZATION
  try {
    const profile = await prisma.profiles.findFirstOrThrow({
      where: {
        handle: userHandle[0]
      }
    })

    const links = await prisma.links.findMany({
      where: {
        owner_id: profile.id
      }
    })

    return { props: { profile, links } }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default function UserPage({ profile, links }: { profile: profiles, links: links[]}) {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <>
      <h1>{profile.handle}</h1>
      <h2>{profile.bio}</h2>
      <div className="flex justify-center items-center flex-col gap-2">
        {links.map((link) => {
          return (<a href={link.url} key={link.id} className="px-4 py-3 rounded-full bg-gray-700 text-center w-full max-w-screen-sm">
              {link.name}
          </a>)
        })}
      </div>
    </>
  )
}