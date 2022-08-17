import { IconNamesType } from "utils/icons";

export interface NoContentProps {
  icon?: IconNamesType;
  text?: string;
}

export const NoContent = ({ icon, text = "No Content" }: NoContentProps) => (
  <div className="neo-empty-state" data-testid="NoContent-root">
    <p className={`neo-icon-${icon || "info"}`}>{text}</p>
  </div>
);
