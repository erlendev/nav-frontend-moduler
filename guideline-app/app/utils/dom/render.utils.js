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

const getAttributesFromModifiersOnRoot = (modifiers) => {
    let modifierAttrs = {};
    modifiers.forEach(
        (modif) => {
            const value = modif.value;
            if (typeof value !== 'object') {
                modifierAttrs[value] = true;
            }
            else {
                const keys = Object.keys(modif.value);
                keys.forEach((key) => {
                    modifierAttrs[key] = value[key];
                });
            }
        }
    );
    return modifierAttrs;
};

const getAttributesFromModifiersOnType = (type) => {
    const modifiers = type.modifiers;

    if (modifiers && Array.isArray(modifiers) && modifiers.length > 0) {
        return modifiers.filter((modifier) => (!modifier.component && modifier.value));
    }

    return [];
};

const getActiveModifierAttribute = (modifier) => {
    if (modifier) {
        if (!modifier.component && modifier.value) {
            return {
                [modifier.value]: true
            }
        }
    }
    return {};
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
                let foundModifier = modifiersOnType.find((modifier) => (modifier.value === activeModifier.value));
                typeAttrs = { ... typeAttrs, ... getActiveModifierAttribute(foundModifier) };
            }

            const modifierAttrs = getAttributesFromModifiersOnRoot(multipleChoiceModifiers);
            if (shallowRender) {
                return shallow(renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children));
            }

            return renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children);
        }

    };