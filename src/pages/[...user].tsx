import prisma from '@/util/Prisma'
import { Profile, Link } from '.prisma/client'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import LinkButton from '@/components/LinkButton'
import ProfileName from '@/components/ProfileName'
import BioTag from '@/components/BioTag'

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const userHandle = query.user as string
  const token = req.headers.AUTHORIZATION

  try {
    // console.log(`User Handle: ${userHandle}`)
    const profile = await prisma.profile.findFirstOrThrow({
      where: {
        handle: userHandle[0]
      }
    })
    profile.created_at = null;

    const links = await prisma.link.findMany({
      where: {
        profile_id: profile.id
      }
    })

    // Ugly hack; Can't pass Date object over Server Side Props, set .created_at to null
    return { props: { profile, links } }
  } catch (error) {
    // console.log(error)
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default function UserPage({ profile, links }: { profile: Profile, links: Link[]}) {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-5 p-5 h-full max-w-screen-sm w-full">
        <ProfileName name={profile.name}/>
        <div className="flex items-center flex-wrap gap-3 justify-center">
          {profile.bio!.split(',').map(tag => <BioTag key={tag}>{tag.trim()}</BioTag>)}
        </div>
        {links.map((link) => <LinkButton key={link.id} data={link}/>)}
      </div>
    </>
  )
}