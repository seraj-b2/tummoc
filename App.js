import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
} from 'react-native';

// import { Icon } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context'
export default function App() {
  return (
    <View style={{}}>
      <SafeAreaView style={styles.position}>
  
   </SafeAreaView>
   <View style={{paddingBottom:1,padding:25,paddingRight:16,backgroundColor:"#0f2d38",justifyContent:"center",display:"flex",justifyContent:"space-around"}}>
 
  <Text style={{fontSize:20,paddingBottom:25,color:'#fff'}}>
      Your Tummoc Pass</Text>
  <Text style={styles.underlinedText} > support </Text>
   </View>
   <View style={{position:"relative",width:"90%",height:90,borderRadius:8,backgroundColor:'#fff',left:18,top:-22,shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 5,
  shadowOffset: {width: 0, height: 2},
  padding:10,
  elevation: 5}}>
    <View style={{display:'flex',flexDirection:"row"}}>

    <Image style={{width:70,height:70}} source={require('./assets/R.jpeg')} />
    <View>
      <Text style={{fontSize:20,paddingLeft:20}}>Vayu Vajra Gold Pass</Text>
      <View style={{display:'flex',flexDirection:'row',gap:40,paddingLeft:40}}>
      <Text>Monthly</Text>
      <Text>AC</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',paddingLeft:20}} >
      <Text style={styles.pass}>Pass ID: </Text>
      <Text style={styles.pass1}>TPASS9307165</Text>
      </View>
    </View>
      <Image style={{width:50,height:50,marginLeft:20}} source={require('./assets/timeline1.png')} />
    </View>
    <View style={{width:"105%",height:490,borderRadius:8,backgroundColor:'#fff',shadowColor: 'black',left:-10,
  shadowOpacity: 0.5,
  shadowRadius: 5,
  shadowOffset: {width: 0, height: 2},
  padding:10,
  marginTop:20,
  elevation: 5}}>
    {/* <Text>hello</Text> */}
    <View style={{display:'flex',flexDirection:'row',gap:20}}>
    <View style={{display:'flex',gap:10}}>
    <View>
    <Text style={styles.head1}>Passenger name</Text>
    <Text style={styles.head2}>Riyam Jain</Text>
    </View>
    <View>
    <Text style={styles.head1}>Identification type</Text>
    <Text style={styles.head2}>Voter ID</Text>
    </View>
    <View>
    <Text style={styles.head1}>Identification number (Last 4 digits)</Text>
    <Text style={styles.head2}>4663</Text>
    </View>
    </View>
    <Image style={{width:100,height:100}} source={require('./assets/Image.png')} />
    </View>
    <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
    <Text>Pass valid from</Text>
    <Text>01 Apr 2023, 12:00 AM</Text>
    <Text>Pass valid till</Text>
    <Text>30 Apr 2023 11:59 PM</Text>

    <Text>Pass fare</Text>
    <Text>&#8377;3650.0</Text>
  </View>
   </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:30
  },
  head1:{
    color:"#757575",
    fontSize:14
  },
  pass:{
    color:"#757575"
  },
  pass1:{
    color:'#102c38'
  },
  head2:{
    color:'#102c38',
    fontSize:14,
  },
  position:{
    backgroundColor:"#264b54",
},
underlinedText: {
  textDecorationLine: 'underline',
  fontSize: 9,
},
tinyLogo:{
  width:10,
  height:10,

},
  header:{
    backgroundColor:'#0f2d38',
    width:'100%'
  }
});
