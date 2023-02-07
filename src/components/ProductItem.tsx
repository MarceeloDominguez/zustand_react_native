import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useFavoriteProductsStore } from "../store/FavoriteProducts";
import { Product } from "../interface/productInterface";

type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  const { addFavoriteProducts, removeFavoriteProducts, productFavorite } =
    useFavoriteProductsStore((state) => state);

  const isFavorite = productFavorite.includes(product.id);

  const toggleFavorite = (id: number) => {
    if (isFavorite) {
      removeFavoriteProducts(id);
      return;
    }

    addFavoriteProducts(id);
  };

  return (
    <View style={styles.containerProduct}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text numberOfLines={2} style={{ flex: 1 }}>
        {product.title}
      </Text>
      <View style={styles.containerIcon}>
        <Icon
          name="heart-sharp"
          size={32}
          color={isFavorite ? "red" : "#000"}
          onPress={() => toggleFavorite(product.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerProduct: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: "row",
    borderRadius: 10,
    elevation: 8,
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  containerIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
