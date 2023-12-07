import { useEffect, useState } from 'react';
import image from '~/assets/images';
import baseUrl from '~/config/baseUrl';
function CustomImage(props) {
    const defaultImage = image.noImage;
    const [src, setSrc] = useState(defaultImage);
    useEffect(() => {
        if (props.src !== undefined) {
            setSrc(baseUrl.image + props.src);
        }
    }, [props.src]);
    return <img {...props} src={src} alt="" />;
}

export default CustomImage;
