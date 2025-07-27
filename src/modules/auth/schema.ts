import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  // NOTE: in login dont do any validation but you can do it in register
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // [username].store.com
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(63, "Username must be below 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or a number."
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});
