import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export const AlertModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  headText,
  bodyText,
}: {
  isOpen: boolean;
  onOpenChange: any;
  onConfirm: any;
  headText?: string;
  bodyText?: string;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {headText}
            </ModalHeader>
            <ModalBody>{bodyText}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                취소
              </Button>
              <Button color="primary" onPress={onConfirm}>
                확인
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
