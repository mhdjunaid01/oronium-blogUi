'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
  const [query, setQuery] = useState('')

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only call onSearch if there's a query
      if (query.trim()) {
        onSearch(query.trim())
      }
      // Don't call onSearch with empty string - let the parent component handle clearing
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // If user clears the input, immediately clear the search
    if (!value.trim()) {
      onSearch('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (query.trim()) {
        onSearch(query.trim())
      } else {
        onSearch('')
      }
    }
  }

  return (
    <div className="relative w-fit" role="search">
      <label htmlFor="search-input" className="sr-only">
        Search posts
      </label>
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        aria-hidden="true"
      />
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full text-black pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
        aria-describedby="search-description"
        aria-label="Search for blog posts"
        autoComplete="off"
      />
      <div id="search-description" className="sr-only">
        Type to search for blog posts. Press Enter to search immediately.
      </div>
    </div>
  )
}
