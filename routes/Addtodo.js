import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import todoSlice, { todoSliceAction } from '../src/Todo/todoSlice';
const Addtodo = ({navigation}) => {
    const dispatch = useDispatch();
    const todo = useSelector(state => state.todo)
    const{task, taskID} = todo;
    const [isChecked, setIsChecked] = useState(false);
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [check,setCheck] = useState('');
    const handleChecked = () => {
        setIsChecked(!isChecked);
    }
    const handleCheckLow = () => {
        setCheck('Low')
    }
    const handleCheckMedium = () => {
        setCheck('Medium')
    }
    const handleCheckHight = () => {
        setCheck('High')
    }
    useEffect(() => {
        getTask()
    },[])
    const getTask = () => {
        const listTask = task.find(item => item.id === taskID);
        if(listTask){
            setTitle(listTask.title)
            setDesc(listTask.desc)
            setCheck(listTask.priority)
            setIsChecked(listTask.completed)
        }
    }
    const handleAddTask = () => {
        const Task = {
            id: taskID,
            title: title,
            desc: desc,
            priority: check,
            completed: isChecked,
        }
        const index = task.findIndex(item => item.id === taskID);
        let newTask = [];
        if(index > -1){
            newTask = [...task];
            newTask[index] = Task;
            const action = todoSliceAction.saveTask(newTask);
            dispatch(action);
            setTitle('');
            setDesc('');
            setCheck('');
            navigation.navigate('Todo')
        }
        else{
            newTask = [...task,Task];
            const action = todoSliceAction.saveTask(newTask);
            dispatch(action);
            setTitle('');
            setDesc('');
            setCheck('');
            navigation.navigate('Todo')
        }
    }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.title}>
            <Text style={styles.text}>Title</Text>
            <TextInput style={styles.input} value={title} placeholder='công việc của bạn' onChangeText={(text) => setTitle(text)}/>
        </View>
        <View style={styles.desc}>
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.input} value={desc} placeholder='Mô tả công việc' onChangeText={(text) => setDesc(text)}/>
        </View>
        <View style={styles.priority}>
            <Text style={styles.text}>Mức độ ưu tiên</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.box1} onPress={handleCheckLow}>
                {
                    check === 'Low' ? <Text style={styles.textPriority}>V</Text> :
                               <Text style={styles.textPriority}>Thấp</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.box2} onPress={handleCheckMedium}>
                {
                    check === 'Medium' ? <Text style={styles.textPriority}>V</Text> :
                               <Text style={styles.textPriority}>Bình Thường</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.box3} onPress={handleCheckHight}>
                {
                    check === 'High' ? <Text style={styles.textPriority}>V</Text> :
                               <Text style={styles.textPriority}>Cao</Text>
                }
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.check}>
            <TouchableOpacity style={styles.checkbox} onPress={handleChecked}>
                {
                    isChecked && <Text>V</Text>
                }
            </TouchableOpacity>
            <Text style={{marginLeft: 10}}>Is Done</Text>
        </View>
        <View style={styles.saveTask}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAddTask}>
                <Text style={{color:'white'}}>Save Task</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Addtodo

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#DDDDDD',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    form:{
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title:{
        marginTop: 20,
    },
    text:{
        marginBottom: 5,
    },
    input:{
        backgroundColor:'#CCCCCC',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    desc:{
        marginTop: 20,
    },
    priority:{
        alignItems:'center',
        marginTop:20,
    },
    box1:{
        width:'30%',
        backgroundColor:'#333333',
        height: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems:'center',
        justifyContent:'center',
    },
    box2:{
        width:'30%',
        backgroundColor:'#00CC00',
        height: 40,
        alignItems:'center',
        justifyContent:'center',
    },
    box3:{
        width:'30%',
        backgroundColor:'#FF0000',
        height: 40,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems:'center',
        justifyContent:'center',
    },
    textPriority:{
        color:'white',
    },
    check:{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    checkbox:{
        width: 30,
        height: 30,
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    saveTask:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonAdd:{
        width: '40%',
        paddingVertical: 10,
        backgroundColor:'green',
        alignItems:'center',
        borderRadius:30,
    }
})