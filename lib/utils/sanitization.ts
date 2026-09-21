export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export function truncateInput(input: string, maxLength = 2000): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength);
}

export function sanitizeForLog(input: string): string {
  return '[MESSAGE CONTENT REDACTED]';
}
