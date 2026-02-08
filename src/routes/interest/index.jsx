// Components
import { InterestFields } from './fields';
import { Results } from './results';

// Utilities
import { useGetPaymentData } from '/hooks/selectors';

export const InterestCalc = () => {
  useGetPaymentData();

  return (
    <div className="interest-calculation">
      <InterestFields />
      <Results />
    </div>
  );
};
