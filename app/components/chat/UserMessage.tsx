import DOMPurify from 'dompurify';
const sanitizedContent = DOMPurify.sanitize(sanitizeUserMessage(content));
<Markdown limitedMarkdown>{sanitizedContent}</Markdown>