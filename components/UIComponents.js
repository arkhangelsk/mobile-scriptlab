import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

const UIComponents = ({ onBack }) => {
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Tooltip states
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState('tab1');

  // Accordion states
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  // Toggle switch state
  const [toggleStates, setToggleStates] = useState({
    notifications: false,
    darkMode: false,
    autoSave: true,
  });

  // Progress bar state
  const [progress, setProgress] = useState(0.5);

  // Rating state
  const [rating, setRating] = useState(0);

  // Carousel data
  const carouselItems = [
    { id: 1, title: 'Slide 1', color: '#FF6B6B', emoji: '🎨' },
    { id: 2, title: 'Slide 2', color: '#4ECDC4', emoji: '🎭' },
    { id: 3, title: 'Slide 3', color: '#45B7D1', emoji: '🎪' },
    { id: 4, title: 'Slide 4', color: '#FFA07A', emoji: '🎡' },
  ];

  // Accordion data
  const accordionItems = [
    {
      id: 'acc1',
      title: 'What is React Native?',
      content:
        'React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android.',
    },
    {
      id: 'acc2',
      title: 'What is Test Automation?',
      content:
        'Test automation is the practice of running tests automatically, managing test data, and utilizing results to improve software quality.',
    },
    {
      id: 'acc3',
      title: 'What is Appium?',
      content:
        'Appium is an open-source test automation framework for use with native, hybrid and mobile web apps.',
    },
  ];

  // Tab content
  const tabContent = {
    tab1: {
      title: 'Profile',
      content: 'This is the profile tab content with user information.',
      icon: '👤',
    },
    tab2: {
      title: 'Settings',
      content: 'This is the settings tab with various configuration options.',
      icon: '⚙️',
    },
    tab3: {
      title: 'Messages',
      content: 'This is the messages tab showing your conversations.',
      icon: '💬',
    },
  };

  const openModal = type => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const toggleAccordion = id => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  const handleScroll = event => {
    const slideSize = width - 32;
    const offset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offset / slideSize);
    setCurrentSlide(currentIndex);
  };

  const scrollToSlide = index => {
    const slideSize = width - 32;
    scrollViewRef.current?.scrollTo({
      x: index * slideSize,
      animated: true,
    });
    setCurrentSlide(index);
  };

  const toggleSwitch = key => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const increaseProgress = () => {
    setProgress(prev => Math.min(prev + 0.1, 1));
  };

  const decreaseProgress = () => {
    setProgress(prev => Math.max(prev - 0.1, 0));
  };

  const renderModal = () => {
    let content;
    switch (modalType) {
      case 'success':
        content = (
          <>
            <Text style={styles.modalIcon}>✅</Text>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalMessage}>
              Your action was completed successfully.
            </Text>
          </>
        );
        break;
      case 'error':
        content = (
          <>
            <Text style={styles.modalIcon}>❌</Text>
            <Text style={styles.modalTitle}>Error!</Text>
            <Text style={styles.modalMessage}>
              Something went wrong. Please try again.
            </Text>
          </>
        );
        break;
      case 'warning':
        content = (
          <>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>Warning!</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to proceed?
            </Text>
          </>
        );
        break;
      case 'info':
        content = (
          <>
            <Text style={styles.modalIcon}>ℹ️</Text>
            <Text style={styles.modalTitle}>Information</Text>
            <Text style={styles.modalMessage}>
              This is an informational message with helpful details.
            </Text>
          </>
        );
        break;
      default:
        content = null;
    }

    return (
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
        testID={`modal-${modalType}`}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {content}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeModal}
              testID="modalCloseButton"
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            testID="backButton"
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UI Components</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Modals Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modals</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.successButton]}
                onPress={() => openModal('success')}
                testID="successModalButton"
              >
                <Text style={styles.modalButtonText}>Success</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.errorButton]}
                onPress={() => openModal('error')}
                testID="errorModalButton"
              >
                <Text style={styles.modalButtonText}>Error</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.warningButton]}
                onPress={() => openModal('warning')}
                testID="warningModalButton"
              >
                <Text style={styles.modalButtonText}>Warning</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.infoButton]}
                onPress={() => openModal('info')}
                testID="infoModalButton"
              >
                <Text style={styles.modalButtonText}>Info</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tooltips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tooltip</Text>
            <View style={styles.tooltipContainer}>
              <TouchableOpacity
                style={styles.tooltipTrigger}
                onPress={() =>
                  setActiveTooltip(activeTooltip === 'tip1' ? null : 'tip1')
                }
                testID="tooltipButton"
              >
                <Text style={styles.tooltipTriggerText}>
                  {activeTooltip === 'tip1' ? 'Hide Tooltip' : 'Show Tooltip'}{' '}
                  💡
                </Text>
              </TouchableOpacity>
              {activeTooltip === 'tip1' && (
                <View style={styles.tooltip} testID="tooltip">
                  <Text style={styles.tooltipText}>
                    This is a helpful tooltip message!
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Tabs Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tabs</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'tab1' && styles.activeTab]}
                onPress={() => setActiveTab('tab1')}
                testID="tab1"
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'tab1' && styles.activeTabText,
                  ]}
                >
                  {tabContent.tab1.icon} {tabContent.tab1.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'tab2' && styles.activeTab]}
                onPress={() => setActiveTab('tab2')}
                testID="tab2"
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'tab2' && styles.activeTabText,
                  ]}
                >
                  {tabContent.tab2.icon} {tabContent.tab2.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'tab3' && styles.activeTab]}
                onPress={() => setActiveTab('tab3')}
                testID="tab3"
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'tab3' && styles.activeTabText,
                  ]}
                >
                  {tabContent.tab3.icon} {tabContent.tab3.title}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabContent} testID={`${activeTab}Content`}>
              <Text style={styles.tabContentText}>
                {tabContent[activeTab].content}
              </Text>
            </View>
          </View>

          {/* Accordion Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accordion</Text>
            {accordionItems.map(item => (
              <View key={item.id} style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => toggleAccordion(item.id)}
                  testID={`accordion-${item.id}`}
                >
                  <Text style={styles.accordionTitle}>{item.title}</Text>
                  <Text style={styles.accordionIcon}>
                    {expandedAccordion === item.id ? '−' : '+'}
                  </Text>
                </TouchableOpacity>
                {expandedAccordion === item.id && (
                  <View
                    style={styles.accordionContent}
                    testID={`accordion-${item.id}-content`}
                  >
                    <Text style={styles.accordionText}>{item.content}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Carousel Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Carousel</Text>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.carousel}
              testID="carousel"
            >
              {carouselItems.map(item => (
                <View
                  key={item.id}
                  style={[
                    styles.carouselSlide,
                    { backgroundColor: item.color },
                  ]}
                  testID={`slide-${item.id}`}
                >
                  <Text style={styles.carouselEmoji}>{item.emoji}</Text>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.carouselDots}>
              {carouselItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dot,
                    currentSlide === index && styles.activeDot,
                  ]}
                  onPress={() => scrollToSlide(index)}
                  testID={`dot-${index}`}
                />
              ))}
            </View>
            <Text style={styles.slideIndicator} testID="slideIndicator">
              Slide {currentSlide + 1} of {carouselItems.length}
            </Text>
          </View>

          {/* Toggle Switches Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Toggle Switches</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Notifications</Text>
              <TouchableOpacity
                style={[
                  styles.toggleSwitch,
                  toggleStates.notifications && styles.toggleSwitchActive,
                ]}
                onPress={() => toggleSwitch('notifications')}
                testID="notificationsToggle"
              >
                <View
                  style={[
                    styles.toggleThumb,
                    toggleStates.notifications && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <TouchableOpacity
                style={[
                  styles.toggleSwitch,
                  toggleStates.darkMode && styles.toggleSwitchActive,
                ]}
                onPress={() => toggleSwitch('darkMode')}
                testID="darkModeToggle"
              >
                <View
                  style={[
                    styles.toggleThumb,
                    toggleStates.darkMode && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Auto Save</Text>
              <TouchableOpacity
                style={[
                  styles.toggleSwitch,
                  toggleStates.autoSave && styles.toggleSwitchActive,
                ]}
                onPress={() => toggleSwitch('autoSave')}
                testID="autoSaveToggle"
              >
                <View
                  style={[
                    styles.toggleThumb,
                    toggleStates.autoSave && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Progress Bar Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Progress Bar</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress * 100}%` }]}
                  testID="progressBar"
                />
              </View>
              <Text style={styles.progressText} testID="progressText">
                {Math.round(progress * 100)}%
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.progressButton}
                onPress={decreaseProgress}
                testID="decreaseProgress"
              >
                <Text style={styles.progressButtonText}>− Decrease</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.progressButton}
                onPress={increaseProgress}
                testID="increaseProgress"
              >
                <Text style={styles.progressButtonText}>+ Increase</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Star Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  testID={`star-${star}`}
                >
                  <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText} testID="ratingText">
              {rating > 0
                ? `You rated ${rating} star${rating > 1 ? 's' : ''}`
                : 'Tap to rate'}
            </Text>
          </View>
        </ScrollView>

        {renderModal()}
      </View>
    </SafeAreaView>
  );
};

UIComponents.propTypes = {
  onBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  errorButton: {
    backgroundColor: '#FF3B30',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  infoButton: {
    backgroundColor: '#000000',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tooltipContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  tooltipTrigger: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tooltipTriggerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tooltip: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    minHeight: 80,
  },
  tabContentText: {
    fontSize: 16,
    color: '#333',
  },
  accordionItem: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  accordionIcon: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  carousel: {
    height: 200,
  },
  carouselSlide: {
    width: width - 32,
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  carouselEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000000',
    width: 24,
  },
  slideIndicator: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  toggleSwitch: {
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#34C759',
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000000',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  progressButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    fontSize: 40,
    marginHorizontal: 4,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default UIComponents;
