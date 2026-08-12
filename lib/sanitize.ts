import createDOMPurify from 'isomorphic-dompurify';

// Server & client-safe HTML sanitizer. Protects against XSS from admin-edited
// rich-text (blog content, custom head/body scripts are NOT passed here).
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return '';
  try {
    const clean = createDOMPurify.sanitize(dirty, {
      USE_PROFILES: { html: true },
      // Allow the tags used by the blog rich-text editor
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'a', 'img',
        'code', 'pre', 'span', 'div', 'hr',
      ],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'class'],
      ALLOW_DATA_ATTR: false,
    });
    return clean as string;
  } catch (e) {
    console.error('Sanitize error, returning safe empty string', e);
    return '';
  }
}
