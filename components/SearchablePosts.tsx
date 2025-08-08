'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import PostCard from './PostCard'

import { Post } from '@/types/blog'

interface SearchablePostsProps {
  initialPosts?: Post[]
  showSearchBar?: boolean
}

export default function SearchablePosts({ initialPosts = [] }: SearchablePostsProps) {
  const [searchQuery] = useState('')

  const { data: posts = initialPosts, isLoading, error } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => searchQuery ? api.searchPosts(searchQuery) : api.getPosts(),
    initialData: initialPosts,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading posts. Please try again.</p>
      </div>
    )
  }

  return (
    <div>
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600">
            {posts.length} result{posts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {posts.length === 0 && searchQuery ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
