import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Header, Box, Button, Layer, Text } from "grommet";
import { Menu, Close } from "grommet-icons";
const positions = ["left", "right", "top", "bottom", "center"];

import styles from "./nav.module.css";

//import dynamic from "next/dynamic";
//const Worklist = dynamic(() => import("../pages/works/index"));

function Nav({ works }) {
  //console.log('Works: ', works);

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
            icon={<Menu color="black" />}
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
                icon={<Close color="black" />}
                name="Menu close"
                onClick={onClose}
                className={styles.menuClose}
              />
            </Box>

            <Box
              pad="small"
              align="start"
              margin={{ top: "-57px" }}
              gap="small"
              width="full"
              height="full"
            >
              <Link href="/">
                <Image
                  src="/IMGs/logo.png"
                  alt="Picture of logo"
                  width={195 / 2}
                  height={83 / 2}
                  className={styles.logoImg}
                />
              </Link>
              <Link href="/bio">
                <Box pad={{ top: "57px" }}>
                  <Box className={styles.menuLink} onClick={() => {}}>
                    Biography
                  </Box>
                </Box>
              </Link>
              <Box className={styles.menuLink} onClick={() => {}}>
                Contact
              </Box>
              <Link href="/drawing">
                <Box className={styles.menuLink} onClick={() => {}}>
                  Drawing
                </Box>
              </Link>
              <Box className={styles.menuLink}>Selected Works ↓↓↓ </Box>
              <Box pad={{ top: "30px" }}>
                <div>
                  {works.map((work) => (
                    <div key={work.id}>
                      <Link href="/works/[id]" as={`/works/` + work.id}>
                        <Box className={styles.menuWorksLink} onClick={onClose}>
                          <div>
                            <span>{work.title_en}</span>
                            <span className={styles.menuWorksLinkTW}>
                               _ {work.title}
                            </span>
                          </div>
                        </Box>
                      </Link>
                    </div>
                  ))}
                </div>
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </div>
  );
}

export default Nav;