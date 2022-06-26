import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

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
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    const updatedTasks = tasks.map((task) => task);
    const foundItem = updatedTasks.find((item) => item.id === id);

    if (foundItem) {
      foundItem.done = !foundItem.done;
    } else {
      return;
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não", onPress: () => setTasks(tasks) },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    //TODO - toggle task done if exists

    const updatedTasks = tasks.map((task) => task);
    const taskToBeUpdated = updatedTasks.find((item) => item.id === taskId);

    if (taskToBeUpdated) {
      taskToBeUpdated.title = taskNewTitle;
    } else {
      return;
    }

    setTasks(updatedTasks);
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
    backgroundColor: "#EBEBEB",
  },
});
