import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Header, Box, Button, Layer, Text } from "grommet";
import { Menu, Close } from "grommet-icons";
const positions = ["left", "right", "top", "bottom", "center"];

import styles from "./nav.module.css";

//import dynamic from "next/dynamic";
//const Worklist = dynamic(() => import("../pages/works/index"));

function Nav({ drawings }) {
  const [open, setOpen] = React.useState();
  const [gutter] = React.useState("small");
  const [modal] = React.useState(true);
  const [position] = React.useState(positions[0]);

  React.useEffect(() => {
    window.dispatchEvent(new Event("resize"));
    return undefined;
  }, [gutter]);

  const ref = React.useRef();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <div>
      <Header pad="medium" height="xsmall">
        <Box align="start" margin={{ left: "12px" }}>
          <Link href="/">
            <Image
              src="/IMGs/logo.png"
              alt="Picture of logo"
              width={195 / 2}
              height={83 / 2}
              className={styles.logoImg}
            />
          </Link>
        </Box>
        <Box align="end">
          <Button
            icon={<Menu color="brand" />}
            name="Menu open"
            onClick={onOpen}
          />
        </Box>
      </Header>

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
            <Box align="end">
              <Button
                icon={<Close color="brand" />}
                name="Menu close"
                onClick={onClose}
              />
            </Box>

            <Box
              pad="small"
              align="start"
              margin={{ top: "54px" }}
              gap="small"
              width="full"
              height="full"
            >
              <Link href="/bio">
                <Text className={styles.menuLink} onClick={() => {}}>
                  Biography
                </Text>
              </Link>
              <Text onClick={() => {}}>Contact</Text>
              <Link href="/drawing">
                <Text className={styles.menuLink} onClick={() => {}}>
                  Drawing
                </Text>
              </Link>
              <Text>Selected Works ↓↓↓ </Text>
            </Box>
          </Box>
        </Layer>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.STRAPI_API_URL;
  //console.log(baseUrl);
  let drawingURL = `${baseUrl}/drawings`;

  const res = await fetch(`${drawingURL}`);
  const drawings = await res.json();

  return {
    props: {
      drawings,
    },
  };
}

export default Nav;