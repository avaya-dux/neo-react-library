import { FunctionComponent } from "react";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export interface LinkLogoProps extends LogoProps {
  link: string;
  alt: string;
}

export const Logo: FunctionComponent<LogoProps> = ({ src, alt = "" }) => (
  <img src={src} alt={alt} />
);

export const LinkLogo: FunctionComponent<LinkLogoProps> = ({
  src,
  link,
  alt,
}) => (
  <a href={link}>
    <img src={src} alt={alt} />
  </a>
);
