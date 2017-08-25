import {
    Radio
} from 'NavFrontendModules/nav-frontend-skjema';
import { createSampleData, newType, newModifier } from './../sampleDataHelper';

const types = [
    newType(Radio, 'Vanlig', null, { label: 'Radio-label', name: 'radio' })
];

const modifiers = [
    newModifier('disabled', 'Disabled')
];

export default createSampleData(types, modifiers);