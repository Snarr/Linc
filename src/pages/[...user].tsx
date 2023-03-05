import { useRouter } from 'next/router'
import { Prisma, PrismaClient } from '@prisma/client'
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
    return { props: { profile } }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default function UserPage({ profile }: { profile: Prisma.profilesSelect}) {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <>
      <h1>{profile.handle}</h1>
      <h2>{profile.bio}</h2>
    </>
  )
}