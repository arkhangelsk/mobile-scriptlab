import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const MenuScreen = ({ username, onLogout, onMenuItemPress }) => {
  const menuItems = [
    { id: 1, title: 'Forms & Inputs', icon: '📝' },
    { id: 2, title: 'Shopping Cart', icon: '🛒' },
    { id: 3, title: 'UI Components', icon: '🎨' },
    { id: 4, title: 'File Handling', icon: '📁' },
    { id: 5, title: 'Alerts & Notification', icon: '🔔' },
  ];

  const handleMenuPress = item => {
    if (onMenuItemPress) {
      onMenuItemPress(item);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Welcome</Text>
            <Text style={styles.headerSubtitle}>{username}</Text>
          </View>
          {onLogout && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onLogout}
              testID="logoutButton"
              accessibilityLabel="Logout Button"
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Menu Items */}
        <ScrollView
          style={styles.menuContainer}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
              testID={`menuItem-${item.id}`}
              accessibilityLabel={`${item.title} menu option`}
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

MenuScreen.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
  onMenuItemPress: PropTypes.func,
};

MenuScreen.defaultProps = {
  onLogout: null,
  onMenuItemPress: null,
};

export default MenuScreen;

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
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
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
