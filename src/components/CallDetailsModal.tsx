import { X, User, Phone, Clock, Building, Tag, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { CallMetadata } from '../types';

interface CallDetailsModalProps {
  call: CallMetadata;
  onClose: () => void;
}

export function CallDetailsModal({ call, onClose }: CallDetailsModalProps) {
  const isInbound = call.call.direction === 'inbound';
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">
        {/* Header with gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-600/90 backdrop-blur-xl border-b border-white/20 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${isInbound ? 'bg-green-500/20' : 'bg-blue-500/20'} backdrop-blur-sm`}>
                {isInbound ? (
                  <ArrowDownLeft className="w-4 h-4 sm:w-6 sm:h-6 text-green-300" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-300" />
                )}
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">
                  Call Details
                </h2>
                <p className="text-xs sm:text-sm text-white/70 capitalize">{call.call.direction} Call</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-100px)] p-3 sm:p-6 space-y-3 sm:space-y-4">
          {/* Subject Banner */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {call.call.subject}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-400/30">
                {call.call.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-400/30">
                {call.call.subtype}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 card-hover">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mr-2 sm:mr-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              </div>
              <h4 className="font-semibold text-white text-base sm:text-lg">Contact Information</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">From</p>
                <p className="text-xs sm:text-sm text-white font-medium break-all">{call.call.from}</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">To</p>
                <p className="text-xs sm:text-sm text-white font-medium break-all">{call.call.to}</p>
              </div>
            </div>
          </div>

          {/* Agent Info */}
          {call.agents.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 card-hover">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mr-2 sm:mr-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                </div>
                <h4 className="font-semibold text-white text-base sm:text-lg">Agent Details</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-base sm:text-xl font-bold text-white mb-1">
                      {call.agents[0].name}
                    </p>
                    <p className="text-sm text-blue-300 mb-2">
                      {call.agents[0].email}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                        {call.agents[0].department}
                      </span>
                      {call.agents[0].title && (
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                          {call.agents[0].title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Queue Info */}
          {call.queues.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 card-hover">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 mr-2 sm:mr-3">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                </div>
                <h4 className="font-semibold text-white text-base sm:text-lg">Queue Information</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-base sm:text-xl font-bold text-white mb-1">
                    {call.queues[0].name}
                  </p>
                  <p className="text-sm text-gray-300 mb-2">
                    {call.queues[0].description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-200 border border-green-400/30 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    {call.queues[0].memberCount} members
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timing Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 card-hover">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mr-2 sm:mr-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
              </div>
              <h4 className="font-semibold text-white text-base sm:text-lg">Timing Details</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Duration</p>
                <p className="text-base sm:text-lg font-bold text-white">
                  {call.timing.recording.duration}
                </p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Started</p>
                <p className="text-xs sm:text-sm text-white font-medium break-words">
                  {new Date(call.timing.recording.start).toLocaleString()}
                </p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Ended</p>
                <p className="text-xs sm:text-sm text-white font-medium break-words">
                  {new Date(call.timing.recording.end).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-gray-500/20 to-slate-500/20 mr-2 sm:mr-3">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
              </div>
              <h4 className="font-semibold text-white text-base sm:text-lg">Technical Details</h4>
            </div>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Recording ID</p>
                <p className="text-white font-mono text-[10px] sm:text-xs break-all">
                  {call.recordingId}
                </p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Provider</p>
                <p className="text-white font-medium">
                  {call.technical.provider}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
