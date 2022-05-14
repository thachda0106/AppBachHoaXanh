import { StyleSheet } from "react-native";
import Color from "../../../Constant/Color"


export const styles = StyleSheet.create({
    container: {
        height: 100,
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
        marginHorizontal: 4,
        paddingVertical: 2,
        height: 40,
    },
    icon: {
        color: Color.colorYellow,
    },
    headerSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
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
        width: 60,
        backgroundColor: Color.colorPrimaryLight,
        borderRadius: 4,
        paddingHorizontal: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerItemTxt: {
        color: 'white',
        fontSize: 11
    }
})