import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Affix } from './affix';
import { HelpText } from './help-text';

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
  isHorizontal,
}) => {
  const hasAffix = prefix || suffix;
  const hasAddons = hasAffix || helpText;
  const isExpandedClasses = classnames('field is-narrow');
  const hasAddonsClasses = classnames('field', {
    'has-addons': hasAddons,
  });

  const containerClasses = classnames('field', {
    'is-horizontal': isHorizontal,
  });

  const labelClasses = classnames('label is-normal', {
    'field-label': isHorizontal,
  });

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>{label}</label>
      <div className="field-body">
        <div className={isExpandedClasses}>
          <div className={hasAddonsClasses}>
            <Affix text={prefix} />
            <p className="control is-expanded">
              <input
                className="input"
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </p>
            <Affix text={suffix} />
          </div>
          <HelpText>{helpText}</HelpText>
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
  isHorizontal: PropTypes.bool,
};
