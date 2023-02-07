import { useEffect, useState } from "react";
import { StatusBar, ScrollView } from "react-native";
import ProductItem from "./src/components/ProductItem";
import { Product } from "./src/interface/productInterface";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar />
      {products.map((item, index) => (
        <ProductItem product={item} key={index} />
      ))}
    </ScrollView>
  );
}
