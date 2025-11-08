import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const HomeScreen = ({ username }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Welcome</Text>
            <Text style={styles.headerSubtitle}>{username}</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeIcon}>🏠</Text>
            <Text style={styles.welcomeTitle}>Welcome to ScriptLab</Text>
            <Text style={styles.welcomeText}>
              Navigate to the Practice tab to start your automation exercises
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  username: PropTypes.string.isRequired,
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 400,
  },
  welcomeIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
