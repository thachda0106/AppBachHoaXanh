import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Function } from '../../../../../Constant/Function'

const Item = (props) => {
  const productCart = props.productCart
  const sum = Function.calculatePrice(productCart.price, productCart.priceDiscount) * productCart.quantity
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.quantity}>{productCart.quantity}x</Text>
      <Image style={{width: 60, height: 60, resizeMode: 'contain'}} source={{uri: productCart.img}}/>
      <Text multiline={true} style={styles.name}>{productCart.productName}</Text>
      <Text style={styles.price}>{Function.toVND(productCart.price * (100 - productCart.priceDiscount)/100)}</Text>
      {/* <Image style={{width: 120, height: 120, resizeMode: 'contain'}} source={{uri: productCart.img}}/>
      <Text>Tên sản phẩm: {productCart.productName}</Text>
      <Text>Giá gốc: {Function.toVND(productCart.price)}</Text>
      <Text>Giá giảm: {Function.toVND(Function.calculatePrice(productCart.price, productCart.priceDiscount))}</Text>
      <Text>Số lượng: {productCart.quantity}</Text>
      <Text>Thành tiền: {Function.toVND(sum)}</Text> */}
    </TouchableOpacity>
  )
}

export default Item