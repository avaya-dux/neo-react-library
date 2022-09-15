import { FunctionComponent } from "react";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export interface LinkLogoProps extends LogoProps {
  href: string;
  alt: string;
}

export const Logo: FunctionComponent<LogoProps> = ({ src, alt = "" }) => (
  <img src={src} alt={alt} />
);

/**
 * A `Logo` is an image that is also a link
 *
 * @example
 * <Logo href="www.homepage.com" src="link/to/image.png" alt="Image description" />
 */
export const LinkLogo: FunctionComponent<LinkLogoProps> = ({
  src,
  href,
  alt,
}) => (
  <a href={href}>
    <img src={src} alt={alt} />
  </a>
);
