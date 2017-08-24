import KnappBase,
{
    Knapp,
    Hovedknapp,
    Fareknapp
} from 'NavFrontendModules/nav-frontend-knapper';

import {
    createSampleData,
    newType,
    newSingleChoiceModifierWithAttribute
} from './../sampleDataHelper';

const commonChild = 'Slik ser en knapp ut';

const modifiers = [
    newSingleChoiceModifierWithAttribute('mini', 'Mini'),
    newSingleChoiceModifierWithAttribute('spinner', 'Spinner'),
    newSingleChoiceModifierWithAttribute('disabled', 'Disabled')
];

const types = [
    newType(Knapp, 'Sekundærknapp', commonChild, {}, modifiers),
    newType(Hovedknapp, 'Hovedknapp', commonChild, {}, modifiers),
    newType(Fareknapp, 'Fareknapp', commonChild, {}, modifiers)
];

const data = createSampleData(types, [], KnappBase);
console.log(data);

export default data;