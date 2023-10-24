import { useEffect, useState } from 'react';
import image from '~/assets/images';
function CustomImage({ props }) {
    const defaultImage = image.noImage;
    const [src, setSrc] = useState(defaultImage);
    useEffect(() => {
        if (props.src) {
            setSrc(props.src);
        }
    }, [props.src]);
    return <img {...props} src={src} />;
}

export default CustomImage;
