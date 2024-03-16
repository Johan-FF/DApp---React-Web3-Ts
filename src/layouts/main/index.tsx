import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";
import NavLink from "./nav-link";
import Footer from "./footer";
import WalletData from "./wallet-data";

const LINKS = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Imas",
    to: "/imas",
  },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={"7xl"}
        width="100%"
        bg={useColorModeValue("white", "gray.800")}
        px={4}
      >
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems="center">
              {/* <Image src="./images/platzi.svg" width="80px" /> */}
              <Heading size="md" color="purple" mt={0.2} ml={1}>
                Imas
              </Heading>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LINKS.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  <Text>{name}</Text>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <WalletData />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {LINKS.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  <Text>{name}</Text>
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default MainLayout;
