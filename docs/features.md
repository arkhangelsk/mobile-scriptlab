# ScriptLab - Mobile App Features

A comprehensive React Native mobile application designed for practicing test automation with various interactive UI components and user flows.

---

## 📱 Application Screens

### 1. **Sign In Screen**

- User authentication entry point
- Email and password validation
- Secure password input with toggle visibility
- Loading state with ActivityIndicator
- Form validation with error messages
- Modern UI with centered layout

**Test IDs:**

- `emailInput`, `passwordInput`
- `loginButton`
- Form validation states

---

### 2. **Menu Screen**

Main navigation hub after successful login with the following options:

#### Available Menu Items:

1. **Forms & Inputs** 📝
2. **Shopping Cart** 🛒
3. **UI Components** 🎨
4. **File Handling** 📁
5. **Alerts & Notification** 🔔

**Test IDs:**

- `backButton`
- `logoutButton`
- Menu item buttons for navigation

---

## 🎯 Feature Screens

### 3. **Forms & Inputs - User Registration Form**

A comprehensive registration form with all standard form elements:

#### Form Fields:

- **First Name** - Text input with validation
- **Last Name** - Text input with validation
- **Email** - Email validation with regex pattern
- **Password** - Secure input with strength validation (min 6 characters)
- **Confirm Password** - Password matching validation
- **Date of Birth** - Platform-specific date picker
  - iOS: Modal with spinner-style picker
  - Android: Native calendar dialog
  - Format: MM/DD/YYYY
  - Maximum date: Today (no future dates)
- **Website** - URL input (full-width)
- **Country** - Dropdown selection with 9 countries
  - United States, Canada, United Kingdom, Australia, Germany, France, Japan, India, Brazil
  - Modal-style vertical dropdown with checkmark selection
- **Experience Level** - Radio buttons (4 options)
  - Beginner, Intermediate, Advanced, Expert
- **Technical Skills** - Multi-select checkboxes (8 skills)
  - JavaScript, Python, Java, C++, React, Node.js, SQL, Git
- **Bio** - Multi-line text area
- **Terms & Conditions** - Checkbox agreement
- **Newsletter Subscription** - Optional checkbox

#### Actions:

- **Submit Registration** - Validates all fields and shows success alert
- **Reset Form** - Clears all form data

**Test IDs:**

- `firstNameInput`, `lastNameInput`, `emailInput`, `passwordInput`, `confirmPasswordInput`
- `dobInput`, `websiteInput`
- `countryDropdown`, `country-{countryName}`
- `experienceLevel-{level}`
- `skill-{skillName}`
- `bioInput`
- `termsCheckbox`, `newsletterCheckbox`
- `submitButton`, `resetButton`

---

### 4. **Shopping Cart**

A fully functional e-commerce shopping cart with product catalog and checkout flow.

#### Product Catalog (8 Products):

1. **Laptop** 💻 - $999.99
2. **Smartphone** 📱 - $699.99
3. **Headphones** 🎧 - $199.99
4. **Keyboard** ⌨️ - $79.99
5. **Mouse** 🖱️ - $49.99
6. **Monitor** 🖥️ - $349.99
7. **Webcam** 📷 - $89.99
8. **Speakers** 🔊 - $129.99

#### Features:

- **Search Functionality** - Filter products by name
- **Add to Cart** - Add products with automatic quantity update
- **Cart Management**
  - Increase/decrease quantity with +/- buttons
  - Remove individual items
  - Clear all items from cart
  - Cart badge showing total item count
- **Coupon System**
  - `SAVE10` - 10% discount
  - `SAVE20` - 20% discount
  - `FREESHIP` - Free shipping
  - Apply/remove coupon functionality
- **Price Calculations**
  - Subtotal
  - Discount (if coupon applied)
  - Shipping ($9.99 or FREE if order > $500 or FREESHIP coupon)
  - Total with all calculations
- **Checkout Flow**
  - Checkout confirmation dialog
  - Success message
  - Cart clears after successful checkout

**Test IDs:**

- `searchInput`
- `product-{id}-name`, `product-{id}-price`
- `addToCart-{id}`
- `cart-item-{id}-name`, `cart-item-{id}-price`
- `increase-{id}`, `decrease-{id}`, `quantity-{id}`, `remove-{id}`
- `couponInput`, `applyCouponButton`, `removeCouponButton`, `appliedCouponText`
- `subtotal`, `discount`, `shipping`, `total`
- `checkoutButton`, `clearCartButton`
- `cartItemCount`, `emptyCartMessage`

---

### 5. **UI Components**

A comprehensive showcase of interactive UI components for test automation practice.

#### 5.1 Modals (4 Types)

- **Success Modal** ✅ - Green themed with success message
- **Error Modal** ❌ - Red themed with error message
- **Warning Modal** ⚠️ - Orange themed with warning message
- **Info Modal** ℹ️ - Blue themed with information message

Each modal features:

- Overlay background
- Animated fade-in effect
- Large emoji icon
- Title and message text
- Close button

**Test IDs:**

- `successModalButton`, `errorModalButton`, `warningModalButton`, `infoModalButton`
- `modal-{type}` (success/error/warning/info)
- `modalCloseButton`

---

#### 5.2 Tooltips (3 Instances)

- Toggle visibility on click/tap
- Dark background with white text
- Positioned below trigger buttons
- Individual tooltip messages

**Test IDs:**

- `tooltip1Button`, `tooltip2Button`, `tooltip3Button`
- `tooltip1`, `tooltip2`, `tooltip3`

---

#### 5.3 Tabs (3 Tabs)

- **Profile Tab** 👤 - User profile information
- **Settings Tab** ⚙️ - Configuration options
- **Messages Tab** 💬 - Conversations view

Features:

- Active state highlighting with bottom border
- Dynamic content switching
- Emoji icons with labels

**Test IDs:**

- `tab1`, `tab2`, `tab3`
- `tab1Content`, `tab2Content`, `tab3Content`

---

#### 5.4 Accordion (3 Items)

Expandable/collapsible FAQ-style panels:

1. **What is React Native?**
   - Explanation of React Native framework
2. **What is Test Automation?**
   - Definition and benefits of test automation
3. **What is Appium?**
   - Overview of Appium framework

Features:

- Individual expand/collapse control
- Plus/minus icon indicators
- Smooth animations
- One item expandable at a time

**Test IDs:**

- `accordion-acc1`, `accordion-acc2`, `accordion-acc3`
- `accordion-{id}-content`

---

#### 5.5 Carousel (4 Slides)

Interactive image carousel with colored slides:

1. **Slide 1** 🎨 - Red (#FF6B6B)
2. **Slide 2** 🎭 - Teal (#4ECDC4)
3. **Slide 3** 🎪 - Blue (#45B7D1)
4. **Slide 4** 🎡 - Orange (#FFA07A)

Features:

- Horizontal swipe navigation
- Dot indicators (clickable for direct navigation)
- Slide counter display (e.g., "Slide 1 of 4")
- Programmatic navigation
- Paging enabled for smooth scrolling

**Test IDs:**

- `carousel`
- `slide-{id}` (slide-1 to slide-4)
- `dot-{index}` (dot-0 to dot-3)
- `slideIndicator`

---

#### 5.6 Toggle Switches (3 Switches)

iOS-style toggle switches with animated thumb movement:

1. **Notifications** - Default: OFF
2. **Dark Mode** - Default: OFF
3. **Auto Save** - Default: ON

Features:

- Smooth thumb animation on toggle
- Color change (gray → green when active)
- Thumb position translation
- Individual state management

**Test IDs:**

- `notificationsToggle`
- `darkModeToggle`
- `autoSaveToggle`

---

#### 5.7 Progress Bar

Visual progress indicator with controls:

- Range: 0% to 100%
- Default: 50%
- Color-coded fill (blue)
- Percentage display
- Increase button (+10%)
- Decrease button (-10%)

**Test IDs:**

- `progressBar`
- `progressText`
- `increaseProgress`
- `decreaseProgress`

---

#### 5.8 Star Rating

Interactive 5-star rating system:

- 5 stars (☆/⭐)
- Click/tap to set rating
- Visual feedback (filled vs unfilled stars)
- Rating text display
- Reset by clicking same star or different star

**Test IDs:**

- `star-1`, `star-2`, `star-3`, `star-4`, `star-5`
- `ratingText`

---

## 🔧 Technical Stack

- **Framework:** React Native 0.82.1
- **Language:** JavaScript (Components), TypeScript (App.tsx)
- **UI Components:** React Native core components
- **State Management:** React Hooks (useState, useRef)
- **Navigation:** State-based navigation
- **Type Checking:** PropTypes
- **Safe Area:** react-native-safe-area-context
- **Date Picker:** @react-native-community/datetimepicker
- **Platform Support:** iOS and Android with platform-specific code

---

## 🎯 Test Automation Focus

This application is specifically designed for practicing mobile test automation with:

1. **Comprehensive Test IDs** - Every interactive element has a unique testID
2. **Diverse UI Components** - Wide variety of component types to test
3. **Form Validation** - Multiple validation scenarios
4. **State Management** - Dynamic content and state changes
5. **User Flows** - Complete user journeys (login → menu → features)
6. **Platform-Specific Elements** - iOS vs Android differences
7. **Interactive Elements** - Modals, tooltips, carousels, accordions
8. **E-commerce Flow** - Shopping cart with calculations and checkout
9. **Gestures** - Swipe (carousel), tap, scroll
10. **Conditional Rendering** - Show/hide elements based on state

---

## 📋 Automation Testing Scenarios

### Functional Testing:

- Login with valid/invalid credentials
- Form validation and submission
- Shopping cart operations (add, remove, update quantity)
- Coupon code application
- Modal interactions
- Tab switching
- Accordion expand/collapse
- Carousel navigation
- Toggle switch state changes
- Progress bar updates
- Star rating selection

### UI/UX Testing:

- Component visibility
- Tooltip display
- Modal animations
- Active state indicators
- Dynamic content rendering
- Platform-specific UI elements

### Data Validation:

- Email format validation
- Password strength requirements
- Date picker constraints
- Price calculations
- Coupon code validation
- Form field requirements

### Navigation Testing:

- Screen transitions
- Back navigation
- Menu navigation
- Logout functionality
- Deep linking to specific screens

---

## 🚀 Getting Started

1. **Installation:**

   ```bash
   npm install
   ```

2. **iOS Setup:**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run on iOS:**

   ```bash
   npx react-native run-ios
   ```

4. **Run on Android:**
   ```bash
   npx react-native run-android
   ```

---

## 📱 Test Credentials

For testing purposes, the sign-in screen accepts any valid email format and password (minimum 6 characters).

---

## 🔄 Future Enhancements

- **File Handling** screen implementation
- **Alerts & Notification** screen implementation
- Additional form components
- More complex user flows
- API integration examples
- Error handling scenarios
- Loading states and spinners
- Pull-to-refresh functionality
- Infinite scroll lists

---

_Last Updated: November 8, 2025_
