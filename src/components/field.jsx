import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Affix = ({ text }) => (
    <p className="control">
        <a className="button is-static">{text}</a>
    </p>
);

export const Field = ({
    placeholder,
    label = 'Your Field Label',
    onChange = (e) => {
        console.log('Input value is: ', e.target.value);
    },
    value,
    prefix,
    suffix,
    helpText,
    type = 'number',
}) => {
    const hasAffix = prefix || suffix;
    const isExpandedClasses = classnames('field is-narrow', {
        'is-expanded': hasAffix,
    });
    const hasAddonsClasses = classnames('field', {
        'has-addons': hasAffix || helpText,
    });

    return (
        <div className="field is-horizontal">
            <label className="field-label">{label}</label>
            <div className="field-body">
                <div className={isExpandedClasses}>
                    <div className={hasAddonsClasses}>
                        {!!prefix && <Affix text={prefix} />}
                        <p className="control is-expanded">
                            <input
                                className="input"
                                type={type}
                                placeholder={placeholder}
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                            />
                        </p>
                        {!!suffix && <Affix text={suffix} />}
                    </div>
                    {helpText && <p className="help">{helpText}</p>}
                </div>
            </div>
        </div>
    );
};

Field.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.node,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    helpText: PropTypes.string,
};
