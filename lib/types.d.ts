export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  fillColor?: string | null;
  width?: number | string;
  height?: number | string;
}

export interface TabsProps {
  name: string;
  link: string;
}

export interface SideTabsProps {
  icon: any;
  name: string;
  link: string;
}
