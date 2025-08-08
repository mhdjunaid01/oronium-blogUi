export interface Post {
  id: string
  title: string
  description: string
  content: string
  category: string
  author: {
    name: string
    avatar: string
  }
  readTime: string
  image: string
  publishedAt: string
  slug: string
}

export interface BlogResponse {
  posts: Post[]
  total: number
}

