import { Link } from "expo-router";
import type { LinkProps } from "expo-router";

interface LinkButtonProps extends LinkProps<string> {
  title: string;
}

function LinkButton(props: LinkButtonProps) {
  const { title, ...rest } = props;

  return (
    <Link {...rest} className="text-slate-300 text-center text-base font-body">
      {title}
    </Link>
  );
}

export { LinkButton };

export type { LinkButtonProps };
