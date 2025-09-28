import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    try {
        const cleanUsername = decodeURIComponent(params.username).replace('@', '')
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/socials`, {
            headers: {
                "X-USER-ID": cleanUsername,
                "Authorization": ""
            }
        })
        const profile = await response.json()

        return {
            title: `@${profile.user.name}`,
            description: profile.bio ? profile.bio.slice(0, 160) : `View @${profile.user.name}'s profile on Warm`,
            openGraph: {
                title: `${profile.user.name} — Warm Profile`,
                description: profile.bio ? profile.bio.slice(0, 160) : `View @${profile.user.name}'s profile on Warm`,
                images: [
                    {
                        url: profile.profile_image || profile.user.avatar,
                        width: 1200,
                        height: 630,
                        alt: profile.user.name
                    }
                ]
            },
            twitter: {
                card: 'summary_large_image',
                title: `${profile.user.name}`,
                description: profile.bio ? profile.bio.slice(0, 160) : `View @${profile.user.name}'s profile on Warm`,
                images: [profile.profile_image || profile.user.avatar],
            }
        }
    } catch (error) {
        return {
            title: 'Profile — Warm',
            description: 'View profile on Warm'
        }
    }
} 