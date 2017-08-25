import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';
import { createSampleData, newType, newModifier } from './../sampleDataHelper';

const commonChild = 'Slik ser en Alertstripe ut';

const types = [
    newType(AlertStripeSuksess, 'Suksess', commonChild, {}, [
        newModifier(AlertStripeSuksessSolid, 'solid')
    ]),
    newType(AlertStripeInfo, 'Info', commonChild, {}, [
        newModifier(AlertStripeInfoSolid, 'solid')
    ]),
    newType(AlertStripeAdvarsel, 'Advarsel', commonChild)
];

export default createSampleData(types, [], AlertStripe);