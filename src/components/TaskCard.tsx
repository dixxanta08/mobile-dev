import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export default function TaskCard({ task, taskIcon, onSave, onDelete }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(task.text);

  React.useEffect(() => {
    setEditedText(task.text);
  }, [task.text]);

  return (
    <View style={styles.taskCardContainer}>
      <View style={styles.taskContent}>
        <Text style={styles.taskIcon}>{taskIcon}</Text>
        <View style={styles.textWrapper}>
          {isEditing ? (
            <TextInput
              style={styles.taskTextInput}
              value={editedText}
              multiline={true}
              maxLength={200}
              onChangeText={(text) => setEditedText(text)}
            />
          ) : (
            <Text style={styles.taskText}>{task.text}</Text>
          )}
        </View>
      </View>
      {isEditing ? (
        <View style={styles.taskActions}>
          <Pressable
            style={[styles.taskActionButton, styles.taskCancelButton]}
            onPress={() => setIsEditing(false)}
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.taskActionButton, styles.taskSaveButton]}
            onPress={() => {
              setIsEditing(false);
              onSave({ ...task, text: editedText });
            }}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.taskActions}>
          <Pressable
            style={[styles.taskActionButton, styles.taskEditButton]}
            onPress={() => setIsEditing(true)}
          >
            <FontAwesome6 name="pencil" size={14} color="black" />
          </Pressable>
          <Pressable
            style={[styles.taskActionButton, styles.taskDeleteButton]}
            onPress={() => {
              onDelete(task.id);
            }}
          >
            <Ionicons name="trash" size={14} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  taskCardContainer: {
    width: "100%",
    backgroundColor: "#b8e3e0",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  taskContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  taskIcon: {
    fontSize: 16,
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: "100%",
    borderWidth: 2,
    borderColor: "#000000",
  },
  textWrapper: {
    flex: 1,
  },
  taskText: {
    fontSize: 14,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  taskTextInput: {
    fontSize: 12,
    fontWeight: "400",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    borderWidth: 2,
    borderColor: "#000000",
    height: 80,
    textAlignVertical: "top",
  },

  taskActions: {
    alignSelf: "flex-end",

    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  taskActionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 16,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  taskEditButton: {
    backgroundColor: "#ffffff",
  },
  taskDeleteButton: {
    backgroundColor: "#000000",
  },
  taskSaveButton: {
    backgroundColor: "#000000",
  },
  taskCancelButton: {
    backgroundColor: "#ffffff",
  },
});
