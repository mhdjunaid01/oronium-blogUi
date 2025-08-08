import { Suspense } from 'react'
import Header from '@/components/Header'
import PostsSection from '@/components/PostsSection'

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main">
        
        
        {/* Posts Sections */}
        <Suspense fallback={
          <div className="flex justify-center items-center py-12" role="status" aria-live="polite">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" aria-hidden="true"></div>
            <span className="sr-only">Loading posts...</span>
          </div>
        }>
          <PostsSection />
        </Suspense>
      </main>
    </div>
  )
}
