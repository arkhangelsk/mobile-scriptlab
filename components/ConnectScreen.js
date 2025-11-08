import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConnectScreen = () => {
  const socialLinks = [
    {
      name: 'Medium',
      url: 'https://medium.com/@ambysan',
      icon: 'M',
      color: '#000000',
      description: 'Read articles and insights',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/ambysan',
      icon: '𝕏',
      color: '#000000',
      description: 'Follow for updates and tips',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/groups/14863012/',
      icon: 'in',
      color: '#0A66C2',
      description: 'Join the professional community',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/Esg4EZDtng',
      icon: '💬',
      color: '#5865F2',
      description: 'Join the discussion',
    },
  ];

  const handlePress = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>🌐</Text>
            <Text style={styles.title}>Connect With Us</Text>
            <Text style={styles.subtitle}>
              Stay connected and join our community across various platforms
            </Text>
          </View>

          <View style={styles.linksContainer}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkCard}
                onPress={() => handlePress(link.url)}
                activeOpacity={0.7}
              >
                <View style={styles.linkHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: link.color },
                    ]}
                  >
                    <Text style={styles.iconText}>{link.icon}</Text>
                  </View>
                  <View style={styles.linkInfo}>
                    <Text style={styles.linkName}>{link.name}</Text>
                    <Text style={styles.linkDescription}>
                      {link.description}
                    </Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tap any platform to open in your browser
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  linksContainer: {
    marginBottom: 20,
  },
  linkCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  linkInfo: {
    flex: 1,
  },
  linkName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  linkDescription: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
    marginLeft: 8,
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

export default ConnectScreen;
