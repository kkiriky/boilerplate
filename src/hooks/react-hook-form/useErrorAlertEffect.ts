import { useEffect } from 'react';
import { FieldValues, FormState, UseFormClearErrors } from 'react-hook-form';

interface UseErrorAlertEffectParams<T extends FieldValues> {
  formState: FormState<T>;
  clearErrors: UseFormClearErrors<T>;
}

const useErrorAlertEffect = <T extends FieldValues>({
  formState,
  clearErrors,
}: UseErrorAlertEffectParams<T>) => {
  useEffect(() => {
    if (!Object.keys(formState.errors).length) return;

    const error = Object.values(formState.errors)[0];
    if (!error) return;

    if (error.type === 'required' && !error.message) {
      alert('필수항목을 모두 기입해주세요.');
    } else {
      alert(error.message);
    }

    clearErrors();
  }, [formState, clearErrors]);
};

export default useErrorAlertEffect;
