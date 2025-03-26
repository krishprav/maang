// app/InterviewContent.tsx
"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState, useEffect, useCallback } from 'react'
import { GlassButton } from './components/ui/Glass'
import { FiArrowRight } from 'react-icons/fi'
import AIResponse from './components/AIResponse'
import type { Language } from './components/AIResponse'

export default function InterviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("C++")

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) return
    
    setLoading(true)
    setResponse('')
    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: q,
          language: selectedLanguage
        })
      })
      
      if (!res.ok) throw new Error('API request failed')
      
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error('Search failed:', error)
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed to generate response'}`)
    } finally {
      setLoading(false)
    }
  }, [selectedLanguage])

  useEffect(() => {
    const urlQuestion = searchParams.get('question')
    if (urlQuestion) {
      const decodedQuestion = decodeURIComponent(urlQuestion)
      setQuestion(decodedQuestion)
      handleSearch(decodedQuestion)
    }
  }, [searchParams, handleSearch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const encodedQuestion = encodeURIComponent(question)
    router.push(`/?question=${encodedQuestion}`)
    if (question.trim()) handleSearch(question)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 group">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-800 rounded-xl px-6 py-4
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600
                   focus:border-transparent transition-all duration-200 hover:border-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Ask an interview question..."
          disabled={loading}
        />
        <GlassButton 
          type="submit" 
          disabled={loading || !question.trim()}
          className="px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700
                    transition-all duration-200 disabled:hover:scale-100
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiArrowRight className="w-5 h-5" />
        </GlassButton>
      </form>

      <AIResponse 
        response={response} 
        loading={loading}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </>
  )
}