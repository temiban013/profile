// docs/seo-guidelines.md

# SEO Best Practices for Portfolio

## Image Accessibility

### Alt Text Requirements

- **All images must have appropriate alt text**
- Alt text should be descriptive and convey the meaning of the image
- Avoid generic alt text like "image" or "picture"
- Don't start alt text with "Image of..." or "Picture of..."
- Keep alt text concise (generally under 125 characters)
- For decorative images, use empty alt text (`alt=""`) but be explicit in code

### Examples of Good Alt Text:

- ✅ "Mario Ayala sonriendo en un ambiente de oficina profesional"
- ✅ "Captura de pantalla del dashboard del proyecto Yukayeke"
- ✅ "Logo de Mario Ayala con las iniciales MRA"

### Examples of Bad Alt Text:

- ❌ "Image"
- ❌ "Screenshot"
- ❌ "Image of person"
- ❌ "Picture of my project"

## External Links

### Requirements

- All external links must include `rel="noopener noreferrer"`
- External links should have descriptive text (avoid "click here")
- Consider adding `aria-label` for improved accessibility
- Links to files should include file type and size when possible
- Use the `ExternalLink` component for consistency

### Examples:

```jsx
// Good
<ExternalLink href="https://github.com/temiban013" ariaLabel="Ver perfil de GitHub">
  Ver código fuente
</ExternalLink>

// Bad
<a href="https://github.com/temiban013">Click here</a>
```
