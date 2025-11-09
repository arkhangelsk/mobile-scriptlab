# ScriptLab - Mobile App Features

A comprehensive React Native mobile application designed for practicing test automation with various interactive UI components and user flows.

---

## 📱 Application Architecture

### Navigation Structure

- **Authentication Layer**: Sign-in screen
- **Main Navigation**: Bottom Tab Navigator with 5 tabs
- **Nested Navigation**: Stack navigators for complex flows
- **Platform Support**: iOS and Android with platform-specific optimizations

---

## 🏠 Bottom Tab Navigation (Post-Login)

After successful login, users have access to 5 main tabs:

### 1. **Home** 🏠

- Welcome screen with app branding
- User greeting with username display
- Navigation prompt to Practice tab
- Clean, minimal design

---

### 2. **Practice** 🎯

Main hub for automation practice exercises with 6 interactive scenarios:

#### Available Practice Exercises:

1. **Forms & Inputs** 📝 - User Registration Form
2. **Shopping Cart** 🛒 - E-commerce Flow
3. **UI Components** 🎨 - Component Showcase
4. **Swipe** 👆 - Swipe Gestures
5. **Drag** 🔄 - Drag & Drop
6. **Webview** 🌐 - Web Content Integration

**Navigation:**

- Grid layout with clickable cards
- Each card navigates to respective practice screen
- Back navigation to return to practice menu

---

### 3. **Challenges** 🏆

- Placeholder for future automation challenges
- Coming soon message
- Reserved for test automation scenarios

---

### 4. **Learn** 📚

Educational resources section with curated learning content:

#### Udemy Courses (3 Featured):

1. **Roadmap to become a test automation engineer**

   - Test automation fundamentals
   - Course image thumbnail
   - External link to Udemy course

2. **Generative AI Course**

   - AI/ML fundamentals and applications
   - Course image thumbnail
   - External link to Udemy course

3. **AI Agents**
   - Building intelligent AI agents
   - Course image thumbnail
   - External link to Udemy course

#### Learning Resources (3 Links):

1. **Blog Link** - Software Testing Trends and Tutorials
2. **YouTube Link** - [Software Testing Trends](https://www.youtube.com/@softwaretestingtrends)
3. **YouTube Link** - [Learning Expressway](https://www.youtube.com/@learningexpressway/)

**Features:**

- Image thumbnails for courses
- Clickable cards for external links
- Scrollable content view

---

### 5. **More** ⋯

User profile and app information hub:

#### User Profile Section:

- Logo display (black circular background)
- Username: "scriptlab"
- Tagline: "Mobile Automation Practice Hub"

#### Options Menu:

1. **Privacy** 🔒

   - Navigate to Privacy Policy screen
   - Comprehensive privacy information

2. **Connect** 🌐

   - Social media links
   - Community connection options

3. **About** ℹ️

   - App information
   - Version details
   - Features overview

4. **Logout** 🚪
   - Sign out functionality
   - Returns to login screen

---

## 📄 Additional Screens (Nested Navigation)

### Privacy Policy Screen

Comprehensive privacy policy with 8 sections:

1. **Information We Collect**

   - Types of data collected
   - Collection methods

2. **How We Use Your Information**

   - Data usage purposes
   - Processing activities

3. **Information Sharing**

   - Third-party sharing policies
   - Data transfer conditions

4. **Data Security**

   - Security measures
   - Protection protocols

5. **Your Rights**

   - User data rights
   - Access and deletion

6. **Cookies and Tracking**

   - Cookie usage
   - Tracking technologies

7. **Children's Privacy**

   - Age restrictions
   - Parental consent

8. **Contact Us**
   - Support contact information
   - Privacy inquiries

---

### Connect Screen

Social media and community connections with 4 platforms:

1. **Medium** 📝

   - Blog and articles
   - URL: [Medium](https://medium.com/@ambysan)
   - Link icon for external navigation

2. **X (Twitter)** 🐦

   - Social updates
   - URL: [X (Twitter)](https://x.com/ambysan)
   - Link icon for external navigation

3. **LinkedIn** 💼

   - Professional network
   - URL: [LinkedIn Group](https://www.linkedin.com/groups/14863012/)
   - Link icon for external navigation

4. **Discord** 💬
   - Community chat
   - URL: [Discord](https://discord.gg/Esg4EZDtng)
   - Link icon for external navigation

---

### About Screen

App information and features details

## 📱 Application Screens

### 1. **Sign In Screen**

- User authentication entry point
- Email and password validation

---

### 2. **Practice Screen (Main Menu)**

Central hub for all automation practice exercises accessible via Practice tab:

#### Available Practice Items:

1. **Forms & Inputs** 📝
2. **Shopping Cart** 🛒
3. **UI Components** 🎨
4. **Swipe** �
5. **Drag** �

---

## 🎯 Practice Exercise Screens

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

---

### 5. **UI Components**

A comprehensive showcase of interactive UI components for test automation practice.

#### 5.1 Modals (4 Types)

- **Success Modal** ✅ - Green themed with success message
- **Error Modal** ❌ - Red themed with error message
- **Warning Modal** ⚠️ - Orange themed with warning message
- **Info Modal** ℹ️ - Blue themed with information message

---

#### 5.2 Tooltips (3 Instances)

- Toggle visibility on click/tap
- Dark background with white text
- Positioned below trigger buttons
- Individual tooltip messages

---

#### 5.3 Tabs (3 Tabs)

- **Profile Tab** 👤 - User profile information
- **Settings Tab** ⚙️ - Configuration options
- **Messages Tab** 💬 - Conversations view

---

#### 5.4 Accordion (3 Items)

Expandable/collapsible FAQ-style panels:

1. **What is React Native?**
   - Explanation of React Native framework
2. **What is Test Automation?**
   - Definition and benefits of test automation
3. **What is Appium?**
   - Overview of Appium framework

---

#### 5.5 Carousel (4 Slides)

Interactive image carousel with colored slides:

1. **Slide 1** 🎨 - Red (#FF6B6B)
2. **Slide 2** 🎭 - Teal (#4ECDC4)
3. **Slide 3** 🎪 - Blue (#45B7D1)
4. **Slide 4** 🎡 - Orange (#FFA07A)

---

#### 5.6 Toggle Switches (3 Switches)

iOS-style toggle switches with animated thumb movement:

1. **Notifications** - Default: OFF
2. **Dark Mode** - Default: OFF
3. **Auto Save** - Default: ON

---

#### 5.7 Progress Bar

Visual progress indicator with controls:

- Range: 0% to 100%
- Default: 50%
- Color-coded fill (blue)
- Percentage display
- Increase button (+10%)
- Decrease button (-10%)

---

#### 5.8 Star Rating

Interactive 5-star rating system:

- 5 stars (☆/⭐)
- Click/tap to set rating
- Visual feedback (filled vs unfilled stars)
- Rating text display
- Reset by clicking same star or different star

---

### 6. **Swipe Screen**

Interactive swipe gesture practice area:

#### Features:

- Swipeable card interface
- Multi-directional swipe detection
  - Swipe Up ⬆️
  - Swipe Down ⬇️
  - Swipe Left ⬅️
  - Swipe Right ➡️
- Real-time swipe direction feedback
- Visual card with gradient background
- Reset functionality

---

### 7. **Drag Screen**

Drag and drop interaction practice:

#### Features:

- Draggable elements
- Drop zones
- Touch gesture handling
- Position tracking
- Visual feedback on drag
- Success/failure states

---

### 8. **Webview Screen**

Web content integration and navigation practice:

#### Features:

- Full-screen WebView component
- External website loading: [Software Testing Trends](https://softwaretestingtrends.com/)
- JavaScript enabled for interactive content
- DOM storage enabled
- Loading indicator during page load
- Native navigation support (forward/back)
- Automatic handling of web links
- Safe area integration

**Test IDs:**

- `webview` - Main WebView component

**Use Cases:**

- Testing web content within mobile app
- Practicing hybrid app automation
- Testing web-to-native interactions
- Verifying external link handling
- Testing WebView performance and loading states

---

## 🔧 Technical Stack

- **Framework:** React Native 0.82.1 with New Architecture
- **Language:** JavaScript (Components), TypeScript (App.tsx)
- **Navigation:**
  - React Navigation v6
  - @react-navigation/native@6.1.18
  - @react-navigation/bottom-tabs@6.6.1
  - @react-navigation/native-stack@6.11.0
- **UI Components:** React Native core components
- **State Management:** React Hooks (useState, useRef)
- **Type Checking:** PropTypes
- **Safe Area:** react-native-safe-area-context@5.6.2
- **Date Picker:** @react-native-community/datetimepicker@8.5.0
- **Gestures:** react-native-gesture-handler@2.29.1
- **Screens:** react-native-screens@4.18.0
- **WebView:** react-native-webview@13.16.0
- **Platform Support:** iOS and Android with platform-specific code
- **Node Version:** >=20
- **React:** 19.1.1

---

## 🎯 Test Automation Focus

This application is specifically designed for practicing mobile test automation with:

1. **Comprehensive Test IDs** - Every interactive element has a unique testID
2. **Diverse UI Components** - Wide variety of component types to test
3. **Form Validation** - Multiple validation scenarios
4. **State Management** - Dynamic content and state changes
5. **User Flows** - Complete user journeys (login → tabs → practice exercises)
6. **Platform-Specific Elements** - iOS vs Android differences
7. **Interactive Elements** - Modals, tooltips, carousels, accordions
8. **E-commerce Flow** - Shopping cart with calculations and checkout
9. **Gestures** - Swipe, drag, tap, scroll
10. **Conditional Rendering** - Show/hide elements based on state
11. **Navigation Testing** - Bottom tabs, stack navigation, back buttons
12. **External Links** - Deep linking and URL handling
13. **Multi-screen Flows** - Nested navigation patterns

---

## 📋 Automation Testing Scenarios

### Navigation Testing:

- Tab switching (Home, Practice, Challenges, Learn, More)
- Stack navigation (Practice exercises, More options)
- Back button navigation
- Screen transitions
- Deep linking to specific screens
- Nested navigation flows

### Authentication Testing:

- Login with valid/invalid credentials
- Session management
- Logout functionality
- Post-login navigation

### Functional Testing:

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
- Swipe gesture detection
- Drag and drop interactions

### Content Testing:

- Learn tab course images and links
- External URL navigation
- Social media link validation
- Privacy policy content display
- About screen information

### UI/UX Testing:

- Component visibility
- Tooltip display
- Modal animations
- Active state indicators (tabs, buttons)
- Dynamic content rendering
- Platform-specific UI elements
- Splash screen display
- Logo rendering

### Data Validation:

- Email format validation
- Password strength requirements
- Date picker constraints
- Price calculations
- Coupon code validation
- Form field requirements

---

## 🚀 Getting Started

### Prerequisites:

- Node.js >= 20
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd scriptlab
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **iOS Setup:**

   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App:

1. **Start Metro Bundler:**

   ```bash
   npm start
   ```

2. **Run on iOS:**

   ```bash
   npm run ios
   # or
   npx react-native run-ios
   ```

3. **Run on Android:**

   ```bash
   npm run android
   # or
   npx react-native run-android
   ```

### Testing:

```bash
npm test
```

---

## 📱 App Structure

```
scriptlab/
├── App.tsx                     # Main app entry with navigation
├── components/
│   ├── SigninScreen.js        # Authentication screen
│   ├── HomeScreen.js          # Home tab (welcome)
│   ├── PracticeScreen.js      # Practice tab (menu)
│   ├── ChallengesScreen.js    # Challenges tab
│   ├── LearnScreen.js         # Learn tab (courses)
│   ├── ProfileScreen.js       # More tab (profile)
│   ├── AboutScreen.js         # About page
│   ├── PrivacyScreen.js       # Privacy policy
│   ├── ConnectScreen.js       # Social media links
│   ├── UserRegistrationForm.js # Forms practice
│   ├── ShoppingCart.js        # Shopping cart practice
│   ├── UIComponents.js        # UI components showcase
│   ├── SwipeScreen.js         # Swipe gestures
│   ├── DragScreen.js          # Drag & drop
│   └── WebviewScreen.js       # WebView integration
├── images/
│   ├── logo.png               # App logo
│   ├── ai-agents.png          # Course thumbnail
│   ├── generative-ai-course.jpg
│   └── test-automation.jpg
├── ios/                       # iOS native code
├── android/                   # Android native code
└── docs/
    ├── features.md            # This file
    └── getting-started.md     # Setup guide
```

---

## 📱 Test Credentials

For testing purposes, the sign-in screen accepts a fixed user name & password:

- **User Name**: `scriptlab`
- **Password**: `scriptlab123`

---

## 🔄 Current Features Summary

### ✅ Implemented:

- [x] Authentication (Sign In)
- [x] Bottom Tab Navigation (5 tabs)
- [x] Home Screen (Welcome)
- [x] Practice Menu (6 exercises)
- [x] Learn Tab (Courses & Resources)
- [x] More Tab (Profile & Options)
- [x] User Registration Form
- [x] Shopping Cart with Checkout
- [x] UI Components Showcase
- [x] Swipe Gestures
- [x] Drag & Drop
- [x] WebView Integration (External Website)
- [x] Privacy Policy
- [x] About Screen
- [x] Connect (Social Media)
- [x] Custom Splash Screen
- [x] Nested Stack Navigation
- [x] External Link Handling
- [x] Platform-Specific UI

### 🚧 Planned Features:

- [ ] Challenges Tab Content
- [ ] File Upload/Download
- [ ] Alerts & Notifications
- [ ] Camera Integration
- [ ] Biometric Authentication
- [ ] Offline Mode
- [ ] API Integration Examples
- [ ] Advanced Gesture Patterns
- [ ] Accessibility Features
- [ ] Internationalization (i18n)

---

_Last Updated: November 8, 2025_
_Version: 1.0.0_
_React Native: 0.82.1_
