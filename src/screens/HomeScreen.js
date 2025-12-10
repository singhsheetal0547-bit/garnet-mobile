import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useAuthStore from '../store/useAuthStore';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, subscription } = useAuthStore();

  const quickActions = [
    {
      id: 'record',
      title: 'Record Video',
      icon: 'videocam',
      color: ['#8B5CF6', '#6366F1'],
      onPress: () => navigation.navigate('Camera'),
    },
    {
      id: 'photo',
      title: 'Take Photo',
      icon: 'camera',
      color: ['#EC4899', '#F43F5E'],
      onPress: () => navigation.navigate('Camera'),
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      icon: 'sparkles',
      color: ['#10B981', '#14B8A6'],
      onPress: () => navigation.navigate('AIAssistant'),
    },
    {
      id: 'library',
      title: 'My Library',
      icon: 'folder-open',
      color: ['#F59E0B', '#EF4444'],
      onPress: () => navigation.navigate('Library'),
    },
  ];

  const features = [
    { icon: 'cut', title: 'Video Editor', description: 'Trim, crop & edit' },
    { icon: 'text', title: 'Add Text', description: 'Custom captions' },
    { icon: 'color-palette', title: 'Filters', description: 'Beautiful effects' },
    { icon: 'share-social', title: 'Publish', description: 'Multi-platform' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Creator'}! 👋</Text>
          <Text style={styles.subtitle}>What would you like to create today?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{subscription.plan.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={action.onPress}
              style={styles.actionCard}
            >
              <LinearGradient
                colors={action.color}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={action.icon} size={32} color="white" />
                <Text style={styles.actionTitle}>{action.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Videos Created</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{subscription.credits}</Text>
            <Text style={styles.statLabel}>AI Credits</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Published</Text>
          </View>
        </View>
      </View>

      {/* Upgrade Banner (for free users) */}
      {subscription.plan === 'free' && (
        <TouchableOpacity
          style={styles.upgradeSection}
          onPress={() => navigation.navigate('Subscription')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6366F1']}
            style={styles.upgradeBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="rocket" size={32} color="white" />
            <View style={styles.upgradeText}>
              <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
              <Text style={styles.upgradeSubtitle}>
                Unlock unlimited AI credits & advanced features
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  upgradeSection: {
    padding: 20,
  },
  upgradeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  upgradeText: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
});
