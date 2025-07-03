// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import CustomDrawer from '../../components/CustomDrawer';
// import { useTheme } from '../../context/ThemeContext';

// export default function SettingsScreen() {
//   const router = useRouter();
//   const { theme, toggleTheme } = useTheme();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [language, setLanguage] = useState('en');

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     router.replace('../../SignIn');
//   };

//   const dynamicStyles = {
//     backgroundColor: theme === 'dark' ? '#0D0D0D' : '#fff',
//     text: { color: theme === 'dark' ? '#fff' : '#000' },
//     card: { backgroundColor: theme === 'dark' ? '#222' : '#eee' },
//     button: { backgroundColor: theme === 'dark' ? '#2563eb' : '#1e40af' },
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: dynamicStyles.backgroundColor }]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Text style={styles.menuIcon}>☰</Text>
//         </TouchableOpacity>
//         <Text style={[styles.headerText, dynamicStyles.text]}>Settings</Text>
//       </View>

//       {/* Content */}
//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Theme Toggle */}
//         <View style={[styles.settingItem, dynamicStyles.card]}>
//           <Text style={[styles.settingText, dynamicStyles.text]}>Dark Theme</Text>
//           <Switch
//             value={theme === 'dark'}
//             onValueChange={toggleTheme}
//             thumbColor="#fff"
//             trackColor={{ false: '#999', true: '#2563eb' }}
//           />
//         </View>

//         {/* Notification Toggle */}
//         <View style={[styles.settingItem, dynamicStyles.card]}>
//           <Text style={[styles.settingText, dynamicStyles.text]}>Notifications</Text>
//           <Switch
//             value={notificationsEnabled}
//             onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
//             thumbColor="#fff"
//             trackColor={{ false: '#999', true: '#2563eb' }}
//           />
//         </View>

//         {/* Profile Info */}
//         <View style={[styles.settingItem, dynamicStyles.card]}>
//           <Text style={[styles.settingText, dynamicStyles.text]}>Profile</Text>
//           <TouchableOpacity
//             style={[styles.optionButton, dynamicStyles.button]}
//             onPress={() => router.push('../screens/ProfileScreen')}
//           >
//             <Text style={styles.optionButtonText}>View</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Change Password */}
//         <View style={[styles.settingItem, dynamicStyles.card]}>
//           <Text style={[styles.settingText, dynamicStyles.text]}>Change Password</Text>
//           <TouchableOpacity
//             style={[styles.optionButton, dynamicStyles.button]}
//             onPress={() => router.push('../screens/ChangePasswordScreen')}
//           >
//             <Text style={styles.optionButtonText}>Update</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {drawerOpen && (
//         <TouchableOpacity style={styles.drawerOverlay} onPress={closeDrawer}>
//           <CustomDrawer onClose={closeDrawer} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     backgroundColor: '#0D0D0D',
//   },
//   menuButton: { marginRight: 15 },
//   menuIcon: { color: '#fff', fontSize: 24 },
//   headerText: { fontSize: 20, fontWeight: 'bold' },
//   content: {
//     padding: 16,
//     gap: 15,
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 8,
//   },
//   settingText: {
//     fontSize: 16,
//     marginBottom: 9,
//   },
//   optionButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   optionButtonText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   logoutButton: {
//     backgroundColor: '#b91c1c',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   drawerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 999,
//   },
// });


import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Appearance,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomDrawer from '../../components/CustomDrawer';

export default function SettingsScreen() {
  const [theme, setTheme] = useState('light');
  const [showContact, setShowContact] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme || 'light');
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/SignIn');
  };

  const dynamicStyles = {
    text: { color: theme === 'dark' ? '#fff' : '#000' },
    card: {
      backgroundColor: theme === 'dark' ? '#1F2937' : '#f2f2f2',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    },
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#111827' : '#fff' },
      ]}
    >
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color={theme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.text]}>Settings</Text>
      </View>

      {/* Contact Us */}
      <View style={[styles.settingItem, dynamicStyles.card]}>
        <Text style={[styles.settingText, dynamicStyles.text]}>Contact Us</Text>
        <TouchableOpacity
          style={[styles.optionButton, dynamicStyles.button]}
          onPress={() => setShowContact(true)}
        >
          <Text style={styles.optionButtonText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={[styles.settingItem, dynamicStyles.card]}>
        <Text style={[styles.settingText, dynamicStyles.text]}>Logout</Text>
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#ef4444' }]}
          onPress={handleLogout}
        >
          <Text style={styles.optionButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Modal */}
      {showContact && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📍 MAIN OFFICE</Text>
            <Text style={styles.modalText}>
              501, 5th Floor Brigade IRV, Whitefield, Nallurhalli,{"\n"}
              Bengaluru, Karnataka 560066{"\n"}+91 9035411000
            </Text>

            <Text style={styles.modalTitle}>🇺🇸 USA OFFICE</Text>
            <Text style={styles.modalText}>
              3700 Cole Ave #431,{"\n"}Dallas, Texas 75204
            </Text>

            <Text style={styles.modalTitle}>✉️ Contact</Text>
            <Text style={styles.modalText}>support@indxo.ai</Text>

            <TouchableOpacity
              style={[styles.optionButton, { backgroundColor: '#10B981', marginTop: 20 }]}
              onPress={() => setShowContact(false)}
            >
              <Text style={styles.optionButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {drawerOpen && (
        <View style={styles.drawerOverlay}>
          <CustomDrawer onClose={() => setDrawerOpen(false)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 30,marginTop:20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: { marginRight: 15 },
  title: { fontSize: 28, fontWeight: 'bold' },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  settingText: { fontSize: 16 },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1e40af',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    lineHeight: 20,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
