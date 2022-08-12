export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (child: React.ReactNode) => JSX.Element;
  children: JSX.Element;
}): JSX.Element => (condition ? wrapper(children) : children);
