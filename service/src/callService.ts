import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { CallMetadata, CallSummary } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CallService {
  private callsDirectory: string;

  constructor() {
    // The demo_calls directory is at the project root
    this.callsDirectory = path.join(__dirname, '../../demo_calls');
  }

  async getAllCalls(): Promise<CallSummary[]> {
    try {
      const files = await fs.readdir(this.callsDirectory);
      const metadataFiles = files.filter(f => f.endsWith('.opus_metadata.json'));
      
      const calls: CallSummary[] = [];
      
      for (const file of metadataFiles) {
        try {
          const metadata = await this.getCallMetadata(file.replace('.opus_metadata.json', ''));
          if (metadata && this.isValidMetadata(metadata)) {
            calls.push({
              recordingId: metadata.recordingId,
              subject: metadata.call?.subject || 'Unknown Subject',
              direction: metadata.call?.direction || 'unknown',
              agent: metadata.agents?.[0]?.name || 'Unknown',
              duration: metadata.timing?.recording?.duration || '0s',
              date: metadata.timing?.recording?.start || new Date().toISOString(),
              queue: metadata.queues?.[0]?.name || 'Unknown',
            });
          }
        } catch (error) {
          // Skip files with errors - some metadata might be malformed
          console.error(`Skipping ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Sort by date (most recent first)
      calls.sort((a, b) => {
        try {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } catch {
          return 0;
        }
      });
      
      return calls;
    } catch (error) {
      console.error('Error reading calls directory:', error);
      return [];
    }
  }

  private isValidMetadata(metadata: any): boolean {
    // Check if metadata has minimum required fields
    return metadata && 
           metadata.recordingId && 
           (metadata.call || metadata[' ']) &&  // Handle malformed key
           metadata.timing &&
           metadata.timing.recording;
  }

  async getCallMetadata(recordingId: string): Promise<CallMetadata | null> {
    try {
      const metadataPath = path.join(
        this.callsDirectory,
        `${recordingId}.opus_metadata.json`
      );
      const data = await fs.readFile(metadataPath, 'utf-8');
      const parsed = JSON.parse(data);
      
      // Handle malformed metadata where "call" key is " " (space)
      if (parsed[' '] && !parsed.call) {
        parsed.call = parsed[' '];
        delete parsed[' '];
      }
      
      return parsed as CallMetadata;
    } catch (error) {
      console.error(`Error reading metadata for ${recordingId}:`, error);
      return null;
    }
  }

  async getCallAudioPath(recordingId: string): Promise<string | null> {
    try {
      const audioPath = path.join(this.callsDirectory, `${recordingId}.opus`);
      await fs.access(audioPath);
      return audioPath;
    } catch (error) {
      return null;
    }
  }

  async getCallStats() {
    const calls = await this.getAllCalls();
    
    const stats = {
      total: calls.length,
      byDirection: {
        inbound: calls.filter(c => c.direction === 'inbound').length,
        outbound: calls.filter(c => c.direction === 'outbound').length,
      },
      byQueue: {} as Record<string, number>,
      byAgent: {} as Record<string, number>,
      avgDuration: 0,
    };

    // Calculate stats
    calls.forEach(call => {
      stats.byQueue[call.queue] = (stats.byQueue[call.queue] || 0) + 1;
      stats.byAgent[call.agent] = (stats.byAgent[call.agent] || 0) + 1;
    });

    return stats;
  }
}
