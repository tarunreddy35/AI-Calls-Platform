const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getCalls() {
    const res = await fetch(`${API_BASE}/calls`);
    return res.json();
  },

  async getCallStats() {
    const res = await fetch(`${API_BASE}/calls/stats`);
    return res.json();
  },

  async getCallMetadata(recordingId: string) {
    const res = await fetch(`${API_BASE}/calls/${recordingId}`);
    return res.json();
  },

  async analyzeCall(recordingId: string) {
    const res = await fetch(`${API_BASE}/calls/${recordingId}/analyze`, {
      method: 'POST',
    });
    return res.json();
  },

  async batchAnalyzeCalls(recordingIds: string[]) {
    const res = await fetch(`${API_BASE}/calls/analyze/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordingIds }),
    });
    return res.json();
  },
};
