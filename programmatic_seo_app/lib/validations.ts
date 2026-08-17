import { z } from 'zod';

// Reusable phone regex (allows numbers, spaces, plus, minus, 7 to 15 chars)
const phoneRegex = /^[0-9+\-\s]{7,15}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(150, 'Name is too long.'),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email.').max(150, 'Email is too long.').optional().or(z.literal('')),
  service: z.string().trim().optional(),
  city: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export const popupEnquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(150, 'Name is too long.'),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number.'),
  service_interest: z.string().trim().max(100).optional(),
});

export const bookServiceSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(150, 'Name is too long.'),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email.').max(150, 'Email is too long.').optional().or(z.literal('')),
  service_name: z.string().trim().max(255).optional(),
  city: z.string().trim().min(1, 'City is required.').max(100),
  message: z.string().trim().optional(),
});

export const bookEquipmentSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(150, 'Name is too long.'),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email.').max(150, 'Email is too long.').optional().or(z.literal('')),
  equipment_id: z.coerce.number().int().optional().default(0),
  equipment_name: z.string().trim().max(255).optional(),
  rental_period: z.string().trim().max(100).optional(),
  message: z.string().trim().optional(),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export const addServiceSchema = z.object({
  title: z.string().trim().min(1, 'Service title is required.').max(255, 'Title is too long.'),
  description: z.string().trim().optional(),
  category: z.string().trim().max(100).optional(),
  // image file validation is handled manually in the route
});

export const addEquipmentSchema = z.object({
  title: z.string().trim().min(1, 'Equipment title is required.').max(255, 'Title is too long.'),
  description: z.string().trim().optional(),
  price: z.string().trim().max(100).optional(),
  // image file validation is handled manually in the route
});
