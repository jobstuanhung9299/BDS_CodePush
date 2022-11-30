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
  Platform
} from 'react-native';
import WebView from 'react-native-webview'
import codePush from 'react-native-code-push';

function App() {
  async function checkCodePushAndSync(codePushKey) {
    try {
      await codePush.sync({
        deploymentKey: codePushKey,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    } catch (error) {
      localNotification('Ops!', 'Error codePush!');
    }
  }
  async function initAppSettings() {
    try {
      checkCodePushAndSync('m94XIotYssIYJ7zijf6vhn1peMuWp7fKbRpr7');
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <View>
          <Text> code push demo 33333333333</Text>
           <WebView
            source={{
                uri: "https://www.google.com.vn"
            }}
            style={{ marginTop: 20, height: 500 }}
          /> 
        </View>
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

export default App;