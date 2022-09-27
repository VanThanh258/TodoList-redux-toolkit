import { View, Text,StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { todoSliceAction } from '../src/Todo/todoSlice';
import { useState } from 'react';
import { Alert } from 'react-native';

const Todo = ({navigation}) => {
    const todo = useSelector(state => state.todo);
    const{task,taskID} = todo;
    const dispatch = useDispatch();
    const handleDeleteTask = (data) => {
        Alert.alert(
            "Thông báo",
            `Bạn có chắc chắn muốn xóa công việc này không`,
            [
              {
                text: "Có",
                onPress: () => {
                    const action = todoSliceAction.deledeTask(data)
                    dispatch(action);
                }
              },
              { text: "Không", onPress: () => {} }
            ]
          );
    }
    const renderItem = ({item}) => {
        if(item.completed === false){
            let color = styles.black;
        if(item.priority === 'Low'){
            color = styles.black;
        }else if(item.priority === 'Medium'){
            color = styles.green;
        }else if(item.priority === 'High'){
            color=styles.red;
        }
        return <TouchableOpacity 
        key={item.id} 
        style={styles.task} 
        onPress={() => {
            const action = todoSliceAction.updateTaskID(item.id)
            dispatch(action);
            navigation.navigate('AddTodo')
        }}
        // onLongPress={() => {
        //     handleDeleteTask(item.id);
        // }}
        >
        <View style={[styles.priority,color]}></View>
        <View style={styles.rightTask}>
        <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => {
            const action = todoSliceAction.toggleStatus(item.id)
            dispatch(action);
        }}
        >
        {
            item.completed === true && <Text>V</Text>
        }
        </TouchableOpacity>
        <View style={styles.number}>
            <Text style={{color:'white'}}>{item.id}</Text>
        </View>
        </View>
        <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text style={styles.desc}>{item.desc}</Text>
            </View>
        </View> 
      </TouchableOpacity>
        }
    }
  return (
    <View style={styles.container}>
        <FlatList
        data={task}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
      <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        const action = todoSliceAction.updateTaskID(task.length + 1)
        dispatch(action);
        navigation.navigate('AddTodo');
        }}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DDDDDD',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    task:{
        marginTop: 10,
        width: '100%',
        backgroundColor:'white',
        flexDirection:'row',
        borderRadius: 20,
        
    },
    priority:{
        flex:0.05,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightTask:{
        flex: 0.2,
        flexDirection:'row',
        alignItems:'center'
    },
    checkbox:{
        width: 20,
        height: 20,
        borderWidth: 1,
        marginVertical: 20,
        marginLeft: 10,
    },
    number:{
        marginLeft: 10,
        width: 40,
        backgroundColor:'green',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    content:{
        flex:0.75,
        width: '80%',
        marginLeft: 20,
        paddingHorizontal: 10,
    },
    title:{
        fontSize: 20,
        fontWeight:'bold'
    },
    desc:{
        fontSize: 12,

    },
    button:{
        backgroundColor: 'green',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position:'absolute',
        bottom: 0,
        right:0,
    },
    text:{
        color: 'white',
        fontSize: 20
    },
    red:{
        backgroundColor:'#FF0000',
    },
    green:{
        backgroundColor:'#00CC00',
    },
    black:{
        backgroundColor:'#333333',
    }
  });