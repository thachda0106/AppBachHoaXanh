import Color from "./Color";

export const Styles = {
  TitleText: {
    fontSize: 20,
    color: "black",
  },
  BlackNormalText:{
    fontSize: 15,
    color: "black",
  },
  BlackLargeText:{
    fontSize: 20,
    color: "black",
  },
  BlackSmallText:{
    fontSize: 13,
    color: "black",
  },
  GrayNormalText:{
    fontSize: 15,
    color: Color.colorGrayText,
  },
  GrayLargeText:{
    fontSize: 20,
    color: Color.colorGrayText,
  },
  GraySmallText:{
    fontSize: 13,
    color: Color.colorGrayText,
  },
  BorderBottomGray:{
    borderStyle: "solid",
    borderBottomColor: Color.colorLightGray,
    borderBottomWidth: 1,
  },
  flexCenter:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  BorderGray:{
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.colorGrayText,
    borderRadius: 4,
  }
};
