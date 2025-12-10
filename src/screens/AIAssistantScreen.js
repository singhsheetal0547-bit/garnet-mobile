import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import aiService from '../services/aiService';
import useAuthStore from '../store/useAuthStore';

export default function AIAssistantScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('youtube_shorts');
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  
  const { hasProAccess, useCredit } = useAuthStore();

  const platforms = [
    { id: 'youtube_shorts', name: 'YouTube Shorts', icon: 'logo-youtube' },
    { id: 'instagram_reels', name: 'Instagram Reels', icon: 'logo-instagram' },
    { id: 'tiktok', name: 'TikTok', icon: 'musical-notes' },
  ];

  const handleGenerateAll = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please describe your content first');
      return;
    }

    if (!hasProAccess() && !useCredit()) {
      Alert.alert(
        'No Credits',
        'You need AI credits or a Pro subscription to use this feature',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => navigation.navigate('Subscription') },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      const [captionResult, hashtagResult, analysisResult] = await Promise.all([
        aiService.generateCaptionVariations(content, platform, 3),
        aiService.generateHashtags(content, platform, 10),
        aiService.analyzeContent(content, 'video'),
      ]);

      setCaptions(captionResult.variations || []);
      setHashtags(hashtagResult.hashtags || []);
      setAnalysis(analysisResult.analysis || null);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    // Implement clipboard copy
    Alert.alert('Copied', 'Content copied to clipboard');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Input Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe Your Content</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Amazing sunset timelapse over the ocean..."
          multiline
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* Platform Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Platform</Text>
        <View style={styles.platformGrid}>
          {platforms.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.platformCard,
                platform === p.id && styles.platformCardActive,
              ]}
              onPress={() => setPlatform(p.id)}
            >
              <Ionicons
                name={p.icon}
                size={24}
                color={platform === p.id ? '#8B5CF6' : '#6B7280'}
              />
              <Text
                style={[
                  styles.platformName,
                  platform === p.id && styles.platformNameActive,
                ]}
              >
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGenerateAll}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Ionicons name="sparkles" size={20} color="white" />
            <Text style={styles.generateButtonText}>Generate AI Content</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Results */}
      {captions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generated Captions</Text>
          {captions.map((item, index) => (
            <View key={index} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.toneLabel}>{item.tone}</Text>
                <TouchableOpacity onPress={() => copyToClipboard(item.caption)}>
                  <Ionicons name="copy-outline" size={20} color="#8B5CF6" />
                </TouchableOpacity>
              </View>
              <Text style={styles.resultText}>{item.caption}</Text>
            </View>
          ))}
        </View>
      )}

      {hashtags.length > 0 && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Text style={styles.sectionTitle}>Hashtags</Text>
            <TouchableOpacity onPress={() => copyToClipboard(hashtags.join(' '))}>
              <Ionicons name="copy-outline" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          <View style={styles.hashtagContainer}>
            {hashtags.map((tag, index) => (
              <View key={index} style={styles.hashtagChip}>
                <Text style={styles.hashtagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {analysis && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Analysis</Text>
          <View style={styles.analysisCard}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreValue}>{analysis.score}/10</Text>
              <Text style={styles.scoreLabel}>Quality Score</Text>
            </View>
            
            <View style={styles.analysisSection}>
              <Text style={styles.analysisTitle}>✅ Strengths</Text>
              {analysis.strengths?.map((strength, index) => (
                <Text key={index} style={styles.analysisText}>• {strength}</Text>
              ))}
            </View>

            <View style={styles.analysisSection}>
              <Text style={styles.analysisTitle}>💡 Improvements</Text>
              {analysis.improvements?.map((improvement, index) => (
                <Text key={index} style={styles.analysisText}>• {improvement}</Text>
              ))}
            </View>

            <View style={styles.engagementBadge}>
              <Text style={styles.engagementText}>
                Predicted Engagement: {analysis.engagement?.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  platformGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  platformCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  platformCardActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  platformName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  platformNameActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toneLabel: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  resultText: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtagChip: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  analysisCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  analysisSection: {
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  analysisText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  engagementBadge: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  engagementText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
});
