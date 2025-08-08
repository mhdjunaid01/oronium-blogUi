'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import SearchBar from './SearchBar'
import PostCard from './PostCard'

export default function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => searchQuery ? api.searchPosts(searchQuery) : api.getPosts(),
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )}

      {!isLoading && searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600">
            {posts.length} result{posts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {!isLoading && posts.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

