import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {testProps} from '../utils'

class Product extends Component {
  clickAddToCart = () => {
    alert('Product Added to the Cart.');
  };
  render() {
    return (
        <>
        <ScrollView>
        <View
        {...testProps('testIDViewMainContainer', 'View Main Container Accessibility Label')}>
            <View style={styles.mainContainer}
                {...testProps('testIDViewContainerProduct', 'ViewContainerProduct Accessibility Label')}>
                <Image
                accessible
                alt= "product-image"
                style={styles.productImg}
                source={{
                    uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca',
                }}
                {...testProps('testIDProductImage', 'Product Image Accessibility Label')}
                />
                <Text style={styles.name} 
                {...testProps('testIDProductTitle', 'Product Title Accessibility Label')}
                >
                Super Soft T-Shirt
                </Text>
                <Text style={styles.price}
                {...testProps('testIDProductPrice', 'Product Price Accessibility Label')}>
                $12.22
                </Text>
                <Text style={styles.description}
                {...testProps('testIDProductDescription', 'Product Description Accessibility Label')}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Donec quam felis, ultricies nec
                </Text>
            </View>
            <View style={styles.contentColors}
                {...testProps('testIDViewContainerColor', 'ViewContainerColor Accessibility Label')}>
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#00BFFF'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#FF1493'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#00CED1'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#228B22'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#20B2AA'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
                <TouchableOpacity
                style={[styles.btnColor, {backgroundColor: '#FF4500'}]}
                {...testProps('testIDColorSwatch', 'Color Swatch Accessibility Label')}
                />
            </View>
            <View style={styles.contentSize}
                {...testProps('testIDViewContainerSize', 'ViewContainerSize Accessibility Label')}>
                <TouchableOpacity style={styles.btnSize}
                {...testProps('testIDSizeBtn', 'Size Btn Container Accessibility Label')}>
                <Text {...testProps('testIDSizeBtnText', 'Size Btn Accessibility Label')}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSize}
                {...testProps('testIDSizeBtn', 'Size Btn Container Accessibility Label')}>
                <Text {...testProps('testIDSizeBtnText', 'Size Btn Accessibility Label')}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSize}
                {...testProps('testIDSizeBtn', 'Size Btn Container Accessibility Label')}>
                <Text {...testProps('testIDSizeBtnText', 'Size Btn Accessibility Label')}>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSize}
                {...testProps('testIDSizeBtn', 'Size Btn Container Accessibility Label')}>
                <Text {...testProps('testIDSizeBtnText', 'Size Btn Accessibility Label')}>XL</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.addToCartContainer}
                {...testProps('testIDViewContainerCart', 'ViewContainerCart Accessibility Label')}>
                <TouchableOpacity
                style={styles.shareButton}
                onPress={() => this.clickAddToCart()}
                {...testProps('testIDCart', 'Cart Accessibility Label')}>
                <Text style={styles.shareButtonText}
                {...testProps('testIDCartText', 'Add to Cart Accessibility Label')}>
                Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
      </>
    );
  }
}
export default Product;

const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      marginTop: 20,
    },
    productImg: {
      width: 200,
      height: 200,
    },
    name: {
      fontSize: 28,
      color: '#696969',
      fontWeight: 'bold',
    },
    price: {
      marginTop: 10,
      fontSize: 18,
      color: 'green',
      fontWeight: 'bold',
    },
    description: {
      textAlign: 'center',
      marginTop: 10,
      color: '#696969',
      marginHorizontal: 25,
    },
    star: {
      width: 40,
      height: 40,
    },
    btnColor: {
      height: 30,
      width: 30,
      borderRadius: 30,
      marginHorizontal: 3,
    },
    btnSize: {
      height: 40,
      width: 40,
      borderRadius: 40,
      borderColor: '#778899',
      borderWidth: 1,
      marginHorizontal: 3,
      backgroundColor: 'white',
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer: {
      justifyContent: 'center',
      marginHorizontal: 30,
      flexDirection: 'row',
      marginTop: 20,
    },
    contentColors: {
      justifyContent: 'center',
      marginHorizontal: 30,
      flexDirection: 'row',
      marginTop: 20,
    },
    contentSize: {
      justifyContent: 'center',
      marginHorizontal: 30,
      flexDirection: 'row',
      marginTop: 20,
    },
    separator: {
      height: 2,
      backgroundColor: '#eeeeee',
      marginTop: 20,
      marginHorizontal: 30,
    },
    shareButton: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: '#00BFFF',
    },
    shareButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    addToCartContainer: {
      marginHorizontal: 30,
    },
  });


