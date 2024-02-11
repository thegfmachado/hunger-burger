import { FlatList, SectionList, Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { Link } from "expo-router";

import { CATEGORIES, MENU, ProductProps } from "@/fixture/products";

import { Header } from "@/components/header/header";
import { CategoryButton } from "@/components/category-button/category-button";
import { useRef, useState } from "react";
import { Product } from "@/components/product/product";
import { useCartStore } from "@/stores/cart-store";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Home() {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce((ammount, product) => {
    return ammount + product.quantity;
  }, 0);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  return (
    <View className="flex-1 pt-8">
      <Header cartItemsQuantity={cartQuantityItems} title="Faça seu pedido" />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        className="flex-1 p-5"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={(item) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {item.section.title}
          </Text>
        )}
        ref={sectionListRef}
      ></SectionList>
    </View>
  );
}
