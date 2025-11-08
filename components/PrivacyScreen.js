import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information Collection</Text>
            <Text style={styles.text}>
              ScriptLab is a practice application designed for learning mobile
              automation testing. We do not collect, store, or transmit any
              personal data or information.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Usage</Text>
            <Text style={styles.text}>
              All data entered in this application is stored locally on your
              device and is never shared with third parties or transmitted to
              any servers.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Authentication</Text>
            <Text style={styles.text}>
              The login functionality in this app is for demonstration purposes
              only. No credentials are validated or stored beyond the current
              session.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practice Data</Text>
            <Text style={styles.text}>
              Any data you enter while practicing with forms, shopping carts, or
              other UI components is temporary and exists only within the app
              session. It is automatically cleared when you close the
              application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Third-Party Services</Text>
            <Text style={styles.text}>
              This application does not integrate with any third-party services,
              analytics platforms, or advertising networks.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Children's Privacy</Text>
            <Text style={styles.text}>
              This application is intended for educational purposes and does not
              knowingly collect any information from users of any age.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Updates to Privacy Policy</Text>
            <Text style={styles.text}>
              This privacy policy may be updated from time to time. Any changes
              will be reflected in the app's About section.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.text}>
              This is a practice application for learning purposes. For
              questions about mobile automation testing, please refer to the
              learning resources in the Learn tab.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Last Updated: November 2025</Text>
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
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default PrivacyScreen;
