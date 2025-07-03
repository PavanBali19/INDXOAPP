
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Stack, router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   ImageBackground,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const images = [
//   require('../assets/images/bg1.png'),
//   require('../assets/images/bg2.png'),
//   require('../assets/images/bg3.png'),
// ];

// const logo = require('../assets/images/indxo_logo.png');

// // 🌐 Static API URL (Ngrok)
// const BASE_URL = 'https://aphid-full-frankly.ngrok-free.app';

// export default function SignInScreen() {
//   const [imageIndex, setImageIndex] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSignIn = async () => {
//     if (email.trim() === '' || password.trim() === '') {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // ✅ Save user credentials
//         await AsyncStorage.setItem('user_email', email);
//         await AsyncStorage.setItem('user_password', password);

//         router.replace('../screens/dashboard');
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Unable to connect to server.');
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <ImageBackground
//         source={images[imageIndex]}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         <Image source={logo} style={styles.logo} resizeMode="contain" />

//         <View style={styles.overlay}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Sign In</Text>

//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="example@gmail.com"
//               placeholderTextColor="#aaa"
//               style={styles.inputBox}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />

//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               placeholder="password"
//               placeholderTextColor="#aaa"
//               secureTextEntry
//               style={styles.inputBox}
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity>
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   logo: {
//     position: 'absolute',
//     top: Platform.OS === 'web' ? 20 : 50,
//     left: 20,
//     width: 100,
//     height: 40,
//     zIndex: 10,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//     padding: 24,
//     borderRadius: 16,
//     width: '85%',
//     maxWidth: 450,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     color: '#ddd',
//     fontSize: 14,
//     marginBottom: 6,
//     marginTop: 10,
//   },
//   inputBox: {
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginBottom: 10,
//     color: '#fff',
//     borderWidth: 1,
//     borderColor: '#999',
//   },
//   forgot: {
//     color: 'yellow',
//     fontSize: 14,
//     textAlign: 'right',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'rgba(224, 208, 208, 0.75)',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Background images
const images = [
  require('../assets/images/bg1.png'),
  require('../assets/images/bg2.png'),
  require('../assets/images/bg3.png'),
];

const logo = require('../assets/images/indxo_logo.png');

// ✅ Updated backend login API
const BASE_URL = 'https://indexobackend.onrender.com';

export default function SignInScreen() {
  const [imageIndex, setImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ⏱️ Background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('user_password', password);

        router.replace('../screens/dashboard'); // Navigate after login
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={images[imageIndex]}
        style={styles.background}
        resizeMode="cover"
      >
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              placeholderTextColor="#aaa"
              style={styles.inputBox}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.inputBox}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    left: 20,
    width: 140, // ✅ Increased width
    height: 60, // ✅ Increased height
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    maxWidth: 450,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#999',
  },
  forgot: {
    color: 'yellow',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(224, 208, 208, 0.75)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
