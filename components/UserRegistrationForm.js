import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

const UserRegistrationForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    website: '',
    country: '',
    experienceLevel: '',
    technicalSkills: [],
    bio: '',
    agreeToTerms: false,
    subscribeToNewsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const countries = [
    'Select a country',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'India',
    'Japan',
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const technicalSkillsList = [
    'JavaScript',
    'Node.js',
    'Python',
    'SQL',
    'Java',
    'Docker',
    'React',
    'AWS',
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateSelect = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = `${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
      updateField('dob', formattedDate);

      // Close picker on iOS after selection
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
    }
  };

  const toggleSkill = skill => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter(s => s !== skill)
        : [...prev.technicalSkills, skill],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Country validation
    if (!formData.country || formData.country === 'Select a country') {
      newErrors.country = 'Please select a country';
    }

    // Terms and Conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Registration Successful',
        `Welcome ${formData.firstName} ${formData.lastName}!\n\nEmail: ${
          formData.email
        }\nCountry: ${formData.country}\nExperience: ${
          formData.experienceLevel || 'Not specified'
        }\nSkills: ${formData.technicalSkills.join(', ') || 'None selected'}`,
        [
          {
            text: 'OK',
            onPress: () => console.log('Registration completed'),
          },
        ],
      );
    } else {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
    }
  };

  const handleReset = () => {
    Alert.alert('Reset Form', 'Are you sure you want to reset all fields?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
            website: '',
            country: '',
            experienceLevel: '',
            technicalSkills: [],
            bio: '',
            agreeToTerms: false,
            subscribeToNewsletter: false,
          });
          setErrors({});
        },
      },
    ]);
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
          <Text style={styles.headerTitle}>User Registration Form</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.formDescription}>
            Complete form with validation for practicing form automation
          </Text>

          {/* First Name & Last Name Row */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                First Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                placeholder="Enter first name"
                value={formData.firstName}
                onChangeText={text => updateField('firstName', text)}
                testID="firstNameInput"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>
                Last Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                placeholder="Enter last name"
                value={formData.lastName}
                onChangeText={text => updateField('lastName', text)}
                testID="lastNameInput"
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Email Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter email address"
              value={formData.email}
              onChangeText={text => updateField('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="emailInput"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password & Confirm Password Row */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChangeText={text => updateField('password', text)}
                secureTextEntry
                testID="passwordInput"
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>
                Confirm Password <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChangeText={text => updateField('confirmPassword', text)}
                secureTextEntry
                testID="confirmPasswordInput"
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>

          {/* DOB Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
              testID="dobInput"
            >
              <Text
                style={[
                  styles.datePickerText,
                  !formData.dob && styles.datePickerPlaceholder,
                ]}
              >
                {formData.dob || 'MM/DD/YYYY'}
              </Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>

            {showDatePicker && Platform.OS === 'ios' && (
              <Modal
                transparent={true}
                animationType="slide"
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.modalButton}>Cancel</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Select Date</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const formattedDate = `${String(
                            selectedDate.getMonth() + 1,
                          ).padStart(2, '0')}/${String(
                            selectedDate.getDate(),
                          ).padStart(2, '0')}/${selectedDate.getFullYear()}`;
                          updateField('dob', formattedDate);
                          setShowDatePicker(false);
                        }}
                      >
                        <Text style={[styles.modalButton, styles.doneButton]}>
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        if (date) setSelectedDate(date);
                      }}
                      maximumDate={new Date()}
                      style={styles.iosDatePicker}
                    />
                  </View>
                </View>
              </Modal>
            )}

            {showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateSelect}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Website Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com"
              value={formData.website}
              onChangeText={text => updateField('website', text)}
              keyboardType="url"
              autoCapitalize="none"
              testID="websiteInput"
            />
          </View>

          {/* Country Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Country <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={[styles.dropdown, errors.country && styles.inputError]}
              onPress={() => setShowCountryDropdown(!showCountryDropdown)}
              testID="countryDropdown"
            >
              <Text
                style={[
                  styles.dropdownText,
                  (!formData.country ||
                    formData.country === 'Select a country') &&
                    styles.dropdownPlaceholder,
                ]}
              >
                {formData.country || 'Select a country'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showCountryDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showCountryDropdown && (
              <View style={styles.dropdownList}>
                <ScrollView
                  style={styles.dropdownScrollView}
                  nestedScrollEnabled={true}
                >
                  {countries.map((country, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dropdownItem,
                        formData.country === country &&
                          styles.dropdownItemSelected,
                      ]}
                      onPress={() => {
                        updateField('country', country);
                        setShowCountryDropdown(false);
                      }}
                      testID={`country-${country}`}
                    >
                      {formData.country === country && (
                        <Text style={styles.checkmark}>✓ </Text>
                      )}
                      <Text
                        style={[
                          styles.dropdownItemText,
                          formData.country === country &&
                            styles.dropdownItemTextSelected,
                        ]}
                      >
                        {country}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            {errors.country && (
              <Text style={styles.errorText}>{errors.country}</Text>
            )}
          </View>

          {/* Experience Level Radio Buttons */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Experience Level</Text>
            <View style={styles.radioGroup}>
              {experienceLevels.map(level => (
                <TouchableOpacity
                  key={level}
                  style={styles.radioOption}
                  onPress={() => updateField('experienceLevel', level)}
                  testID={`experience-${level}`}
                >
                  <View style={styles.radioCircle}>
                    {formData.experienceLevel === level && (
                      <View style={styles.radioCircleSelected} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Technical Skills Checkboxes */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Technical Skills</Text>
            <View style={styles.checkboxGrid}>
              {technicalSkillsList.map(skill => (
                <TouchableOpacity
                  key={skill}
                  style={styles.checkboxOption}
                  onPress={() => toggleSkill(skill)}
                  testID={`skill-${skill}`}
                >
                  <View style={styles.checkbox}>
                    {formData.technicalSkills.includes(skill) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bio Text Area */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bio / About You</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChangeText={text => updateField('bio', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              testID="bioInput"
            />
          </View>

          {/* Terms and Newsletter Checkboxes */}
          <TouchableOpacity
            style={styles.checkboxOption}
            onPress={() => updateField('agreeToTerms', !formData.agreeToTerms)}
            testID="termsCheckbox"
          >
            <View style={styles.checkbox}>
              {formData.agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the Terms and Conditions{' '}
              <Text style={styles.required}>*</Text>
            </Text>
          </TouchableOpacity>
          {errors.agreeToTerms && (
            <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
          )}

          <TouchableOpacity
            style={styles.checkboxOption}
            onPress={() =>
              updateField(
                'subscribeToNewsletter',
                !formData.subscribeToNewsletter,
              )
            }
            testID="newsletterCheckbox"
          >
            <View style={styles.checkbox}>
              {formData.subscribeToNewsletter && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>Subscribe to newsletter</Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              testID="submitButton"
            >
              <Text style={styles.submitButtonText}>Submit Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              testID="resetButton"
            >
              <Text style={styles.resetButtonText}>Reset Form</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

UserRegistrationForm.propTypes = {
  onBack: PropTypes.func,
};

UserRegistrationForm.defaultProps = {
  onBack: null,
};

export default UserRegistrationForm;

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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  formDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
    marginHorizontal: 6,
  },
  thirdField: {
    flex: 1,
    marginHorizontal: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  dropdownPlaceholder: {
    color: '#9CA3AF',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  dropdownList: {
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownScrollView: {
    maxHeight: 250,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemSelected: {
    backgroundColor: '#F9FAFB',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
    color: '#000000',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioCircleSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  radioLabel: {
    fontSize: 14,
    color: '#1F2937',
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
    width: '45%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkmark: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  resetButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 14,
    color: '#1F2937',
  },
  datePickerPlaceholder: {
    color: '#9CA3AF',
  },
  calendarIcon: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalButton: {
    fontSize: 16,
    color: '#6B7280',
  },
  doneButton: {
    color: '#00458B',
    fontWeight: '600',
  },
  iosDatePicker: {
    height: 200,
    marginTop: 10,
  },
});
