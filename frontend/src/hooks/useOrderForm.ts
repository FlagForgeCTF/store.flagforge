import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderFormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

const initialFormData: OrderFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

export function useOrderForm() {
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const { toast } = useToast();

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): OrderFormValidation => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!selectedPayment) {
      errors.payment = 'Please select a payment method';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedPayment("");
  };

  const showValidationErrors = (errors: Record<string, string>) => {
    const errorMessages = Object.values(errors);
    if (errorMessages.length > 0) {
      toast({
        title: "Please fix the following errors:",
        description: errorMessages.join(', '),
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    selectedPayment,
    handleInputChange,
    setSelectedPayment,
    validateForm,
    resetForm,
    showValidationErrors,
  };
}