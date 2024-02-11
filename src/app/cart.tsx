import { useState } from "react";
import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "@/components/header/header";
import { Product } from "@/components/product/product";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { LinkButton } from "@/components/link-button/link-button";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/format-currency";

const PHONE_NUMBER = '+5511986067486';

export default function Cart() {
  const [address, setAddress] = useState('');
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const hasProducts = cartStore.products.length > 0;

  const total = formatCurrency(
    cartStore.products.reduce((amount, product) => amount + product.price * product.quantity, 0)
  );

  function handleProductRemove(product: ProductCartProps): void {
    Alert.alert(
      'Remover produto',
      `Deseja remover ${product.title} do carrinho?`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Remover',
          onPress: () => cartStore.remove(product.id),
        },
      ]
    );
  }

  function handleOrder(): void {
    if (address.trim().length <= 0) {
      return Alert.alert('Atenção', 'Informe os dados da entrega!');
    }

    const products = cartStore.products.map(product => `\n ${product.quantity} ${product.title}`).join('');

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}

    ${products}

    \n Valor total: ${total}
    `

    Linking.openURL(`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {hasProducts ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product data={product} key={Math.random()} onPress={() => handleProductRemove(product)} />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio.</Text>
            )}

            {hasProducts && (
              <>
                <View className="flex-row gap-2 items-center mt-5 mb-4 p-2">
                  <Text className="text-white text-lg font-subtitle">Total:</Text>
                  <Text className="text-lime-400 text-xl font-heading">{total}</Text>
                </View>
                <Input
                  blurOnSubmit
                  onChangeText={setAddress}
                  onSubmitEditing={handleOrder}
                  returnKeyType="next"
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      {hasProducts && (
        <View className="p-5 gap-5">
          <Button onPress={handleOrder}>
            <Button.Text>Enviar pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
          <LinkButton href="/" title="Voltar ao cardápio" />
        </View>
      )}
    </View>
  );
}
