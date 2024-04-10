import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import TodoList from './src/screen/TodoList'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { setupServer } from './src/fakeAPI'
import { getListTodo, updateTodo } from './src/JsonServer/API'
// npx json-server 'd:\Hoc\React Naive Demo\ReactNativeDemo - redux_toolkit\src\JsonServer\server.json'
// setupServer();
export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

const styles = StyleSheet.create({})