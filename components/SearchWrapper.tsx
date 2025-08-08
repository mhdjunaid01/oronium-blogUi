'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import SearchBar from './SearchBar'
import PostCard from './PostCard'

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => searchQuery ? api.searchPosts(searchQuery) : api.getPosts(),
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div role="search" aria-label="Search blog posts">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12" role="status" aria-live="polite">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" aria-hidden="true"></div>
          <span className="sr-only">Searching posts...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-12" role="alert">
          <p className="text-red-600">Error loading posts. Please try again.</p>
        </div>
      )}

      {!isLoading && !error && searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600" aria-live="polite">
            {posts.length} result{posts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && searchQuery && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <p className="text-gray-600">No posts found for &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Search results">
          {posts.map((post) => (
            <div key={post.id} role="listitem">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
