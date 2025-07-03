import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Replace this with actual email and password from your login context or asyncStorage
const dummyUser = {
  email: 'example@gmail.com',
  password: 'password123',
};

export default function ProfileScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={require('../../assets/images/profile_image.png')} // use any dummy profile image
          style={styles.profileImage}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={dummyUser.email}
          editable={false}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!showPassword}
            value={dummyUser.password}
            editable={false}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#555"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBox: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    width: '85%',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
