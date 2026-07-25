import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { modificationsRegex } from '~/utils/diff';

interface UserMessageProps {
  content: string;
}

/**
 * UserMessage
 * - Strips diff modification markers, converts Markdown to HTML, and sanitizes
 *   the resulting HTML with DOMPurify to prevent XSS.
 * - Uses isomorphic-dompurify so this is safe on both server and client.
 */
export function UserMessage({ content }: UserMessageProps) {
  const sanitizedHtml = React.useMemo(() => {
    if (!content) return '';

    // Remove diff markers that are not part of the user's message
    const cleaned = content.replace(modificationsRegex, '').trim();

    // Convert markdown -> HTML
    const rawHtml = marked.parse(cleaned);

    // Sanitize produced HTML. Configure allowed tags if you want stricter policy.
    return DOMPurify.sanitize(rawHtml);
  }, [content]);

  return (
    <div className="overflow-hidden pt-[4px]">
      <div
        aria-label="User message"
        // Intentionally rendering sanitized HTML from user-supplied Markdown
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
}
