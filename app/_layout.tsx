// import { Slot } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { View } from 'react-native';
// import { ThemeProvider, useTheme } from '../context/ThemeContext';

// function InnerLayout() {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   return (
//     <>
//       <StatusBar style={isDark ? 'light' : 'dark'} />
//       <View style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
//         <Slot />
//       </View>
//     </>
//   );
// }

// export default function Layout() {
//   return (
//     <ThemeProvider>
//       <InnerLayout />
//     </ThemeProvider>
//   );
// }

import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function InnerLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
        <Slot />
      </View>
    </>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
