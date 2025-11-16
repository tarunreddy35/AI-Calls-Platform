import { useState, useEffect } from 'react'
import { Phone, Brain, BarChart3, AlertCircle, Sparkles } from 'lucide-react'
import { CallCard } from './components/CallCard'
import { CallDetailsModal } from './components/CallDetailsModal'
import { AIAnalysisModal } from './components/AIAnalysisModal'
import { api } from './api'
import { CallSummary, CallMetadata, AIAnalysis, CallStats } from './types'

function App() {
  const [calls, setCalls] = useState<CallSummary[]>([])
  const [stats, setStats] = useState<CallStats | null>(null)
  const [selectedCall, setSelectedCall] = useState<CallMetadata | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzingCall, setAnalyzingCall] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiConfigured, setAiConfigured] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDirection, setFilterDirection] = useState<'all' | 'inbound' | 'outbound'>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [callsRes, statsRes, healthRes] = await Promise.all([
        api.getCalls(),
        api.getCallStats(),
        api.getHealth(),
      ])

      if (callsRes.success) {
        setCalls(callsRes.data)
      }
      if (statsRes.success) {
        setStats(statsRes.data)
      }
      setAiConfigured(healthRes.aiConfigured)
      setError(null)
    } catch (err) {
      setError('Failed to load data from backend')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCallClick = async (call: CallSummary) => {
    try {
      const res = await api.getCallMetadata(call.recordingId)
      if (res.success) {
        setSelectedCall(res.data)
      }
    } catch (err) {
      console.error('Error loading call details:', err)
    }
  }

  const handleAnalyzeCall = async (recordingId: string) => {
    try {
      setAnalyzingCall(true)
      const res = await api.analyzeCall(recordingId)
      if (res.success) {
        setAiAnalysis(res.data)
      }
    } catch (err) {
      console.error('Error analyzing call:', err)
    } finally {
      setAnalyzingCall(false)
    }
  }

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.agent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDirection = filterDirection === 'all' || call.direction === filterDirection
    return matchesSearch && matchesDirection
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading call data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0TDIyIDIyLjhWMzZsMTQgNy4yVjYwaDRWNDMuMkw1NCAzNlYyMi44TDQwIDE0aDRWMGgtNHYxNHptMCAyLjNWMzBsLTEwIDUuMlYyMS41bDEwLTUuMnptMTQgMEw2MCAyMXYxNC4zTDUwIDQwVjI1LjdsLTEwLTUuMnYtNC4yem0tMjggMGwxMC01LjJ2MTQuM0wyMiAzMFYxNi4zem0xNCAxNC4xTDMyIDM1VjQ5bDQuMSAyTDQ2IDQ2VjMxLjlsLTEwIDQuNXptLTE0IDBMMTggMzVWNDlsNC4xIDJMMzIgNDZWMzEuOWwtMTAgNC41ek00IDNoNHYxNEwxNyAyMnYxNGwtOCA0LjJ2LTQuMmwtNi01LjJWMTd6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Header with Glass Effect */}
        <header className="glass-effect sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold gradient-text">
                    Call Intelligence Platform
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 sm:gap-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    AI-Powered Analytics
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {!aiConfigured ? (
                  <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs sm:text-sm font-medium text-yellow-800 dark:text-yellow-300 hidden sm:inline">
                      AI not configured
                    </span>
                    <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300 sm:hidden">
                      No AI
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-800">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    <span className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">
                      AI Active
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-fade-in">
          {error && (
            <div className="glass-effect bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 animate-fade-in">
              <div className="flex items-center gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="font-medium text-sm sm:text-base">{error}</p>
              </div>
            </div>
          )}

          {/* Modern Stats Cards with Gradients */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
              <div className="glass-effect rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 card-hover group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Calls</p>
                    <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stats.total}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl floating">
                    <Phone className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 card-hover group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Inbound Calls</p>
                    <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {stats.byDirection.inbound}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl floating" style={{ animationDelay: '0.2s' }}>
                    <BarChart3 className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 card-hover group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Outbound Calls</p>
                    <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {stats.byDirection.outbound}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl floating" style={{ animationDelay: '0.4s' }}>
                    <BarChart3 className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modern Search and Filters */}
          <div className="glass-effect rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  placeholder="Search by subject or agent..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                />
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterDirection('all')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap transition-all transform hover:scale-105 flex-shrink-0 ${
                    filterDirection === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'glass-effect text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterDirection('inbound')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap transition-all transform hover:scale-105 flex-shrink-0 ${
                    filterDirection === 'inbound'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                      : 'glass-effect text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  Inbound
                </button>
                <button
                  onClick={() => setFilterDirection('outbound')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap transition-all transform hover:scale-105 flex-shrink-0 ${
                    filterDirection === 'outbound'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'glass-effect text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  Outbound
                </button>
              </div>
            </div>
          </div>

          {/* Modern Calls Grid */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold gradient-text">
                Recent Calls
              </h2>
              <div className="glass-effect px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {filteredCalls.length} calls
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCalls.slice(0, 50).map((call, index) => (
                <div key={call.recordingId} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CallCard
                    call={call}
                    onClick={() => handleCallClick(call)}
                  />
                </div>
              ))}
            </div>

            {filteredCalls.length === 0 && (
              <div className="glass-effect rounded-xl sm:rounded-2xl p-8 sm:p-16 text-center animate-fade-in">
                <Phone className="w-12 h-12 sm:w-20 sm:h-20 text-gray-300 dark:text-gray-700 mx-auto mb-3 sm:mb-4 floating" />
                <p className="text-lg sm:text-xl font-semibold text-gray-400 dark:text-gray-600">No calls found</p>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-600 mt-1 sm:mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Modern AI Analyze Floating Button */}
        {selectedCall && (
          <>
            <CallDetailsModal
              call={selectedCall}
              onClose={() => setSelectedCall(null)}
            />
            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
              <button
                onClick={() => handleAnalyzeCall(selectedCall.recordingId)}
                disabled={analyzingCall}
                className="group relative flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                {analyzingCall ? (
                  <>
                    <div className="relative animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                    <span className="relative font-bold text-sm sm:text-lg">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="relative w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                    <span className="relative font-bold text-sm sm:text-lg hidden xs:inline">Analyze with AI</span>
                    <span className="relative font-bold text-sm sm:text-lg xs:hidden">Analyze</span>
                    <Sparkles className="relative w-5 h-5 sm:w-6 sm:h-6 floating" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* AI Analysis Modal */}
        {aiAnalysis && selectedCall && (
          <AIAnalysisModal
            analysis={aiAnalysis}
            callSubject={selectedCall.call?.subject || 'Unknown'}
            onClose={() => setAiAnalysis(null)}
            loading={analyzingCall}
          />
        )}
      </div>
    </div>
  )
}

export default App
