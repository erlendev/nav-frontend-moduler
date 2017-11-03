import React from 'react';
import PropTypes from 'prop-types';

import { sanitizeHtml } from './../../../utils/dom/code-sampling.utils';

// eslint-disable-next-line import/extensions
import './../../../../../packages/node_modules/nav-frontend-lenker-style';
import './styles.less';

const navFrontendifyHtml = (html) => (
    html
        .replace(/<a/g, '<a class="lenke" ')
        .replace(/<h4/g, '<p class="typo-element" ')
        .replace(/<\/h4/g, '</p')
);

class MdContent extends React.Component {
    componentWillMount() {
        this.paragraphs = this.props.content
            .split(/\n\n/g)
            .filter(
                (paragraph) =>
                    (paragraph && paragraph.length > 0)
            );
    }

    renderMdContentWrappedInComponent = (html, key) => (
        <this.props.component dangerouslySetInnerHTML={({ __html: html })} key={key} />
    );

    renderMdContentWrappedInDiv = (html, key) => (<div dangerouslySetInnerHTML={({ __html: html })} key={key} />);

    renderMdContent = () => (
        <div className="mdContent">
            {
                this.paragraphs.map((paragraph, i) => {
                    let sanitizedHtml = sanitizeHtml(
                        paragraph,
                        { ALLOWED_TAGS: this.props.allowedTags }
                    );
                    sanitizedHtml = navFrontendifyHtml(sanitizedHtml);

                    if (this.props.component) {
                        return this.renderMdContentWrappedInComponent(sanitizedHtml, i);
                    }
                    return this.renderMdContentWrappedInDiv(sanitizedHtml, i);
                })
            }
        </div>
    );

    render() {
        return (this.renderMdContent());
    }
}

MdContent.propTypes = {
    allowedTags: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string.isRequired,
    component: PropTypes.func
};

MdContent.defaultProps = {
    allowedTags: ['a', 'ul', 'ol', 'li'],
    component: null
};

export default MdContent;