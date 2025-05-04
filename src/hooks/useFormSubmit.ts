"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

// Form schema for the loan application
export const loanApplicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
});

// Type for the form data
export type LoanApplicationData = z.infer<typeof loanApplicationSchema>;

// Form schema for the contact form
export const contactFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').optional(),
  message: z.string().optional(),
});

// Type for the contact form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

interface UseFormSubmitProps<T> {
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export function useFormSubmit<T extends FieldValues>({ 
  schema, 
  onSuccess, 
  onError 
}: UseFormSubmitProps<T>) {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    errorMessage: null,
  });

  const formMethods = useForm<T>({
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setFormState({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      errorMessage: null,
    });

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        errorMessage: null,
      });
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        errorMessage,
      });
      
      if (onError) {
        onError(error);
      }
    }
  };

  return {
    formState,
    formMethods,
    handleSubmit: formMethods.handleSubmit(handleSubmit),
  };
} 