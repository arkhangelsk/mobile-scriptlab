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

const PracticeScreen = ({ navigation }) => {
  const menuItems = [
    { id: 1, title: 'Forms & Inputs', icon: '📝', screen: 'RegistrationForm' },
    { id: 2, title: 'Shopping Cart', icon: '🛒', screen: 'ShoppingCart' },
    { id: 3, title: 'UI Components', icon: '🎨', screen: 'UIComponents' },
    { id: 4, title: 'Swipe', icon: '👆', screen: 'Swipe' },
    { id: 5, title: 'Drag', icon: '✋', screen: 'Drag' },
    { id: 6, title: 'Webview', icon: '🌐', screen: 'Webview' },
  ];

  const handleMenuPress = item => {
    if (navigation && item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Practice</Text>
          <Text style={styles.headerSubtitle}>
            Hands-on automation exercises
          </Text>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
              testID={`practiceItem-${item.id}`}
              accessibilityLabel={`${item.title} practice option`}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

PracticeScreen.propTypes = {
  navigation: PropTypes.object,
};

PracticeScreen.defaultProps = {
  navigation: null,
};

export default PracticeScreen;

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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
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
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
  },
  menuArrow: {
    fontSize: 28,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});
