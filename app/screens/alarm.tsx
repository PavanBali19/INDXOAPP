// import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   LayoutAnimation,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from 'react-native';
// import { BarChart, LineChart } from 'react-native-chart-kit';
// import CustomDrawer from '../../components/CustomDrawer';

// const API_URL = 'https://indxoapp.onrender.com/alarms';


// const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
// const screenWidth = Dimensions.get('window').width;

// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental?.(true);
// }

// export default function AlarmScreen() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [alarms, setAlarms] = useState<any[]>([]);
//   const [selectedMachine, setSelectedMachine] = useState('Machine 01');
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const fadeAnim = useState(new Animated.Value(0))[0];
//   const [loading, setLoading] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const fetchAlarms = async (machine = selectedMachine, selectedDate = date) => {
//     try {
//       setLoading(true);
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       const res = await fetch(`${API_URL}?machine=${machine}&date=${formattedDate}`);
//       const data = await res.json();
//       setAlarms(data);
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     } catch (err) {
//       console.error('Error fetching alarms:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlarms();
//   }, []);

//   const handleMachineChange = (machine: string) => {
//     setSelectedMachine(machine);
//     fetchAlarms(machine, date);
//   };

//   const handleDateChange = (event: any, selectedDate: Date | undefined) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//       fetchAlarms(selectedMachine, selectedDate);
//     }
//   };

//   const getIcon = (type: string) => {
//     switch (type) {
//       case 'Overheat': return '🔥';
//       case 'SpeedLimit': return '⚠️';
//       case 'UnexpectedStop': return '🛑';
//       case 'PowerSurge': return '⚡';
//       default: return '🔔';
//     }
//   };

//   const alarmTypeCounts = alarms.reduce((acc: Record<string, number>, alarm: any) => {
//     acc[alarm.alarm_type] = (acc[alarm.alarm_type] || 0) + 1;
//     return acc;
//   }, {});

//   const barChartData = {
//     labels: Object.keys(alarmTypeCounts),
//     datasets: [{ data: Object.values(alarmTypeCounts) }],
//   };

//   const hourlyCounts: number[] = Array(24).fill(0);
//   alarms.forEach((alarm: any) => {
//     const hour = new Date(alarm.timestamp).getHours();
//     hourlyCounts[hour]++;
//   });

//   const lineChartData = {
//     labels: Array.from({ length: 24 }, (_, i) => i.toString()),
//     datasets: [{ data: hourlyCounts }],
//   };

//   const groupedAlarms = alarms.reduce((acc: any, alarm) => {
//     const hour = new Date(alarm.timestamp).getHours();
//     if (!acc[hour]) acc[hour] = [];
//     acc[hour].push(alarm);
//     return acc;
//   }, {});

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#121212' }]}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>🚨 Alarm Logs</Text>
//       </View>

//       <ScrollView horizontal style={styles.chipRow} showsHorizontalScrollIndicator={false}>
//         {machines.map((machine) => (
//           <TouchableOpacity
//             key={machine}
//             style={[styles.chip, selectedMachine === machine && styles.chipSelected]}
//             onPress={() => handleMachineChange(machine)}>
//             <Text style={styles.chipText}>{machine}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>{date.toDateString()}</Text>
//       </TouchableOpacity>

//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={handleDateChange}
//         />
//       )}

//       {loading ? <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 20 }} /> : (
//         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//           <View style={{ paddingHorizontal: 10 }}>
//             <Text style={styles.chartTitle}>Alarms per Type</Text>
//             <BarChart
//               data={barChartData}
//               width={screenWidth - 20}
//               height={220}
//               chartConfig={chartConfig}
//               style={{ borderRadius: 10 }}
//               yAxisLabel=""
//               yAxisSuffix="x"
//               fromZero
//             />
//             <Text style={styles.chartTitle}>Alarms per Hour</Text>
//             <ScrollView horizontal>
//               <LineChart
//                 data={lineChartData}
//                 width={screenWidth * 1.6}
//                 height={220}
//                 chartConfig={chartConfig}
//                 bezier
//                 style={{ borderRadius: 10 }}
//                 fromZero
//               />
//             </ScrollView>
//           </View>

//           <Text style={styles.chartTitle}>Alarm Log</Text>
//           {Object.keys(groupedAlarms).map((hour) => (
//             <View key={hour} style={{ marginBottom: 16 }}>
//               <Text style={styles.groupHeader}>{hour}:00</Text>
//               {groupedAlarms[hour].map((alarm: any) => (
//                 <Animated.View key={alarm.id} style={[styles.alarmCard, { opacity: fadeAnim }]}>
//                   <Text style={styles.alarmMessage}>{getIcon(alarm.alarm_type)} {alarm.message}</Text>
//                   <Text style={styles.alarmTime}>{new Date(alarm.timestamp).toLocaleString()}</Text>
//                   <Text style={styles.machineTag}>Machine: {alarm.machine_name}</Text>
//                 </Animated.View>
//               ))}
//             </View>
//           ))}
//         </ScrollView>
//       )}

//       {drawerOpen && (
//         <Pressable style={styles.drawerOverlay} onPress={closeDrawer}>
//           <CustomDrawer onClose={closeDrawer} />
//         </Pressable>
//       )}
//     </SafeAreaView>
//   );
// }

// const chartConfig = {
//   backgroundColor: '#1F2937',
//   backgroundGradientFrom: '#1F2937',
//   backgroundGradientTo: '#111827',
//   color: () => '#10B981',
//   labelColor: () => '#9CA3AF',
//   decimalPlaces: 0,
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 15,
//     backgroundColor: '#121212',
//   },
//   menuButton: { marginRight: 15 },
//   title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
//   chartTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginLeft: 10,
//   },
//   alarmCard: {
//     backgroundColor: '#1F2937',
//     padding: 14,
//     borderRadius: 10,
//     marginVertical: 4,
//     marginHorizontal: 10,
//     elevation: 3,
//   },
//   alarmTime: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
//   alarmMessage: { color: '#fff', fontSize: 16 },
//   machineTag: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
//   groupHeader: { color: '#10B981', fontSize: 14, marginLeft: 12, marginTop: 16 },
//   drawerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     zIndex: 999,
//   },
//   chipRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginBottom: 8,
//   },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     backgroundColor: '#333',
//     marginRight: 8,
//     borderRadius: 20,
//   },
//   chipSelected: { backgroundColor: '#10B981' },
//   chipText: { color: '#fff' },
//   dateButton: {
//     alignSelf: 'center',
//     backgroundColor: '#444',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   dateText: { color: '#fff' },
// });


import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import CustomDrawer from '../../components/CustomDrawer';

const API_URL = 'https://indxoapp.onrender.com/alarms';

const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
const screenWidth = Dimensions.get('window').width;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {
    // no-op for new architecture
  }
}

export default function AlarmScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alarms, setAlarms] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState('Machine 01');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const fetchAlarms = async (machine = selectedMachine, selectedDate = date) => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const res = await fetch(`${API_URL}?machine=${machine}&date=${formattedDate}`);
      const data = await res.json();
      setAlarms(data);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.error('Error fetching alarms:', err);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  const handleMachineChange = (machine: string) => {
    setSelectedMachine(machine);
    fetchAlarms(machine, date);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      fetchAlarms(selectedMachine, selectedDate);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Overheat': return '🔥';
      case 'SpeedLimit': return '⚠️';
      case 'UnexpectedStop': return '🛑';
      case 'PowerSurge': return '⚡';
      default: return '🔔';
    }
  };

  const alarmTypeCounts = alarms.reduce((acc: Record<string, number>, alarm: any) => {
    acc[alarm.alarm_type] = (acc[alarm.alarm_type] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(alarmTypeCounts),
    datasets: [{ data: Object.values(alarmTypeCounts) }],
  };

  const hourlyCounts: number[] = Array(24).fill(0);
  alarms.forEach((alarm: any) => {
    const hour = new Date(alarm.timestamp).getHours();
    hourlyCounts[hour]++;
  });

  const lineChartData = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [{ data: hourlyCounts }],
  };

  const groupedAlarms = alarms.reduce((acc: any, alarm) => {
    const hour = new Date(alarm.timestamp).getHours();
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(alarm);
    return acc;
  }, {});

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#121212' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🚨 Alarm Logs</Text>
      </View>

      {/* Chips Container */}
      <View style={styles.machineContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {machines.map((machine) => (
            <TouchableOpacity
              key={machine}
              style={[styles.chip, selectedMachine === machine && styles.chipSelected]}
              onPress={() => handleMachineChange(machine)}
            >
              <Text style={styles.chipText}>{machine}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.chartTitle}>Alarms per Type</Text>
          <ScrollView horizontal>
            <BarChart
              data={barChartData}
              width={Math.max(screenWidth, Object.keys(alarmTypeCounts).length * 100)}
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 10, marginRight: 10 }}
              yAxisLabel=""
              yAxisSuffix="x"
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
              segments={4}
            />
          </ScrollView>

          <Text style={styles.chartTitle}>Alarms per Hour</Text>
          <ScrollView horizontal>
            <LineChart
              data={lineChartData}
              width={screenWidth * 2}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 10 }}
              fromZero
              segments={5}
            />
          </ScrollView>
        </View>

        <Text style={styles.chartTitle}>Alarm Log</Text>
        {Object.keys(groupedAlarms).map((hour) => (
          <View key={hour} style={{ marginBottom: 16 }}>
            <Text style={styles.groupHeader}>{hour}:00</Text>
            {groupedAlarms[hour].map((alarm: any) => (
              <Animated.View key={alarm.id} style={[styles.alarmCard, { opacity: fadeAnim }]}>
                <Text style={styles.alarmMessage}>
                  {getIcon(alarm.alarm_type)} {alarm.message}
                </Text>
                <Text style={styles.alarmTime}>
                  {new Date(alarm.timestamp).toLocaleString()}
                </Text>
                <Text style={styles.machineTag}>Machine: {alarm.machine_name}</Text>
              </Animated.View>
            ))}
          </View>
        ))}
      </ScrollView>

      {drawerOpen && (
        <Pressable style={styles.drawerOverlay} onPress={closeDrawer}>
          <CustomDrawer onClose={closeDrawer} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundColor: '#1F2937',
  backgroundGradientFrom: '#1F2937',
  backgroundGradientTo: '#111827',
  color: () => '#10B981',
  labelColor: () => '#9CA3AF',
  decimalPlaces: 0,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#121212',
  },
  menuButton: { marginRight: 15 },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  machineContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  chipRow: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    marginRight: 10,
    borderRadius: 20,
    minWidth: 110,
    alignItems: 'center',
  },
  chipSelected: { backgroundColor: '#10B981' },
  chipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dateButton: {
    alignSelf: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: { color: '#fff' },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  alarmCard: {
    backgroundColor: '#1F2937',
    padding: 14,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    elevation: 3,
  },
  alarmTime: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  alarmMessage: { color: '#fff', fontSize: 16 },
  machineTag: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  groupHeader: { color: '#10B981', fontSize: 14, marginLeft: 12, marginTop: 16 },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
});
