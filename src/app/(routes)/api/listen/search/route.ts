import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch(
        `https://listen.squareweb.app/search?query=${query}&key=${process.env.LISTEN_API_KEY}&userId=${session.user.id}`
    )
    const data = await response.json()
    return Response.json(data)
}