import type { Post } from "@/types/blog";
import { blogCategories } from "@/types/blog";

const articleMarkdownContent = `
## The Enduring Power of Forgiveness

In our journey of faith, few concepts are as central and as challenging as forgiveness. It is a theme woven throughout Scripture, a cornerstone of Christ's teachings, and a daily practice that has the power to liberate our spirits from bitterness and restore broken relationships. But what does it truly mean to forgive, and how can we cultivate a heart of forgiveness in a world so often marked by hurt and injustice?

### A Divine Command and a Human Struggle

The Bible is unequivocal in its call to forgive. In Matthew 6:14-15, Jesus tells us plainly, "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins." This is a profound and sobering command. It links our ability to receive God's grace directly to our willingness to extend it to others.

Yet, as humans, we know this is easier said than done. The wounds inflicted by others can run deep, leaving scars that impact our emotions, our relationships, and our perception of the world. Forgiveness can feel like an impossible task, especially when the hurt is severe or the offender is unrepentant.

> "To forgive is to set a prisoner free and discover that the prisoner was you." — Lewis B. Smedes

This powerful quote encapsulates the true essence of forgiveness. It is not primarily a gift to the offender, but a gift to ourselves. It is the act of releasing the heavy burden of anger and resentment that binds us to the past.

### Practical Steps on the Path to Forgiveness

While forgiveness is a spiritual act, it often requires practical, intentional steps. Here are a few to consider on your journey:

1.  **Acknowledge the Pain:** Before you can forgive, you must be honest about the hurt you have experienced. Suppressing or denying your feelings will only prolong the struggle. Bring your pain to God in prayer, and be honest with yourself about its impact.
2.  **Make a Conscious Choice:** Forgiveness is a decision, not an emotion. You may not *feel* like forgiving someone, but you can *choose* to. This act of will is the first step toward aligning your heart with God's command.
3.  **Seek to Understand, Not to Excuse:** Empathy can be a powerful tool. Trying to understand the perspective or struggles of the person who hurt you can soften your heart. This does not mean excusing their behavior, but it can help you see them as a flawed human being in need of grace, just as we all are.
4.  **Lean on God and Community:** You do not have to walk this path alone. Surround yourself with a supportive community of believers who can encourage you and pray for you. Most importantly, lean on the power of the Holy Spirit to do in you what you cannot do on your own.

### A Continuous Journey

Forgiveness is rarely a one-time event. It is often a journey, a process of returning to the cross again and again, laying down our hurt and choosing to walk in freedom. As we do, we not only experience the liberating power of grace in our own lives but also become a more radiant reflection of Christ to the world around us.
`;

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Enduring Power of Forgiveness in Our Daily Lives',
    excerpt: 'Explore the profound impact of forgiveness, how it liberates the spirit, and practical steps to cultivate a forgiving heart in a challenging world.',
    content: articleMarkdownContent,
    author: { name: 'Pastor John' },
    date: 'July 26, 2024',
    category: 'Faith & Doctrine',
    imageUrl: '/worship-conference.jpeg',
    href: '/blog/power-of-forgiveness'
  },
  {
      id: '2',
      title: 'Recap: Our Annual Summer Community Outreach Success',
      excerpt: 'A heartfelt thank you to all our volunteers! See the highlights from our recent outreach event and the positive change we made together in our city.',
      content: articleMarkdownContent,
      author: { name: 'Community Team' },
      date: 'July 22, 2024',
      category: 'Community & Outreach',
      imageUrl: '/Church-Conference.jpg',
      href: '/blog/summer-outreach-recap'
  },
  {
      id: '3',
      title: 'New Sermon Series Announcement: "Foundations of Faith"',
      excerpt: "Join us this Sunday as we kick off a new sermon series exploring the core tenets of our faith. Perfect for new believers and seasoned members alike.",
      content: articleMarkdownContent,
      author: { name: 'Pastor John' },
      date: 'July 19, 2024',
      category: 'Sermons & Series',
      imageUrl: '/worship-conference.jpeg',
      href: '/blog/foundations-of-faith-series'
  },
  {
    id: '4',
    title: 'How to Get Involved: A Guide to Our Church Ministries',
    excerpt: 'Looking for a place to serve? This guide breaks down all our ministries, from the welcome team to the youth group, helping you find your perfect fit.',
    content: articleMarkdownContent,
    author: { name: 'Admin Team' },
    date: 'July 15, 2024',
    category: 'Church Life',
    imageUrl: '/Church-Conference.jpg',
    href: '/blog/guide-to-ministries'
  },
  {
    id: '5',
    title: 'A Testimony of Healing and Renewed Hope',
    excerpt: "Read an inspiring story from one of our members who found healing and strength through faith and the support of our church family during a difficult time.",
    content: articleMarkdownContent,
    author: { name: 'Jane Doe' },
    date: 'July 12, 2024',
    category: 'Testimonies',
    imageUrl: '/worship-conference.jpeg',
    href: '/blog/healing-testimony'
  },
  {
    id: '6',
    title: 'Understanding the Deep Meaning of Communion',
    excerpt: "This month's doctrinal deep dive focuses on the sacrament of Communion. Learn about its historical roots and its significance in our worship today.",
    content: articleMarkdownContent,
    author: { name: 'Elder Mark' },
    date: 'July 8, 2024',
    category: 'Faith & Doctrine',
    imageUrl: '/Church-Conference.jpg',
    href: '/blog/meaning-of-communion'
  }
];

export const categories = blogCategories; 