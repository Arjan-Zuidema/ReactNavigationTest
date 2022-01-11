/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Access" component={AccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable onPress={() => navigation.navigate('Access')}>
        <Text style={{color: 'black'}}>Access screen</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const AccessScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    load(false);
  }, []);

  const load = state => {
    setShowPassword(false);
    setLoading(true);

    setTimeout(() => {
      // Do some fake network request to simulate an access check
      if (state) {
        setData('Success');
      } else {
        setShowPassword(true);
      }
      setLoading(false);
    }, 200);
  };

  const onPasswordSuccess = useCallback(() => {
    load(true);
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {isLoading && <ActivityIndicator color={'black'} />}
      {!isLoading && showPassword && <Password onSuccess={onPasswordSuccess} />}
      {!isLoading && !showPassword && data && (
        <Data isLoading={isLoading} data={data} />
      )}
    </SafeAreaView>
  );
};

const Password = ({onSuccess}) => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      placeholder="password"
      placeholderTextColor={'gray'}
      value={value}
      style={{
        color: 'black',
      }}
      onChangeText={setValue}
      onSubmitEditing={onSuccess}
    />
  );
};

const Data = ({isLoading, data}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && data) {
      navigation.setOptions({
        headerRight: () => <HeaderRight />,
      });
    }
  }, [isLoading, navigation, data]);

  return <Text style={{color: 'black'}}>{data}</Text>;
};

const HeaderRight = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <FontAwesomeIcon size={24} icon={faCoffee} color={'red'} />
      <FontAwesomeIcon size={24} icon={faCoffee} color={'red'} />
      <FontAwesomeIcon size={24} icon={faCoffee} color={'red'} />
    </View>
  );
};

export default App;
