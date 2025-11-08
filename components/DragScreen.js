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

const { width, height } = Dimensions.get('window');

// Draggable List Item Component
const DraggableListItem = ({
  item,
  index,
  onDragEnd,
  onDragStart,
  onDragRelease,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        setIsDragging(true);
        if (onDragStart) onDragStart();
        pan.setOffset({ x: 0, y: 0 });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        if (onDragRelease) onDragRelease();
        pan.flattenOffset();

        const draggedDistance = gestureState.dy;
        const itemHeight = 68; // Approximate height including margins
        const threshold = itemHeight / 2;

        if (Math.abs(draggedDistance) > threshold) {
          const positions = Math.round(draggedDistance / itemHeight);
          onDragEnd(index, positions);
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.listItem,
        isDragging && styles.listItemDragging,
        {
          transform: pan.getTranslateTransform(),
          zIndex: isDragging ? 1000 : 1,
        },
      ]}
      {...panResponder.panHandlers}
      testID={`draggableListItem-${item.id}`}
    >
      <Text style={styles.dragHandle}>☰</Text>
      <Text style={styles.listItemText}>{item.title}</Text>
      <Text style={styles.listItemOrder}>#{index + 1}</Text>
    </Animated.View>
  );
};

DraggableListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragRelease: PropTypes.func,
};

// Draggable Drop Item Component
const DraggableDropItem = ({ item, onDrop, onDragStart, onDragRelease }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDropped, setIsDropped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isDropped,
      onMoveShouldSetPanResponder: () => !isDropped,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        setIsDragging(true);
        if (onDragStart) onDragStart();
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        if (onDragRelease) onDragRelease();
        // Drop zone is approximately 120px below (marginBottom value)
        if (gestureState.dy > 100) {
          setIsDropped(true);

          // Animate to the drop zone position (120px down to reach the zone)
          Animated.spring(pan, {
            toValue: { x: 0, y: 120 },
            useNativeDriver: false,
          }).start();

          onDrop(item.id, item.emoji);
        } else {
          // Return to original position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.dropItem,
        { backgroundColor: item.color },
        {
          transform: pan.getTranslateTransform(),
          opacity: isDropped ? 0.3 : 1,
          zIndex: isDragging ? 1000 : 10,
          elevation: isDragging ? 10 : 5,
        },
      ]}
      {...panResponder.panHandlers}
      testID={`dropItem-${item.id}`}
    >
      <Text style={styles.dropItemEmoji}>{item.emoji}</Text>
    </Animated.View>
  );
};

DraggableDropItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragRelease: PropTypes.func,
};

// Drag to Drop Zone Component
const DragToDropZone = ({ onDragStart, onDragRelease }) => {
  const [dragItems] = useState([
    { id: 1, emoji: '🎯', color: '#FF6B6B' },
    { id: 2, emoji: '⭐', color: '#4ECDC4' },
    { id: 3, emoji: '💎', color: '#45B7D1' },
    { id: 4, emoji: '🎨', color: '#FFA07A' },
  ]);

  const [droppedCount, setDroppedCount] = useState(0);

  const handleDrop = (itemId, emoji) => {
    setDroppedCount(prev => prev + 1);
    Alert.alert('Success', `${emoji} dropped in zone!`);
  };

  return (
    <View style={styles.dropZoneContainer}>
      <View style={styles.dropItemsRow}>
        {dragItems.map(item => (
          <DraggableDropItem
            key={item.id}
            item={item}
            onDrop={handleDrop}
            onDragStart={onDragStart}
            onDragRelease={onDragRelease}
          />
        ))}
      </View>
      <View style={styles.dropZone} testID="dropZone">
        <Text style={styles.dropZoneText}>📦 Drop Zone</Text>
        <Text style={styles.dropZoneCount}>
          Dropped: {droppedCount}/{dragItems.length}
        </Text>
      </View>
    </View>
  );
};

DragToDropZone.propTypes = {
  onDragStart: PropTypes.func,
  onDragRelease: PropTypes.func,
};

const DragScreen = ({ onBack }) => {
  const scrollViewRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [listItems, setListItems] = useState([
    { id: 1, title: 'First Item' },
    { id: 2, title: 'Second Item' },
    { id: 3, title: 'Third Item' },
    { id: 4, title: 'Fourth Item' },
    { id: 5, title: 'Fifth Item' },
  ]);

  const handleDragEnd = (fromIndex, positions) => {
    if (positions === 0) return;

    setListItems(prevItems => {
      const newItems = [...prevItems];
      const toIndex = Math.max(
        0,
        Math.min(fromIndex + positions, newItems.length - 1),
      );

      if (toIndex !== fromIndex) {
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        Alert.alert(
          'Reordered',
          `Moved "${movedItem.title}" from position ${fromIndex + 1} to ${
            toIndex + 1
          }`,
        );
      }

      return newItems;
    });
  };

  const resetList = () => {
    setListItems([
      { id: 1, title: 'First Item' },
      { id: 2, title: 'Second Item' },
      { id: 3, title: 'Third Item' },
      { id: 4, title: 'Fourth Item' },
      { id: 5, title: 'Fifth Item' },
    ]);
    Alert.alert('Reset', 'List order has been reset');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
          <Text style={styles.headerTitle}>Drag & Drop</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.content}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
        >
          {/* Drag to Reorder List */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Drag to Reorder</Text>
                <Text style={styles.sectionSubtitle}>
                  Drag items vertically to reorder
                </Text>
              </View>
              <TouchableOpacity
                onPress={resetList}
                style={styles.resetButton}
                testID="resetListButton"
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reorderList}>
              {listItems.map((item, index) => (
                <DraggableListItem
                  key={item.id}
                  item={item}
                  index={index}
                  onDragEnd={handleDragEnd}
                  onDragStart={() => setScrollEnabled(false)}
                  onDragRelease={() => setScrollEnabled(true)}
                />
              ))}
            </View>
          </View>

          {/* Drag to Drop Zone */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Drag to Drop Zone</Text>
            <Text style={styles.sectionSubtitle}>
              Drag items down to the drop zone
            </Text>
            <DragToDropZone
              onDragStart={() => setScrollEnabled(false)}
              onDragRelease={() => setScrollEnabled(true)}
            />
          </View>

          {/* Drag Slider */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Drag Slider</Text>
            <Text style={styles.sectionSubtitle}>
              Drag the slider to adjust value
            </Text>
            <DragSlider />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Drag Slider Component
const DragSlider = () => {
  const [value, setValue] = useState(50);
  const sliderWidth = width - 80;
  const pan = useRef(new Animated.Value(sliderWidth / 2)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        pan.setOffset(pan._value);
        pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dx: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const currentValue = Math.max(0, Math.min(pan._value, sliderWidth));
        const percentage = Math.round((currentValue / sliderWidth) * 100);
        setValue(percentage);

        pan.setValue(currentValue);
      },
    }),
  ).current;

  const thumbPosition = pan.interpolate({
    inputRange: [0, sliderWidth],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderValue} testID="sliderValue">
        {value}%
      </Text>
      <View style={styles.sliderTrack}>
        <Animated.View
          style={[
            styles.sliderFill,
            {
              width: thumbPosition,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.sliderThumb,
            {
              transform: [{ translateX: thumbPosition }],
            },
          ]}
          {...panResponder.panHandlers}
          testID="sliderThumb"
        />
      </View>
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>0%</Text>
        <Text style={styles.sliderLabel}>50%</Text>
        <Text style={styles.sliderLabel}>100%</Text>
      </View>
    </View>
  );
};

DragScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    minWidth: 80,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  placeholder: {
    width: 80,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Reorder List Styles
  reorderList: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemDragging: {
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#F0F8FF',
  },
  dragHandle: {
    fontSize: 20,
    color: '#999999',
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  listItemOrder: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  // Drop Zone Styles
  dropZoneContainer: {
    minHeight: 350,
    position: 'relative',
  },
  dropItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 120,
    paddingVertical: 20,
    zIndex: 10,
  },
  dropItem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropItemEmoji: {
    fontSize: 28,
  },
  dropZone: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dropZoneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  dropZoneCount: {
    fontSize: 16,
    color: '#66BB6A',
  },
  // Slider Styles
  sliderContainer: {
    paddingVertical: 20,
  },
  sliderValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    position: 'relative',
    marginHorizontal: 20,
  },
  sliderFill: {
    position: 'absolute',
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000000',
    top: -12,
    marginLeft: -16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 12,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666666',
  },
});

export default DragScreen;
