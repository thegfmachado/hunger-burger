import { Image, TouchableOpacity } from "react-native";
import type { ImageProps, TouchableOpacityProps } from "react-native";

interface ProductDataProps {
  title: string;
  description: string;
  thumbnail: ImageProps;
}

interface PropductProps extends TouchableOpacityProps {
  data: ProductDataProps;
}

function Product(props: PropductProps) {
  const { data, ...rest } = props;

  return (
    <TouchableOpacity {...rest} className="w-full flex-row item-center pb-4">
      <Image source={data.thumbnail} />
    </TouchableOpacity>
  );
}

export { Product };
