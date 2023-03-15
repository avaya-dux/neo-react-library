import { ReactNode } from "react";

export interface ListProps {
  children?: ReactNode;
  id?: string;
  itemType?: "ListItem" | "ListSection";
}

/**
 * Is meant to wrap an array of `ListItem` or `ListSection`.
 *
 * @example
 * <List itemType="ListItem">
 *   <ListItem showDivider> First Item </ListItem>
 *   <ListItem avatar="{myAvatar}"> Second Item </ListItem>
 *   <ListItem actions={[myButton]}> Third Item </ListItem>
 * </List>
 *
 * @example
 * <List itemType="ListSection">
 *   <ListSection showDivider> First Item </ListSection>
 *   <ListSection avatar="{myAvatar}"> Second Item </ListSection>
 *   <ListSection actions={[myButton]}> Third Item </ListSection>
 * </List>

 * @see https://design.avayacloud.com/components/web/list-web
 */
export const List = ({ children, id, itemType = "ListItem" }: ListProps) => {
  const ItemClass =
    itemType === "ListItem"
      ? "neo-group-list neo-group-list--hover"
      : "neo-group-list--actions";

  return (
    <ul className={ItemClass} id={id}>
      {children}
    </ul>
  );
};
List.displayName = "List";
