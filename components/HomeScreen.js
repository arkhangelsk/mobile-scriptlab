import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const HomeScreen = ({ username, navigation }) => {
  const quickStats = [
    { id: 1, icon: '📝', label: 'Practice', count: '6' },
    { id: 2, icon: '🏆', label: 'Challenges', count: '4' },
    { id: 3, icon: '📚', label: 'Courses', count: '3' },
  ];

  const featureHighlights = [
    {
      id: 1,
      icon: '🎯',
      title: 'Hands-on Practice',
      description: '6 interactive scenarios with real-world UI components',
      screen: 'Practice',
    },
    {
      id: 2,
      icon: '📖',
      title: 'Learn & Grow',
      description: 'Access curated courses and learning resources',
      screen: 'Learn',
    },
    {
      id: 3,
      icon: '💪',
      title: 'Test Your Skills',
      description: 'Take on automation challenges from beginner to expert',
      screen: 'Challenges',
    },
  ];

  const handleNavigate = screen => {
    if (navigation && screen) {
      // Navigate to parent tab navigator
      navigation.getParent()?.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>{username}</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>ScriptLab Mobile</Text>
            <Text style={styles.heroSubtitle}>
              Master Mobile Test Automation
            </Text>
            <Text style={styles.heroDescription}>
              Practice with real-world scenarios, learn from experts, and
              challenge yourself
            </Text>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            {quickStats.map(stat => (
              <View
                key={stat.id}
                style={styles.statCard}
                testID={`stat-${stat.label.toLowerCase()}`}
              >
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statCount}>{stat.count}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Feature Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Inside</Text>
            {featureHighlights.map(feature => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                onPress={() => handleNavigate(feature.screen)}
                testID={`feature-${feature.id}`}
              >
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
                <Text style={styles.featureArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Perfect for:</Text>
            <Text style={styles.infoText}>
              • QA Engineers learning mobile automation{'\n'}• Developers
              testing React Native apps{'\n'}• Students practicing test
              automation{'\n'}• Anyone building test skills
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  username: PropTypes.string.isRequired,
  navigation: PropTypes.object,
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  featureArrow: {
    fontSize: 28,
    color: '#D1D5DB',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
});
