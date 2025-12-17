import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=8455-19492&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla si el modal esta visible',
    },
    title: {
      control: 'text',
      description: 'Titulo del modal',
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
      description: 'Tamano del modal',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Permite cerrar haciendo clic fuera del modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Permite cerrar con la tecla Escape',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Muestra el boton de cerrar (X)',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Componente wrapper para manejar el estado en las historias
const ModalWrapper: React.FC<{
  children: (args: { isOpen: boolean; onClose: () => void; onOpen: () => void }) => React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children({
        isOpen,
        onClose: () => setIsOpen(false),
        onOpen: () => setIsOpen(true),
      })}
    </>
  );
};

export const Default: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Abrir Modal
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="Titulo de notificacion"
            actions={[
              {
                label: 'Cancelar',
                variant: 'secondaryGeneral',
                onClick: onClose,
              },
              {
                label: 'Confirmar',
                variant: 'primaryGeneral',
                onClick: onClose,
              },
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut
            eget imperdiet neque. Ut volutpat ac dolor mauris.
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal basico con titulo, contenido y dos acciones (Cancelar y Confirmar).',
      },
    },
  },
};

export const InformationModal: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Mostrar Informacion
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="Informacion importante"
            actions={[
              {
                label: 'Entendido',
                variant: 'primaryGeneral',
                onClick: onClose,
              },
            ]}
          >
            <div className="space-y-4">
              <p>Esta es informacion importante que el usuario debe leer y entender.</p>
              <p>El modal de informacion tipicamente incluye un solo boton de confirmacion.</p>
            </div>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal informativo con una sola accion de confirmacion.',
      },
    },
  },
};

export const ConfirmationModal: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="secondaryGeneral" leftIcon={undefined}>
            Eliminar elemento
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="¿Confirmar eliminacion?"
            actions={[
              {
                label: 'Cancelar',
                variant: 'secondaryGeneral',
                onClick: onClose,
              },
              {
                label: 'Eliminar',
                variant: 'primaryGeneral',
                onClick: () => {
                  console.log('Elemento eliminado');
                  onClose();
                },
              },
            ]}
          >
            <p>
              Esta accion no se puede deshacer. ¿Estas seguro de que quieres eliminar este elemento?
            </p>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal de confirmacion para acciones destructivas con pregunta especifica.',
      },
    },
  },
};

export const LargeModal: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Modal Grande
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="Modal con contenido extenso"
            size="L"
            actions={[
              {
                label: 'Cancelar',
                variant: 'secondaryGeneral',
                onClick: onClose,
              },
              {
                label: 'Guardar cambios',
                variant: 'primaryGeneral',
                onClick: onClose,
              },
            ]}
          >
            <div className="space-y-4">
              <p>
                Este es un modal mas grande que puede contener mas contenido. Es util cuando
                necesitas mostrar informacion mas detallada o formularios complejos.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal de tamano grande para contenido extenso.',
      },
    },
  },
};

export const SmallModal: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Modal Pequeno
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmacion"
            size="S"
            actions={[
              {
                label: 'No',
                variant: 'secondaryGeneral',
                onClick: onClose,
              },
              {
                label: 'Si',
                variant: 'primaryGeneral',
                onClick: onClose,
              },
            ]}
          >
            <p>¿Continuar con esta accion?</p>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal pequeno para confirmaciones simples.',
      },
    },
  },
};

export const LoadingAction: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => {
        const [isLoading, setIsLoading] = useState(false);

        const handleAsyncAction = async () => {
          setIsLoading(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
          setIsLoading(false);
          onClose();
        };

        return (
          <>
            <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
              Accion con Loading
            </Button>
            <Modal
              {...args}
              isOpen={isOpen}
              onClose={onClose}
              title="Procesando solicitud"
              actions={[
                {
                  label: 'Cancelar',
                  variant: 'secondaryGeneral',
                  onClick: onClose,
                  disabled: isLoading,
                },
                {
                  label: 'Procesar',
                  variant: 'primaryGeneral',
                  onClick: handleAsyncAction,
                  isLoading,
                },
              ]}
            >
              <p>Esta accion puede tomar unos momentos. ¿Deseas continuar?</p>
            </Modal>
          </>
        );
      }}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal con boton que muestra estado de carga durante operaciones asincronas.',
      },
    },
  },
};

export const NoActions: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Solo Informacion
          </Button>
          <Modal {...args} isOpen={isOpen} onClose={onClose} title="Informacion del sistema">
            <div className="space-y-3">
              <p>Esta es una notificacion informativa que no requiere acciones especificas.</p>
              <p>El usuario puede cerrar este modal usando:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>El boton X en la esquina superior derecha</li>
                <li>Haciendo clic fuera del modal</li>
                <li>Presionando la tecla Escape</li>
              </ul>
            </div>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal sin botones de accion, solo informativo.',
      },
    },
  },
};

export const CustomCloseOptions: Story = {
  render: args => (
    <ModalWrapper>
      {({ isOpen, onClose, onOpen }) => (
        <>
          <Button onClick={onOpen} variant="primaryGeneral" leftIcon={undefined}>
            Modal Restringido
          </Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={onClose}
            title="Accion requerida"
            closeOnBackdropClick={false}
            closeOnEscape={false}
            showCloseButton={false}
            actions={[
              {
                label: 'Cancelar',
                variant: 'secondaryGeneral',
                onClick: onClose,
              },
              {
                label: 'Continuar',
                variant: 'primaryGeneral',
                onClick: onClose,
              },
            ]}
          >
            <p>
              Este modal requiere una accion explicita del usuario. No se puede cerrar haciendo clic
              fuera, con Escape, o con el boton X.
            </p>
          </Modal>
        </>
      )}
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal que solo se puede cerrar a traves de las acciones definidas.',
      },
    },
  },
};
