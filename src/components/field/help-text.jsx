import PropTypes from 'prop-types';

export const HelpText = ({ children }) => {
    if (!children) return null;

    return <p className="help">{children}</p>;
};

HelpText.propTypes = {
    children: PropTypes.string,
};
