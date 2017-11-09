import React from 'react';
import PT from 'prop-types';
import { Undertittel, Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import Animation from './../animation/Animation';
import logoPng from './../../../assets/images/logo/logo.png';
import './styles.less';
import tilstedeAnimation from './../../../assets/animation/tilstede.json';
console.log(tilstedeAnimation);

function ImageTextAside(props) {
    return (
        <div className="imageTextAside">
            <Animation domId="animation" pathToJson={tilstedeAnimation} className="image" />
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
    text: PT.string.isRequired,
    image: PT.shape({})
};

ImageTextAside.defaultProps = {
    image: logoPng
};

export default ImageTextAside;
