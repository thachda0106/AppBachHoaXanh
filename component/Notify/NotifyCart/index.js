import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import { Function } from "../../../Constant/Function";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Swipeout from "react-native-swipeout";
import Context from "../../../local-data/Context";
import * as Actions from "../../../local-data/Actions";

const NotifyCart = ({ alert, handleDelete }) => {
  const [state, dispatch] = useContext(Context);
  const swipeoutBtns = [
    {
      text: "Xóa",
      color: "#fff",
      backgroundColor: "red",
      type: "delete",
      onPress: () => {
        handleDelete(alert.alertID);
      },
    },
  ];

  const handleMarkAsRead = () => {
    dispatch(Actions.markAsReadNotify(alert.alertID));
  };

  return (
    <Swipeout right={swipeoutBtns} style={{ backgroundColor: "white" }}>
      <View>
        <View style={[styles.container, !alert.isRead ? styles.mark : {}]}>
          {!alert.isRead && (
            <TouchableOpacity
              style={styles.markAsReadBtn}
              onPress={() => {
                handleMarkAsRead();
              }}
            >
              <Text style={styles.markAsReadText}>Đánh dấu đã đọc</Text>
            </TouchableOpacity>
          )}
          <FontAwesomeIcon
            icon={faBell}
            size={20}
            color={"black"}
            style={styles.notifyIcon}
          />
          <View style={styles.wrapperContent}>
            <View style={styles.textContent}>
              <Text style={[styles.text, styles.subjectText]}>
                {alert.subject}
              </Text>
              <Text multiline={true} style={[styles.text, styles.contentText]}>
                {alert.content}
              </Text>
              <Text style={[styles.text, styles.dateTimeText]}>
                {Function.timestampToDateTime(alert.date)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeout>
  );
};

export default NotifyCart;
