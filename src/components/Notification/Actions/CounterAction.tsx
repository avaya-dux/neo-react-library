export type CounterActionProps = { count: string };
export const CounterAction = ({ count }: CounterActionProps) => {
  return <div className="neo-notification__counter">{count}</div>;
};
