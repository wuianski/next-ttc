import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Box, Layer } from "grommet";
const positions = ["left", "right", "top", "bottom", "center"];
import styles from "./nav.module.css";

function Nav({ works, contact }) {
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
      <div className={styles.logoFixed}>
        <Link href="/">
          <Image
            src="/IMGs/logo2.png"
            alt="Picture of logo"
            width={48}
            height={48}
            className={styles.logoImg}
          />
        </Link>
      </div>
      <div>
        <button className={styles.primaryNav} onClick={onOpen}>
          <svg className={styles.lightSVG} viewBox="0 0 56 56">
            <g stroke="none" strokeWidth="1">
              <g fillRule="nonzero" fill="#FFFFFF">
                <path
                  d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M28,54C13.663,54,2,42.336,2,28
		S13.663,2,28,2s26,11.664,26,26S42.337,54,28,54z"
                />
                <path d="M40,16H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,16,40,16z" />
                <path d="M40,27H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,27,40,27z" />
                <path d="M40,38H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,38,40,38z" />
              </g>
            </g>
          </svg>

          <svg className={styles.darkSVG} viewBox="0 0 56 56">
            <g stroke="none" strokeWidth="1">
              <g fillRule="nonzero" fill="#000000">
                <path
                  d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M28,54C13.663,54,2,42.336,2,28
		S13.663,2,28,2s26,11.664,26,26S42.337,54,28,54z"
                />
                <path d="M40,16H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,16,40,16z" />
                <path d="M40,27H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,27,40,27z" />
                <path d="M40,38H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,38,40,38z" />
              </g>
            </g>
          </svg>
        </button>
      </div>

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
            className={styles.NavOpenBlock}
          >
            <Box align="end">
              <button className={styles.primaryNav} onClick={onClose}>
                <svg className={styles.lightSVG} viewBox="0 0 294.843 294.843">
                  <g stroke="none" stroke-width="1">
                    <g fillRule="nonzero" fill="#FFFFFF">
                      <path
                        d="M147.421,0C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421c38.287,0,74.567-14.609,102.159-41.136
		c2.389-2.296,2.464-6.095,0.167-8.483c-2.295-2.388-6.093-2.464-8.483-0.167c-25.345,24.367-58.672,37.786-93.842,37.786
		C72.75,282.843,12,222.093,12,147.421S72.75,12,147.421,12s135.421,60.75,135.421,135.421c0,16.842-3.052,33.273-9.071,48.835
		c-1.195,3.091,0.341,6.565,3.432,7.761c3.092,1.193,6.565-0.341,7.761-3.432c6.555-16.949,9.879-34.836,9.879-53.165
		C294.843,66.133,228.71,0,147.421,0z"
                      />
                      <path
                        d="M167.619,160.134c-2.37-2.319-6.168-2.277-8.485,0.09c-2.318,2.368-2.277,6.167,0.09,8.485l47.236,46.236
		c1.168,1.143,2.683,1.712,4.197,1.712c1.557,0,3.113-0.603,4.288-1.803c2.318-2.368,2.277-6.167-0.09-8.485L167.619,160.134z"
                      />
                      <path
                        d="M125.178,133.663c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485
		L88.428,79.942c-2.343-2.343-6.143-2.343-8.485,0c-2.343,2.343-2.343,6.142,0,8.485L125.178,133.663z"
                      />
                      <path
                        d="M214.9,79.942c-2.343-2.343-6.143-2.343-8.485,0L79.942,206.415c-2.343,2.343-2.343,6.142,0,8.485
		c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757L214.9,88.428C217.243,86.084,217.243,82.286,214.9,79.942z"
                      />
                    </g>
                  </g>
                </svg>

                <svg className={styles.darkSVG} viewBox="0 0 294.843 294.843">
                  <g stroke="none" stroke-width="1">
                    <g fillRule="nonzero" fill="#000000">
                      <path
                        d="M147.421,0C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421c38.287,0,74.567-14.609,102.159-41.136
		c2.389-2.296,2.464-6.095,0.167-8.483c-2.295-2.388-6.093-2.464-8.483-0.167c-25.345,24.367-58.672,37.786-93.842,37.786
		C72.75,282.843,12,222.093,12,147.421S72.75,12,147.421,12s135.421,60.75,135.421,135.421c0,16.842-3.052,33.273-9.071,48.835
		c-1.195,3.091,0.341,6.565,3.432,7.761c3.092,1.193,6.565-0.341,7.761-3.432c6.555-16.949,9.879-34.836,9.879-53.165
		C294.843,66.133,228.71,0,147.421,0z"
                      />
                      <path
                        d="M167.619,160.134c-2.37-2.319-6.168-2.277-8.485,0.09c-2.318,2.368-2.277,6.167,0.09,8.485l47.236,46.236
		c1.168,1.143,2.683,1.712,4.197,1.712c1.557,0,3.113-0.603,4.288-1.803c2.318-2.368,2.277-6.167-0.09-8.485L167.619,160.134z"
                      />
                      <path
                        d="M125.178,133.663c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485
		L88.428,79.942c-2.343-2.343-6.143-2.343-8.485,0c-2.343,2.343-2.343,6.142,0,8.485L125.178,133.663z"
                      />
                      <path
                        d="M214.9,79.942c-2.343-2.343-6.143-2.343-8.485,0L79.942,206.415c-2.343,2.343-2.343,6.142,0,8.485
		c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757L214.9,88.428C217.243,86.084,217.243,82.286,214.9,79.942z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </Box>

            <Box
              pad="small"
              align="start"
              margin={{ top: "110px" }}
              gap="small"
              width="full"
              height="full"
            >
              <div>
                <Link href="/bio">
                  <div className={styles.menuLink} onClick={() => {}}>
                    Biography
                  </div>
                </Link>
                <div className={styles.menuLink}>
                  <a href={`mailto:` + contact.content}>Contact</a>
                </div>
                <Link href="/drawing">
                  <div className={styles.menuLink} onClick={() => {}}>
                    Drawing
                  </div>
                </Link>
                <div className={styles.menuLink}>Selected Works ↓↓↓ </div>
              </div>
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