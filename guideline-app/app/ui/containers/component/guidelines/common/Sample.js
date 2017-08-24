import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import { SampleEditor } from './SampleEditor';
import { sampleTypeChange, activeRefChange, sampleModifierChange } from '../../../../../redux/actions/sampleActions';
import { renderComponentWithModifiersAndChildren } from './../../../../../utils/dom/render.utils';

import './styles.less';

export class Sample extends Component {
    componentWillMount() {
        const activeType = this.props.activeType;
        const activeComponent = activeType ? activeType.component: null;

        if (!activeComponent || !this.activeComponenMatchescomponentDataDefaults()) {
            this.setDefaultComponent();
        }
    }

    componentDidUpdate(previousProps) {
        const componentData = this.props.componentData;
        const activeType = this.props.activeType;
        const activeModifier = this.props.activeModifier;

        if (componentData.modifiers && componentData.modifiers.length > 0 && this.props.activeModifier) {
            const typeMatch = this.getTypeMatchingCurrentActiveModifier();
            if (typeMatch && typeMatch.component && typeMatch.component !== activeType.component) {
                this.changeActiveType({
                    type: typeMatch,
                    resetModifiers: previousProps.componentName !== this.props.componentName
                });
            }
            else if (activeModifier && typeMatch && activeModifier.value !== typeMatch.value) {
                sampleModifierChange(typeMatch);
            }
        }
    }

    activeComponenMatchescomponentDataDefaults() {
        const componentData = this.props.componentData;
        const activeComponent = this.props.activeType.component;
        return componentData.types.some((type) => type._default && type.component === activeComponent);
    }

    getTypeMatchingCurrentActiveModifier() {
        const types = this.props.componentData.types;
        const activeModifier = this.props.activeModifier;
        const activeComponent = this.props.activeType.component;
        let match = null;

        types.forEach((type) => {
            if (type.modifiers && this.componentExistsIncomponentDataSubTree(activeComponent, type)) {
                type.modifiers.forEach((modifier) => {
                     if (modifier.value === activeModifier.value) {
                         match = modifier;
                     }
                });
            }
        });

        return match;
    }

    componentExistsIncomponentDataSubTree(component, subtree) {
        return subtree.component === component || subtree.modifiers.some((modifier) => modifier.component === component);
    }

    getDefaultType() {
        return this.props.componentData.types.filter((el) => el._default)[0];
    }

    setDefaultComponent() {
        const defaultType = this.getDefaultType();
        this.changeActiveType({
            type: defaultType,
            resetModifiers: true
        });
    }

    changeActiveType(type) {
        this.props.dispatch(sampleTypeChange(type));
    }

    changeActiveRef(wrapperRef) {
        if (wrapperRef) {
            const ref = wrapperRef.children[0];
            if (this.props.activeRef !== ref) {
                this.props.dispatch(activeRefChange(ref));
            }
        }
    }

    render () {
        const component = renderComponentWithModifiersAndChildren(
            this.props.activeType,
            this.props.activeMultipleChoiceModifiers,
            this.props.activeModifier,
            this.props.activeType.children || ''
        );

        return (
            <div>
                <div className="sampleWrapper">
                    <div className="sample">
                        <EtikettLiten>Eksempel</EtikettLiten>
                        <div className="componentSample" ref={(wrapper) => this.changeActiveRef(wrapper)}>
                            { component }
                        </div>
                    </div>

                    {
                        this.props.componentData &&
                        <SampleEditor componentData={ this.props.componentData } />
                    }
                </div>
            </div>
        )
    }
}

Sample = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(Sample);