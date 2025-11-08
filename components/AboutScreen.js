import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>About ScriptLab</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What is ScriptLab?</Text>
            <Text style={styles.text}>
              ScriptLab is a comprehensive mobile automation practice
              application designed to help you learn and master mobile testing
              and automation skills.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.text}>• Practice Forms & Input Controls</Text>
            <Text style={styles.text}>• Shopping Cart Automation</Text>
            <Text style={styles.text}>• UI Component Testing</Text>
            <Text style={styles.text}>• Swipe & Gesture Interactions</Text>
            <Text style={styles.text}>• Drag & Drop Functionality</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Resources</Text>
            <Text style={styles.text}>
              Access curated courses and learning materials in the Learn tab to
              enhance your automation skills.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Version</Text>
            <Text style={styles.text}>1.0.0</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.text}>
              For feedback and suggestions, please reach out through the app's
              feedback section.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 4,
  },
});

export default AboutScreen;
