import React from 'react';
import PT from 'prop-types';

import './styles.less';

const ColorSample = (props) => {
    const color = props.color;

    const tooLight = (hex) => {
        const tooLightColors = ['#E9E7E7'];

        return tooLightColors.indexOf(hex) >= 0;
    };

    const getTextColor = () => {
        if (tooLight(color.hex)) {
            return { };
        }

        return { color: 'white' };
    };

    const getBackgroundColor = () => ({ backgroundColor: color.hex });

    return (
        <div
            className="colorSample"
            style={getBackgroundColor()}
        >
            <div className="colorSample__colorInfo">
                <h4 className="colorSample__colorInfo__header" style={getTextColor()}>
                    { color.label }
                </h4>

                <p className="colorSample__colorInfo__subtext" style={getTextColor()}>
                    { color.hex }
                </p>
            </div>

            <div className="colorSample__accessibilityInfo">
                <p className="colorSample__accessibilityInfo__text" style={getTextColor()}>
                    { color.wcag }
                </p>
            </div>

        </div>
    );
};

ColorSample.propTypes = {
    color: PT.shape({
        label: PT.string.isRequired,
        hex: PT.string.isRequired,
        wcag: PT.string
    }).isRequired
};

export default ColorSample;
