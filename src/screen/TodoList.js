import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
// import { actionAddTodo, searchFilterChange, updateTodo } from '../redux/actions';
import uuid from 'react-native-uuid'
import { searchTextSelector, todoFilterSelector, todoSelector, todoStatusSelector } from '../redux/selector';
import { addNewTodo, addTodos, fetchTodos, todoSlice, updateTodo, updateTodoNew } from '../redux/Todo/TodoSlice';
import { filterSlice } from '../redux/Filters/FilterSlice';

export default function TodoList() {

    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const todoList = useSelector(todoSelector);
    const searchText = useSelector(searchTextSelector);
    const todoFilters = useSelector(todoFilterSelector);
    const todoStatus = useSelector(todoStatusSelector)


    const [state, setState] = useState(false)
    // const [tranX, setTranX] = useState(0)
    const offset = useSharedValue(0);

    const styleAnimationState = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }]
        }
    })

    const addTodo = () => {
        // dispatch(actionAddTodo({
        //     id: uuid.v4(),
        //     title: text,
        //     completed: false,
        // }))

        // dispatch(todoSlice.actions.addTodo({
        //     id: uuid.v4(),
        //     title: text,
        //     completed: false,
        // }))

        dispatch(addNewTodo({
            id: uuid.v4(),
            title: text,
            completed: false,
        }))
    }

    const onChangeTxt = (text) => {
        setText(text);
        // dispatch(searchFilterChange(text))
        dispatch(filterSlice.actions.searchFilterChange(text))
    }

    const searchTodo = () => {
        // console.log("Search");
    }

    // useDispatch(fetchTodos())
    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <View style={{ flex: 1, padding: 30, alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: "center" }}>
                <TextInput placeholder={state ? "Search" : "Todo name"} value={text} onChangeText={onChangeTxt} style={{ width: '100%', height: 50, borderWidth: 1, borderColor: 'black' }} />
                <TouchableOpacity style={{ width: 80, height: 40, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        setState(!state);
                        offset.value == 0 ? offset.value = withTiming(40) : offset.value = withTiming(0)
                    }}>
                    <View style={[{ width: 80, height: 40, borderRadius: 40, }, state ? st.containerTrue : st.stateFalse]}>
                        <Animated.View style={[{ width: 39, height: 39, borderRadius: 20 }, state ? st.stateFalse : st.stateTrue, styleAnimationState]}>

                        </Animated.View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 150, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4d94ff', marginTop: 50 }}
                    onPress={state ? searchTodo : addTodo}
                >
                    <Text style={{ color: 'white' }}>{state ? "Search" : "ADD"}</Text>
                </TouchableOpacity>
            </View>

            {/* <ScrollView style={{ width: '9%' }}>
                <View style={{ width: '100%', backgroundColor: 'white' }}>

                </View>
            </ScrollView> */}
            <View style={{ width: '100%', alignItems: 'center' }}>
                {todoStatus == 'idle' ? (
                    <FlatList
                        data={state ? todoFilters : todoList}
                        style={{ width: '90%' }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ width: '100%', height: 50, flexDirection: 'row', borderWidth: 1, borderColor: 'black', alignItems: 'center', borderRadius: 10, marginVertical: 10, paddingHorizontal: 10 }}
                                    onPress={() => {
                                        // dispatch(updateTodo({

                                        //     id: item.id

                                        // }));
                                        const data = { ...item, completed: !item.completed }
                                        console.log(data)
                                        dispatch(updateTodoNew(data))
                                    }}
                                >
                                    <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{`${index} ${item.title}`}</Text>

                                </TouchableOpacity>
                            )
                        }}
                    // keyExtractor={(item) => item.id}
                    />
                ) : (
                    <>
                        <ActivityIndicator color={'red'} size={34} />
                    </>
                )}
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    stateTrue: {
        backgroundColor: 'white',
    },
    stateFalse: {
        backgroundColor: 'black'
    },
    containerTrue: {
        backgroundColor: '#bfbfbf'
    }
})