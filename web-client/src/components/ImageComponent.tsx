import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
interface ImageProps{
    image:any;
    alt:string;
}
const MyImage: React.FC <ImageProps> = ({ image ,alt}) => (
  <div>
    <LazyLoadImage alt={alt}  src={image}  />
    {/* <span>{image.caption}</span> */}
  </div>
);

export default MyImage;
