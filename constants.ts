
import { Competitor, Post } from './types';

export const MOCK_COMPETITORS: Competitor[] = [
  { id: '1', name: 'BrandCorp', handle: '@brandcorp', avatarUrl: 'https://picsum.photos/seed/brandcorp/48/48', status: 'online' },
  { id: '2', name: 'Innovate Inc.', handle: '@innovateinc', avatarUrl: 'https://picsum.photos/seed/innovate/48/48', status: 'online' },
  { id: '3', name: 'Market Movers', handle: '@marketmovers', avatarUrl: 'https://picsum.photos/seed/market/48/48', status: 'offline' },
  { id: '4', name: 'Synergy Co', handle: '@synergyco', avatarUrl: 'https://picsum.photos/seed/synergy/48/48', status: 'online' },
  { id: '5', name: 'Future Forward', handle: '@futurefwd', avatarUrl: 'https://picsum.photos/seed/future/48/48', status: 'online' },
];

export const MOCK_POSTS: Post[] = [
  { id: 'p1', competitorId: '1', competitorName: 'BrandCorp', competitorAvatar: 'https://picsum.photos/seed/brandcorp/48/48', content: 'Excited to announce our new product line launching next month! Get ready for the future of tech. #Innovation #Tech', imageUrl: 'https://picsum.photos/seed/tech1/600/400', likes: 1200, comments: 85, timestamp: '2 hours ago' },
  { id: 'p2', competitorId: '2', competitorName: 'Innovate Inc.', competitorAvatar: 'https://picsum.photos/seed/innovate/48/48', content: 'Our Q3 earnings are out, and we\'ve exceeded all expectations. Thanks to our amazing team!', imageUrl: 'https://picsum.photos/seed/earnings/600/400', likes: 3400, comments: 230, timestamp: '5 hours ago' },
  { id: 'p3', competitorId: '4', competitorName: 'Synergy Co', competitorAvatar: 'https://picsum.photos/seed/synergy/48/48', content: 'Just wrapped up our annual company retreat. Feeling refreshed and inspired for what\'s next!', imageUrl: 'https://picsum.photos/seed/retreat/600/400', likes: 890, comments: 45, timestamp: '1 day ago' },
  { id: 'p4', competitorId: '1', competitorName: 'BrandCorp', competitorAvatar: 'https://picsum.photos/seed/brandcorp/48/48', content: 'Check out this behind-the-scenes look at how our products are made. Quality is our top priority.', imageUrl: 'https://picsum.photos/seed/factory/600/400', likes: 950, comments: 60, timestamp: '2 days ago' },
  { id: 'p5', competitorId: '5', competitorName: 'Future Forward', competitorAvatar: 'https://picsum.photos/seed/future/48/48', content: 'We are proud to be named one of the top workplaces of 2024! #CompanyCulture #BestPlacetoWork', imageUrl: 'https://picsum.photos/seed/workplace/600/400', likes: 2100, comments: 150, timestamp: '3 days ago' },
];

export const PRODUCT_DESCRIPTION_CONTEXT = `
You are a helpful assistant for a SaaS product that helps clients monitor their competitors. Here is a summary of the product:

1. Overview: The SaaS allows a client to register up to 10 competing profiles for continuous monitoring. The system sends WhatsApp notifications about new publications, generates a dashboard with history and reports, and offers tools for contact extraction/segmentation only when legally permitted (opt-in/consent).

2. User Flow:
   - Onboarding: User provides name, email, and phone (for WhatsApp).
   - Add Competitor: User adds up to 10 public profiles.
   - Configure Notifications: real-time, daily, or weekly summaries.
   - Dashboard: View recent posts, engagement, activity graphs, and a chronological feed.
   - Reports: Export CSV/PDF with metrics.

3. Key Features:
   - Post Monitor: Detects and alerts on new posts.
   - Dashboard: Comparative activity graphs.
   - WhatsApp Notifications: Via WhatsApp Business API.
   - Follower Extraction: Only when legally possible and authorized.

4. Technical Limitations:
   - Social media APIs (like Instagram/Facebook) restrict access to third-party follower lists. Direct scraping of competitor followers is generally not possible or violates terms of service.
   - Safe alternatives include using commercial social listening tools or encouraging direct opt-ins via landing pages.

5. Legal Compliance (LGPD):
   - Consent is registered and stored.
   - No messages are sent without opt-in.
   - Avoids aggressive data scraping.

Answer user questions based on this information. If the user asks a location-based question, use the available tools to provide an accurate answer.
`;
