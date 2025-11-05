import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import Navbar from './navbar'

export default async function NavbarServer() {
	const session = await getServerSession(authOptions)
	return <Navbar session={session} />
}
