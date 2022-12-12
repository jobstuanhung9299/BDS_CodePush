import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState,
  Platform,
  TouchableOpacity
} from 'react-native';
import WebView from 'react-native-webview'
import codePush from 'react-native-code-push';

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

function App() {

  // function onButtonPress() {
  //   codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE
  //   });
  // }

  async function checkCodePushAndSync(codePushKey) {
    try {
      await codePush.sync({
        deploymentKey: codePushKey,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    } catch (error) {
      console.log('Ops! Error codePush!');
    }
  }

  async function initAppSettings() {
    try {
      checkCodePushAndSync('DjJN9Mmo0Gy3JBDbPaPeVNpNb-GJOOO2EBt_2');
    } catch (e) {
    }
  }

  function handleAppStateChange(nextAppState) {
    if (nextAppState == 'active') {
      checkCodePushAndSync();
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    initAppSettings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <View>
          <Text> code push demo app-release.apk</Text>
           <WebView
            source={{
                uri: "https://www.google.com.vn"
            }}
            style={{ marginTop: 20, height: 500 }}
          /> 
        </View>
        {/* <TouchableOpacity onPress={onButtonPress}>
                <Text>Check for updates</Text>
            </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
});

// App = codePush(codePushOptions)(App);
export default App;