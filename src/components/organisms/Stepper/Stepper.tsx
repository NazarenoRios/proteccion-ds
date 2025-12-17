import React from 'react';
import { Step } from '../../../types/common';
import { StepperProps } from './Types';
import { Icon } from '../../atoms/Icon';

export const Stepper: React.FC<StepperProps> = ({
  steps: originalSteps,
  className = '',
  onStepClick,
  variant = 'number',
}) => {
  // Limitar a un máximo de 5 pasos
  const steps = originalSteps.slice(0, 5);
  
  // Mostrar advertencia si se excede el límite
  React.useEffect(() => {
    if (originalSteps.length > 5) {
      console.warn('El Stepper solo muestra un máximo de 5 pasos. Se han omitido los pasos adicionales.');
    }
  }, [originalSteps.length]);
  
  // Determinar si se debe mostrar el ícono en lugar del número
  const shouldShowIcon = (step: Step) => {
    return step.icon && variant === 'icon';
  };
  const handleStepClick = (step: Step) => {
    if (step.disabled || !onStepClick) return;
    onStepClick(step);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'Realizado';
          const isActive = step.status === 'Activo';
          const isClickable = !step.disabled && onStepClick;
          const isLast = index === steps.length - 1;
          const isFirst = index === 0;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                {/* Step line and indicator container */}
                <div className="w-full flex items-center">
                  {/* Line before (hidden for first step) */}
                  <div 
                    className={`h-1 flex-1 ${
                      isFirst 
                        ? 'invisible' 
                        : (steps[index - 1].status === 'Realizado' || steps[index - 1].status === 'Activo'
                            ? variant === 'inversion' 
                              ? 'bg-primary-amarillo-proteccion-500' 
                              : 'bg-secondary-exito-500'
                            : 'bg-basic-neutral-200')
                    }`}
                  />
                  
                  {/* Step indicator */}
                  <div className="relative">
                    <div 
                      className={`z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        isActive 
                          ? variant === 'inversion' 
                            ? 'bg-primary-amarillo-proteccion-500 text-basic-neutral-900' 
                            : 'bg-primary-azul-proteccion-500 text-white'
                          : isCompleted 
                            ? variant === 'inversion'
                              ? 'bg-primary-amarillo-proteccion-300 text-basic-neutral-900'
                              : 'bg-secondary-exito-200 text-secondary-exito-700'
                            : 'bg-basic-neutral-100 text-basic-neutral-500'
                      } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={() => handleStepClick(step)}
                    >
                      {shouldShowIcon(step) ? (
                        <Icon 
                          name={step.icon} 
                          size={16} 
                          className={isActive ? 'text-white' : isCompleted ? 'text-secondary-exito-700' : 'text-basic-neutral-500'}
                        />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Line after (hidden for last step) */}
                  <div 
                    className={`h-1 flex-1 ${
                      isLast 
                        ? 'invisible' 
                        : (isActive || isCompleted
                            ? variant === 'inversion' 
                              ? 'bg-primary-amarillo-proteccion-500' 
                              : 'bg-secondary-exito-500'
                            : 'bg-basic-neutral-200')
                    }`}
                  />
                </div>
                
                {/* Step title and description */}
                <div className="text-center w-full px-1 mt-2">
                  <p 
                    className={`text-sm font-medium text-basic-neutral-700`}
                  >
                    {step.title}
                  </p>
                  {isCompleted && step.description && (
                    <p className="text-xs text-basic-neutral-900 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
