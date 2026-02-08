import PropTypes from 'prop-types';

export const Affix = ({ text }) => {
    if (!text) return null;

    return (
        <p className="control">
            <a className="button is-static">{text}</a>
        </p>
    );
};

Affix.propTypes = {
    text: PropTypes.string,
};
