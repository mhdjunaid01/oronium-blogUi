import { Post } from '@/types/blog'

// Mock data for development
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Unlocking Business Efficiency with SaaS Solutions',
    description: 'Discover how modern SaaS solutions are transforming business operations and driving efficiency across industries.',
    content: 'Full content here...',
    category: 'Business',
    author: {
      name: 'Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    publishedAt: '2024-01-15',
    slug: 'unlocking-business-efficiency-with-saas-solutions'
  },
  {
    id: '2',
    title: 'Revolutionizing industries through SaaS implementation',
    description: 'How SaaS platforms are reshaping traditional business models and creating new opportunities.',
    content: 'Full content here...',
    category: 'Technology',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    publishedAt: '2024-01-14',
    slug: 'revolutionizing-industries-through-saas-implementation'
  },
  {
    id: '3',
    title: 'Mastering UI Elements: A Practical Guide for Designers',
    description: 'Essential UI design principles and practical tips for creating user-friendly interfaces.',
    content: 'Full content here...',
    category: 'Design',
    author: {
      name: 'Jennifer Taylor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    publishedAt: '2024-01-13',
    slug: 'mastering-ui-elements-a-practical-guide-for-designers'
  },
  {
    id: '4',
    title: 'The Future of Remote Work: Tools and Strategies',
    description: 'Exploring the latest tools and strategies for effective remote work collaboration.',
    content: 'Full content here...',
    category: 'Work',
    author: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    publishedAt: '2024-01-12',
    slug: 'the-future-of-remote-work-tools-and-strategies'
  },
  {
    id: '5',
    title: 'Digital Transformation in Healthcare',
    description: 'How technology is revolutionizing healthcare delivery and patient care.',
    content: 'Full content here...',
    category: 'Healthcare',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    publishedAt: '2024-01-11',
    slug: 'digital-transformation-in-healthcare'
  },
  {
    id: '6',
    title: 'Sustainable Technology: Green Solutions for the Future',
    description: 'Exploring eco-friendly technology solutions and their impact on environmental sustainability.',
    content: 'Full content here...',
    category: 'Sustainability',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    publishedAt: '2024-01-10',
    slug: 'sustainable-technology-green-solutions-for-the-future'
  }
]

export const api = {
  async getPosts(): Promise<Post[]> {
    try {
      // In production, this would be a real API call
      // const response = await axios.get(`${API_BASE_URL}/posts`)
      // return response.data
      
      // For now, return mock data
      return mockPosts
    } catch (error) {
      console.error('Error fetching posts:', error)
      return mockPosts
    }
  },

  async getPost(slug: string): Promise<Post | null> {
    try {
      // In production, this would be a real API call
      // const response = await axios.get(`${API_BASE_URL}/posts/${slug}`)
      // return response.data
      
      // For now, return mock data
      const post = mockPosts.find(p => p.slug === slug)
      return post || null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },

  async searchPosts(query: string): Promise<Post[]> {
    try {
      const posts = await this.getPosts()
      const lowercaseQuery = query.toLowerCase()
      
      const results = posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.description.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery)
      )
      
      return results
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  }
}
