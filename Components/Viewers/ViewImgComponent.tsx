import Image from "next/image";
import ImgDialogComponent from "./ImgDialogComp";

const ViewImageComponent = ({ image }: { image: string }) => {
  console.log(image);

  const imageLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };
  return (
    <ImgDialogComponent>
      <div>
        <Image
          src={image}
          width={0}
          height={0}
          loader={imageLoader}
          sizes="100vw"
          style={{
            width: "auto",
            maxHeight: "100vh",
          }}
          alt={image.toString()}
          className="mx-auto my-auto  relative z-50"
        />
      </div>
    </ImgDialogComponent>
  );
};

export default ViewImageComponent;
