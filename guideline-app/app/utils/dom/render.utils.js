import React from 'react';
import { shallow } from 'enzyme';

const renderComponentWithNoChildren = (componentData) => (
    <componentData.component { ... componentData.attrs } />
);

const renderComponentWithSingleChild = (componentData) => (
    <componentData.component { ... componentData.attrs }>
        { componentData.children }
    </componentData.component>
);

const renderComponentWithSingleComponentChild = (componentData) => (
    <componentData.component { ... componentData.attrs }>
        <componentData.child.component { ... componentData.child.attrs }>
            { componentData.child.children }
        </componentData.child.component>
    </componentData.component>
);

const renderComponent = (c, attrs, children) => {
    const componentData = {
        component: c,
        attrs: attrs
    };

    if (!children) {
        return renderComponentWithNoChildren(componentData);
    }

    if (children.component) {
        return renderComponentWithSingleComponentChild({
            child: children,
            ... componentData
        });
    }

    else if (Array.isArray(children)) {
        const componentChildren = children.map((currentChild, key) => {
            if (currentChild.component) {
                return (renderComponent(
                        currentChild.component,
                        {
                            key: key,
                            ... currentChild.attrs
                        },
                        currentChild.children)
                );
            }
            else {
                return currentChild;
            }
        });

        const component = (
            <componentData.component { ... componentData.attrs }>
                { componentChildren }
            </componentData.component>
        );

        return component;
    }

    return renderComponentWithSingleChild({
        children: children,
        ... componentData
    });
};

const setupModifierValue = (modifier) => {
    const value = modifier.value;
    if (typeof value !== 'object') {
        return { [modifier.value] : true };
    }

    let attrs = {};
    const keys = Object.keys(value);
    keys.forEach((key) => {
        attrs[key] = value[key];
    });
    return attrs;
};

const getAttributesFromModifiersOnRoot = (modifiers) => {
    let modifierAttrs = {};
    modifiers.forEach((modifier) => {
        const value = modifier.value;
        if (typeof value !== 'object') {
            modifierAttrs[modifier.value] = true;
        }
        else {
            const keys = Object.keys(modifier.value);
            keys.forEach((key) => {
                modifierAttrs[key] = value[key];
            });
        }
    });
    return modifierAttrs;
};

const getAttributesFromModifiersOnType = (type) => {
    const modifiers = type.modifiers;

    if (modifiers && Array.isArray(modifiers) && modifiers.length > 0) {
        return modifiers
            .filter((modifier) => (!modifier.component && modifier.value)).map(setupModifierValue);
    }

    return [];
};

const findModifierMatchingActiveModifier = (modifiers, activeModifier) => {
    return modifiers.find((modifier) => {
        if (typeof activeModifier.value === 'object') {
            return Object.keys(activeModifier.value).some((key) => (modifier[key]));
        }
        return modifier[activeModifier.value];
    });
};

const mergeAttrs = (attrs1, attrs2) => (Object.assign({}, attrs1, attrs2));

export const renderComponentWithModifiersAndChildren =
    (type,
     multipleChoiceModifiers,
     activeModifier,
     children,
     shallowRender = false) => {

        const component = type.component;
        const modifiersOnType = getAttributesFromModifiersOnType(type);

        if (component) {
            let typeAttrs = type.attrs;
            if (activeModifier) {
                let matchingModifier = findModifierMatchingActiveModifier(modifiersOnType, activeModifier);
                typeAttrs = { ... typeAttrs, ... matchingModifier };
            }

            const modifierAttrs = getAttributesFromModifiersOnRoot(multipleChoiceModifiers);

            console.log('All attributes', mergeAttrs(typeAttrs, modifierAttrs));

            if (shallowRender) {
                return shallow(renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children));
            }

            return renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children);
        }

    };