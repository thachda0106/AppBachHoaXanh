import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { styles } from "./styles";
import Color from "../../../../Constant/Color";
import { Function } from "../../../../Constant/Function";
import Context from "../../../../local-data/Context";
const Comment = (props) => {
  const [state, dispatch] = useContext(Context);
  const [user, setUser] = useState(()=>{
      for(let i = 0; i<state.thach.users.length; i++){
          if(state.thach.users[i].userID == props.comment.userID){
              return state.thach.users[i]
          }
      }
  })
  console.log(state.thach.users)
  if(!user) return <></>;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.customer}>{user.fullName}</Text>
        <View style={styles.rate}>
          {[1, 2, 3, 4, 5].map((star, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                size={16}
                style={{
                  marginHorizontal: 1,
                }}
                color={
                  props.comment.starNumber > index
                    ? Color.colorStar
                    : Color.colorGrayText
                }
              />
            );
          })}
        </View>
      </View>
      <Text style={styles.date}>
        {Function.timestampToDate(props.comment.date)}
      </Text>
      <Text style={styles.content}>{props.comment.content}</Text>
    </View>
  );
};

export default Comment;
