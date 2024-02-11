import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

interface HeaderProps {
  cartItemsQuantity?: number;
  title: string;
}

function Header(props: HeaderProps) {
  const { cartItemsQuantity = 0, title } = props;

  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32 mt-5" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      <Link href="/cart" asChild>
        <TouchableOpacity activeOpacity={0.7} className="relative">
          {cartItemsQuantity > 0 ? (
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-slate-900 font-bold text-xs">
                {cartItemsQuantity}
              </Text>
            </View>
          ) : null}

          <Feather name="shopping-bag" color={colors.white} size={24} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export { Header };

export type { HeaderProps };
