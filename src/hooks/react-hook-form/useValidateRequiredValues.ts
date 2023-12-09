import { useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

const useValidateRequiredValues = (requiredValues: FieldValues) => {
  const isRequiredFieldsFilled = useMemo(() => {
    return Object.values(requiredValues).every((value) => !!value);
  }, [requiredValues]);

  return { isRequiredFieldsFilled };
};

export default useValidateRequiredValues;
