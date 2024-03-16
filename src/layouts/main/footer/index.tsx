import {
  Box,
  Container,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      w="100%"
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container>
          <Text>
            © {new Date().getFullYear()} Original designs by
            <Link ml={1} href="https://twitter.com/pablostanley" isExternal>
              Pablo Stanley 🎨
            </Link>
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
