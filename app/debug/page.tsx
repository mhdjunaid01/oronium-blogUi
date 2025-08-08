'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export default function DebugPage() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['debug-posts'],
    queryFn: () => api.getPosts(),
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-black mb-4">API Status</h2>
          <div className="space-y-2">
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
            <p><strong>Posts Count:</strong> {posts.length}</p>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Posts Data</h2>
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-black">{index + 1}. {post.title}</h3>
                  <p className="text-sm text-gray-600">{post.category} • {post.readTime}</p>
                  <p className="text-xs text-gray-500">{post.slug}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

