import React from 'react';
import PT from 'prop-types';
import { Undertittel, Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import Animation from './../animation/Animation';
import './styles.less';
import tilstedeAnimation from './../../../assets/animation/tilstede.json';

// todo: cleanup
function ImageTextAside(props) {
    return (
        <div className="imageTextAside">
            <div className="animationSection">
                <Animation domId={`${props.title.trim()}animation`} pathToJson={tilstedeAnimation} />
            </div>
            <div className="textSection">
                <Undertittel>
                    {props.title}
                </Undertittel>
                <Normaltekst>
                    {props.text}
                </Normaltekst>
            </div>
        </div>
    );
}

ImageTextAside.propTypes = {
    title: PT.string.isRequired,
    text: PT.string.isRequired
};

export default ImageTextAside;
