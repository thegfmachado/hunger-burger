import { FlatList, SectionList, Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

import { CATEGORIES, MENU } from "@/fixture/products";

import { Header } from "@/components/header/header";
import { CategoryButton } from "@/components/category-button/category-button";
import { useState } from "react";
import { Product } from "@/components/product/product";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <View className="flex-1 pt-8">
      <Header cartItemsQuantity={3} title="Faça seu pedido" />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => setCategory(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Product data={item} />}
        renderSectionHeader={(item) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {item.section.title}
          </Text>
        )}
      ></SectionList>
    </View>
  );
}
