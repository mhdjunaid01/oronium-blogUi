'use client'

import Image from 'next/image'
import { Post } from '@/types/blog'

interface BlogPostContentProps {
  post: Post
}

// Helper function to format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "image": post.author.avatar
    },
    "publisher": {
      "@type": "Organization",
      "name": "Beyond UI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.dribbble.com/users/18489024/avatars/normal/4194f06fe3b975903f66b0f31adf47ce.png?1702911795"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://beyond-ui-blog.vercel.app/blog/${post.slug}`
    }
  }

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <article className="bg-white rounded-xl shadow-sm overflow-hidden" itemScope itemType="https://schema.org/BlogPosting">
        {/* Hero Image */}
        <div className="relative h-96">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Article Content */}
        <div className="p-8">
          {/* Category and Title */}
          <div className="mb-6">
            <span 
              className="inline-block px-3 py-1 bg-black text-white text-sm font-medium rounded-full uppercase tracking-wide mb-4"
              itemProp="articleSection"
            >
              {post.category}
            </span>
            <h1 
              className="text-3xl font-bold text-black leading-tight"
              itemProp="headline"
            >
              {post.title}
            </h1>
          </div>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
            <Image
              src={post.author.avatar}
              alt={`${post.author.name}'s profile picture`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
              itemProp="author"
            />
            <div>
              <p className="font-medium text-black" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{post.author.name}</span>
              </p>
              <p className="text-sm text-gray-500">
                <span itemProp="readTime">{post.readTime}</span> • 
                <time itemProp="datePublished" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </p>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none" itemProp="articleBody">
            <p className="text-gray-600 leading-relaxed mb-6">
              {post.description}
            </p>
            <div className="text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Article metadata for accessibility */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>
                <strong>Category:</strong> {post.category}
              </span>
              <span>
                <strong>Reading time:</strong> {post.readTime}
              </span>
              <span>
                <strong>Published:</strong> {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
