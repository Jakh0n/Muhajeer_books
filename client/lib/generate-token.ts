'use server'

import jwt from 'jsonwebtoken'

export const generateToken = async (userId?: string) => {
	const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET

	if (!secret) {
		throw new Error('JWT_SECRET is not configured')
	}

	const token = jwt.sign({ userId }, secret, {
		expiresIn: '1m',
	})
	return token
}
