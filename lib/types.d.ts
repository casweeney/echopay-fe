export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  fillColor?: string | null;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export interface TabsProps {
  name: string;
  link: string;
  className?: string;
}

export interface SideTabsProps {
  icon: unknown;
  name: string;
  className?: string;
  link: string;
}
