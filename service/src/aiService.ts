import { GoogleGenerativeAI } from '@google/generative-ai';
import { CallMetadata, AIAnalysis } from './types.js';

export class AIService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    }
  }

  isConfigured(): boolean {
    return this.genAI !== null && this.model !== null;
  }

  async analyzeCall(metadata: CallMetadata): Promise<AIAnalysis> {
    if (!this.isConfigured()) {
      return this.getFallbackAnalysis(metadata);
    }

    try {
      const prompt = this.buildAnalysisPrompt(metadata);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return this.parseAIResponse(text, metadata);
    } catch (error) {
      console.error('Error analyzing call with AI:', error);
      return this.getFallbackAnalysis(metadata);
    }
  }

  private buildAnalysisPrompt(metadata: CallMetadata): string {
    return `Analyze this customer service call based on the metadata provided:

Call Details:
- Direction: ${metadata.call.direction}
- Subject: ${metadata.call.subject}
- Agent: ${metadata.agents[0]?.name || 'Unknown'}
- Department: ${metadata.agents[0]?.department || 'Unknown'}
- Queue: ${metadata.queues[0]?.name || 'Unknown'}
- Duration: ${metadata.timing.recording.duration}
- Date: ${metadata.timing.recording.start}

Please provide a structured analysis in the following format:

SUMMARY:
[Provide a brief 2-3 sentence summary of what likely occurred in this call]

KEY POINTS:
- [Point 1]
- [Point 2]
- [Point 3]

SENTIMENT:
[positive/neutral/negative - with brief explanation]

ACTION ITEMS:
- [Action 1]
- [Action 2]

CUSTOMER INTENT:
[What the customer was likely trying to accomplish]

Note: You only have metadata, not the actual recording, so make reasonable inferences based on the information provided.`;
  }

  private parseAIResponse(text: string, metadata: CallMetadata): AIAnalysis {
    try {
      const sections = {
        summary: this.extractSection(text, 'SUMMARY:', 'KEY POINTS:'),
        keyPoints: this.extractListSection(text, 'KEY POINTS:', 'SENTIMENT:'),
        sentiment: this.extractSection(text, 'SENTIMENT:', 'ACTION ITEMS:'),
        actionItems: this.extractListSection(text, 'ACTION ITEMS:', 'CUSTOMER INTENT:'),
        customerIntent: this.extractSection(text, 'CUSTOMER INTENT:', null),
      };

      return {
        summary: sections.summary || this.getFallbackSummary(metadata),
        keyPoints: sections.keyPoints.length > 0 ? sections.keyPoints : this.getFallbackKeyPoints(metadata),
        sentiment: sections.sentiment || 'neutral',
        actionItems: sections.actionItems.length > 0 ? sections.actionItems : ['Follow up with customer'],
        customerIntent: sections.customerIntent || 'General inquiry',
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.getFallbackAnalysis(metadata);
    }
  }

  private extractSection(text: string, startMarker: string, endMarker: string | null): string {
    const startIndex = text.indexOf(startMarker);
    if (startIndex === -1) return '';

    const contentStart = startIndex + startMarker.length;
    const endIndex = endMarker ? text.indexOf(endMarker, contentStart) : text.length;
    
    return text
      .substring(contentStart, endIndex === -1 ? text.length : endIndex)
      .trim()
      .replace(/^\[|\]$/g, '');
  }

  private extractListSection(text: string, startMarker: string, endMarker: string | null): string[] {
    const section = this.extractSection(text, startMarker, endMarker);
    if (!section) return [];

    return section
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').replace(/^\[|\]$/g, '').trim())
      .filter(line => line.length > 0);
  }

  private getFallbackSummary(metadata: CallMetadata): string {
    const agent = metadata.agents[0]?.name || 'An agent';
    const direction = metadata.call.direction;
    const subject = metadata.call.subject;
    
    return `${agent} handled an ${direction} call regarding "${subject}". The call lasted ${metadata.timing.recording.duration} and was processed through the ${metadata.queues[0]?.name || 'main'} queue.`;
  }

  private getFallbackKeyPoints(metadata: CallMetadata): string[] {
    return [
      `Call duration: ${metadata.timing.recording.duration}`,
      `Handled by: ${metadata.agents[0]?.name || 'Unknown'} (${metadata.agents[0]?.department || 'Unknown department'})`,
      `Call type: ${metadata.call.direction} ${metadata.call.type}`,
    ];
  }

  private getFallbackAnalysis(metadata: CallMetadata): AIAnalysis {
    return {
      summary: this.getFallbackSummary(metadata),
      keyPoints: this.getFallbackKeyPoints(metadata),
      sentiment: 'neutral',
      actionItems: ['Review call recording for details', 'Follow up if needed'],
      customerIntent: `Inquiry about ${metadata.call.subject}`,
    };
  }
}
