import { aiClient } from './api';

class AIService {
  /**
   * Generate caption for content
   */
  async generateCaption(content, platform = 'youtube_shorts', tone = 'casual') {
    try {
      const response = await aiClient.post('/api/caption/generate', {
        content,
        platform,
        tone,
      });
      return response.data;
    } catch (error) {
      console.error('Caption generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate multiple caption variations
   */
  async generateCaptionVariations(content, platform = 'youtube_shorts', count = 3) {
    try {
      const response = await aiClient.post('/api/caption/variations', {
        content,
        platform,
        count,
      });
      return response.data;
    } catch (error) {
      console.error('Caption variations failed:', error);
      throw error;
    }
  }

  /**
   * Generate hashtags
   */
  async generateHashtags(content, platform = 'instagram', count = 10) {
    try {
      const response = await aiClient.post('/api/hashtags/generate', {
        content,
        platform,
        count,
      });
      return response.data;
    } catch (error) {
      console.error('Hashtag generation failed:', error);
      throw error;
    }
  }

  /**
   * Get best posting times
   */
  async getBestPostingTimes(platform, timezone = 'UTC') {
    try {
      const response = await aiClient.post('/api/hashtags/posting-times', {
        platform,
        timezone,
      });
      return response.data;
    } catch (error) {
      console.error('Posting times failed:', error);
      throw error;
    }
  }

  /**
   * Analyze content quality
   */
  async analyzeContent(content, mediaType = 'video') {
    try {
      const response = await aiClient.post('/api/content/analyze', {
        content,
        mediaType,
      });
      return response.data;
    } catch (error) {
      console.error('Content analysis failed:', error);
      throw error;
    }
  }

  /**
   * Get content suggestions
   */
  async getContentSuggestions(niche, platform = 'youtube_shorts') {
    try {
      const response = await aiClient.post('/api/content/suggestions', {
        niche,
        platform,
      });
      return response.data;
    } catch (error) {
      console.error('Content suggestions failed:', error);
      throw error;
    }
  }

  /**
   * Detect watermark
   */
  async detectWatermark(mediaUrl, ownershipConfirmed) {
    try {
      const response = await aiClient.post('/api/watermark/detect', {
        mediaUrl,
        ownershipConfirmed,
      });
      return response.data;
    } catch (error) {
      console.error('Watermark detection failed:', error);
      throw error;
    }
  }

  /**
   * Remove watermark (requires ownership confirmation)
   */
  async removeWatermark(mediaUrl, ownershipConfirmed, addProvenance = true) {
    try {
      const response = await aiClient.post('/api/watermark/remove', {
        mediaUrl,
        ownershipConfirmed,
        addProvenance,
      });
      return response.data;
    } catch (error) {
      console.error('Watermark removal failed:', error);
      throw error;
    }
  }
}

export default new AIService();
