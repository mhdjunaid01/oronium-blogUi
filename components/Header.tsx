'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import SearchBar from './SearchBar'
import PostCard from './PostCard'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['search-posts', searchQuery],
    queryFn: () => api.searchPosts(searchQuery),
    enabled: searchQuery.length > 0, // Only run query when there's a search query
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })

  const handleSearch = (query: string) => {
    // Add a small delay when clearing to prevent flickering
    if (!query.trim()) {
      setTimeout(() => {
        setSearchQuery('')
      }, 100)
    } else {
      setSearchQuery(query)
    }
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg p-1">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn.dribbble.com/users/18489024/avatars/normal/4194f06fe3b975903f66b0f31adf47ce.png?1702911795"
                    alt="Beyond UI Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-semibold text-black">Beyond UI</span>
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Navigation */}
            <nav 
              className="hidden xl:flex items-center space-x-6" 
              role="navigation" 
              aria-label="Main navigation"
            >
              <Link 
                href="/" 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                Homepage
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                About us
              </Link>
              <Link 
                href="/features" 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                Features
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                Contact us
              </Link>
            </nav>

            {/* Buttons */}
            <div className="hidden xl:flex items-center space-x-4">
              <button 
                className="px-6 py-2 text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label="View demo"
              >
                Demo
              </button>
              <button 
                className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Get started with Beyond UI"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="xl:hidden bg-cyan-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden py-4">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div 
              id="mobile-menu"
              className="xl:hidden border-t border-gray-200"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
                  onClick={closeMenu}
                >
                  Homepage
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
                  onClick={closeMenu}
                >
                  About us
                </Link>
                <Link
                  href="/features"
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
                  onClick={closeMenu}
                >
                  Features
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
                  onClick={closeMenu}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
                  onClick={closeMenu}
                >
                  Contact us
                </Link>
                <div className="pt-4 space-y-2">
                  <button 
                    className="w-full px-3 py-2 text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    aria-label="View demo"
                  >
                    Demo
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    aria-label="Get started with Beyond UI"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Results */}
      {searchQuery && (
        <div className="bg-white border-b border-gray-100 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">Search Results</h2>
              <span className="text-sm text-gray-500">
                {isLoading ? 'Searching...' : `${posts.length} result${posts.length !== 1 ? 's' : ''} found`}
              </span>
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            )}

            {!isLoading && (
              <div>
                <p className="text-gray-600 mb-4">
                  Showing results for &quot;{searchQuery}&quot;
                </p>
                
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No posts found for &quot;{searchQuery}&quot;</p>
                    <p className="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
