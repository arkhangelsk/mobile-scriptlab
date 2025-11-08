import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const ShoppingCart = ({ onBack }) => {
  // Sample products catalog
  const productsCatalog = [
    { id: 1, name: 'Laptop', price: 999.99, image: '💻' },
    { id: 2, name: 'Smartphone', price: 699.99, image: '📱' },
    { id: 3, name: 'Headphones', price: 199.99, image: '🎧' },
    { id: 4, name: 'Keyboard', price: 79.99, image: '⌨️' },
    { id: 5, name: 'Mouse', price: 49.99, image: '🖱️' },
    { id: 6, name: 'Monitor', price: 349.99, image: '🖥️' },
    { id: 7, name: 'Webcam', price: 89.99, image: '📷' },
    { id: 8, name: 'Speakers', price: 129.99, image: '🔊' },
  ];

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Valid coupon codes
  const coupons = {
    SAVE10: { discount: 0.1, description: '10% off' },
    SAVE20: { discount: 0.2, description: '20% off' },
    FREESHIP: { discount: 0, description: 'Free shipping', freeShipping: true },
  };

  const addToCart = product => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart
        .map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      Alert.alert('Success', `Coupon ${couponCode.toUpperCase()} applied!`);
    } else {
      Alert.alert('Error', 'Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon || !appliedCoupon.discount) return 0;
    return calculateSubtotal() * appliedCoupon.discount;
  };

  const calculateShipping = () => {
    if (appliedCoupon?.freeShipping) return 0;
    return calculateSubtotal() > 500 ? 0 : 9.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  const clearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setCart([]);
          setAppliedCoupon(null);
          setCouponCode('');
        },
      },
    ]);
  };

  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    Alert.alert(
      'Checkout',
      `Total: $${calculateTotal().toFixed(2)}\n\nProceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed',
          onPress: () => {
            Alert.alert('Success', 'Order placed successfully!');
            setCart([]);
            setAppliedCoupon(null);
            setCouponCode('');
          },
        },
      ],
    );
  };

  const filteredProducts = productsCatalog.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText} testID="cartItemCount">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              testID="searchInput"
            />
          </View>

          {/* Products Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Products</Text>
            <View style={styles.productsGrid}>
              {filteredProducts.map(product => (
                <View key={product.id} style={styles.productCard}>
                  <Text style={styles.productImage}>{product.image}</Text>
                  <Text style={styles.productName} testID={`product-${product.id}-name`}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice} testID={`product-${product.id}-price`}>
                    ${product.price.toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(product)}
                    testID={`addToCart-${product.id}`}
                  >
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Cart Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Cart</Text>
              {cart.length > 0 && (
                <TouchableOpacity onPress={clearCart} testID="clearCartButton">
                  <Text style={styles.clearCartText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartIcon}>🛒</Text>
                <Text style={styles.emptyCartText} testID="emptyCartMessage">
                  Your cart is empty
                </Text>
              </View>
            ) : (
              <>
                {cart.map(item => (
                  <View key={item.id} style={styles.cartItem}>
                    <Text style={styles.cartItemImage}>{item.image}</Text>
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName} testID={`cart-item-${item.id}-name`}>
                        {item.name}
                      </Text>
                      <Text style={styles.cartItemPrice} testID={`cart-item-${item.id}-price`}>
                        ${item.price.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                        testID={`decrease-${item.id}`}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText} testID={`quantity-${item.id}`}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                        testID={`increase-${item.id}`}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      style={styles.removeButton}
                      testID={`remove-${item.id}`}
                    >
                      <Text style={styles.removeButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Coupon Section */}
                <View style={styles.couponContainer}>
                  <Text style={styles.couponLabel}>Coupon Code:</Text>
                  <View style={styles.couponInputRow}>
                    <TextInput
                      style={styles.couponInput}
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChangeText={setCouponCode}
                      autoCapitalize="characters"
                      testID="couponInput"
                      editable={!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <TouchableOpacity
                        style={styles.removeCouponButton}
                        onPress={removeCoupon}
                        testID="removeCouponButton"
                      >
                        <Text style={styles.removeCouponButtonText}>Remove</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.applyCouponButton}
                        onPress={applyCoupon}
                        testID="applyCouponButton"
                      >
                        <Text style={styles.applyCouponButtonText}>Apply</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {appliedCoupon && (
                    <Text style={styles.couponApplied} testID="appliedCouponText">
                      ✓ {appliedCoupon.description} applied
                    </Text>
                  )}
                  <Text style={styles.couponHint}>
                    Try: SAVE10, SAVE20, FREESHIP
                  </Text>
                </View>

                {/* Price Summary */}
                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal:</Text>
                    <Text style={styles.summaryValue} testID="subtotal">
                      ${calculateSubtotal().toFixed(2)}
                    </Text>
                  </View>
                  {appliedCoupon && appliedCoupon.discount > 0 && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>
                        Discount ({appliedCoupon.description}):
                      </Text>
                      <Text style={styles.discountValue} testID="discount">
                        -${calculateDiscount().toFixed(2)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shipping:</Text>
                    <Text style={styles.summaryValue} testID="shipping">
                      {calculateShipping() === 0
                        ? 'FREE'
                        : `$${calculateShipping().toFixed(2)}`}
                    </Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue} testID="total">
                      ${calculateTotal().toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Checkout Button */}
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={checkout}
                  testID="checkoutButton"
                >
                  <Text style={styles.checkoutButtonText}>
                    Checkout (${calculateTotal().toFixed(2)})
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

ShoppingCart.propTypes = {
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
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  clearCartText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    fontSize: 48,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyCartIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItemImage: {
    fontSize: 32,
    marginRight: 12,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 20,
  },
  couponContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  couponLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  couponInputRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 8,
  },
  applyCouponButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  applyCouponButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  removeCouponButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  removeCouponButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  couponApplied: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  couponHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingCart;
