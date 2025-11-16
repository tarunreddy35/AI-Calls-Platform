import { Phone, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { CallSummary } from '../types';

interface CallCardProps {
  call: CallSummary;
  onClick: () => void;
}

export function CallCard({ call, onClick }: CallCardProps) {
  const isInbound = call.direction === 'inbound';
  
  return (
    <div
      onClick={onClick}
      className="glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 border border-gray-200/50 dark:border-gray-700/50 group card-hover overflow-hidden relative"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`relative p-3 rounded-xl ${isInbound ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-green-500 to-emerald-600'} shadow-lg`}>
              {isInbound ? (
                <ArrowRight className="w-5 h-5 text-white" />
              ) : (
                <ArrowLeft className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {call.subject}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-wider ${isInbound ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>
                {call.direction}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            <span className="font-medium">{call.agent}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span className="font-medium">{call.duration}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
            <Phone className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-medium">{call.queue}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>{new Date(call.date).toLocaleDateString()}</span>
            <span className="font-medium">{new Date(call.date).toLocaleTimeString()}</span>
          </p>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
}
