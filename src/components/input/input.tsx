import { TextInput } from "react-native";
import type { TextInputProps } from "react-native";

import colors from "tailwindcss/colors";

interface InputProps extends TextInputProps { }

function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="h-32 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white"
    >

    </TextInput>
  );
}

export { Input };

export type { TextInputProps };