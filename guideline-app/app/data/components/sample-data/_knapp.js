import KnappBase,
{
    Knapp,
    Hovedknapp,
    Fareknapp
} from 'NavFrontendModules/nav-frontend-knapper';

import { createSampleData, newType, newModifier } from './../sampleDataHelper';

const commonChild = 'Slik ser en knapp ut';

const modifiers = [
    newModifier('mini', 'Mini'),
    newModifier('spinner', 'Spinner'),
    newModifier('disabled', 'Disabled')
];

const types = [
    newType(Knapp, 'Sekundærknapp', commonChild, {}, modifiers),
    newType(Hovedknapp, 'Hovedknapp', commonChild, {}, modifiers),
    newType(Fareknapp, 'Fareknapp', commonChild, {}, modifiers)
];

export default createSampleData(types, [], KnappBase);