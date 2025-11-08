import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const ProfileScreen = ({ username, onLogout, navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>More</Text>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../images/logo.png')}
                style={styles.logoImage}
              />
            </View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.userRole}>Mobile Automation Practice Hub</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Options</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Privacy')}
            >
              <Text style={styles.menuItemText}>Privacy</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Connect')}
            >
              <Text style={styles.menuItemText}>Connect</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.menuItemText}>About</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {onLogout && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onLogout}
              testID="profileLogoutButton"
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

ProfileScreen.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
  navigation: PropTypes.object,
};

ProfileScreen.defaultProps = {
  onLogout: null,
  navigation: null,
};

export default ProfileScreen;

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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
