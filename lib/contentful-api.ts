import { client, previewClient, getClient } from './contentful-server'
import type { Entry, Asset } from 'contentful'
import type {
  IPageContent,
  ITeamMember,
  IBlogPost,
  IEvent,
  IMinistryActivity,
  ITestimonial,
  INavigationItem,
  ISiteSettings,
  ICategory,
  IEventCategory,
  IVolunteerOpportunity,
  IInvolvementOption,
  ITract,
  IChurch,
  IResource,
  INewsletter,
  IFAQ,
  ICoreBelief,
  IMissionVision,
  ICoreValue,
  ITimelineEvent,
  ICommunityStat,
  IDifferentiator,
  IHelpImpact,
  IPageHero,
  ContentfulEntry
} from '../types/contentful'

// API Configuration
interface ApiOptions {
  preview?: boolean
  limit?: number
  skip?: number
  order?: string
}

// Helper function to get the appropriate client with caching
function getClientWithCache(preview: boolean = false) {
  return getClient(preview)
}

// Helper function to process asset
export function processAsset(asset?: Asset): string | undefined {
  if (!asset || !asset.fields) return undefined
  return asset.fields.file?.url ? `https:${asset.fields.file.url}` : undefined
}

// Helper function to process entry fields
function processEntry<T>(entry: Entry<any>): T {
  return entry.fields as T
}

// Page Content API
export async function getPageContent(slug: string, options: ApiOptions = {}): Promise<IPageContent | null> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'pageContent',
      'fields.slug': slug,
      limit: 1,
      ...(options.preview ? {} : { next: { tags: ['pageContent', `pageContent-${slug}`] } })
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<IPageContent>(entries.items[0])
  } catch (error) {
    console.error('Error fetching page content:', error)
    return null
  }
}

export async function getAllPageContent(options: ApiOptions = {}): Promise<IPageContent[]> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'pageContent',
      limit: options.limit || 100,
      skip: options.skip || 0,
      ...(options.preview ? {} : { next: { tags: ['pageContent'] } })
    } as any)

    return entries.items.map(item => processEntry<IPageContent>(item))
  } catch (error) {
    console.error('Error fetching all page content:', error)
    return []
  }
}

// Team Members API
export async function getTeamMembers(options: ApiOptions = {}): Promise<ITeamMember[]> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'teamMember',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0,
      ...(options.preview ? {} : { next: { tags: ['teamMember'] } })
    } as any)

    return entries.items.map(item => processEntry<ITeamMember>(item))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getTeamMember(id: string, options: ApiOptions = {}): Promise<ITeamMember | null> {
  try {
    const entry = await getClient(options.preview).getEntry(id)
    return processEntry<ITeamMember>(entry)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return null
  }
}

// Blog Posts API
export async function getBlogPosts(options: ApiOptions = {}): Promise<IBlogPost[]> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'blogPost',
      'fields.isPublished': true,
      limit: options.limit || 10,
      skip: options.skip || 0,
      ...(options.preview ? {} : { next: { tags: ['blogPost'] } })
    } as any)

    return entries.items.map(item => processEntry<IBlogPost>(item))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string, options: ApiOptions = {}): Promise<IBlogPost | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      'fields.isPublished': true,
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<IBlogPost>(entries.items[0])
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getFeaturedBlogPosts(options: ApiOptions = {}): Promise<IBlogPost[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'blogPost',
      'fields.isPublished': true,
      'fields.isFeatured': true,
      limit: options.limit || 3
    } as any)

    return entries.items.map(item => processEntry<IBlogPost>(item))
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

// Events API
export async function getEvents(options: ApiOptions = {}): Promise<IEvent[]> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'event',
      'fields.isActive': true,
      limit: options.limit || 10,
      skip: options.skip || 0,
      ...(options.preview ? {} : { next: { tags: ['event'] } })
    } as any)

    return entries.items.map(item => processEntry<IEvent>(item))
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getUpcomingEvents(options: ApiOptions = {}): Promise<IEvent[]> {
  try {
    const now = new Date().toISOString()
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'event',
      'fields.isActive': true,
      'fields.date[gte]': now,
      limit: options.limit || 5,
      ...(options.preview ? {} : { next: { tags: ['event'] } })
    } as any)

    return entries.items.map(item => processEntry<IEvent>(item))
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

// Ministry Activities API
export async function getMinistryActivities(options: ApiOptions = {}): Promise<IMinistryActivity[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'ministryActivity',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IMinistryActivity>(item))
  } catch (error) {
    console.error('Error fetching ministry activities:', error)
    return []
  }
}

// Testimonials API
export async function getTestimonials(options: ApiOptions = {}): Promise<ITestimonial[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'testimonial',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ITestimonial>(item))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getHighlightedTestimonials(options: ApiOptions = {}): Promise<ITestimonial[]> {
  try {
    const entries = await getClientWithCache(options.preview).getEntries({
      content_type: 'testimonial',
      'fields.isActive': true,
      'fields.isHighlighted': true,
      limit: options.limit || 3,
      ...(options.preview ? {} : { next: { tags: ['testimonial'] } })
    } as any)

    return entries.items.map(item => processEntry<ITestimonial>(item))
  } catch (error) {
    console.error('Error fetching highlighted testimonials:', error)
    return []
  }
}

// Navigation API
export async function getNavigationItems(options: ApiOptions = {}): Promise<INavigationItem[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'navigationItem',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<INavigationItem>(item))
  } catch (error) {
    console.error('Error fetching navigation items:', error)
    return []
  }
}

// Site Settings API
export async function getSiteSettings(options: ApiOptions = {}): Promise<ISiteSettings | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'siteSettings',
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<ISiteSettings>(entries.items[0])
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Categories API
export async function getCategories(options: ApiOptions = {}): Promise<ICategory[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'category',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ICategory>(item))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategory(slug: string, options: ApiOptions = {}): Promise<ICategory | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'category',
      'fields.slug': slug,
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<ICategory>(entries.items[0])
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

// Event Categories API
export async function getEventCategories(options: ApiOptions = {}): Promise<IEventCategory[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'eventCategory',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IEventCategory>(item))
  } catch (error) {
    console.error('Error fetching event categories:', error)
    return []
  }
}

// Volunteer Opportunities API
export async function getVolunteerOpportunities(options: ApiOptions = {}): Promise<IVolunteerOpportunity[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'volunteerOpportunity',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IVolunteerOpportunity>(item))
  } catch (error) {
    console.error('Error fetching volunteer opportunities:', error)
    return []
  }
}

export async function getPopularVolunteerOpportunities(options: ApiOptions = {}): Promise<IVolunteerOpportunity[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'volunteerOpportunity',
      'fields.isActive': true,
      'fields.isPopular': true,
      limit: options.limit || 6
    } as any)

    return entries.items.map(item => processEntry<IVolunteerOpportunity>(item))
  } catch (error) {
    console.error('Error fetching popular volunteer opportunities:', error)
    return []
  }
}

export async function getUrgentVolunteerOpportunities(options: ApiOptions = {}): Promise<IVolunteerOpportunity[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'volunteerOpportunity',
      'fields.isActive': true,
      'fields.isUrgent': true,
      limit: options.limit || 100
    } as any)

    return entries.items.map(item => processEntry<IVolunteerOpportunity>(item))
  } catch (error) {
    console.error('Error fetching urgent volunteer opportunities:', error)
    return []
  }
}

// Involvement Options API
export async function getInvolvementOptions(options: ApiOptions = {}): Promise<IInvolvementOption[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'involvementOption',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IInvolvementOption>(item))
  } catch (error) {
    console.error('Error fetching involvement options:', error)
    return []
  }
}

// Tracts API
export async function getTracts(options: ApiOptions = {}): Promise<ITract[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'tract',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ITract>(item))
  } catch (error) {
    console.error('Error fetching tracts:', error)
    return []
  }
}

export async function getPopularTracts(options: ApiOptions = {}): Promise<ITract[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'tract',
      'fields.isActive': true,
      'fields.isPopular': true,
      limit: options.limit || 6
    } as any)

    return entries.items.map(item => processEntry<ITract>(item))
  } catch (error) {
    console.error('Error fetching popular tracts:', error)
    return []
  }
}

// Churches API
export async function getChurches(options: ApiOptions = {}): Promise<IChurch[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'church',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IChurch>(item))
  } catch (error) {
    console.error('Error fetching churches:', error)
    return []
  }
}

export async function getFeaturedChurches(options: ApiOptions = {}): Promise<IChurch[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'church',
      'fields.isActive': true,
      'fields.isFeatured': true,
      limit: options.limit || 10
    } as any)

    return entries.items.map(item => processEntry<IChurch>(item))
  } catch (error) {
    console.error('Error fetching featured churches:', error)
    return []
  }
}

// Resources API
export async function getResources(options: ApiOptions = {}): Promise<IResource[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'resource',
      'fields.isPublic': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IResource>(item))
  } catch (error) {
    console.error('Error fetching resources:', error)
    return []
  }
}

export async function getFeaturedResources(options: ApiOptions = {}): Promise<IResource[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'resource',
      'fields.isPublic': true,
      'fields.isFeatured': true,
      limit: options.limit || 6
    } as any)

    return entries.items.map(item => processEntry<IResource>(item))
  } catch (error) {
    console.error('Error fetching featured resources:', error)
    return []
  }
}

export async function getResourcesByFormat(format: string, options: ApiOptions = {}): Promise<IResource[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'resource',
      'fields.isPublic': true,
      'fields.format': format,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IResource>(item))
  } catch (error) {
    console.error('Error fetching resources by format:', error)
    return []
  }
}

// Newsletter API
export async function getNewsletterConfig(options: ApiOptions = {}): Promise<INewsletter | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'newsletter',
      'fields.isActive': true,
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<INewsletter>(entries.items[0])
  } catch (error) {
    console.error('Error fetching newsletter config:', error)
    return null
  }
}

// FAQ API
export async function getFAQs(options: ApiOptions = {}): Promise<IFAQ[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'faq',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IFAQ>(item))
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export async function getFAQsByCategory(categoryId: string, options: ApiOptions = {}): Promise<IFAQ[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'faq',
      'fields.isActive': true,
      'fields.category.sys.id': categoryId,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IFAQ>(item))
  } catch (error) {
    console.error('Error fetching FAQs by category:', error)
    return []
  }
}

// Core Beliefs API
export async function getCoreBeliefs(options: ApiOptions = {}): Promise<ICoreBelief[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'coreBelief',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ICoreBelief>(item))
  } catch (error) {
    console.error('Error fetching core beliefs:', error)
    return []
  }
}

// Mission & Vision API
export async function getMissionVision(options: ApiOptions = {}): Promise<IMissionVision[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'missionVision',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IMissionVision>(item))
  } catch (error) {
    console.error('Error fetching mission & vision:', error)
    return []
  }
}

export async function getMissionVisionByType(type: string, options: ApiOptions = {}): Promise<IMissionVision | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'missionVision',
      'fields.isActive': true,
      'fields.type': type,
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<IMissionVision>(entries.items[0])
  } catch (error) {
    console.error(`Error fetching ${type}:`, error)
    return null
  }
}

// Core Values API
export async function getCoreValues(options: ApiOptions = {}): Promise<ICoreValue[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'coreValue',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ICoreValue>(item))
  } catch (error) {
    console.error('Error fetching core values:', error)
    return []
  }
}

// Timeline Events API
export async function getTimelineEvents(options: ApiOptions = {}): Promise<ITimelineEvent[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'timelineEvent',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ITimelineEvent>(item))
  } catch (error) {
    console.error('Error fetching timeline events:', error)
    return []
  }
}

// Community Stats API
export async function getCommunityStats(options: ApiOptions = {}): Promise<ICommunityStat[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'communityStat',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<ICommunityStat>(item))
  } catch (error) {
    console.error('Error fetching community stats:', error)
    return []
  }
}

// Differentiators API
export async function getDifferentiators(options: ApiOptions = {}): Promise<IDifferentiator[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'differentiator',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IDifferentiator>(item))
  } catch (error) {
    console.error('Error fetching differentiators:', error)
    return []
  }
}

// Help Impact API
export async function getHelpImpact(options: ApiOptions = {}): Promise<IHelpImpact[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'helpImpact',
      'fields.isActive': true,
      order: 'fields.order',
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IHelpImpact>(item))
  } catch (error) {
    console.error('Error fetching help impact:', error)
    return []
  }
}

// Page Hero API
export async function getPageHero(pageName: string, options: ApiOptions = {}): Promise<IPageHero | null> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'pageHero',
      'fields.isActive': true,
      'fields.pageName': pageName,
      limit: 1
    } as any)

    if (entries.items.length === 0) return null
    return processEntry<IPageHero>(entries.items[0])
  } catch (error) {
    console.error(`Error fetching page hero for ${pageName}:`, error)
    return null
  }
}

export async function getAllPageHeroes(options: ApiOptions = {}): Promise<IPageHero[]> {
  try {
    const entries = await getClient(options.preview).getEntries({
      content_type: 'pageHero',
      'fields.isActive': true,
      limit: options.limit || 100,
      skip: options.skip || 0
    } as any)

    return entries.items.map(item => processEntry<IPageHero>(item))
  } catch (error) {
    console.error('Error fetching page heroes:', error)
    return []
  }
}

// Search API
export async function searchContent(query: string, contentType?: string, options: ApiOptions = {}): Promise<any[]> {
  try {
    const searchParams: any = {
      query,
      limit: options.limit || 20,
      skip: options.skip || 0
    }

    if (contentType) {
      searchParams.content_type = contentType
    }

    const entries = await getClient(options.preview).getEntries(searchParams)
    return entries.items.map(item => processEntry<any>(item))
  } catch (error) {
    console.error('Error searching content:', error)
    return []
  }
}

// Bulk content fetchers for static generation
export async function getAllContentForStaticGeneration() {
  try {
    const [
      pageContent,
      blogPosts,
      events,
      teamMembers,
      ministryActivities,
      testimonials,
      volunteerOpportunities,
      involvementOptions,
      tracts,
      churches,
      resources,
      categories,
      eventCategories,
      navigationItems,
      siteSettings,
      newsletter,
      faqs
    ] = await Promise.allSettled([
      getAllPageContent(),
      getBlogPosts({ limit: 1000 }),
      getEvents({ limit: 1000 }),
      getTeamMembers(),
      getMinistryActivities(),
      getTestimonials(),
      getVolunteerOpportunities(),
      getInvolvementOptions(),
      getTracts(),
      getChurches(),
      getResources(),
      getCategories(),
      getEventCategories(),
      getNavigationItems(),
      getSiteSettings(),
      getNewsletterConfig(),
      getFAQs()
    ])

    return {
      pageContent: pageContent.status === 'fulfilled' ? pageContent.value : [],
      blogPosts: blogPosts.status === 'fulfilled' ? blogPosts.value : [],
      events: events.status === 'fulfilled' ? events.value : [],
      teamMembers: teamMembers.status === 'fulfilled' ? teamMembers.value : [],
      ministryActivities: ministryActivities.status === 'fulfilled' ? ministryActivities.value : [],
      testimonials: testimonials.status === 'fulfilled' ? testimonials.value : [],
      volunteerOpportunities: volunteerOpportunities.status === 'fulfilled' ? volunteerOpportunities.value : [],
      involvementOptions: involvementOptions.status === 'fulfilled' ? involvementOptions.value : [],
      tracts: tracts.status === 'fulfilled' ? tracts.value : [],
      churches: churches.status === 'fulfilled' ? churches.value : [],
      resources: resources.status === 'fulfilled' ? resources.value : [],
      categories: categories.status === 'fulfilled' ? categories.value : [],
      eventCategories: eventCategories.status === 'fulfilled' ? eventCategories.value : [],
      navigationItems: navigationItems.status === 'fulfilled' ? navigationItems.value : [],
      siteSettings: siteSettings.status === 'fulfilled' ? siteSettings.value : null,
      newsletter: newsletter.status === 'fulfilled' ? newsletter.value : null,
      faqs: faqs.status === 'fulfilled' ? faqs.value : []
    }
  } catch (error) {
    console.error('Error fetching all content for static generation:', error)
    throw error
  }
}