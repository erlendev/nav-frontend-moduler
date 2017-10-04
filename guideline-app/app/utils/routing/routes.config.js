import resolveComponentRoutes from './routes.utils';

import ColorPage from '../../ui/containers/color/ColorPage';
import AboutPage from '../../ui/containers/about/AboutPage';
import ComponentMainPage from '../../ui/containers/component/main/ComponentMainPage';
import LayoutPage from '../../ui/containers/layout/LayoutPage';
import AccessibilityPage from '../../ui/containers/accessibility/AccessibilityPage';
import TypographyPage from '../../ui/containers/typography/TypographyPage';
import GettingStartedDesigner from '../../ui/containers/gettingstarted/GettingStartedDesigner';
import IconPage from '../../ui/containers/icon/IconPage';

const routeConfig = [
    {
        path: '/',
        component: AboutPage,
        title: 'Om Designsystemet',
        exact: true
    },
    {
        path: '/gettingstarted-designer',
        component: GettingStartedDesigner,
        title: 'Kom igang / Design'
    },
    {
        path: '/components',
        component: ComponentMainPage,
        title: 'Komponenter',
        routes: resolveComponentRoutes('components')
    },
    {
        path: '/layout',
        component: LayoutPage,
        title: 'Layout'
    },
    {
        path: '/accessibility',
        component: AccessibilityPage,
        title: 'Tilgjengelighet'
    },
    {
        path: '/typography',
        component: TypographyPage,
        title: 'Typografi'
    },
    {
        path: '/farger',
        component: ColorPage,
        title: 'Farger'
    },
    {
        path: '/ikoner',
        component: IconPage,
        title: 'Ikoner'
    }
];

export default routeConfig;
