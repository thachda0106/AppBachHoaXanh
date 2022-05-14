import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faLock,
  faAngleLeft,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

//mode = 1 :success, mode = 2: error
const Dialog = (props) => {
  const moveAnim = useRef(new Animated.Value(-500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 40,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [moveAnim]);

  const close = () => {
    Animated.timing(moveAnim, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    props.closeDialog();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View
        style={[styles.dialog, { transform: [{ translateY: moveAnim }] }]}
      >
        <View
          style={[
            styles.header,
            props.mode === 2 ? { backgroundColor: "red" } : {},
          ]}
        >
          {props.mode === 1 && (
            <FontAwesomeIcon icon={faCheckCircle} size={54} color={"white"} />
          )}
          {props.mode === 2 && (
            <FontAwesomeIcon icon={faTimesCircle} size={54} color={"white"} />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Thông báo</Text>
          <Text style={styles.contextText}>{props.content}</Text>
          <TouchableOpacity
            onPress={() => {
              close();
            }}
            style={[
              styles.closeBtn,
              props.mode === 2 ? { backgroundColor: "red" } : {},
            ]}
          >
            <Text style={styles.closeBtnText}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  dialog: {
    marginTop: -320,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  header: {
    backgroundColor: "#0c8c45",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    alignItems: "center",
    padding: 8,
  },
  content: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  contextText: {
    fontSize: 16,
    marginVertical: 8,
  },
  closeBtn: {
    backgroundColor: "#0c8c45",
    padding: 8,
    width: 120,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  closeBtnText: {
    fontSize: 16,
    color: "white",
  },
});

export default Dialog;
