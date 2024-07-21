import { toast } from "react-toastify";

const ErrorMessage = () => {
  return (
    <div>
      <p>Connect Wallet</p>
      <p>To access app functions.</p>
    </div>
  );
};

function RequestAccess() {
  return toast.error(<ErrorMessage />);
  // return (
  //   <Alert status="error">
  //     <AlertIcon />
  //     <AlertTitle mr={2}>Conecta tu wallet</AlertTitle>
  //     <AlertDescription>para acceder a la app</AlertDescription>
  //     <CloseButton position="absolute" right="8px" top="8px" />
  //   </Alert>
  // );
}

export default RequestAccess;
