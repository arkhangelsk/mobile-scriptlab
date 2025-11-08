import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LearnScreen = () => {
  const courses = [
    {
      id: 1,
      title: 'AI Agents & MCP Explained for Smarter Software Testing',
      image: require('../images/ai-agents.png'),
      url: 'https://www.udemy.com/course/ai-agents-mcp-explained-for-smarter-software-testing/?referralCode=BA8359230E0BA043347C',
      platform: 'Udemy',
    },
    {
      id: 2,
      title: 'Level Up Software Testing Using Generative AI',
      image: require('../images/generative-ai-course.png'),
      url: 'https://www.udemy.com/course/level-up-software-testing-using-generative-ai/?referralCode=5193F114D58279EE0BF9',
      platform: 'Udemy',
    },
    {
      id: 3,
      title: 'Roadmap to become a Test Automation Engineer',
      image: require('../images/test-automation.png'),
      url: 'https://www.udemy.com/course/road-map-to-become-test-automation-engineer/?referralCode=0CF887F5712A3306049F',
      platform: 'Udemy',
    },
  ];

  const resources = [
    {
      id: 1,
      title: 'Software Testing Trends Website',
      icon: '🌐',
      url: 'https://softwaretestingtrends.com/',
    },
    {
      id: 2,
      title: 'Software Testing Trends YouTube',
      icon: '📺',
      url: 'https://www.youtube.com/@softwaretestingtrends',
    },
    {
      id: 3,
      title: 'Learning Expressway YouTube',
      icon: '📺',
      url: 'https://www.youtube.com/@learningexpressway',
    },
  ];

  const handleLinkPress = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn</Text>
          <Text style={styles.headerSubtitle}>
            Automation tutorials and guides
          </Text>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Udemy Courses Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Udemy Courses</Text>
            {courses.map(course => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => handleLinkPress(course.url)}
                testID={`course-${course.id}`}
              >
                <Image source={course.image} style={styles.courseImage} />
                <View style={styles.courseInfo}>
                  <Text style={styles.coursePlatform}>{course.platform}</Text>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.viewCourse}>View Course →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Resources Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Resources</Text>
            {resources.map(resource => (
              <TouchableOpacity
                key={resource.id}
                style={styles.resourceItem}
                onPress={() => handleLinkPress(resource.url)}
                testID={`resource-${resource.id}`}
              >
                <Text style={styles.resourceIcon}>{resource.icon}</Text>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LearnScreen;

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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: 16,
  },
  coursePlatform: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A855F7',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 22,
  },
  viewCourse: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  resourceIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  resourceTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  resourceArrow: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});
