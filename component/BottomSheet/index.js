import {
    View,
    Text,
    Button,
    Dimensions,
    Animated,
    StyleSheet,
    Pressable,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { IconButton, Portal } from "react-native-paper";
  import { PanGestureHandler } from "react-native-gesture-handler";
  
  const BottomSheet = (props) => {
    const [open, setOpen] = useState(props.show);
    const bottomSheetHeight = Dimensions.get("window").height * (props.heightScale || 0.5);
    const deviceWidth = Dimensions.get("window").width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    useEffect(() => {
      if (props.show) {
        setOpen(props.show);
        Animated.timing(bottom, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(bottom, {
          toValue: -bottomSheetHeight,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setOpen(false);
        });
      }
    }, [props.show]);
  
    // Function
    const onGesture = (event) => {
      alert(event);
      if (event.nativeEvent.translationY > 0) {
        bottom.setValue(-event.nativeEvent.translationY);
      }
    };
    const onGestureEnd = (event) => {
      alert(event);
      if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
        props.onDismiss();
      } else {
        bottom.setValue(0);
      }
    };
    return (
      <Portal>
        {props.show && (
          <Pressable
            onPress={props.enableBackdropDismiss ? props.onDismiss : undefined}
            style={styles.backDrop}
          />
        )}
        <Animated.View
          style={[
            styles.root,
            {
              height: bottomSheetHeight,
              bottom: bottom,
              shadowOffset: {
                height: -3,
              },
            },
            styles.common,
          ]}
        >
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View
              style={[
                styles.header,
                {
                  shadowOffset: {
                    height: 3,
                  },
                },
                styles.common,
              ]}
            >
              <View
                style={{
                  width: 60,
                  height: 3,
                  borderRadius: 1.5,
                  position: "absolute",
                  top: 8,
                  left: (deviceWidth - 60) / 2,
                  zIndex: 10,
                  backgroundColor: "#ccc",
                }}
              />
              <IconButton
                onPress={() => {
                  props.onDismiss(false);
                }}
                color={"red"}
                icon="close"
                style={styles.closeIcon}
              />
            </View>
          </PanGestureHandler>
          {props.children}
        </Animated.View>
      </Portal>
    );
  };
  
  const styles = StyleSheet.create({
    root: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: "#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: "hidden",
    },
    header: {
      height: 40,
      backgroundColor: "#fff",
    },
    common: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 4,
      elevation: 3,
    },
    closeIcon: {
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 10,
    },
    backDrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 80,
      backgroundColor: "rgba(0,0,0, 0.01)",
    },
  });
  
  export default BottomSheet;
  