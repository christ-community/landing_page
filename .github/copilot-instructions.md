# GitHub Copilot Instructions for Christ Community Landing Page

## Project Overview
This is a Next.js 15.3.4 landing page for Christ Community, an interdenominational Christian community organization. The project uses TypeScript, Tailwind CSS, shadcn/ui components, and Contentful CMS for content management.

## Technology Stack
- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x with custom color scheme
- **UI Components**: shadcn/ui with Radix UI primitives
- **CMS**: Contentful for dynamic content
- **Email**: Nodemailer with SMTP
- **Payment**: Stripe integration
- **Maps**: Google Maps API
- **Package Manager**: npm

## Project Structure
```
/home/runner/work/landing_page/landing_page/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (home)/              # Home page group
│   │   ├── api/                 # API routes
│   │   ├── about/               # About pages
│   │   ├── contact/             # Contact page
│   │   ├── donate/              # Donation pages
│   │   ├── get-involved/        # Get involved pages
│   │   └── what-we-do/          # Services and events pages
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── chat/                # Chat integration components
│   ├── lib/                     # Utilities and services
│   │   ├── email.ts             # Email service with nodemailer
│   │   └── contentful-api.ts    # Contentful API client
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Helper functions
├── lib/                         # Additional libraries
│   └── contentful-server.ts     # Server-side Contentful utilities
├── scripts/                     # Build and setup scripts
├── public/                      # Static assets
└── components.json              # shadcn/ui configuration
```

## Custom Color Scheme
The project uses Christ Community's official brand colors:
- **Primary**: White - Used for primary elements, backgrounds, and text
- **Secondary**: Black - Used for contrast, headings, and secondary elements  
- **Tertiary**: Red - Used for accent elements, CTAs, and highlights

Use these semantic color classes in your code:
- `bg-primary`, `text-primary` (White)
- `bg-secondary`, `text-secondary` (Black)
- `bg-tertiary`, `text-tertiary` (Red)

## Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Define interfaces for all data structures
- Avoid `any` type - use proper typing or `unknown`
- Use named exports over default exports when possible
- Use `async/await` over raw promises

### React Components
- Prefer functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and focused (Single Responsibility)
- Extract reusable logic into custom hooks
- Use proper React Server Components (RSC) patterns in App Router

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Functions**: camelCase (e.g., `sendEmail`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SMTP_HOST`)
- **Interfaces/Types**: PascalCase with descriptive names

### API Routes
- Use Next.js 15 App Router API route handlers
- Always validate input data
- Use proper HTTP status codes
- Handle errors gracefully with try-catch
- Log important events for debugging
- Return JSON responses with consistent structure

### Environment Variables
Required environment variables:
- `CONTENTFUL_SPACE_ID` - Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful access token
- `CONTENTFUL_MANAGEMENT_TOKEN` - Contentful management token
- `SMTP_HOST` - SMTP server host (default: smtp.gmail.com)
- `SMTP_PORT` - SMTP server port (default: 587)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password
- `FROM_EMAIL` - Email sender address
- `CONTACT_EMAIL` - Email recipient for contact forms
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

## Email Service
The project includes a comprehensive email service (`src/lib/email.ts`) with:
- Nodemailer-based SMTP transport
- Template methods for different email types:
  - Contact form emails
  - Free Bible request emails
  - Send help/partnership emails
  - Tract order emails
  - Newsletter signup emails
- Automatic confirmation emails to users
- Team notification emails
- HTML email templates with responsive design

### Using the Email Service
```typescript
import emailService from '@/lib/email';

// Send contact form email
await emailService.sendContactFormEmail({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  inquiryType: 'General',
  subject: 'Question',
  message: 'Hello!'
});

// Send custom email
await emailService.sendEmail({
  to: 'recipient@example.com',
  subject: 'Subject',
  html: '<p>HTML content</p>'
});
```

## Contentful CMS Integration
- Content is fetched server-side using the Contentful API
- Content types include: Hero, Footer, Blog, Events, Consultation, etc.
- Use proper error handling for CMS failures
- Cache Contentful data appropriately
- Revalidate on webhook triggers

## Development Workflow

### Running the Project
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Creating New Pages
1. Create page in appropriate directory under `src/app/`
2. Use TypeScript with proper typing
3. Fetch Contentful data server-side if needed
4. Use existing UI components from `src/components/ui/`
5. Follow mobile-first responsive design
6. Test with different screen sizes

### Creating New API Routes
1. Create route.ts in `src/app/api/[route-name]/`
2. Export HTTP method handlers (GET, POST, etc.)
3. Validate input data
4. Use appropriate status codes
5. Handle errors with try-catch
6. Log important events

### Adding UI Components
- Use shadcn/ui CLI to add new components: `npx shadcn@latest add [component]`
- Components will be added to `src/components/ui/`
- Customize as needed while maintaining accessibility
- Follow existing component patterns

## Best Practices

### Performance
- Use Next.js Image component for images
- Implement proper lazy loading
- Minimize client-side JavaScript
- Use Server Components where possible
- Cache external API calls

### Accessibility
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper heading hierarchy
- Test with screen readers

### Security
- Never commit secrets to version control
- Validate all user inputs
- Sanitize email content to prevent injection
- Use environment variables for sensitive data
- Implement rate limiting for APIs where needed

### SEO
- Use proper metadata in layout.tsx
- Include descriptive titles and descriptions
- Use semantic HTML structure
- Implement proper heading hierarchy
- Add alt text to images

## Common Tasks

### Adding a New Email Template
1. Add interface for email data in `src/lib/email.ts`
2. Create method in EmailService class
3. Design HTML email template with inline styles
4. Send both team notification and user confirmation
5. Test with actual SMTP server

### Creating a New Form
1. Create form component with React Hook Form or native state
2. Add proper validation
3. Create API route handler
4. Connect to email service
5. Add error handling and success messages
6. Test form submission end-to-end

### Integrating Contentful Content
1. Define content type in Contentful
2. Add TypeScript interface in `src/types/`
3. Create fetch function in `lib/contentful-api.ts`
4. Use in page with server-side rendering
5. Handle loading and error states

## Terminology Guidelines
Christ Community is an **interdenominational Christian community** organization, not a church. When writing content or code comments:
- ✅ Use: "community", "gathering", "service", "fellowship"
- ❌ Avoid: "church" (except in specific contexts like "Find a Church" feature)
- Be inclusive and welcoming in tone
- Respect diverse denominational backgrounds

## Testing
- Test forms with various inputs
- Verify email delivery in development
- Check responsive design on multiple devices
- Test API routes with different scenarios
- Validate environment variable handling

## Deployment
- Project is deployed on Vercel
- Environment variables must be set in Vercel dashboard
- Contentful webhooks trigger revalidation
- Automatic deployments on git push
- Check build logs for errors

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Contentful API Documentation](https://www.contentful.com/developers/docs/)
- [Nodemailer Documentation](https://nodemailer.com/)

## Need Help?
- Check existing code patterns in the repository
- Review API route examples in `src/app/api/`
- Reference email templates in `src/lib/email.ts`
- Test locally before committing changes
- Ask for clarification on requirements
