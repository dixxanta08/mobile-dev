import AddTaskModal from "@/components/AddTaskModal";
import FilterTaskType from "@/components/FilterTaskType";
import TaskCard from "@/components/TaskCard";
import Storage from "@/utils/storage";
import { useFonts } from "expo-font";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ManageScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tasks, setTasks] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState("Truth");

  const truthCount = React.useMemo(() => tasks?.truth?.length || 0, [tasks]);
  const dareCount = React.useMemo(() => tasks?.dare?.length || 0, [tasks]);

  const filteredTasks = React.useMemo(() => {
    if (!tasks) return null;

    if (activeFilter === "Truth") {
      return tasks.truth;
    } else if (activeFilter === "Dare") {
      return tasks.dare;
    } else {
      return null;
    }
  }, [tasks, activeFilter]);

  const fetchTasks = async () => {
    const storedTasks = await Storage.get("tasks");
    setTasks(storedTasks);
  };
  React.useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleSaveTask = async (task) => {
    let updatedTasks = { ...tasks };
    if (activeFilter === "Truth") {
      // find task.id in truth and update it, if not found add it to the end of the array
      const taskIndex = updatedTasks.truth.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        updatedTasks.truth[taskIndex] = { ...task, text: task.text };
      } else {
        updatedTasks.truth = [
          ...(updatedTasks.truth || []),
          { ...task, text: task.text },
        ];
      }
    } else if (activeFilter === "Dare") {
      // find task.id in dare and update it, if not found add it to the end of the array
      const taskIndex = updatedTasks.dare.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        updatedTasks.dare[taskIndex] = { ...task, text: task.text };
      } else {
        updatedTasks.dare = [
          ...(updatedTasks.dare || []),
          { ...task, text: task.text },
        ];
      }
    }
    setTasks(updatedTasks);
    await Storage.set("tasks", updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    let updatedTasks = { ...tasks };
    if (activeFilter === "Truth") {
      updatedTasks.truth = updatedTasks.truth.filter((t) => t.id !== taskId);
    } else if (activeFilter === "Dare") {
      updatedTasks.dare = updatedTasks.dare.filter((t) => t.id !== taskId);
    }
    setTasks(updatedTasks);
    await Storage.set("tasks", updatedTasks);
  };

  if (!loaded) return null;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>Manage</Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.manageButton}
        >
          <Text style={styles.manageButtonText}>+</Text>
        </Pressable>
        <AddTaskModal
          visible={modalVisible}
          setVisible={setModalVisible}
          onTaskAdded={handleTaskAdded}
        />
      </View>
      <FilterTaskType
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        truthCount={truthCount}
        dareCount={dareCount}
      />

      {/* task list */}
      <View>
        {filteredTasks?.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
            taskIcon={activeFilter === "Truth" ? "👁️" : "🔥"}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e6bf",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerBlock: {
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 32,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontFamily: "Baloo2-Regular",
  },
  manageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: "100%",
    backgroundColor: "#f6d83c",
  },
  manageButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
  },
});
