import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChallengesScreen = () => {
  const challengeCategories = [
    {
      id: 1,
      title: 'Beginner Challenges',
      icon: '🌱',
      color: '#10B981',
      scenarios: [
        'Form Speedrun - Complete registration with validation',
        'Cart Calculator - Add items and verify totals',
        'UI Scavenger Hunt - Find and interact with components',
        'Gesture Basics - Practice swipes and drag-drop',
      ],
    },
    {
      id: 2,
      title: 'Intermediate Challenges',
      icon: '⚡',
      color: '#F59E0B',
      scenarios: [
        'E-commerce Flow - Complete full shopping journey',
        'Data Entry Marathon - Fill multiple forms accurately',
        'Component Inspector - Identify and verify testIDs',
        'Navigation Master - Visit screens in specific order',
        'WebView Validator - Verify external content loading',
      ],
    },
    {
      id: 3,
      title: 'Advanced Challenges',
      icon: '🔥',
      color: '#EF4444',
      scenarios: [
        'Cross-Screen Workflow - Multi-step user journeys',
        'State Management Test - Verify UI state changes',
        'Platform Detective - Identify iOS vs Android differences',
        'Accessibility Audit - Document accessibility features',
        'Performance Test - Complete exercises without errors',
      ],
    },
    {
      id: 4,
      title: 'Expert Challenges',
      icon: '💎',
      color: '#8B5CF6',
      scenarios: [
        'Full Regression Suite - Complete app flow testing',
        'Edge Case Hunter - Trigger validation scenarios',
        'Automation Blueprint - Document test strategy',
        'Scenario Simulator - Handle multiple user types',
        'Integration Testing - Verify end-to-end workflows',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Challenges</Text>
          <Text style={styles.headerSubtitle}>
            Automation scenario types to implement
          </Text>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {challengeCategories.map((category) => (
            <View
              key={category.id}
              style={styles.categoryCard}
              testID={`challenge-category-${category.id}`}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryTitle}>
                  {category.title}
                </Text>
              </View>
              <View style={styles.scenariosList}>
                {category.scenarios.map((scenario, index) => (
                  <View key={index} style={styles.scenarioItem}>
                    <Text style={styles.scenarioBullet}>•</Text>
                    <Text style={styles.scenarioText}>{scenario}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              💡 These scenarios can be implemented as automated test cases
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  header: {
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
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  scenariosList: {
    marginLeft: 8,
  },
  scenarioItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scenarioBullet: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
    marginTop: 2,
  },
  scenarioText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#4338CA',
    textAlign: 'center',
  },
});
