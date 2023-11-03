import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import classNames from 'classnames/bind';

import styles from './CustomDistanceCalControl.module.scss';
const cx = classNames.bind(styles);
const createCustomDistanceCalControl = (props) => {
    const controlInstance = new L.Control(props);

    controlInstance.onAdd = (map) => {
        // Create a container element for the control
        const container = L.DomUtil.create('div', 'leaflet-distance');

        const inputWrap = L.DomUtil.create('div', cx('input-wrap'), container);

        // Create a select element for the combobox
        const input = L.DomUtil.create('input', cx('leaflet-distance-select'), inputWrap);
        input.setAttribute('type', 'number');
        input.setAttribute('value', 100);
        input.setAttribute('min', 1);
        input.setAttribute('max', 10000);

        const button = L.DomUtil.create('input', cx('button'), container);
        button.setAttribute('value', 'Calculate distance: Off');
        button.setAttribute('type', 'button');

        // Populate the select element with options from props
        input.addEventListener('change', (e) => {
            //console.log(e.target.value);
            props.onInputDistanceChange(e.target.value);
        });

        button.addEventListener('click', () => {
            if (button.value === 'Calculate distance: Off') {
                button.setAttribute('value', 'Calculate distance: On');
            } else {
                button.setAttribute('value', 'Calculate distance: Off');
            }
            //console.log(props.onCalDistance());
            props.onCalDistance();
        });

        // Return the container element
        return container;
    };

    return controlInstance;
};

const CustomDistanceCalControl = createControlComponent(createCustomDistanceCalControl);
export default CustomDistanceCalControl;
