import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color";
import { Styles } from "../../../Constant/Styles";


export const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 8,
        backgroundColor: Color.colorPrimary,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerChild: {
        marginHorizontal: 8,
        paddingVertical: 2
    },
    icon: {
        color: Color.colorYellow,
    },
    headerSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        backgroundColor: 'white',
        flex: 2,
        borderRadius: 4,
    },
    searchInput: {
        backgroundColor: 'white',
        color: 'black',
        marginLeft: 8,
        maxWidth: '70%'
    },
    headerItem: {
        ...Styles.flexCenter,
        flex: 1,
        backgroundColor: Color.colorPrimaryLight,
        borderRadius: 4,
        paddingHorizontal: 4,
        height: 36,
    },
    addressBtn:{
        ...Styles.flexCenter,
        height: 48,
    },  
    headerItemTxt: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center'
    }
})