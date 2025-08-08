import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { api } from '@/lib/api'
import Header from '@/components/Header'
import BlogPostContent from '@/components/BlogPostContent'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await api.getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category, 'blog', 'article', 'technology', 'design'],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://beyond-ui-blog.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: `Featured image for ${post.title}`,
        },
      ],
      authors: [post.author.name],
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://beyond-ui-blog.vercel.app/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await api.getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main">
        {/* Back Button */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="Back to blog homepage"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Blog</span>
          </Link>
        </nav>

        {/* Article */}
        <BlogPostContent post={post} />
      </main>
    </div>
  )
}
