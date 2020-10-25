import { ComponentType } from "react";

export interface RoutePath {
  path: string,
  component: () => Promise<{ default: ComponentType }>;
}
