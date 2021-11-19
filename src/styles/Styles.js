import {
  StyleSheet
} from 'react-native'


export default StyleSheet.create({
  btn: {
    backgroundColor: '#07e09f',
    borderRadius: 10,
    width: 360,
    height: 45,
    marginBottom: 15,
    fontSize: 22,
  },
  btnHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: '100%',
  },
  btnHomeScreen: {
    width: 150,
    height: 150,
    marginVertical: 10,
    backgroundColor: '#4a488a',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 20, height: 20 },
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 5,
    opacity: 1
  },
  btnLogout: {
    width: 70, 
    height: 70, 
    justifyContent: 'center', 
    backgroundColor: '#07e09f', 
    borderRadius: 50,
    alignItems: 'center'
  },
  btnProfile: {
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    backgroundColor: '#4a488a', 
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 15
  },
  btnListWithdrawn: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  btnListWithdrawnContainer: {
    width: '100%', 
    height: 60, 
    backgroundColor: '#4a488a'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    fontSize: 16,
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1, 
    width: '100%',
  },
  itemContent: {
    padding : 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#bbb',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemLabels: {
    paddingBottom: 10, 
    marginVertical: 10, 
    backgroundColor: '#EEEDF8', 
    borderRadius: 10
  },
  labelItemList: {
    fontSize : 18, 
    fontWeight : 'bold',
    paddingHorizontal: 10
  },
  labelItemInfo: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  labelDateItemList: {
    width: 360, 
    fontSize : 20, 
    color: '#fff', 
    backgroundColor: '#7572cc', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    textAlign: 'center'
  },
  labelNameItemList: {
    fontSize : 22, 
    textAlign: 'center'
  },
  labelList: {
    height: '100%', 
    textAlignVertical: 'center', 
  },
  field: {
    width: 360,
    height: 45,
    marginBottom: 15,
    color: '#07e09f'
  },
  fieldLeft:{
    width: 310,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  fieldRight: {
    width: 310,
    alignContent: 'space-around',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a488a',
    marginHorizontal: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a488a',
    textAlign: 'center',
  },
  labelLogout:{
    textAlign: 'center', 
    color: '#fff', 
    fontWeight: 'bold'
  },
  labelBtnListWithdrawn: {
    borderBottomWidth: 1, 
    borderBottomColor: '#fff', 
    fontSize: 16, 
    color: '#fff'
  },
  listLabel:{
    fontSize: 14,
    fontWeight: 'bold'
  },
  icon:{
    width: 50,
    height: 45,
    backgroundColor: '#07e09f',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center'
  },
  iconLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  iconRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  loginField:{
    backgroundColor: '#EEEDF8',
    borderRadius: 10,
    fontSize: 20,
    padding: 10
  },  
  registrationField: {
    backgroundColor: '#EEEDF8',
    borderRadius: 10,
    fontSize: 18,
    padding: 10
  },
  registrationSelectionView: {
    width: 360,
    height: 45,
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  registrationSelectionPicker: {
    color: '#07e09f', 
    backgroundColor: '#EEEDF8'
  },  
  txtBtnAccess:{
    color: '#4a488a',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  txtBtnHomeScreen: {
    color: '#fff',
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },   
});