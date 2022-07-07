import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native'
import Task from './components/Task'

export default function App() {
  const [task, setTask] = useState('')
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    if(task !== '') {
      Keyboard.dismiss()
      setTaskItems([...taskItems, task])
      setTask('')
    } 
  }

  const deleteTask = i => {
    let auxArray = taskItems.filter((item, index) => index !== i)
    setTaskItems(auxArray)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView style={styles.item}>
          {taskItems.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => deleteTask(i)}>
                <Task text={item} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform !== 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          onChangeText={text => setTask(text)}
          value={task}
          style={styles.input}
          placeholder="Write a task"
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWraper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 30,
    overflow: 'hidden'
  },
  writeTaskWrapper: {
    backgroundColor: '#E8EAED',
    flex: 1,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWraper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {
    color: '#C0C0C0',
    fontSize: 20
  }
})
