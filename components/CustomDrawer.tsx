import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ValidPaths =
  | '../screens/dashboard'
  | '../screens/alarm'
  | '../screens/spindleChart'
  | '../screens/powerChart'
  | '../screens/machineDetails'
  // | '../screens/BasicPropertiesScreen'
  | '../screens/settings'
  | '../SignIn';

export default function CustomDrawer({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const navigateTo = (path: ValidPaths) => {
    onClose();
    router.replace(path);
  };

  return (
    <View style={styles.drawer}>
      <Text style={styles.header}>📂 Menu</Text>

      <TouchableOpacity onPress={() => navigateTo('../screens/dashboard')} style={styles.item}>
        <Text style={styles.text}>📊 Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../screens/alarm')} style={styles.item}>
        <Text style={styles.text}>⚠️ Alarm</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../screens/spindleChart')} style={styles.item}>
        <Text style={styles.text}>🔄 Spindle Chart</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../screens/powerChart')} style={styles.item}>
        <Text style={styles.text}>🔌 Power Chart</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../screens/machineDetails')} style={styles.item}>
        <Text style={styles.text}>🧾 Machine Details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../screens/settings')} style={styles.item}>
        <Text style={styles.text}>⚙️ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('../SignIn')} style={styles.item}>
        <Text style={styles.text}>🚪 Sign Out</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigateTo('../screens/BasicPropertiesScreen')} style={styles.item}>
        <Text style={styles.text}>⚙️ Basic Properties</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 230,
    height: '100%',
    backgroundColor: '#222',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
