import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, any>, FormFieldProps { }

export const TextInput: React.FC<IProps> = ({
    input,
    widht,
    type,
    placeholder,
    meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error}>
            <input {...input} placeholder={placeholder} type={type} width={widht} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}
