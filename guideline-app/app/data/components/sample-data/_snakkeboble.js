import Snakkeboble from 'NavFrontendModules/nav-frontend-snakkeboble'; // eslint-disable-line import/no-extraneous-dependencies, import/extensions, import/no-unresolved
import { createSampleData, newType } from './../sampleDataHelper';

const chatText1 = 'Hei! Jeg lurer på en ting...';
const chatText2 = 'Spør i vei.';

const types = [
    newType(Snakkeboble, 'Venstreorientert', chatText1, {
        dato: '14.07.2017 kl. 10:08',
        pilHoyre: false
    }),
    newType(Snakkeboble, 'Høyreorientert', chatText2, {
        dato: '14.07.2017 kl. 10:12',
        pilHoyre: true
    })
];

export default createSampleData(types);
