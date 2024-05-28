import { HTMLAttributeReferrerPolicy } from "react";

import { Image, ImageProps } from "components/Image";

export interface ImageLinkProps extends ImageProps {
	href: string;
	hreflang?: string;
	referrerpolicy?: HTMLAttributeReferrerPolicy;
	rel?: string;
	target?: string;
	type?: string;
}

/**
 * A `ImageLink` is an image that is wrapper in an anchor tag
 *
 * @example
 * <ImageLink href="www.homepage.com" src="link/to/image.png" alt="Image description" />
 * <ImageLink href="www.homepage.com" src="link/to/image.png" alt="Image description" target="_blank" />
 */
export const ImageLink = ({
	alt,
	src,
	href,
	hreflang,
	referrerpolicy,
	rel,
	target,
	type,
	...rest
}: ImageLinkProps) => (
	<a
		href={href}
		hrefLang={hreflang}
		referrerPolicy={referrerpolicy}
		rel={rel}
		target={target}
		type={type}
	>
		<Image src={src} alt={alt} {...rest} />
	</a>
);

ImageLink.displayName = "ImageLink";
