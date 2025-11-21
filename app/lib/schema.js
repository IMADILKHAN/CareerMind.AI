import z from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select your industry.",
  }),

  subIndustry: z.string({
    required_error: "Please choose your specialization or sub-industry.",
  }),

  bio: z
    .string()
    .max(500, "Your bio must be 500 characters or fewer.")
    .optional(),

  experience: z
    .string({
      required_error: "Please enter your years of experience.",
    })
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number({
          invalid_type_error: "Experience must be a number.",
        })
        .min(0, "Experience cannot be negative.")
        .max(30, "Experience cannot exceed 30 years.")
    ),

  skills: z
    .string()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : []
    )
    .optional(),
});
