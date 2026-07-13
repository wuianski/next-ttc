import Image from "next/image";

export default function NextJsImage({
  photo: { src, blurDataURL },
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={src}
        quality={100}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}
