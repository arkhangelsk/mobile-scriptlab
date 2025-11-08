import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

// Separate component for swipeable list items
const SwipeableItem = ({ item, onDelete, onMarkRead }) => {
  const pan = useRef(new Animated.Value(0)).current;
  const isDeleting = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 && !isDeleting.current;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0 && !isDeleting.current) {
          pan.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isDeleting.current) {
          return;
        }

        if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swipe left to delete
          isDeleting.current = true;
          Animated.timing(pan, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onDelete(item.id);
          });
        } else {
          // Reset position
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.swipeItem,
        {
          transform: [{ translateX: pan }],
        },
      ]}
      {...panResponder.panHandlers}
      testID={`swipeItem-${item.id}`}
    >
      <View style={styles.swipeItemContent}>
        <View style={styles.swipeItemLeft}>
          <View
            style={[
              styles.readIndicator,
              item.read && styles.readIndicatorRead,
            ]}
          />
          <View style={styles.swipeItemTextContainer}>
            <Text style={styles.swipeItemTitle}>{item.title}</Text>
            <Text style={styles.swipeItemSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onMarkRead(item.id)}
          style={styles.markReadButton}
          testID={`markRead-${item.id}`}
        >
          <Text style={styles.markReadButtonText}>{item.read ? '✓' : '○'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>🗑️ Delete</Text>
      </View>
    </Animated.View>
  );
};

SwipeableItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkRead: PropTypes.func.isRequired,
};

const SwipeScreen = ({ onBack }) => {
  // Swipeable list items state
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Email from John',
      subtitle: 'Meeting tomorrow at 10 AM',
      read: false,
    },
    {
      id: 2,
      title: 'Email from Sarah',
      subtitle: 'Project update needed',
      read: false,
    },
    { id: 3, title: 'Email from Mike', subtitle: 'Lunch plans?', read: true },
    {
      id: 4,
      title: 'Email from Anna',
      subtitle: 'Report attached',
      read: false,
    },
    { id: 5, title: 'Email from Tom', subtitle: 'Quick question', read: true },
  ]);

  // Swipe to refresh state
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());

  // Swipe cards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSwipingCard, setIsSwipingCard] = useState(false);
  const cardPosition = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: 'Card 1',
      color: '#FF6B6B',
      emoji: '🎯',
      description: 'Swipe right to like',
    },
    {
      id: 2,
      title: 'Card 2',
      color: '#4ECDC4',
      emoji: '⭐',
      description: 'Swipe left to skip',
    },
    {
      id: 3,
      title: 'Card 3',
      color: '#45B7D1',
      emoji: '💎',
      description: 'Swipe up to favorite',
    },
    {
      id: 4,
      title: 'Card 4',
      color: '#FFA07A',
      emoji: '🎨',
      description: 'Swipe down to hide',
    },
    {
      id: 5,
      title: 'Card 5',
      color: '#98D8C8',
      emoji: '🚀',
      description: 'Last card!',
    },
  ];

  // Delete item handler
  const deleteItem = itemId => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    Alert.alert('Deleted', 'Item removed from list');
  };

  const markAsRead = itemId => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, read: true } : item,
      ),
    );
  };

  // Swipe card handlers
  const cardPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setIsSwipingCard(true);
        return true;
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Capture gesture if moved more than 5 pixels in any direction
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: Animated.event(
        [null, { dx: cardPosition.x, dy: cardPosition.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;

        // Determine swipe direction - check if movement exceeded threshold
        const horizontalSwipe = Math.abs(dx) > SWIPE_THRESHOLD;
        const verticalSwipe = Math.abs(dy) > SWIPE_THRESHOLD;

        if (!horizontalSwipe && !verticalSwipe) {
          // No significant swipe, reset
          resetCardPosition();
          setIsSwipingCard(false);
          return;
        }

        // Prioritize the stronger swipe direction
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe is stronger
          if (dx > SWIPE_THRESHOLD) {
            // Swipe right (like)
            swipeCard('right');
          } else if (dx < -SWIPE_THRESHOLD) {
            // Swipe left (skip)
            swipeCard('left');
          } else {
            resetCardPosition();
            setIsSwipingCard(false);
          }
        } else {
          // Vertical swipe is stronger
          if (dy < -SWIPE_THRESHOLD) {
            // Swipe up (favorite)
            swipeCard('up');
          } else if (dy > SWIPE_THRESHOLD) {
            // Swipe down (hide)
            swipeCard('down');
          } else {
            resetCardPosition();
            setIsSwipingCard(false);
          }
        }
      },
    }),
  ).current;

  const swipeCard = direction => {
    const directionMap = {
      right: { x: width + 100, y: 0, action: 'Liked' },
      left: { x: -width - 100, y: 0, action: 'Skipped' },
      up: { x: 0, y: -1000, action: 'Favorited' },
      down: { x: 0, y: 1000, action: 'Hidden' },
    };

    const { x, y, action } = directionMap[direction];

    Animated.spring(cardPosition, {
      toValue: { x, y },
      useNativeDriver: true,
    }).start(() => {
      Alert.alert(
        `Card ${action}!`,
        `You ${action.toLowerCase()} ${cards[currentCardIndex].title}`,
      );
      setCurrentCardIndex(prev => prev + 1);
      cardPosition.setValue({ x: 0, y: 0 });
      setIsSwipingCard(false);
    });
  };

  const resetCardPosition = () => {
    Animated.spring(cardPosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshTime(new Date());
      Alert.alert('Refreshed', 'Content has been updated!');
    }, 1500);
  };

  const resetCards = () => {
    setCurrentCardIndex(0);
    cardPosition.setValue({ x: 0, y: 0 });
  };

  const renderSwipeCard = () => {
    if (currentCardIndex >= cards.length) {
      return (
        <View style={styles.noMoreCards} testID="noMoreCards">
          <Text style={styles.noMoreCardsEmoji}>🎉</Text>
          <Text style={styles.noMoreCardsText}>No more cards!</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetCards}
            testID="resetCardsButton"
          >
            <Text style={styles.resetButtonText}>Reset Cards</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const card = cards[currentCardIndex];
    const rotate = cardPosition.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.swipeCard,
          {
            backgroundColor: card.color,
            transform: [
              { translateX: cardPosition.x },
              { translateY: cardPosition.y },
              { rotate },
            ],
          },
        ]}
        {...cardPanResponder.panHandlers}
        testID={`swipeCard-${card.id}`}
      >
        <Text style={styles.cardEmoji}>{card.emoji}</Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardDescription}>{card.description}</Text>
      </Animated.View>
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
          <Text style={styles.headerTitle}>Swipe Gestures</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.content}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isSwipingCard}
        >
          {/* Swipe Cards Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Swipe Cards</Text>
            <Text style={styles.sectionSubtitle}>
              Swipe in any direction to interact
            </Text>
            <View style={styles.swipeCardContainer}>{renderSwipeCard()}</View>
            <View style={styles.swipeHints}>
              <View style={styles.hintItem}>
                <Text style={styles.hintEmoji}>👉</Text>
                <Text style={styles.hintText}>Right = Like</Text>
              </View>
              <View style={styles.hintItem}>
                <Text style={styles.hintEmoji}>👈</Text>
                <Text style={styles.hintText}>Left = Skip</Text>
              </View>
              <View style={styles.hintItem}>
                <Text style={styles.hintEmoji}>👆</Text>
                <Text style={styles.hintText}>Up = Favorite</Text>
              </View>
              <View style={styles.hintItem}>
                <Text style={styles.hintEmoji}>👇</Text>
                <Text style={styles.hintText}>Down = Hide</Text>
              </View>
            </View>
            <Text style={styles.cardCounter} testID="cardCounter">
              Card {currentCardIndex + 1} of {cards.length}
            </Text>
          </View>

          {/* Swipe to Delete Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Swipe to Delete</Text>
            <Text style={styles.sectionSubtitle}>
              Swipe left on items to delete
            </Text>
            {items.length === 0 ? (
              <View style={styles.emptyList} testID="emptyList">
                <Text style={styles.emptyListEmoji}>📭</Text>
                <Text style={styles.emptyListText}>No items in list</Text>
              </View>
            ) : (
              items.map(item => (
                <SwipeableItem
                  key={item.id}
                  item={item}
                  onDelete={deleteItem}
                  onMarkRead={markAsRead}
                />
              ))
            )}
          </View>

          {/* Pull to Refresh Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pull to Refresh</Text>
            <View style={styles.refreshContainer}>
              <Text style={styles.refreshText}>
                Last refreshed: {lastRefreshTime.toLocaleTimeString()}
              </Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefresh}
                disabled={refreshing}
                testID="refreshButton"
              >
                <Text style={styles.refreshButtonText}>
                  {refreshing ? '⟳ Refreshing...' : '↻ Refresh'}
                </Text>
              </TouchableOpacity>
              {refreshing && (
                <View
                  style={styles.refreshingIndicator}
                  testID="refreshingIndicator"
                >
                  <Text style={styles.refreshingText}>Updating content...</Text>
                </View>
              )}
            </View>
          </View>

          {/* Horizontal Swipe Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horizontal Scroll</Text>
            <Text style={styles.sectionSubtitle}>
              Swipe left/right to browse items
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              testID="horizontalScroll"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <View
                  key={num}
                  style={[
                    styles.horizontalItem,
                    { backgroundColor: `hsl(${num * 40}, 70%, 60%)` },
                  ]}
                  testID={`horizontalItem-${num}`}
                >
                  <Text style={styles.horizontalItemText}>Item {num}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

SwipeScreen.propTypes = {
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  swipeCardContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  swipeCard: {
    width: width - 80,
    height: 280,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  noMoreCards: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noMoreCardsEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  swipeHints: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  hintEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
  },
  cardCounter: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  swipeItem: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  swipeItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  swipeItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  readIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
    marginRight: 12,
  },
  readIndicatorRead: {
    backgroundColor: '#E0E0E0',
  },
  swipeItemTextContainer: {
    flex: 1,
  },
  swipeItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  swipeItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  markReadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markReadButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyList: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyListEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyListText: {
    fontSize: 16,
    color: '#999',
  },
  refreshContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  refreshText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshingIndicator: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  refreshingText: {
    fontSize: 14,
    color: '#333',
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  horizontalItem: {
    width: 150,
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  horizontalItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SwipeScreen;
