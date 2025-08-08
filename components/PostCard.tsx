'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/blog'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  if (variant === 'compact') {
    return (
      <Link 
        href={`/blog/${post.slug}`} 
        className="flex items-center space-x-4 group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg p-2"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="flex-shrink-0">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link 
        href={`/blog/${post.slug}`} 
        className="block group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-xl overflow-hidden h-full"
        aria-label={`Read featured article: ${post.title}`}
      >
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full border border-purple-200 uppercase tracking-wide">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold text-white mt-3 leading-tight">
              {post.title}
            </h2>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="block group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-xl overflow-hidden"
      aria-label={`Read article: ${post.title}`}
    >
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-black group-hover:text-gray-600 transition-colors duration-200 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center space-x-3">
            <Image
              src={post.author.avatar}
              alt={`${post.author.name}'s profile picture`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
              sizes="32px"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {post.readTime}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
