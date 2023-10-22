import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import styles from './Image.module.scss';
import image from '~/assets/images';

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = image.noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallBack);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
