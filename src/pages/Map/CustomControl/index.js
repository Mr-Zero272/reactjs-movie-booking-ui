import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';

const createComboBoxControl = (props) => {
    // Set up an instance of the control:
    const controlInstance = new L.Control(props);

    // Implement the onAdd method
    controlInstance.onAdd = (map) => {
        // Create a container element for the control
        const container = L.DomUtil.create('div', 'leaflet-combobox');

        // Create a select element for the combobox
        const select = L.DomUtil.create('select', 'leaflet-combobox-select', container);

        // Populate the select element with options from props
        props.options.forEach((option) => {
            const opt = L.DomUtil.create('option', 'leaflet-combobox-option', select);
            opt.value = option.id;
            opt.text = option.name;
        });

        // Add an event listener for the change event of the select element
        select.addEventListener('change', (e) => {
            // Get the selected value
            const value = e.target.value;

            // Invoke the callback function from props with the selected value
            props.onChange(value);
        });

        // Return the container element
        return container;
    };

    // Implement the onRemove method
    controlInstance.onRemove = (map) => {
        // Nothing to do here
    };

    return controlInstance;
};

const CustomControl = createControlComponent(createComboBoxControl);

export default CustomControl;
