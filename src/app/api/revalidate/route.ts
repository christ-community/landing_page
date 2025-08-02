import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.WEBHOOK_SECRET}`
    
    if (!process.env.WEBHOOK_SECRET || authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Extract content type and entry ID from Contentful webhook payload
    const contentType = body.sys?.contentType?.sys?.id
    const entryId = body.sys?.id
    
    console.log('Revalidating content:', { contentType, entryId })
    
    // Revalidate specific content types
    if (contentType) {
      revalidateTag(contentType)
    }
    
    // Revalidate specific entry
    if (entryId) {
      revalidateTag(entryId)
    }
    
    // Revalidate common paths based on content type
    const pathsToRevalidate = getPathsForContentType(contentType)
    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }
    
    return NextResponse.json({
      message: 'Revalidation successful',
      contentType,
      entryId,
      revalidatedPaths: pathsToRevalidate
    })
    
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getPathsForContentType(contentType: string): string[] {
  const pathMap: Record<string, string[]> = {
    // Home page content
    pageContent: ['/'],
    siteSettings: ['/'],
    ministryActivity: ['/'],
    testimonial: ['/'],
    
    // About pages
    teamMember: ['/about', '/about/meet-the-team'],
    
    // Blog
    blogPost: ['/blog', '/what-we-do/blog'],
    
    // Events
    event: ['/', '/what-we-do/events-outreaches'],
    eventCategory: ['/what-we-do/events-outreaches'],
    
    // Get Involved
    volunteerOpportunity: ['/get-involved', '/get-involved/volunteer-with-us'],
    involvementOption: ['/get-involved'],
    church: ['/get-involved/find-a-church'],
    tract: ['/get-involved/order-a-tract'],
    
    // What We Do
    resource: ['/what-we-do/healing-lifting-resources'],
    
    // General
    category: ['/blog', '/what-we-do/blog'],
    newsletter: ['/'],
    faq: ['/contact'],
    navigationItem: ['/']
  }
  
  return pathMap[contentType] || ['/']
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Contentful webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}