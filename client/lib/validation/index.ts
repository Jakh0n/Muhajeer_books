import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const verifyOtpSchema = z.object({
	otp: z.string().length(6, { message: 'OTP must be 6 characters' }),
	email: z.string().email({ message: 'Invalid' }),
})
export const otpSchema = z.object({
	otp: z.string().length(6, { message: 'OTP must be 6 characters' }),
})

export const registerSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: 'Full name must be at least 3 characters' }),
	email: z.string().email({ message: 'Invalid email' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
})

export const fullNameSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: 'Full name must be at least 3 characters' }),
})

export const emailSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
})

export const productSchema = z.object({
	title: z.string().min(3, { message: 'Name must be at least 3 characters' }),
	price: z.string(),
	description: z
		.string()
		.min(10, { message: 'Description must be at least 10 characters' }),
	category: z.string(),
	image: z.string(),
	imageKey: z.string(),
})

export const updateProductSchema = z
	.object({ id: z.string() })
	.merge(productSchema)

export const idSchema = z.object({ id: z.string() })

export const passwordSchema = z
	.object({
		oldPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		newPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
export const searchParamsSchema = z.object({
	searchQuery: z.string().optional(),
	filter: z.string().optional(),
	category: z.string().optional(),
	page: z.string().default('1'),
	pageSize: z.string().default('8'),
})
export const updateUserSchema = z.object({
	fullName: z.string().optional(),
	email: z.string().optional(),
	avatar: z.string().optional(),
	avatarKey: z.string().optional(),
	isDeleted: z.boolean().optional(),
	deletedAt: z.date().optional(),
})
export const updateStatusSchema = z
	.object({ status: z.string() })
	.merge(idSchema)

export const contactSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak" }),
	phone: z.string().min(9, { message: "Telefon raqamni to'g'ri kiriting" }),
	address: z.string().min(5, { message: "Manzilni to'liqroq kiriting" }),
	bookTitle: z.string().min(2, { message: 'Kitob nomini kiriting' }),
	message: z.string().optional(),
})
