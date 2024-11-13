import { useState } from 'react';

// Hook personalizado para manejar formularios con validación
const useForm = (initialValues, validate) => {

    // Estado que almacena los valores del formulario, inicializado con valores predeterminados
    const [values, setValues] = useState(initialValues);

    // Estado que almacena los errores de validación de cada campo del formulario
    const [errors, setErrors] = useState({});

    // Estado que indica si el formulario está en proceso de envío
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Maneja los cambios en los campos del formulario y actualiza el estado de valores
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Maneja el envío del formulario, ejecuta la validación y actualiza el estado de errores
    const handleSubmit = async (event) => {
        if (event) event.preventDefault();

        setIsSubmitting(true);

        // Realiza la validación y establece los errores en el estado
        const validationErrors = validate(values);
        setErrors(validationErrors);

        // Retorna true si no hay errores de validación; de lo contrario, retorna false
        if (Object.keys(validationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    // Retorna los valores, errores, estado de envío y manejadores del formulario
    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
};

export default useForm;

