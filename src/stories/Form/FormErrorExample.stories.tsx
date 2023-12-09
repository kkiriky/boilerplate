import useErrorAlertEffect from '@/hooks/react-hook-form/useErrorAlertEffect';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginParams {
  username: string;
  password: string;
}

const meta = {
  title: 'Boilerplate/Form/FormErrorAlertExample',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormErrorAlertExample: Story = {
  render: function Render() {
    const { register, handleSubmit, formState, clearErrors } =
      useForm<LoginParams>({
        reValidateMode: 'onSubmit',
        defaultValues: { username: '', password: '' },
      });

    console.log(formState.errors);
    useErrorAlertEffect({ formState, clearErrors });

    const onSubmit: SubmitHandler<LoginParams> = useCallback((values) => {
      console.log(values);
    }, []);

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <input
          {...register('username', { required: true })}
          placeholder="아이디"
          className="w-300 rounded-4 border border-gray-400 p-8"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="비밀번호"
          className="w-300 rounded-4 border border-gray-400 p-8"
        />

        <button className="rounded-4 bg-blue-400 py-8 text-white">
          로그인
        </button>
      </form>
    );
  },
};
