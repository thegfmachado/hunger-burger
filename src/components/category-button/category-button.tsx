import { Text, Pressable } from "react-native";
import type { PressableProps } from "react-native";
import { clsx } from "clsx";

interface CategoryButtonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}

function CategoryButton(props: CategoryButtonProps) {
  const { title, isSelected, ...rest } = props;

  return (
    <Pressable
      {...rest}
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10",
        isSelected && "border-2 border-lime-300"
      )}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}

export { CategoryButton };

export type { CategoryButtonProps };
