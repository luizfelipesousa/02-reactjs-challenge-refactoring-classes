import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { InputHTMLAttributes } from 'react';

interface IconTypeProps {
    size: number;
}

type IconType = (props: IconTypeProps) => JSX.Element;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: IconType;
}

export function Input({ name, icon: Icon, ...rest }: InputProps) {
    const inputRef = useRef({} as HTMLInputElement);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20} />}

            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </Container>
    );
}
