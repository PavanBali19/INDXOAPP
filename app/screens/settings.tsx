import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CustomDrawer from '../../components/CustomDrawer';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('../../SignIn');
  };

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#0D0D0D' : '#fff',
    text: { color: theme === 'dark' ? '#fff' : '#000' },
    card: { backgroundColor: theme === 'dark' ? '#222' : '#eee' },
    button: { backgroundColor: theme === 'dark' ? '#2563eb' : '#1e40af' },
  };

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, dynamicStyles.text]}>Settings</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme Toggle */}
        <View style={[styles.settingItem, dynamicStyles.card]}>
          <Text style={[styles.settingText, dynamicStyles.text]}>Dark Theme</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            thumbColor="#fff"
            trackColor={{ false: '#999', true: '#2563eb' }}
          />
        </View>

        {/* Notification Toggle */}
        <View style={[styles.settingItem, dynamicStyles.card]}>
          <Text style={[styles.settingText, dynamicStyles.text]}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            thumbColor="#fff"
            trackColor={{ false: '#999', true: '#2563eb' }}
          />
        </View>

        {/* Profile Info */}
        <View style={[styles.settingItem, dynamicStyles.card]}>
          <Text style={[styles.settingText, dynamicStyles.text]}>Profile</Text>
          <TouchableOpacity
            style={[styles.optionButton, dynamicStyles.button]}
            onPress={() => router.push('../screens/ProfileScreen')}
          >
            <Text style={styles.optionButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Change Password */}
        <View style={[styles.settingItem, dynamicStyles.card]}>
          <Text style={[styles.settingText, dynamicStyles.text]}>Change Password</Text>
          <TouchableOpacity
            style={[styles.optionButton, dynamicStyles.button]}
            onPress={() => router.push('../screens/ChangePasswordScreen')}
          >
            <Text style={styles.optionButtonText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {drawerOpen && (
        <TouchableOpacity style={styles.drawerOverlay} onPress={closeDrawer}>
          <CustomDrawer onClose={closeDrawer} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  menuButton: { marginRight: 15 },
  menuIcon: { color: '#fff', fontSize: 24 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  content: {
    padding: 16,
    gap: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 16,
    marginBottom: 9,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#b91c1c',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
});
