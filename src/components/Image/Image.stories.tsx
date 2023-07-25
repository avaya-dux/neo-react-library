import { ComponentStory } from "@storybook/react";
import type { Meta } from "@storybook/react";
import { useState } from "react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";

import cat from "./200by300image.jpeg";
import { Image, ImageProps } from "./Image";

export default {
  title: "Components/Image",
  component: Image,
} as Meta<ImageProps>;

const Template: ComponentStory<typeof Image> = ({
  src,
  ...rest
}: ImageProps) => {
  const [errorText, setErrorText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [catImage, setCatImage] = useState(src);

  return (
    <section>
      <div
        style={{
          marginBottom: 20,
          paddingBottom: 20,
          borderBottom: "1px solid #ccc",
        }}
      >
        <p>Error Text: &quot;{errorText}&quot;</p>

        <p>
          Is Loaded: <code>{isLoaded ? "TRUE" : "FALSE"}</code>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 300,
        }}
      >
        <Image
          src={catImage}
          onError={() => setErrorText("Image could not be loaded")}
          onLoad={() => setIsLoaded(true)}
          {...rest}
        />

        <Button
          onClick={() =>
            setCatImage(
              catImage === src ? "https://placekitten.com/g/200/300" : src,
            )
          }
        >
          Toggle `src`
        </Button>

        <Button onClick={() => setCatImage("broken-image.png")}>
          Break `src`
        </Button>
      </div>
    </section>
  );
};

export const DefaultImage = Template.bind({});
DefaultImage.args = {
  alt: "image of a kitten",
  className: "example-css-classname",
  fallback: "https://via.placeholder.com/200x300",
  src: cat,
  width: 200,
};

export const Thumbnail = () => {
  return (
    <div
      style={{
        gridGap: "10px",
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "start",
      }}
    >
      <Image src={cat} alt="thumbnail" thumbnail />
      <div>
        <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export const BadImageWithoutFallback = Template.bind({});
BadImageWithoutFallback.args = {
  alt: "default broken image",
  src: "brokenimage.png",
  width: 200,
};

export const FallBackAsJSX = Template.bind({});
FallBackAsJSX.args = {
  alt: "broken image with Error Icon fallback",
  fallback: (
    <Icon
      aria-label="error occured"
      icon="error"
      size="lg"
      style={{ width: 200 }}
    />
  ),
  src: "brokenimage.png",
};

export const FallBackAsUrl = Template.bind({});
FallBackAsUrl.args = {
  alt: "broken image with a generic placeholder fallback",
  fallback: "https://via.placeholder.com/200x300",
  src: "brokenimage.png",
  width: 200,
};
