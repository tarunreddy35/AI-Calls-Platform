export interface CallMetadata {
  recordingId: string;
  conversationId: string;
  call: {
    direction: 'inbound' | 'outbound';
    type: string;
    subtype: string;
    subject: string;
    from: string;
    to: string;
    wrapupCodes: string[];
  };
  timing: {
    recording: {
      start: string;
      end: string;
      duration: string;
      durationMs: number;
    };
    conversation: {
      start: string;
      end: string;
      duration: string;
    };
    iso: {
      recordingStart: string;
      recordingEnd: string;
      conversationStart: string;
      conversationEnd: string;
    };
  };
  agents: Array<{
    id: string;
    name: string;
    email: string;
    department: string;
    title: string | null;
    state: string;
    username: string;
  }>;
  queues: Array<{
    id: string;
    name: string;
    description: string;
    memberCount: number;
  }>;
  technical: {
    organizationId: string;
    provider: string;
  };
}

export interface CallSummary {
  recordingId: string;
  subject: string;
  direction: string;
  agent: string;
  duration: string;
  date: string;
  queue: string;
}

export interface AIAnalysis {
  summary: string;
  keyPoints: string[];
  sentiment: string;
  actionItems: string[];
  customerIntent: string;
}

export interface CallStats {
  total: number;
  byDirection: {
    inbound: number;
    outbound: number;
  };
  byQueue: Record<string, number>;
  byAgent: Record<string, number>;
}
