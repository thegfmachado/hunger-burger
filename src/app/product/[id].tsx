import { Image, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useGlobalSearchParams, useNavigation } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/fixture/products";
import { formatCurrency } from "@/utils/format-currency";

import { Button } from "@/components/button/button";
import { LinkButton } from "@/components/link-button/link-button";

export default function Product() {
  const navigation = useNavigation();
  const cartStore = useCartStore();
  const { id } = useGlobalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddToCart() {
    if (!product) {
      return;
    }

    cartStore.add(product);
    navigation.goBack();
  }

  if (!product) {
    return null;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {/* Unicode for list bullet point */}
            {"\u2022"} {ingredient}
          </Text>
        ))}

        <View className="p-5 pb-8 gap-5">
          <Button onPress={handleAddToCart}>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>
            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button>

          <LinkButton href="/" title="Voltar ao cardápio"></LinkButton>
        </View>
      </View>
    </View>
  );
}
