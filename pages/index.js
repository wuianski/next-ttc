import React from "react";

import { Box, Button, Grommet, Layer, Text } from "grommet";
import { Menu, Close } from "grommet-icons";
import { grommet } from "grommet/themes";
const positions = ["left", "right", "top", "bottom", "center"];

import Link from "next/link";

export default function Home() {

  const [open, setOpen] = React.useState();
  const [gutter, setGutter] = React.useState("small");
  const [modal, setModal] = React.useState(true);
  const [position, setPosition] = React.useState(positions[0]);

  React.useEffect(() => {
    window.dispatchEvent(new Event("resize"));
    return undefined;
  }, [gutter]);

  const ref = React.useRef();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={grommet} full>
      <Box full pad="medium" align="end" size="small">
        <Button
          icon={<Menu color="brand" />}
          name="Menu open"
          onClick={onOpen}
        />
      </Box>

      <Box height="xxlarge" />
      {open && (
        <Layer
          full
          animation="fadeIn"
          modal={modal}
          position={position}
          target={ref.current}
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill
            background="linear-gradient(45deg, #FFFFFF 0%, #AAAAAA 80%)"
            pad="medium"
            align="end"
            size="small"
          >
            <Button
              icon={<Close color="brand" />}
              name="Menu close"
              onClick={onClose}
            />
            <Box
              align="start"
              pad="medium"
              gap="small"
              width="full"
              height="full"
            >
              <Link href="/bio">
                <Text onClick={() => {}}>Biography</Text>
              </Link>
              <Text onClick={() => {}}>Contact</Text>
              <Link href="/drawing">
                <Text onClick={() => {}}>Drawing</Text>
              </Link>
              <Text>Selected Works ↓↓↓ </Text>
            </Box>
          </Box>
        </Layer>
      )}
    </Grommet>
  );
}
