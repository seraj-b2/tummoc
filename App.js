import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

// import {
//   QrCodeScannedCallback,
//   QrCodeScanner,
//   requestAuthorizationAsync,
// } from "react-native-ios-qr-code-scanner";

import { Button } from 'react-native-elements';

// import { Icon } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';
import { TouchableHighlight } from 'react-native';
import Model from './Model';
export default function App() {
  // const [photo, setPhoto] = useState(false);
  const [scanned,setScanned] = useState(false)
  const [hasPermission, setHasPermission] = useState(null);
  const [showqr,setShowqr] = useState(false);
  const [busno,setBusno] = useState('BMTC BUS KA57F46');
  const [gDate,setGDate] = useState('');
  const [passValid,setPassValid] = useState();
  const [passValidTill,setPassValidTill]  = useState();
  const [passPurchase,setPassPurchase] = useState();
  const [showmodal,setShowModal] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    };

    getBarCodeScannerPermissions();
    currentDate()
  }, []);
  const currentDate=()=>{
    const date = new Date(); 
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // get last date
    const lastDate = lastDayOfMonth.getDate().toString().padStart(2, '0') // last date in string
// creates a new Date object with current date and time
    const day = date.getDate().toString().padStart(2, '0'); // get the day and pad it with leading zeros if necessary
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth(); // get the month index (0-11)
    const month = monthNames[monthIndex];

    // get the month name
    const year = date.getFullYear(); // get the year
    let hours = date.getHours(); // get the hours (0-23)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // get the minutes and pad it with leading zeros if necessary
    const ampm = hours >= 12 ? 'PM' : 'AM'; // determine AM/PM

    hours = hours % 12; // convert to 12-hour format
    hours = hours ? hours : 12; // handle midnight (0:00) and noon (12:00)
    const time = `${hours}:${minutes} ${ampm}`; // construct the time string
    setPassPurchase(`01 ${month} ${year}, 12:03 AM`)
    setPassValid(`01 ${month} ${year}, 12:00 AM`)
    setPassValidTill(`${lastDate}  ${month} ${year}, 11:59 PM`)
    const formattedDate = `${day} ${month} ${year}, ${time}`; // construct the formatted date string
    console.log(formattedDate);
    setGDate(formattedDate);
    

  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      // console.log(res)
      setBusno(value)
      // setGDate('');
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      console.log(value);
    }
    return setBusno(value);
  } catch(e) {
    // error reading value
  }
}
useEffect(()=>{
  getData();
},[])
  // const handleQrCode = useCallback(code => {
  //   setScanned(true)
  
  //   console.log("QR code =", code)
  //   alert(`QR code with data ${code.data} has been scanned!`)
  // }, [])
  const handleBarCodeScanned = ({type,data})=>{
   if(data == undefined) return;
  //  const ind = data.indexof('=');
  //  const lastind = data.indexof('&');
  const findex = data.indexOf('=');
  const lindex = data.indexOf('Bangalore');
  const co = data.slice(findex+1,lindex);
  
  storeData(co)
  console.log('hello',co);
  console.log(data,typeof(data),co);
  console.log(data.indexOf('='),data.indexOf('&'))

  // alert(co);
    setShowModal(true)
    setScanned(true);
    setShowqr(false);
    
    // const main = data.slice(data.indexof('=')+1,data.indexof('&'));
    // console.log("data",main,type)
    
    // alert( `Bar code with Type and data ${Linking.o}`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //     const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
  //     setHasCameraPermission(cameraPermission.status === "granted");
  //     setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
  //   })();
  // }, []);

  // if (hasCameraPermission === undefined) {
  //   return <Text>Requesting permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted. Please change this in settings.</Text>
  // }
  // if (hasMediaLibraryPermission === undefined) {
  //   return <Text>Requesting permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted. Please change this in settings.</Text>
  // }
  const onSuccess = (e) => {
    console.log(e.data); // e.data contains the QR code data
  };
  if(showqr) return(
    <View style={styles.qrcompo} >
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={StyleSheet.absoluteFill}
      
    />
      <TouchableHighlight>
      <TouchableOpacity style={styles.button1}
       onPress={()=>setShowqr(pre=>!pre)}><Text > </Text></TouchableOpacity>
      </TouchableHighlight>
    </View>
    );
  return (
    
    <View style={{fontFamily:"sans-serif"}}>
      <SafeAreaView style={styles.position}>
  
   </SafeAreaView>
   <View style={{paddingBottom:1,padding:25,paddingBottom:35,backgroundColor:"#0f2d38",justifyContent:"center",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
 
  <Text style={{fontSize:20,paddingBottom:20,color:'#fff'}}>Your Bus Pass</Text>
  <Text style={styles.underlinedText}>support</Text>
   </View>
   <View style={{position:"relative",width:"90%",height:170,borderRadius:8,backgroundColor:'#fff',left:18,top:-22,shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 5,
  shadowOffset: {width: 0, height: 2},
  padding:10,
  elevation: 5}}>
    <View style={{display:'flex',flexDirection:"row"}}>

    <Image style={{width:70,height:70}} source={require('./assets/R.jpeg')} />
    <View style={{display:"flex",
  flexDirection:"column",gap:4}}>
      <Text style={{fontSize:22,paddingLeft:20,fontWeight:600}}>Vayu Vajra Gold Pass</Text>
      <View style={{display:'flex',flexDirection:'row',gap:40,paddingLeft:40}}>
      {/* <Text>Monthly</Text> */}
      <Text style={{backgroundColor:"#dcebc4",width:35,textAlign:'center',borderRadius:8,color:"green",fontWeight:700,fontSize:17}}>AC</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',paddingLeft:20}} >
      <Text style={styles.pass}>Pass ID: </Text>
      <Text style={styles.pass1}>TPASS9307165</Text>
      </View>
      <Text style={{color:"#034560",textDecorationLine:'underline',right:50}}>Click here to view validation instructions</Text>
      <View style={{display:"flex",flexDirection:"row",right:60}}>
      <Image style={{width:30,height:39}} source={require('./assets/Screenshot.png')} />
      {/* <Button title='Scan conductor OR for validation' color="Black" style={{}} /> */}
      <TouchableOpacity
         style={styles.button}
         onPress={()=>setShowqr(pre=>!pre)}
       >
         <Text style={{ fontWeight:600,fontSize:14.5,
    color:"#0f2c39",}}> Scan conductor OR for validation </Text>
 </TouchableOpacity>
      </View>

      {/* <Text>  Scan conductor OR for validation</Text> */}
    </View>
      {/* <Image style={{width:50,height:50,marginLeft:20}} source={require('./assets/timeline1.png')} /> */}
    </View>
  
   </View>
   <Text style={styles.book} >Booking Details</Text>
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{width:"90%",height:'65%',borderRadius:8,backgroundColor:'#fff',shadowColor: 'black',left:18,
  shadowOpacity: 0.5,
  shadowRadius: 5,
  shadowOffset: {width: 0, height: 2},
  padding:10,
  marginTop:20,
  marginBottom:40,
  elevation: 5}}>
    {/* <Text>hello</Text> */}

    <View style={{display:'flex',flexDirection:'row',justifyContent:"space-around"}}>
    <View style={{display:'flex',gap:10,margin:5}}>
    <View>
    <Text style={styles.head1}>Passenger name</Text>
    <Text style={styles.head2}>Riyam Jain</Text>
    </View>
    <View>
    <Text style={styles.head1}>Identification type</Text>
    <Text style={styles.head2}>Aadhar Card</Text>
    </View>
    <View>
    <Text style={styles.head1}>Identification number (Last 4 digits)</Text>
    <Text style={styles.head2}>2105</Text>
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
<View style={{display:"flex",flexDirection:"column",gap:10,marginTop:10}}>
  <View>
    <Text style={styles.head1}>Pass purchase date</Text>
    <Text style={styles.head2}> {passPurchase} </Text>
    </View>
    <View>
    <Text style={styles.head1}>Pass valid from</Text>
    <Text style={styles.head2}>{passValid}</Text>
    </View>

    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
      <View>
    <Text style={styles.head1}>Pass valid till</Text>
    <Text style={styles.head2}>{passValidTill}</Text>
    </View>
    <View>
    <Text style={styles.head1,{textDecorationLine:'underline',alignItems:"flex-end",display:"flex",left:10}} >Pass fare</Text>
    <Text style={styles.head2,{fontSize:19,fontWeight:500}} >&#8377; 3650.0</Text>
    </View>
    </View>
    <TouchableOpacity style={styles.mail} ><Text style={styles.mailtext}> Generate mail receipt </Text></TouchableOpacity>
    </View>




    <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      top:40
    }}
/>

    <View style={styles.check23}>
    <Text style={styles.valid} >Last validation</Text>
    <Text style={styles.valid}>{gDate}</Text>
    <Text style={styles.valid}>Bus Number</Text>
    <Text style={styles.valid}> {busno} </Text>
    <Text style={styles.valid}>Validated By</Text>
    <Text style={styles.valid}>Self</Text>
</View>
<View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      top:10,
      marginBottom:10
    }}
/>
  <Image style={{height:332,width:330}} source={require('./assets/code.gif')}/>
  <Image style={{height:32,width:30,position:"relative",bottom:180,left:150}} source={require('./assets/R.jpeg')}/>

  </ScrollView>
  <Model modalopen={showmodal} setShowModal={setShowModal} passValidTill={passValidTill}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:30
  },qrcompo:{
    flex:1,
    // flexDirection:"column",
    justifyContent:"center",
    backgroundColor:"black"
  },
  scrollView: {
    // backgroundColor: 'pk',
    // marginHorizontal: 20,
  },
  valid:{
    fontWeight:500,
    fontSize:16
  },
  mail:{
    backgroundColor:'#829A56',
    width:190,
    top:20,
    left:50,
    height:35,
    borderRadius:8
  },
  mailtext:{
    color:"white",
    fontWeight:600,
    fontSize:18,
    left:6,
    top:4
  },
  check23:{
    backgroundColor:"#B4c793",
    opacity:0.6,
    height:150,
    top:50,
    padding:10,
    marginBottom:50,
    borderRadius:8
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#BCE3CF',
    padding: 10,
    borderRadius:4,
   
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 0,
    height:3
  },
  head1:{
    color:"#757575",
    fontSize:13.5,
    fontWeight:500
  },
  pass:{
    color:"#757575"
  },
  pass1:{
    color:'#102c38',
  },
  book:{
    paddingLeft:20,
    fontSize:18,
    fontWeight:500,
    color:'#0e2d38'
  },
  head2:{
    color:'#0f2c39',
    fontSize:15,
    fontWeight:400
  },
  position:{
    backgroundColor:"#264b54",
},
underlinedText: {
  textDecorationLine: 'underline',
  color:"white",
  fontSize: 14,
  paddingTop:5
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
