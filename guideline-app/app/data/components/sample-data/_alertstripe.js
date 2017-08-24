import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';
import { createSampleData, newType, newSingleChoiceModifierWithComponent } from './../sampleDataHelper';

const commonChild = 'Slik ser en Alertstripe ut';

const types = [
    newType(AlertStripeSuksess, 'Suksess', commonChild, {}, [
        newSingleChoiceModifierWithComponent(AlertStripeSuksessSolid, 'solid')
    ]),
    newType(AlertStripeInfo, 'Info', commonChild, {}, [
        newSingleChoiceModifierWithComponent(AlertStripeInfoSolid, 'solid')
    ]),
    newType(AlertStripeAdvarsel, 'Advarsel', commonChild)
];

export default createSampleData(types, [], AlertStripe);