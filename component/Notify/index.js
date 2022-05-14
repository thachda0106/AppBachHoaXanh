import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faBroom } from "@fortawesome/free-solid-svg-icons";
import Context from "../../local-data/Context";
import * as Actions from "../../local-data/Actions";
import NotifyCart from "./NotifyCart";
import { Function } from "../../Constant/Function";
import { deleteNotify } from "../../local-data/Actions";
import MenuBottom from "../../component/MenuBottom";
const Notify = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userAlerts, setUserAlerts] = useState(() => {
    let alerts = state.thach.alerts.filter((alert) => {
      if (
        alert.userID == state.thach.currentUser.userID ||
        alert.userID == ""
      ) {
        alert.previewContent =
          alert.content.length > 40
            ? alert.content.substring(0, 40) + "..."
            : alert.content;
        return true;
      }
      return false;
    });

    return Function.orderBy(alerts, "date", -1);
  });

  console.log(state.thach.alerts)

  const handleDelete = (alertID) => {
    dispatch(deleteNotify(alertID));
    setUserAlerts((prevAlerts) => {
      let userAlerts = prevAlerts.filter((alert) => alert.alertID != alertID);
      return userAlerts;
    });
  };

  const handleMarkAsReadAll = () => {
    dispatch(Actions.markAsReadNotify(0, true));
  };
  return (
    <>
      <View style={styles.container}>
        {userAlerts.length > 0 && (
          <TouchableOpacity
            style={styles.markAsReadBtn}
            onPress={() => {
              handleMarkAsReadAll();
            }}
          >
            <FontAwesomeIcon icon={faBroom} size={32} color="white"/>
          </TouchableOpacity>
        )}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} size={20} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông báo</Text>
        </View>

        <ScrollView style={styles.alertsWrapper}>
          {userAlerts.map((alert) => {
            return (
              <NotifyCart
                key={alert.alertID}
                alert={alert}
                handleDelete={handleDelete}
              />
            );
          })}
        </ScrollView>
      </View>
      <MenuBottom navigation={props.navigation} select={3} />
    </>
  );
};

export default Notify;
