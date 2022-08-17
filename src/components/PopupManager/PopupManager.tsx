// eslint-disable-next-line no-use-before-define
import { Component } from "react";
import log from "loglevel";
import { InternalToast, InternalToastOptions } from "./InternalToast";
import type {
  NotificationOptions,
  PopupId,
  PopupOptions,
  PopupPosition,
  PopupState as State,
  ToastOptions,
} from "./PopupTypes";
import { getContainerStyle } from "./PopupUtils";

const logger = log.getLogger("popup-manager-logger");
logger.disableAll();
export { logger as popupManagerLogger };

type Dict<T = any> = Record<string, T>;
const objectKeys = <T extends Dict>(obj: T) =>
  Object.keys(obj) as unknown as (keyof T)[];

interface Props {}

export class PopupManager extends Component<Props, State> {
  static counter = 0;

  state: State = {
    zIndex: 5500,
    positions: {
      top: [],
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      bottom: [],
      "bottom-right": [],
    },
  };

  private mounted = false;

  componentDidMount = () => {
    logger.debug("popup manager is mounted");
    this.mounted = true;
  };

  componentWillUnmount = () => {
    logger.warn("popup manager will unmount");
  };

  setZIndex = (zIndex: number) => {
    this.setState((prevState) => {
      const ret = {
        positions: { ...prevState.positions },
        zIndex,
      };
      logger.debug(`setZIndex: state after`, ret);
      return ret;
    });
  };

  private addPopup = (position: PopupPosition, popupOptions: PopupOptions) => {
    this.setState((prevPopups) => {
      const isTop = position.includes("top");
      const popups = isTop
        ? [popupOptions, ...prevPopups.positions[position]]
        : [...prevPopups.positions[position], popupOptions];

      const ret = {
        zIndex: prevPopups.zIndex,
        positions: {
          ...prevPopups.positions,
          [position]: popups,
        },
      };

      logger.debug(`addPopup: state after update at ${position} is `, ret);
      return ret;
    });
  };

  notify = (options: NotificationOptions) => {
    logger.debug("notify in popup manager called with ", options.id);
    PopupManager.counter += 1;
    const id = options.id ?? PopupManager.counter;
    const position = options.position ?? "top";
    const notification = { id, node: options.node, position };
    logger.debug(
      `notify: state before update at ${position} is `,
      this.state.positions[position]
    );
    this.addPopup(position, notification);
    logger.debug("notify returns ", { id, position });
    return { id, position };
  };

  toast = (options: ToastOptions) => {
    logger.debug("toast in popup manager called with ", options);
    const toast = this.createToast(options);
    const { position, id } = toast;

    this.addPopup(position, toast);

    return { id, position };
  };

  createToast = (options: ToastOptions) => {
    PopupManager.counter += 1;
    const id = options.id ?? PopupManager.counter;

    const position = options.position ?? "top";

    return {
      ...options,
      id,
      position,
    };
  };

  remove = (id: PopupId, position: PopupPosition) => {
    logger.debug(`removing popup, ${id}, at position, ${position}`);
    logger.debug("state before removing", this.state.positions[position]);
    this.setState((prevPopups) => {
      const filtered = prevPopups.positions[position].filter(
        // id may be string or number
        // eslint-disable-next-line eqeqeq
        (popup) => popup.id != id
      );
      const ret = {
        zIndex: prevPopups.zIndex,
        positions: {
          ...prevPopups.positions,
          [position]: filtered,
        },
      };
      logger.debug("state after removing", ret.positions[position]);

      return ret;
    });
  };

  /**
   * Remove all popups at once.
   */
  removeAll = () => {
    this.setState((prevState) => {
      return {
        zIndex: prevState.zIndex,
        positions: {
          top: [],
          "top-left": [],
          "top-right": [],
          "bottom-left": [],
          bottom: [],
          "bottom-right": [],
        },
      };
    });
  };

  render() {
    return objectKeys(this.state.positions).map((position) => {
      const popupOptions = this.state.positions[position];
      return (
        <div
          key={`neo-popup-manager-${position}`}
          id={`neo-popup-manager-${position}`}
          style={getContainerStyle(position, this.state.zIndex)}
        >
          {popupOptions.map((popupOption, index) => {
            if ("node" in popupOption) {
              const notificaiton =
                popupOption as unknown as NotificationOptions;
              return (
                <div key={`${notificaiton.id}-${index}`}>
                  {notificaiton.node}
                </div>
              );
            }
            return (
              <InternalToast
                key={`${popupOption.id}-${index}`}
                remove={this.remove}
                {...(popupOption as InternalToastOptions)}
              />
            );
          })}
        </div>
      );
    });
  }
}
