import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { styles } from "./styles";
import Color from "../../../../Constant/Color";
import { Function } from "../../../../Constant/Function";
import Context from "../../../../local-data/Context";
import * as Actions from "../../../../local-data/Actions";
import APICaller from "../../../../local-data/APICaller";
const Comment = (props) => {
  const [state, dispatch] = useContext(Context);
  const [user, setUser] = useState(() => {
    for (let i = 0; i < state.thach.users.length; i++) {
      if (state.thach.users[i].userID == props.comment.userID) {
        return state.thach.users[i];
      }
    }
  });

  useEffect(()=>{

  }, [state])


  const handleDeletecomment = () =>{
    if(state.thach.currentUser.userType !== "ADMIN") return
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa bình luận này",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Đồng ý", onPress: async() => {
          props.setIsLoading(true)
          let res = await APICaller.deleteComment(props.comment.commentID)
          if(res.status > 199 && res.status < 299){
            res = await APICaller.getAPIComments()
            props.setIsLoading(false)
            if(res.status > 199 && res.status < 299){
              Function.showToast("success", "Xóa bình luận thành công")
              dispatch(Actions.setCommentsFromAPI(res.data))
            }
          }
          else{
            props.setIsLoading(false)
            Function.showToast("error", "Đã có lỗi khi xóa bình luận "+res.status)
          }
        } }
      ])

  }

  if (!user) return <></>;
  return (
    <TouchableOpacity onLongPress={()=>{handleDeletecomment()}}>
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
    </TouchableOpacity>
  );
};

export default Comment;
