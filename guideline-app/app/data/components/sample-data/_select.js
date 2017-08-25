import React from 'react';

import {
    Select
} from 'NavFrontendModules/nav-frontend-skjema';

import {
    createSampleData,
    newType,
    newModifier
} from './../sampleDataHelper';

const options = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark'}
];

const optionChildren = () => options.map((option) =>
    (<option value={ option.value } key={ option.value }>{ option.label }</option>)
);

const selectSizes = ['fullbredde', 'XS', 'S', 'L', 'XL', 'XXL'];

const types = selectSizes.map((selectSize) => {
    const attrs = { label: 'Hvilket land er best om sommeren?', bredde: selectSize.toLowerCase() };
    return newType(Select, selectSize, optionChildren(), attrs);
});
const modifiers = [
    newModifier('disabled', 'Disabled'),
    newModifier({
        feil: {
            feilmelding: 'Her ble det feil altså.'
        }
    }, 'Med feil')
];

export default createSampleData(types, modifiers);