// app/page.tsx
import { Suspense } from 'react'
import InterviewContent from './InterviewContent'

export default function InterviewPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Suspense fallback={<div>Loading...</div>}>
        <InterviewContent />
      </Suspense>
    </div>
  )
}