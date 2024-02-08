import { PropsWithChildren } from "react";
import { TouchableOpacity, Text } from "react-native";
import type { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps, PropsWithChildren {}

interface ButtonTextProps extends PropsWithChildren {}

interface ButtonIconProps extends PropsWithChildren {}

function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText(props: ButtonTextProps) {
  const { children } = props;

  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}

function ButtonIcon(props: ButtonIconProps) {
  const { children } = props;

  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };

export type { ButtonProps, ButtonIconProps, ButtonTextProps };
