// import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//     Animated,
//     Dimensions,
//     Platform,
//     Pressable,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
// import CustomDrawer from '../../components/CustomDrawer';

// const API_URL = 'http://192.168.1.197:3000/alarms';
// const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
// const screenWidth = Dimensions.get('window').width;

// export default function AlarmScreen() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [alarms, setAlarms] = useState<any[]>([]);
//   const [selectedMachine, setSelectedMachine] = useState('Machine 01');
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const fadeAnim = useState(new Animated.Value(0))[0];

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const fetchAlarms = async (machine = selectedMachine, selectedDate = date) => {
//     try {
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       const res = await fetch(`${API_URL}?machine=${machine}&date=${formattedDate}`);
//       const data = await res.json();
//       setAlarms(data);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     } catch (err) {
//       console.error('Error fetching alarms:', err);
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
//       case 'Overheat':
//         return '🔥';
//       case 'SpeedLimit':
//         return '⚠️';
//       case 'UnexpectedStop':
//         return '🛑';
//       case 'PowerSurge':
//         return '⚡';
//       default:
//         return '🔔';
//     }
//   };

//   // 📊 Pie Chart Data
//   const alarmTypeCounts = alarms.reduce((acc: Record<string, number>, alarm: any) => {
//     acc[alarm.alarm_type] = (acc[alarm.alarm_type] || 0) + 1;
//     return acc;
//   }, {});

//   const pieChartData = Object.entries(alarmTypeCounts).map(([type, count], index) => ({
//     name: type,
//     population: count,
//     color: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'][index % 4],
//     legendFontColor: '#fff',
//     legendFontSize: 12,
//   }));

//   const barChartData = {
//     labels: Object.keys(alarmTypeCounts),
//     datasets: [{ data: Object.values(alarmTypeCounts) }],
//   };

//   // 📈 Line Chart Data by Hour
//   const hourlyCounts: number[] = Array(24).fill(0);
//   alarms.forEach((alarm: any) => {
//     const hour = new Date(alarm.timestamp).getHours();
//     hourlyCounts[hour]++;
//   });

//   const lineChartData = {
//     labels: Array.from({ length: 24 }, (_, i) => i.toString()),
//     datasets: [{ data: hourlyCounts }],
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>🚨 Alarm Logs</Text>
//       </View>

//       {/* Filters */}
//       <View style={styles.filterRow}>
//         {machines.map((machine) => (
//           <TouchableOpacity
//             key={machine}
//             style={[styles.machineButton, selectedMachine === machine && styles.machineSelected]}
//             onPress={() => handleMachineChange(machine)}
//           >
//             <Text style={styles.machineText}>{machine}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

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

//       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//         {/* Alarms List */}
//         {alarms.length > 0 ? (
//           alarms.map((alarm) => (
//             <Animated.View key={alarm.id} style={[styles.alarmCard, { opacity: fadeAnim }]}>
//               <Text style={styles.alarmTime}>
//                 {new Date(alarm.timestamp).toLocaleString()}
//               </Text>
//               <Text style={styles.alarmMessage}>
//                 {getIcon(alarm.alarm_type)} {alarm.message}
//               </Text>
//               <Text style={styles.machineTag}>Machine: {alarm.machine_name}</Text>
//             </Animated.View>
//           ))
//         ) : (
//           <Text style={styles.noData}>No alarms for selected filter.</Text>
//         )}

//         {/* 📊 Pie Chart */}
//         {pieChartData.length > 0 && (
//           <>
//             <Text style={styles.chartTitle}>Alarm Type Distribution</Text>
//             <PieChart
//               data={pieChartData}
//               width={screenWidth}
//               height={220}
//               chartConfig={chartConfig}
//               accessor="population"
//               backgroundColor="transparent"
//               paddingLeft="15"
//               absolute
//             />
//           </>
//         )}

//         {/* 📉 Bar Chart */}
//         {barChartData.labels.length > 0 && (
//           <>
//             <Text style={styles.chartTitle}>Alarms per Type</Text>
//             <BarChart
//               data={barChartData}
//               width={screenWidth - 20}
//               height={220}
//               yAxisLabel=""
//               yAxisSuffix="x"
//               chartConfig={chartConfig}
//               style={{ marginHorizontal: 10, borderRadius: 10 }}
//             />
//           </>
//         )}

//         {/* 📈 Line Chart */}
//         {lineChartData.datasets[0].data.some((val) => val > 0) && (
//           <>
//             <Text style={styles.chartTitle}>Alarms per Hour</Text>
//             <LineChart
//               data={lineChartData}
//               width={screenWidth - 20}
//               height={220}
//               chartConfig={chartConfig}
//               bezier
//               style={{ marginHorizontal: 10, borderRadius: 10 }}
//             />
//           </>
//         )}
//       </ScrollView>

//       {/* Drawer Overlay */}
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
//     backgroundColor: '#0D0D0D',
//   },
//   menuButton: { marginRight: 15 },
//   title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
//   alarmCard: {
//     backgroundColor: '#1F2937',
//     padding: 16,
//     borderRadius: 12,
//     margin: 10,
//     elevation: 5,
//   },
//   alarmTime: {
//     color: '#9CA3AF',
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   alarmMessage: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   machineTag: {
//     color: '#9CA3AF',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   drawerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     zIndex: 999,
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginBottom: 16,
//   },
//   machineButton: {
//     padding: 10,
//     backgroundColor: '#333',
//     margin: 6,
//     borderRadius: 10,
//   },
//   machineSelected: {
//     backgroundColor: '#555',
//   },
//   machineText: {
//     color: '#fff',
//   },
//   dateButton: {
//     alignSelf: 'center',
//     backgroundColor: '#444',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   dateText: {
//     color: '#fff',
//   },
//   chartTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginLeft: 20,
//   },
//   noData: {
//     color: '#aaa',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });










import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import CustomDrawer from '../../components/CustomDrawer';

const API_URL = 'https://aphid-full-frankly.ngrok-free.app/alarms';

const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
const screenWidth = Dimensions.get('window').width;

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
      case 'Overheat':
        return '🔥';
      case 'SpeedLimit':
        return '⚠️';
      case 'UnexpectedStop':
        return '🛑';
      case 'PowerSurge':
        return '⚡';
      default:
        return '🔔';
    }
  };

  const alarmTypeCounts = alarms.reduce((acc: Record<string, number>, alarm: any) => {
    acc[alarm.alarm_type] = (acc[alarm.alarm_type] || 0) + 1;
    return acc;
  }, {});

  // const pieChartData = Object.entries(alarmTypeCounts).map(([type, count], index) => ({
  //   name: type,
  //   population: count,
  //   color: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'][index % 4],
  //   legendFontColor: '#fff',
  //   legendFontSize: 12,
  // }));

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🚨 Alarm Logs</Text>
      </View>

      <View style={styles.filterRow}>
        {machines.map((machine) => (
          <TouchableOpacity
            key={machine}
            style={[styles.machineButton, selectedMachine === machine && styles.machineSelected]}
            onPress={() => handleMachineChange(machine)}
          >
            <Text style={styles.machineText}>{machine}</Text>
          </TouchableOpacity>
        ))}
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
        {alarms.length > 0 ? (
          alarms.map((alarm) => (
            <Animated.View key={alarm.id} style={[styles.alarmCard, { opacity: fadeAnim }]}>
              <Text style={styles.alarmTime}>{new Date(alarm.timestamp).toLocaleString()}</Text>
              <Text style={styles.alarmMessage}>{getIcon(alarm.alarm_type)} {alarm.message}</Text>
              <Text style={styles.machineTag}>Machine: {alarm.machine_name}</Text>
            </Animated.View>
          ))
        ) : (
          <Text style={styles.noData}>No alarms for selected filter.</Text>
        )}

        {/* {pieChartData.length > 0 && (
          <>
            <Text style={styles.chartTitle}>Alarm Type Distribution</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        )} */}

        {barChartData.labels.length > 0 && (
          <>
            <Text style={styles.chartTitle}>Alarms per Type</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 20}
              height={220}
              yAxisLabel=""
              yAxisSuffix="x"
              chartConfig={chartConfig}
              style={{ marginHorizontal: 10, borderRadius: 10 }}
            />
          </>
        )}

        {lineChartData.datasets[0].data.some((val) => val > 0) && (
          <>
            <Text style={styles.chartTitle}>Alarms per Hour</Text>
            <LineChart
              data={lineChartData}
              width={screenWidth - 20}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ marginHorizontal: 10, borderRadius: 10 }}
            />
          </>
        )}
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
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#0D0D0D',
  },
  menuButton: { marginRight: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  alarmCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    margin: 10,
    elevation: 5,
  },
  alarmTime: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  alarmMessage: {
    color: '#fff',
    fontSize: 16,
  },
  machineTag: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  machineButton: {
    padding: 10,
    backgroundColor: '#333',
    margin: 6,
    borderRadius: 10,
  },
  machineSelected: {
    backgroundColor: '#555',
  },
  machineText: {
    color: '#fff',
  },
  dateButton: {
    alignSelf: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: {
    color: '#fff',
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  noData: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});
