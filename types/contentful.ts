import { Entry, Asset, EntrySkeletonType } from 'contentful'

// Base interfaces for Contentful fields
export interface IPageContent {
  title: string
  subtitle?: string
  description?: string
  heroImage?: Asset
  backgroundImage?: Asset
  slug: string
  seoTitle?: string
  seoDescription?: string
  ctaText?: string
  ctaUrl?: string
}

export interface ITeamMember {
  name: string
  role: string
  department: string
  bio: string
  specialties: string[]
  yearsOfService: number
  education?: string
  email?: string
  phone?: string
  profileImage?: Asset
  favoriteVerse?: string
  order: number
  isActive: boolean
}

export interface IBlogPost {
  title: string
  slug: string
  excerpt: string
  content: any // Rich text
  author?: Entry<ITeamMemberSkeleton>
  publishDate: string
  category?: Entry<ICategorySkeleton>
  featuredImage?: Asset
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  isFeatured: boolean
}

export interface IEvent {
  title: string
  description: string
  date: string
  startDate: string
  time?: string
  location?: string
  category?: Entry<IEventCategorySkeleton>
  featuredImage?: Asset
  registrationUrl?: string
  maxAttendees?: number
  isRecurring: boolean
  recurringPattern?: string
  isActive: boolean
  attendees?: number
  isFeatured?: boolean
  tags?: string[]
}

export interface IMinistryActivity {
  title: string
  description: string
  icon: string
  ctaText?: string
  ctaUrl?: string
  order: number
  isActive: boolean
  featuredImage?: Asset
  detailedDescription?: any // Rich text
}

export interface ITestimonial {
  name: string
  role: string
  quote: string
  image?: Asset
  volunteeredSince?: string
  favoriteActivity?: string
  isActive: boolean
  order: number
  isHighlighted: boolean
}

export interface INavigationItem {
  label: string
  href: string
  icon?: string
  description?: string
  parentMenu?: Entry<INavigationItemSkeleton>
  children?: Entry<INavigationItemSkeleton>[]
  order: number
  isActive: boolean
  isExternal: boolean
}

export interface ISiteSettings {
  siteName: string
  logoImage?: Asset
  contactPhone?: string
  contactEmail?: string
  emergencyPhone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  socialMediaLinks?: Array<{
    platform: string
    href: string
    ariaLabel: string
  }>
  footerText?: string
  serviceTimes?: Array<{
    name: string
    time: string
    day?: string
  }>
  officeHours?: string
  missionStatement?: string
}

export interface ICategory {
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  order?: number
}

export interface IEventCategory {
  name: string
  slug: string
  icon?: string
  color?: string
  description?: string
}

export interface IVolunteerOpportunity {
  title: string
  description: string
  shortDescription?: string
  icon?: string
  timeCommitment?: string
  location: string // remote, onsite, hybrid
  skillLevel: string // beginner, intermediate, advanced, any
  category: string
  requirements?: string[]
  benefits?: string[]
  tags?: string[]
  isPopular: boolean
  isUrgent: boolean
  isActive: boolean
  contactEmail?: string
}

export interface IInvolvementOption {
  title: string
  description: string
  href: string
  icon?: string
  bgColor?: string
  textColor?: string
  order: number
  isActive: boolean
  featuredImage?: Asset
}

export interface ITract {
  title: string
  description: string
  coverImage?: Asset
  tags?: string[]
  samplePages?: Asset[]
  pricePer100: number
  isPopular: boolean
  language: string
  author?: string
  pages?: number
  isActive: boolean
}

export interface IChurch {
  name: string
  address: {
    street: string
    city: string
    state: string
    postcode?: string
    country: string
  }
  coordinates?: {
    lat: number
    lng: number
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
  services?: {
    sunday?: string
    wednesday?: string
    other?: string[]
  }
  pastor?: string
  denomination?: string
  image?: Asset
  description?: string
  website?: string
  isFeatured: boolean
  isActive: boolean
}

export interface IResource {
  title: string
  description: string
  format: string // Article, Video, Podcast, Guide
  image?: Asset
  href?: string
  file?: Asset
  tags?: string[]
  category?: Entry<ICategorySkeleton>
  author?: Entry<ITeamMemberSkeleton>
  publishDate?: string
  isPublic: boolean
  isFeatured: boolean
  duration?: string
}

export interface INewsletter {
  title: string
  subtitle?: string
  backgroundImage?: Asset
  placeholder?: string
  buttonLabel?: string
  isActive: boolean
}

// New content types interfaces
export interface ICoreBelief {
  title: string
  subtitle?: string
  description?: string
  scriptureReference?: string
  icon?: string
  order?: number
  isActive?: boolean
}

export interface IMissionVision {
  type: 'mission' | 'vision' | 'purpose' | 'calling'
  title: string
  content: string
  scriptureReference?: string
  icon?: string
  isActive?: boolean
}

export interface ICoreValue {
  title: string
  description: string
  scriptureReference?: string
  icon?: string
  order?: number
  isActive?: boolean
}

export interface ITimelineEvent {
  year: string
  title: string
  description: string
  image?: Asset
  category?: 'founding' | 'growth' | 'milestone' | 'ministry' | 'community' | 'outreach'
  order?: number
  isActive?: boolean
}

export interface ICommunityStat {
  label: string
  value: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

export interface IDifferentiator {
  title: string
  description: string
  icon?: string
  image?: Asset
  order?: number
  isActive?: boolean
}

export interface IHelpImpact {
  title: string
  description: string
  percentage?: number
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

export interface IPageHero {
  pageName: string
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: Asset
  ctaText?: string
  ctaUrl?: string
  isActive?: boolean
}

export interface IFAQ {
  question: string
  answer: any // Rich text
  category?: Entry<ICategorySkeleton>
  order?: number
  isActive: boolean
  relatedPages?: string[]
}

// Helper types for API responses
export type ContentfulEntry<T = any> = Entry<any>
export type ContentfulAsset = Asset
export type ContentfulEntries<T = any> = { items: Entry<any>[] }

// Utility type for optional contentful fields
export type ContentfulFields<T> = {
  [K in keyof T]?: T[K]
}

// Contentful Skeleton Types
export interface IPageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageContent'
  fields: IPageContent
}

export interface ITeamMemberSkeleton extends EntrySkeletonType {
  contentTypeId: 'teamMember'
  fields: ITeamMember
}

export interface IBlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost'
  fields: IBlogPost
}

export interface IEventSkeleton extends EntrySkeletonType {
  contentTypeId: 'event'
  fields: IEvent
}

export interface IMinistryActivitySkeleton extends EntrySkeletonType {
  contentTypeId: 'ministryActivity'
  fields: IMinistryActivity
}

export interface ITestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: 'testimonial'
  fields: ITestimonial
}

export interface INavigationItemSkeleton extends EntrySkeletonType {
  contentTypeId: 'navigationItem'
  fields: INavigationItem
}

export interface ISiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: 'siteSettings'
  fields: ISiteSettings
}

export interface ICategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'category'
  fields: ICategory
}

export interface IEventCategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'eventCategory'
  fields: IEventCategory
}

export interface IVolunteerOpportunitySkeleton extends EntrySkeletonType {
  contentTypeId: 'volunteerOpportunity'
  fields: IVolunteerOpportunity
}

export interface IInvolvementOptionSkeleton extends EntrySkeletonType {
  contentTypeId: 'involvementOption'
  fields: IInvolvementOption
}

export interface ITractSkeleton extends EntrySkeletonType {
  contentTypeId: 'tract'
  fields: ITract
}

export interface IChurchSkeleton extends EntrySkeletonType {
  contentTypeId: 'church'
  fields: IChurch
}

export interface IResourceSkeleton extends EntrySkeletonType {
  contentTypeId: 'resource'
  fields: IResource
}

export interface INewsletterSkeleton extends EntrySkeletonType {
  contentTypeId: 'newsletter'
  fields: INewsletter
}

export interface IFAQSkeleton extends EntrySkeletonType {
  contentTypeId: 'faq'
  fields: IFAQ
}

// New content types skeletons
export interface ICoreBeliefSkeleton extends EntrySkeletonType {
  contentTypeId: 'coreBelief'
  fields: ICoreBelief
}

export interface IMissionVisionSkeleton extends EntrySkeletonType {
  contentTypeId: 'missionVision'
  fields: IMissionVision
}

export interface ICoreValueSkeleton extends EntrySkeletonType {
  contentTypeId: 'coreValue'
  fields: ICoreValue
}

export interface ITimelineEventSkeleton extends EntrySkeletonType {
  contentTypeId: 'timelineEvent'
  fields: ITimelineEvent
}

export interface ICommunityStatSkeleton extends EntrySkeletonType {
  contentTypeId: 'communityStat'
  fields: ICommunityStat
}

export interface IDifferentiatorSkeleton extends EntrySkeletonType {
  contentTypeId: 'differentiator'
  fields: IDifferentiator
}

export interface IHelpImpactSkeleton extends EntrySkeletonType {
  contentTypeId: 'helpImpact'
  fields: IHelpImpact
}

export interface IPageHeroSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageHero'
  fields: IPageHero
}