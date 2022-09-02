import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    if (tasks.find(element => element.title === newTaskTitle)) {
      return Alert.alert(
        "Tarefa já existe",
        "Essa tarefa já foi adicionada anteriormente!"
      );
    }
    setTasks(prevState => [...prevState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const foundItem = updateTasks.find(element => element.id === id);
    if (!foundItem) return;
    foundItem.done = !foundItem.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover", "Remover a tarefa?", [
      {
        text: "Sim",
        onPress: () =>
          setTasks(prevState => prevState.filter(tasks => tasks.id !== id))
      },
      {
        text: "Não",
        style: "cancel"
      }
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const foundItem = updateTasks.find(element => element.id === taskId);
    if (!foundItem) return;
    foundItem.title = taskNewTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  }
});
