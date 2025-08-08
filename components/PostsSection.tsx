'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import PostCard from './PostCard'

export default function PostsSection() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" aria-hidden="true"></div>
        <span className="sr-only">Loading posts...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12" role="alert">
        <p className="text-red-600">Error loading posts. Please try again.</p>
        <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts available.</p>
      </div>
    )
  }

  // Get the first post as the hero post
  const heroPost = posts[0]
  const otherFeaturedPosts = posts.slice(1, 6)
  const recentPosts = posts.slice(0, 3)

  // Debug information (remove in production)
  console.log('Posts loaded:', posts.length)
  console.log('Hero post:', heroPost?.title)
  console.log('Other featured posts:', otherFeaturedPosts.length)
  console.log('Recent posts:', recentPosts.length)

  return (
    <>
      {/* Featured Posts Section */}
      <section aria-labelledby="featured-posts-heading" className="mb-6">
        <h2 id="featured-posts-heading" className="sr-only">Featured Posts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Hero Post */}
          <div className="lg:col-span-2">
            {heroPost && (
              <PostCard post={heroPost} variant="featured" />
            )}
          </div>

          {/* Other Featured Posts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black mb-4">
              Other featured posts
            </h3>
            <div className="space-y-4" role="list" aria-label="Other featured posts">
              {otherFeaturedPosts.map((post) => (
                <div key={post.id} role="listitem" className="border-b border-gray-200 pb-4 last:border-b-0">
                  <PostCard post={post} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section aria-labelledby="recent-posts-heading">
        <div className="flex justify-between items-center mb-4">
          <h2 id="recent-posts-heading" className="text-2xl font-bold text-black">
            Recent Posts
          </h2>
          <button 
            className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="View all posts"
          >
            All Posts
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Recent posts">
          {recentPosts.map((post) => (
            <div key={post.id} role="listitem">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
