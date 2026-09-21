import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z
    .string({ message: 'Message is required' })
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long (max 2000 characters)')
    .trim(),
  // Accept 'en', 'ny', or undefined — default to 'en'
  language: z
    .union([z.literal('en'), z.literal('ny')])
    .optional()
    .default('en'),
  // Accept boolean or stringified boolean from some clients
  demoMode: z
    .union([z.boolean(), z.string().transform((v) => v === 'true')])
    .optional()
    .default(false),
  sessionId: z.string().optional(),
});

export type ValidatedChatRequest = z.infer<typeof ChatRequestSchema>;

export function validateChatRequest(body: unknown): {
  success: boolean;
  data?: ValidatedChatRequest;
  error?: string;
} {
  if (!body || typeof body !== 'object') {
    return { success: false, error: 'Request body must be a JSON object' };
  }

  const result = ChatRequestSchema.safeParse(body);
  if (!result.success) {
    // Zod v4 uses .issues, not .errors
    const messages = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'field'}: ${issue.message}`)
      .join('; ');
    return { success: false, error: messages || 'Validation failed' };
  }
  return { success: true, data: result.data };
}
