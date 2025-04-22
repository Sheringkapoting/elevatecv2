
import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  jobTitle: z.string().optional(),
  bio: z.string().max(500, { message: "Bio must be 500 characters or less" }).optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
});

export type SecurityFormValues = z.infer<typeof securityFormSchema>;
