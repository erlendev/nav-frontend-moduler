import {
    Input
} from 'NavFrontendModules/nav-frontend-skjema';

import {
    createSampleData,
    newType,
    newModifier
} from './../sampleDataHelper';

const inputSizes = ['fullbredde', 'XXS', 'XS', 'S', 'L', 'XL', 'XXL'];
const modifiers = [
    newModifier('disabled', 'Disabled'),
    newModifier({ feil: { feilmelding: 'Her ble det feil gitt' } }, 'Med feil')
];
const types = inputSizes.map((inputSize) => (
    newType(Input, inputSize, null, { label: 'Inputfelt-label', bredde: inputSize.toLowerCase() }, modifiers)
));

const data = createSampleData(types);

export default data;