import { forwardRef } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import type { ImageProps, TouchableOpacityProps } from "react-native";

interface ProductDataProps {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
}

interface ProductProps extends TouchableOpacityProps {
  data: ProductDataProps;
}

const Product = forwardRef<TouchableOpacity, ProductProps>((props, ref) => {
  const { data, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      className="w-full flex-row item-center pb-4 gap-2"
      ref={ref}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
      <View className="flex-1 ml-1">
        <View className="flex-row items-center">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </Text>
          {
            data.quantity
              ? (
                <Text className="text-slate-400 font-subtitle text-sm">
                  x {data.quantity}
                </Text>
              )
              : null
          }
        </View>
        <Text className="text-slate-400 text-xs leading-5 mt-0.5">
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export { Product };
